import { NextRequest, NextResponse } from "next/server";

// Complete portfolio knowledge for RAG
const portfolioContext = `
# SREESHANTH PEDDI - Complete Portfolio Knowledge Base

## Personal Information
- **Full Name**: Sreeshanth Peddi
- **Title**: Full Stack Developer & ML Engineer
- **Email**: peddisreeshanth18@gmail.com
- **Phone**: +91-9052834976
- **Location**: Hyderabad, India
- **GitHub**: github.com/P-Sreeshanth
- **LinkedIn**: linkedin.com/in/sreeshanthpeddi
- **Availability**: Open for full-time positions, internships, and freelance projects
- **Expected Graduation**: May 2026

## Professional Summary
Sreeshanth Peddi is a Computer Science undergraduate at VNR Vignana Jyothi Institute of Engineering and Technology (VNR VJIET), Hyderabad. He has hands-on experience in full-stack development and machine learning, having built production-ready projects, AI-powered tools, and a government-funded computer vision system worth ₹15 Lakhs. He is proficient in Python, AI/ML, Full Stack Development, and cloud technologies.

## Education
- **Degree**: Bachelor of Technology (B.Tech) in Computer Science and Business Systems
- **Institution**: VNR Vignana Jyothi Institute of Engineering and Technology (VNR VJIET)
- **Location**: Hyderabad, India
- **Duration**: November 2022 - May 2026
- **Grade**: CGPA 8.05/10

## Technical Skills

### Programming Languages
- Python (Expert - 95%)
- JavaScript (Advanced - 90%)
- TypeScript (Advanced - 85%)
- C (Intermediate - 75%)
- SQL (Advanced - 85%)

### Frontend Development
- React.js (Expert - 92%)
- Next.js (Advanced - 88%)
- Tailwind CSS (Expert - 90%)
- Three.js (Intermediate - 75%)
- Responsive Web Design
- Motion/Animation libraries (Framer Motion)

### Backend Development
- Node.js (Advanced - 85%)
- FastAPI (Advanced - 88%)
- Firebase (Advanced - 80%)
- REST APIs (Expert - 90%)
- Supabase (Advanced - 82%)
- Django, GraphQL

### AI/ML & Data Science
- PyTorch (Advanced - 85%)
- TensorFlow (Intermediate - 78%)
- OpenCV (Advanced - 82%)
- Large Language Models/LLMs (Advanced - 88%)
- Computer Vision (Advanced - 85%)
- LangChain (Advanced - 80%)
- RAG (Retrieval Augmented Generation)
- YOLOv11

### DevOps & Tools
- Git/GitHub (Expert - 92%)
- Docker (Intermediate - 78%)
- Kubernetes (Intermediate - 70%)
- PostgreSQL (Advanced - 85%)
- AWS (Intermediate - 75%, Certified)
- Neo4j (Intermediate - 75%)
- CI/CD pipelines

## Work Experience

### 1. Testing and Developer Intern
**Company**: Interview Companion (ICMS)
**Location**: Remote
**Duration**: November 2024 - Present (Currently Working)
**Responsibilities**:
- Developing and testing features for a web-based interview management system using JavaScript, React, and Python
- Building automated AI job application features with Python, focusing on clean code architecture and unit testing
- Technologies: JavaScript, React, Python, Testing, AI Automation

### 2. Software Engineering Intern
**Company**: Koluvu Company
**Location**: Hyderabad, India
**Duration**: March 2024 - June 2024
**Responsibilities**:
- Contributed to AI-driven interview tools involving Python backend, database optimization, and React frontend
- Enhanced data parsing logic, improving system reliability and reducing processing errors by 25%
- Technologies: Python, React, Database Optimization, AI Tools

## Projects

### 1. Underwater Obstruction Detection (FEATURED - Government Funded)
**Funding**: ₹15 Lakhs from MSME Government
**Category**: AI/ML, Computer Vision
**Description**: A comprehensive computer vision system for underwater object detection designed for marine safety applications.
**Key Features**:
- Built a PyTorch-based object detection pipeline using YOLOv11 architecture
- Achieved 94% accuracy on 15,000+ underwater images
- Implemented image enhancement techniques for low-visibility underwater conditions
- Used Stable Diffusion for synthetic data augmentation
- Developed classification system to categorize marine obstructions
**Technologies**: YOLOv11, PyTorch, Stable Diffusion, OpenCV, Python, Computer Vision
**GitHub**: https://github.com/P-Sreeshanth/Under-Water-Object-Detection-Using-YOLOV11
**Metrics**: 94% Accuracy, 15,000+ images trained, ₹15L funding

### 2. OpStream - OSINT Platform (FEATURED)
**Category**: Full Stack, Open Source
**Tagline**: Open Source Intelligence Platform
**Description**: An Open Source Intelligence Platform designed to help developers discover and contribute to open source projects.
**Key Features**:
- Built full-stack platform using FastAPI backend and React frontend
- Integrated GitHub GraphQL API for real-time repository indexing
- Implemented vector search using Qdrant for contextual code explanations
- Real-time metadata updates and documentation retrieval
- Helps developers find beginner-friendly GitHub issues
**Technologies**: Python, FastAPI, React, Qdrant, GitHub GraphQL API, Vector Search
**GitHub**: https://github.com/P-Sreeshanth/OpStream
**Metrics**: <100ms search speed, 1000+ repos indexed

### 3. NEXUS - Agentic GraphRAG (FEATURED)
**Category**: AI/ML, Knowledge Intelligence
**Tagline**: Knowledge Intelligence Platform
**Description**: A cutting-edge knowledge intelligence platform leveraging graph-based RAG for advanced information retrieval.
**Key Features**:
- Built with LangGraph-powered agent for intelligent query routing
- Self-correcting RAG system for accurate responses
- Neo4j knowledge graph for relationship-aware retrieval
- Groq LLM integration achieving sub-500ms inference
- Immersive Three.js particle interface
- Real-time agent transparency showing reasoning steps
**Technologies**: LangGraph, Neo4j, Groq, Next.js, Three.js, RAG, LLM
**GitHub**: https://github.com/P-Sreeshanth/Nexus
**Metrics**: <500ms inference, 95% accuracy

## Certifications
1. **AWS Certified Cloud Practitioner** - Amazon Web Services (2024)
2. **Microsoft AI Product Manager Professional Certificate** - Microsoft (2024)

## Achievements & Awards
1. **MSME Government Funding** - Received ₹15 Lakhs funding for Underwater Obstruction Detection project
2. **Mr. VNR 2024 Winner** - Won the prestigious Mr. VNR modeling competition
3. **Mr. SNIST 2024 Winner** - Won the Mr. SNIST modeling competition
4. **Lulu Mall 2025 Runner-up** - Professional modeling competition
5. **TEDxVNRVJIET Organizer Head** - Led event planning and coordinated 20+ volunteers
6. **NMMS Scholar** - Government scholarship recipient for academic excellence
7. **State Level Sports Certificate** - Represented at state-level competitions in athletics

## Interests & Hobbies
- Building AI-powered applications
- Contributing to open source
- Modeling and competitions
- Athletics and sports
- Event organization

## What Makes Sreeshanth Unique
1. **Government-Funded Project**: One of the few students to receive ₹15L MSME funding for a computer vision project
2. **Multi-talented**: Combines technical excellence with extracurricular achievements (modeling, sports, event management)
3. **Practical Experience**: Has real internship experience at multiple companies
4. **Modern Tech Stack**: Proficient in cutting-edge technologies like LangGraph, RAG, Neo4j, and LLMs
5. **AWS Certified**: Holds AWS Cloud Practitioner certification
6. **Leadership**: Led TEDx event as Organizer Head

## Contact & Hiring
- **Email**: peddisreeshanth18@gmail.com
- **Phone**: +91-9052834976
- **LinkedIn**: https://linkedin.com/in/sreeshanthpeddi
- **GitHub**: https://github.com/P-Sreeshanth
- **Location**: Hyderabad, India
- **Status**: Available for opportunities
- **Open to**: Full-time positions, Internships, Freelance projects, Consulting, Open source collaborations
`;

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 30;
const WINDOW_MS = 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "anonymous";
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please wait a moment before sending more messages." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { message, conversationHistory = [] } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Invalid message format" },
        { status: 400 }
      );
    }

    const groqApiKey = process.env.GROQ_API_KEY;
    
    if (!groqApiKey) {
      return NextResponse.json(
        { error: "API key not configured. Please add GROQ_API_KEY to environment variables." },
        { status: 500 }
      );
    }

    // Build conversation messages for Groq
    const systemPrompt = `You are Sreeshanth's AI Portfolio Assistant - a chill, helpful assistant that answers questions about Sreeshanth Peddi.

IMPORTANT INSTRUCTIONS:
1. Keep responses SHORT and CASUAL - no hype, no over-explaining
2. Don't oversell or exaggerate achievements - just state facts simply
3. Be direct and to the point - no marketing language
4. If this is the start of a conversation (first message like "hi", "hello", "hey"), ALWAYS ask who they are first (recruiter, student, developer, etc.) before giving info
5. Use simple language, avoid corporate speak
6. Answer only what's asked - don't dump all information at once
7. You ONLY know about Sreeshanth from the context below
8. If asked something not in portfolio, just say you don't have that info
9. Use markdown formatting sparingly - keep it readable
10. When linking GitHub repos, use markdown format: [repo](url)

PORTFOLIO CONTEXT:
${portfolioContext}

Remember: Be helpful but chill. No need to impress - just be genuine and direct.`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory.slice(-10).map((msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content
      })),
      { role: "user", content: message }
    ];

    // Call Groq API
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${groqApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages,
        temperature: 0.7,
        max_tokens: 1024,
        top_p: 0.9,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Groq API error:", errorData);
      return NextResponse.json(
        { error: "Failed to generate response. Please try again." },
        { status: 500 }
      );
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try again.";

    return NextResponse.json({
      response: assistantMessage,
      model: "llama-3.3-70b-versatile",
    });

  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "Portfolio AI Chat API is running",
    model: "Groq Llama 3.3 70B",
    features: ["RAG-based responses", "Conversation history", "Rate limiting"],
  });
}
