"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Loader2,
  User,
  Bot,
  Minimize2,
  Maximize2,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// Knowledge base for local responses (fallback when no API)
const knowledgeBase: Record<string, string> = {
  skills: `Sreeshanth has expertise in:
• **Languages**: Python (expert), JavaScript, TypeScript, C, SQL
• **Frontend**: React.js, Next.js, Tailwind CSS, Three.js
• **Backend**: Node.js, FastAPI, Firebase, Supabase, REST APIs
• **AI/ML**: PyTorch, TensorFlow, OpenCV, LLMs, RAG, LangChain, Computer Vision
• **DevOps**: Docker, Kubernetes, AWS, PostgreSQL, Neo4j, Git
• **Certifications**: AWS Cloud Practitioner, Microsoft AI Product Manager`,

  experience: `Sreeshanth's experience:
• **Nov 2024-Present**: Testing & Developer Intern at Interview Companion (ICMS)
  - Building AI job application features with Python
  - Testing web-based interview management system
• **Mar-Jun 2024**: Software Engineering Intern at Koluvu Company
  - AI-driven interview tools with Python & React
  - Improved system reliability by 25%
• **Education**: B.Tech in CS & Business Systems at VNR VJIET (CGPA: 8.05/10)`,

  projects: `Notable projects by Sreeshanth:
• **Underwater Obstruction Detection** (₹15L Govt. Funded): YOLOv11-based marine safety system with 94% accuracy on 15K+ images
• **OpStream - OSINT Platform**: FastAPI + React platform for discovering GitHub issues with vector search
• **NEXUS - GraphRAG Platform**: LangGraph + Neo4j knowledge platform with <500ms inference`,

  contact: `You can reach Sreeshanth through:
• **Email**: peddisreeshanth18@gmail.com
• **Phone**: +91 90528 34976
• **LinkedIn**: linkedin.com/in/sreeshanthpeddi
• **GitHub**: github.com/P-Sreeshanth
• **Location**: Hyderabad, India`,

  availability: `Sreeshanth is currently **available for opportunities**! He's open to:
• Full-time positions (graduating May 2026)
• Internships
• Freelance AI/ML and Full Stack projects
• Interesting collaborations`,

  react: `Sreeshanth has strong React experience:
• Building full-stack applications with React & Next.js
• Interview management system at ICMS
• AI-driven tools at Koluvu Company
• NEXUS platform with Next.js and Three.js`,

  ai: `Sreeshanth's AI/ML expertise:
• **Computer Vision**: Built YOLOv11-based underwater detection (₹15L funded)
• **RAG Systems**: NEXUS platform with LangGraph and self-correcting RAG
• **LLMs**: Experience with Groq, OpenAI, vector databases (Qdrant, Neo4j)
• **PyTorch & TensorFlow**: Deep learning implementations`,

  achievements: `Sreeshanth's achievements:
• **₹15L MSME Government Funding** for Underwater Detection project
• **Mr. VNR 2024 Winner** & **Mr. SNIST 2024 Winner**
• **TEDxVNRVJIET Event Organizer Head** - Led 20+ volunteers
• **NMMS Scholar** - Government scholarship for academic excellence
• **AWS Cloud Practitioner** & **Microsoft AI PM** certifications`,

  default: `I'm Sreeshanth's AI assistant! I can help you learn about:
• His **skills** (Python, AI/ML, Full Stack)
• **Work experience** and internships
• **Projects** (including ₹15L govt-funded AI project)
• **Achievements** and certifications
• How to **contact** him
• His **availability** for opportunities

What would you like to know?`,
};

// Suggested questions
const SUGGESTED_QUESTIONS = [
  "What are his main skills?",
  "Tell me about his experience",
  "What projects has he built?",
  "Is he available for hire?",
  "How can I contact him?",
];

