"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageCircle, 
  X, 
  Send, 
  Sparkles,
  Bot,
  Copy,
  Check,
  ChevronDown,
  Loader2,
  User,
  ThumbsUp,
  ThumbsDown,
  Maximize2,
  Minimize2,
  Trash2,
  Code2,
  Folder,
  Briefcase,
  Mail,
  RotateCcw,
  Zap
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

// Types
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  feedback?: "positive" | "negative" | null;
  isStreaming?: boolean;
}

interface ConversationSuggestion {
  icon: React.ReactNode;
  title: string;
  description: string;
  query: string;
}

// Higgsfield-inspired animated background component
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF4D00]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#FF6B2B]/8 rounded-full blur-3xl animate-pulse delay-1000" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(#E6E6E1 1px, transparent 1px), linear-gradient(90deg, #E6E6E1 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#FF4D00]/40 rounded-full"
          initial={{ 
            x: Math.random() * 400,
            y: Math.random() * 600,
            opacity: 0 
          }}
          animate={{ 
            y: [null, Math.random() * 600],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
}

// Streaming text effect component
function StreamingText({ text, onComplete }: { text: string; onComplete?: () => void }) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        // Stream in chunks for faster display
        const chunkSize = Math.min(3, text.length - currentIndex);
        setDisplayedText(text.slice(0, currentIndex + chunkSize));
        setCurrentIndex(prev => prev + chunkSize);
      }, 10);
      return () => clearTimeout(timeout);
    } else {
      onComplete?.();
    }
  }, [currentIndex, text, onComplete]);

  return <>{displayedText}</>;
}

// Conversation suggestions
const suggestions: ConversationSuggestion[] = [
  {
    icon: <Code2 className="w-4 h-4" />,
    title: "Technical Skills",
    description: "Python, AI/ML, Full Stack",
    query: "What are Sreeshanth's technical skills and expertise?"
  },
  {
    icon: <Folder className="w-4 h-4" />,
    title: "Featured Projects",
    description: "Including govt-funded AI",
    query: "Tell me about Sreeshanth's projects, especially the government funded one"
  },
  {
    icon: <Briefcase className="w-4 h-4" />,
    title: "Work Experience",
    description: "Internships & roles",
    query: "What is Sreeshanth's work experience?"
  },
  {
    icon: <Mail className="w-4 h-4" />,
    title: "Get in Touch",
    description: "Contact & availability",
    query: "How can I contact Sreeshanth and is he available for opportunities?"
  }
];

