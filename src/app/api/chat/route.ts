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
- Python (Expert) - Primary language for AI/ML and backend
- JavaScript/TypeScript (Advanced) - Full-stack web development
- C (Intermediate) - Systems programming
- SQL (Advanced) - Database management

### Frontend Technologies
- React.js - Component-based UI development
- Next.js - Server-side rendering and static generation
- Tailwind CSS - Utility-first styling
- Three.js - 3D graphics and animations
- Framer Motion - Animations

### Backend Technologies
- Node.js - Server-side JavaScript
- FastAPI - High-performance Python APIs
- Firebase - Backend as a service
- Supabase - Open source Firebase alternative
- REST APIs - API design and development

### AI/ML Technologies
- PyTorch - Deep learning framework
- TensorFlow - Machine learning
- OpenCV - Computer vision
- LLMs - Large Language Models
- RAG - Retrieval Augmented Generation
- LangChain/LangGraph - LLM orchestration
- Computer Vision - Image processing and detection

### DevOps & Tools
- Git/GitHub - Version control
- Docker - Containerization
- Kubernetes - Container orchestration
- AWS - Cloud services
- PostgreSQL - Relational database
- Neo4j - Graph database
- Qdrant - Vector database

## Work Experience

### Testing and Developer Intern - Interview Companion (ICMS)
- **Duration**: November 2024 - Present
- **Location**: Remote
- Developing and testing features for a web-based interview management system using JavaScript, React, and Python
- Building automated AI job application features with Python, focusing on clean code architecture and unit testing

### Software Engineering Intern - Koluvu Company
- **Duration**: March 2024 - June 2024
- **Location**: Hyderabad, India
- Contributed to AI-driven interview tools involving Python backend, database optimization, and React frontend
- Enhanced data parsing logic, improving system reliability and reducing processing errors by 25%

## Projects

### 1. Underwater Obstruction Detection (MSME Government Funded - ₹15 Lakhs)
- Built a PyTorch-based object detection pipeline using YOLOv11 architecture
- Achieved 94% accuracy on 15,000+ underwater images
- Implemented image enhancement techniques for low-visibility underwater conditions
- Developed classification system to categorize marine obstructions
- Technologies: YOLOv11, Stable Diffusion, PyTorch, OpenCV, Python
- GitHub: github.com/P-Sreeshanth/Under-Water-Object-Detection-Using-YOLOV11

### 2. OpStream - Open Source Intelligence Platform
- Full-stack platform using FastAPI and React to help developers discover beginner-friendly GitHub issues
- Integrated GitHub GraphQL API to index and search across repositories with real-time metadata updates
- Implemented vector search using Qdrant for contextual code explanations and documentation retrieval
- Technologies: Python, FastAPI, Qdrant, React, GitHub GraphQL API
- GitHub: github.com/P-Sreeshanth/OpStream

### 3. NEXUS - Agentic GraphRAG Platform
- Knowledge intelligence platform with LangGraph-powered agent for intelligent query routing and self-correcting RAG
- Integrated Neo4j knowledge graph for relationship-aware retrieval with Groq LLM achieving sub-500ms inference
- Developed immersive Three.js particle interface with real-time agent transparency showing reasoning steps
- Technologies: LangGraph, Neo4j, Groq, Next.js, Three.js
- GitHub: github.com/P-Sreeshanth/Nexus

## Certifications
- AWS Cloud Practitioner Certificate (2024)
- Microsoft AI Product Manager Professional Certificate (2024)

## Achievements
- MSME Government Funding of ₹15 Lakhs for Underwater Detection project
- Mr. VNR 2024 (Winner) - College modeling competition
- Mr. SNIST 2024 (Winner) - Inter-college modeling competition
- TEDxVNRVJIET Event Organizer Head - Led event planning and coordinated 20+ volunteers
- NMMS Scholar - Government scholarship for academic excellence
- State Level Sports Certificate - Represented at state-level athletics competitions

## Contact Information
- Email: peddisreeshanth18@gmail.com
- Phone: +91-9052834976
- LinkedIn: linkedin.com/in/sreeshanthpeddi
- GitHub: github.com/P-Sreeshanth
- Location: Hyderabad, India
- Status: Available for opportunities
`;

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `You are Sreeshanth's AI portfolio assistant. You help visitors learn about Sreeshanth Peddi's skills, experience, projects, and achievements.

Use the following knowledge base to answer questions accurately and helpfully:

${portfolioContext}

Guidelines:
- Be friendly, professional, and concise
- Always provide accurate information from the knowledge base
- If asked about something not in the knowledge base, politely say you don't have that information
- Encourage visitors to contact Sreeshanth for more details
- Use markdown formatting for better readability
- Keep responses focused and relevant`,
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Groq API error:", error);
      return NextResponse.json(
        { error: "Failed to get response from AI" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";

    return NextResponse.json({ response: reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