// Generate response based on keywords
function generateResponse(query: string): string {
  const lowerQuery = query.toLowerCase();

  if (lowerQuery.includes("skill") || lowerQuery.includes("technolog") || lowerQuery.includes("stack") || lowerQuery.includes("python") || lowerQuery.includes("know")) {
    return knowledgeBase.skills;
  }
  if (lowerQuery.includes("experience") || lowerQuery.includes("work") || lowerQuery.includes("job") || lowerQuery.includes("career") || lowerQuery.includes("intern")) {
    return knowledgeBase.experience;
  }
  if (lowerQuery.includes("project") || lowerQuery.includes("portfolio") || lowerQuery.includes("built") || lowerQuery.includes("created") || lowerQuery.includes("underwater") || lowerQuery.includes("nexus") || lowerQuery.includes("opstream")) {
    return knowledgeBase.projects;
  }
  if (lowerQuery.includes("contact") || lowerQuery.includes("reach") || lowerQuery.includes("email") || lowerQuery.includes("phone") || lowerQuery.includes("hire")) {
    return knowledgeBase.contact;
  }
  if (lowerQuery.includes("available") || lowerQuery.includes("freelance") || lowerQuery.includes("open") || lowerQuery.includes("opportunity")) {
    return knowledgeBase.availability;
  }
  if (lowerQuery.includes("react") || lowerQuery.includes("frontend") || lowerQuery.includes("next") || lowerQuery.includes("web")) {
    return knowledgeBase.react;
  }
  if (lowerQuery.includes("ai") || lowerQuery.includes("ml") || lowerQuery.includes("machine") || lowerQuery.includes("deep") || lowerQuery.includes("vision") || lowerQuery.includes("llm") || lowerQuery.includes("rag")) {
    return knowledgeBase.ai;
  }
  if (lowerQuery.includes("achieve") || lowerQuery.includes("award") || lowerQuery.includes("certif") || lowerQuery.includes("winner") || lowerQuery.includes("fund")) {
    return knowledgeBase.achievements;
  }
  if (lowerQuery.includes("hello") || lowerQuery.includes("hi") || lowerQuery.includes("hey")) {
    return "Hello! 👋 I'm here to help you learn more about Sreeshanth. He's a CS undergrad with expertise in AI/ML and Full Stack development. What would you like to know?";
  }

  return knowledgeBase.default;
}

export function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "👋 Hi! I'm Sreeshanth's AI assistant. Ask me anything about his skills, experience, or projects!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI thinking delay
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 700));

    const response = generateResponse(userMessage.content);

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  }, [input, isLoading]);

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
    // Auto-submit after a brief delay
    setTimeout(() => {
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: question,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      
      setTimeout(() => {
        const response = generateResponse(question);
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 800 + Math.random() * 700);
    }, 100);
    setInput("");
  };

  const resetChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "👋 Hi! I'm Sreeshanth's AI assistant. Ask me anything about his skills, experience, or projects!",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-shadow"
            aria-label="Open AI Chat"
          >
            <MessageCircle className="h-6 w-6 text-white" />

            {/* Pulse animation */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
              <span className="relative inline-flex h-4 w-4 rounded-full bg-secondary" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? "auto" : "min(600px, 80vh)",
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={cn(
              "fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl",
              "flex flex-col"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card bg-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">AI Assistant</h3>
                  <p className="text-xs text-muted-foreground">Ask me anything!</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={resetChat}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                  aria-label="Reset chat"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                  aria-label={isMinimized ? "Maximize" : "Minimize"}
                >
                  {isMinimized ? (
                    <Maximize2 className="h-4 w-4" />
                  ) : (
                    <Minimize2 className="h-4 w-4" />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "flex gap-3",
                        message.role === "user" ? "flex-row-reverse" : ""
                      )}
                    >
                      {/* Avatar */}
                      <div
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-gradient-to-r from-primary to-secondary text-white"
                        )}
                      >
                        {message.role === "user" ? (
                          <User className="h-4 w-4" />
                        ) : (
                          <Bot className="h-4 w-4" />
                        )}
                      </div>

                      {/* Message Bubble */}
                      <div
                        className={cn(
                          "max-w-[75%] rounded-2xl px-4 py-2.5",
                          message.role === "user"
                            ? "bg-primary text-primary-foreground rounded-br-md"
                            : "bg-accent text-foreground rounded-bl-md"
                        )}
                      >
                        <div 
                          className="text-sm leading-relaxed prose prose-sm prose-invert max-w-none"
                          dangerouslySetInnerHTML={{ 
                            __html: message.content
                              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                              .replace(/\n/g, '<br />')
                              .replace(/• /g, '• ')
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}

                  {/* Loading indicator */}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex items-center gap-1.5 rounded-2xl bg-accent px-4 py-3">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
                        <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
                        <div className="h-2 w-2 animate-bounce rounded-full bg-primary" />
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Suggested Questions (only show initially) */}
                {messages.length <= 1 && (
                  <div className="border-t border-border px-4 py-3">
                    <p className="mb-2 text-xs font-medium text-muted-foreground">
                      Quick questions:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {SUGGESTED_QUESTIONS.slice(0, 3).map((question, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestedQuestion(question)}
                          className="rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground transition-colors hover:bg-accent hover:border-primary/50"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <form onSubmit={handleSubmit} className="border-t border-border p-4">
                  <div className="flex items-center gap-2">
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about skills, projects..."
                      className="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      disabled={isLoading}
                    />
                    <button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-secondary text-white transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