export function PortfolioAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 150) + "px";
    }
  }, [input]);

  // Scroll handling
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Check scroll position for scroll button
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      setShowScrollButton(scrollHeight - scrollTop - clientHeight > 100);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Focus input when opening
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Keyboard shortcut to open chat
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleFeedback = (messageId: string, feedback: "positive" | "negative") => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, feedback } : msg
    ));
  };

  // Send message to Groq API
  const handleSend = useCallback(async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    setError(null);

    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }

    try {
      // Build conversation history for context
      const conversationHistory = messages.slice(-10).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
          conversationHistory,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get response");
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
        isStreaming: true,
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Mark streaming as complete after a delay
      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === assistantMessage.id ? { ...msg, isStreaming: false } : msg
        ));
      }, assistantMessage.content.length * 10 + 500);

    } catch (err) {
      console.error("Chat error:", err);
      setError(err instanceof Error ? err.message : "Something went wrong");
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I apologize, but I encountered an error. Please try again or ask a different question.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [input, isTyping, messages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  const handleSuggestionClick = async (query: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: query,
      timestamp: new Date(),
    };
    setMessages([userMessage]);
    setIsTyping(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: query,
          conversationHistory: [],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
        isStreaming: true,
      };

      setMessages(prev => [...prev, assistantMessage]);

      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === assistantMessage.id ? { ...msg, isStreaming: false } : msg
        ));
      }, assistantMessage.content.length * 10 + 500);

    } catch {
      setError("Failed to get response. Please try again.");
    } finally {
      setIsTyping(false);
    }
  };

  const regenerateResponse = async () => {
    if (messages.length < 2) return;
    
    // Get the last user message
    const lastUserMessage = [...messages].reverse().find(m => m.role === "user");
    if (!lastUserMessage) return;

    // Remove the last assistant message
    setMessages(prev => prev.slice(0, -1));
    setIsTyping(true);

    try {
      const conversationHistory = messages.slice(0, -2).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: lastUserMessage.content,
          conversationHistory,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to regenerate response");
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
        isStreaming: true,
      };

      setMessages(prev => [...prev, assistantMessage]);

      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === assistantMessage.id ? { ...msg, isStreaming: false } : msg
        ));
      }, assistantMessage.content.length * 10 + 500);

    } catch {
      setError("Failed to regenerate. Please try again.");
    } finally {
      setIsTyping(false);
    }
  };

  const chatWindowClasses = cn(
    "fixed z-50 bg-[#0A0A09] flex flex-col overflow-hidden transition-all duration-300",
    isFullscreen 
      ? "inset-0 rounded-none" 
      : "bottom-6 right-6 w-[480px] max-w-[calc(100vw-48px)] h-[700px] max-h-[calc(100vh-48px)] rounded-2xl border border-[#1F1F1C]/50 shadow-2xl shadow-black/80"
  );

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 group"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-[#FF4D00] blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
              
              {/* Button */}
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#FF4D00] via-[#FF5A1F] to-[#FF6B2B] shadow-lg transition-all">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              
              {/* Pulse indicator */}
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF4D00] opacity-75" />
                <span className="relative inline-flex h-4 w-4 items-center justify-center rounded-full bg-white">
                  <Sparkles className="h-2.5 w-2.5 text-[#FF4D00]" />
                </span>
              </span>
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-[#1A1A17] text-[#E6E6E1] text-sm px-4 py-2 rounded-xl whitespace-nowrap shadow-xl border border-[#2A2A27] flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#FF4D00]" />
                Ask AI about Sreeshanth
                <kbd className="text-[10px] bg-[#2A2A27] px-1.5 py-0.5 rounded text-[#6B6B68]">⌘K</kbd>
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={chatWindowClasses}
          >
            {/* Animated Background */}
            <AnimatedBackground />

            {/* Header */}
            <div className="relative flex items-center justify-between px-4 py-3 border-b border-[#1F1F1C]/50 bg-[#0A0A09]/80 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="relative">
                  {/* Glow */}
                  <div className="absolute inset-0 rounded-xl bg-[#FF4D00] blur-lg opacity-30" />
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF4D00] to-[#FF6B2B]">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0A0A09] bg-emerald-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#E6E6E1] text-sm flex items-center gap-2">
                    Alien&apos;
                    <span className="text-[10px] bg-gradient-to-r from-[#FF4D00] to-[#FF6B2B] text-white px-2 py-0.5 rounded-full font-medium">
                      RAG
                    </span>
                  </h3>
                  <p className="text-xs text-[#6B6B68] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    Online
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-0.5">
                {messages.length > 0 && (
                  <button
                    onClick={clearChat}
                    className="p-2 text-[#6B6B68] hover:text-[#E6E6E1] hover:bg-[#1A1A17] rounded-lg transition-colors"
                    title="New chat"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 text-[#6B6B68] hover:text-[#E6E6E1] hover:bg-[#1A1A17] rounded-lg transition-colors"
                  title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                >
                  {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-[#6B6B68] hover:text-[#E6E6E1] hover:bg-[#1A1A17] rounded-lg transition-colors"
                  title="Close (Esc)"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div 
              ref={messagesContainerRef}
              className="relative flex-1 overflow-y-auto scroll-smooth"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#2A2A27 transparent'
              }}
            >
              {messages.length === 0 ? (
                // Welcome screen
                <div className="flex flex-col items-center justify-center h-full p-6 relative">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6 relative"
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-3xl bg-[#FF4D00] blur-2xl opacity-30 animate-pulse" />
                    <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-[#FF4D00] via-[#FF5A1F] to-[#FF6B2B] flex items-center justify-center">
                      <Sparkles className="w-10 h-10 text-white" />
                    </div>
                  </motion.div>

                  <motion.h2
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-bold text-[#E6E6E1] mb-2 text-center"
                  >
                    Hey there! 👋
                  </motion.h2>

                  <motion.p
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-[#6B6B68] text-sm text-center mb-8 max-w-sm leading-relaxed"
                  >
                    I can help you learn about Sreeshanth. Are you a recruiter, student, developer, or just exploring?
                  </motion.p>

                  {/* Suggestion Cards */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-2 gap-3 w-full max-w-sm"
                  >
                    {suggestions.map((suggestion, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        onClick={() => handleSuggestionClick(suggestion.query)}
                        className="group relative p-4 bg-[#0F0F0E]/80 hover:bg-[#141411] border border-[#1F1F1C]/50 hover:border-[#FF4D00]/40 rounded-xl text-left transition-all duration-300 overflow-hidden backdrop-blur-sm"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#FF4D00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative">
                          <div className="flex items-center gap-2.5 mb-2">
                            <div className="p-1.5 rounded-lg bg-[#FF4D00]/10 text-[#FF4D00] transition-transform group-hover:scale-110">
                              {suggestion.icon}
                            </div>
                          </div>
                          <h3 className="text-[#E6E6E1] text-sm font-medium mb-0.5">
                            {suggestion.title}
                          </h3>
                          <p className="text-[#6B6B68] text-xs">
                            {suggestion.description}
                          </p>
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>

                  {/* Example queries */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-8 text-center"
                  >
                    <p className="text-[10px] text-[#4A4A47] uppercase tracking-wider mb-3">Try asking</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {[
                        "What makes him unique?",
                        "Tell me about NEXUS",
                        "His AI expertise"
                      ].map((q, i) => (
                        <button
                          key={i}
                          onClick={() => handleSuggestionClick(q)}
                          className="text-xs text-[#6B6B68] hover:text-[#FF4D00] bg-[#141411]/50 hover:bg-[#1A1A17] px-3 py-1.5 rounded-full border border-[#1F1F1C]/50 hover:border-[#FF4D00]/30 transition-all"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </div>
              ) : (
                // Messages
                <div className="p-4 space-y-6">
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group"
                    >
                      <div className={cn(
                        "flex gap-3",
                        message.role === "user" ? "flex-row-reverse" : ""
                      )}>
                        {/* Avatar */}
                        <div className={cn(
                          "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center",
                          message.role === "user" 
                            ? "bg-[#1F1F1C]" 
                            : "bg-gradient-to-br from-[#FF4D00] to-[#FF6B2B]"
                        )}>
                          {message.role === "user" ? (
                            <User className="w-4 h-4 text-[#E6E6E1]" />
                          ) : (
                            <Bot className="w-4 h-4 text-white" />
                          )}
                        </div>

                        {/* Message Content */}
                        <div className={cn(
                          "flex-1 min-w-0",
                          message.role === "user" ? "flex flex-col items-end" : ""
                        )}>
                          <div className={cn(
                            "rounded-2xl px-4 py-3",
                            message.role === "user"
                              ? "bg-gradient-to-br from-[#FF4D00] to-[#FF6B2B] text-white max-w-[85%] rounded-tr-md"
                              : "bg-[#0F0F0E]/80 border border-[#1F1F1C]/50 text-[#E6E6E1] rounded-tl-md backdrop-blur-sm"
                          )}>
                            {message.role === "assistant" ? (
                              <div className="prose prose-sm prose-invert max-w-none 
                                prose-headings:text-[#E6E6E1] prose-headings:font-semibold 
                                prose-h1:text-lg prose-h1:mt-0 prose-h1:mb-4
                                prose-h2:text-base prose-h2:mt-4 prose-h2:mb-3 
                                prose-h3:text-sm prose-h3:mt-3 prose-h3:mb-2 
                                prose-p:text-[#B3B3B0] prose-p:leading-relaxed prose-p:my-2
                                prose-li:text-[#B3B3B0] prose-li:my-0.5 
                                prose-strong:text-[#FF4D00] prose-strong:font-semibold
                                prose-a:text-[#FF4D00] prose-a:no-underline hover:prose-a:underline 
                                prose-code:text-[#FF6B2B] prose-code:bg-[#1A1A17] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:font-normal
                                prose-pre:bg-[#1A1A17] prose-pre:border prose-pre:border-[#2A2A27]
                                prose-blockquote:border-l-[#FF4D00] prose-blockquote:text-[#8A8A87] prose-blockquote:not-italic
                                prose-hr:border-[#2A2A27]
                                prose-ul:my-2 prose-ol:my-2">
                                {message.isStreaming ? (
                                  <StreamingText 
                                    text={message.content} 
                                    onComplete={() => {
                                      setMessages(prev => prev.map(msg => 
                                        msg.id === message.id ? { ...msg, isStreaming: false } : msg
                                      ));
                                    }}
                                  />
                                ) : (
                                  <ReactMarkdown>{message.content}</ReactMarkdown>
                                )}
                              </div>
                            ) : (
                              <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                            )}
                          </div>

                          {/* Actions for assistant messages */}
                          {message.role === "assistant" && !message.isStreaming && (
                            <div className="flex items-center gap-0.5 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => copyToClipboard(message.content, message.id)}
                                className="p-1.5 text-[#6B6B68] hover:text-[#E6E6E1] hover:bg-[#1A1A17] rounded-md transition-colors"
                                title="Copy"
                              >
                                {copiedId === message.id ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                              <button
                                onClick={regenerateResponse}
                                className="p-1.5 text-[#6B6B68] hover:text-[#E6E6E1] hover:bg-[#1A1A17] rounded-md transition-colors"
                                title="Regenerate"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleFeedback(message.id, "positive")}
                                className={cn(
                                  "p-1.5 rounded-md transition-colors",
                                  message.feedback === "positive"
                                    ? "text-emerald-500 bg-emerald-500/10"
                                    : "text-[#6B6B68] hover:text-[#E6E6E1] hover:bg-[#1A1A17]"
                                )}
                                title="Good response"
                              >
                                <ThumbsUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleFeedback(message.id, "negative")}
                                className={cn(
                                  "p-1.5 rounded-md transition-colors",
                                  message.feedback === "negative"
                                    ? "text-red-500 bg-red-500/10"
                                    : "text-[#6B6B68] hover:text-[#E6E6E1] hover:bg-[#1A1A17]"
                                )}
                                title="Bad response"
                              >
                                <ThumbsDown className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF4D00] to-[#FF6B2B] flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-[#0F0F0E]/80 border border-[#1F1F1C]/50 rounded-2xl rounded-tl-md px-4 py-4 backdrop-blur-sm">
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 text-[#FF4D00] animate-spin" />
                          <span className="text-sm text-[#6B6B68]">Thinking...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Error message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-center"
                    >
                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2 text-red-400 text-sm">
                        {error}
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Scroll to bottom button */}
            <AnimatePresence>
              {showScrollButton && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  onClick={scrollToBottom}
                  className="absolute bottom-28 left-1/2 -translate-x-1/2 p-2 bg-[#1A1A17] hover:bg-[#2A2A27] text-[#E6E6E1] rounded-full shadow-lg border border-[#2A2A27] transition-colors"
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Input Area */}
            <div className="relative p-4 border-t border-[#1F1F1C]/50 bg-[#0A0A09]/80 backdrop-blur-xl">
              <div className="relative flex items-end gap-2 bg-[#0F0F0E] border border-[#1F1F1C]/50 focus-within:border-[#FF4D00]/50 rounded-xl transition-all duration-200 overflow-hidden">
                {/* Glow effect on focus */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF4D00]/5 to-transparent opacity-0 focus-within:opacity-100 transition-opacity pointer-events-none" />
                
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything about Sreeshanth..."
                  rows={1}
                  className="relative flex-1 px-4 py-3.5 bg-transparent text-[#E6E6E1] text-sm placeholder:text-[#6B6B68] focus:outline-none resize-none max-h-[150px]"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#2A2A27 transparent'
                  }}
                  disabled={isTyping}
                />
                <div className="flex items-center gap-1 pr-2 pb-2">
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className={cn(
                      "relative p-2.5 rounded-lg transition-all duration-200",
                      input.trim() && !isTyping
                        ? "bg-gradient-to-br from-[#FF4D00] to-[#FF6B2B] text-white shadow-lg shadow-[#FF4D00]/30 hover:shadow-xl hover:shadow-[#FF4D00]/40 hover:scale-105"
                        : "bg-[#1A1A17] text-[#6B6B68] cursor-not-allowed"
                    )}
                  >
                    {isTyping ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <p className="text-center text-[10px] text-[#4A4A47] mt-3 flex items-center justify-center gap-1.5">
                <Zap className="w-3 h-3 text-[#FF4D00]" />
                Powered by Groq Llama 3.3 70B
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
