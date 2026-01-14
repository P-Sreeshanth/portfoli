// Portfolio Data - Sreeshanth Peddi
export const personalInfo = {
  name: "Sreeshanth Peddi",
  shortName: "Sreeshanth",
  title: "Full Stack Developer & ML Engineer",
  email: "peddisreeshanth18@gmail.com",
  phone: "+91-9052834976",
  location: "Hyderabad, India",
  available: true,
  
  social: {
    github: "https://github.com/P-Sreeshanth",
    linkedin: "https://linkedin.com/in/sreeshanthpeddi",
    twitter: "https://twitter.com/sreeshanthpeddi",
    email: "mailto:peddisreeshanth18@gmail.com",
  },
  
  bio: "Computer Science undergraduate with hands-on experience in full-stack development and machine learning. Built production-ready projects, AI-powered tools, and a government-funded computer vision system. Proficient in Python, AI/ML, Full Stack, and cloud technologies.",
  
  shortBio: "I craft exceptional digital experiences with modern technologies. Passionate about AI, clean code, and solving complex problems.",
};

export const education = [
  {
    institution: "VNR Vignana Jyothi Institute of Engineering and Technology",
    degree: "Bachelor of Technology",
    field: "Computer Science and Business Systems",
    location: "Hyderabad, India",
    startDate: "Nov 2022",
    endDate: "May 2026",
    grade: "CGPA: 8.05/10",
  },
];

export const experience = [
  {
    id: 1,
    company: "Interview Companion (ICMS)",
    role: "Testing and Developer Intern",
    location: "Remote",
    startDate: "Nov 2024",
    endDate: "Present",
    current: true,
    description: [
      "Developed and tested features for a web-based interview management system using JavaScript, React, and Python.",
      "Developing automated AI job application features with Python, focusing on clean code architecture and unit testing.",
    ],
    technologies: ["JavaScript", "React", "Python", "Testing", "AI Automation"],
  },
  {
    id: 2,
    company: "Koluvu Company",
    role: "Software Engineering Intern",
    location: "Hyderabad, India",
    startDate: "Mar 2024",
    endDate: "Jun 2024",
    current: false,
    description: [
      "Contributed to AI-driven interview tools involving Python backend, database optimization, and React frontend.",
      "Enhanced data parsing logic, improving system reliability and reducing processing errors by 25%.",
    ],
    technologies: ["Python", "React", "Database Optimization", "AI Tools"],
  },
];

export const projects = [
  {
    id: 1,
    title: "Underwater Obstruction Detection",
    slug: "underwater-detection",
    tagline: "MSME Government Funded Project (₹15L)",
    description: "Built a PyTorch-based object detection pipeline for marine safety using YOLOv11, achieving 94% accuracy on 15,000+ underwater images.",
    longDescription: `A comprehensive computer vision system for underwater object detection designed for marine safety applications.

Key Features:
• Built a PyTorch-based object detection pipeline using YOLOv11 architecture
• Achieved 94% accuracy on 15,000+ underwater images
• Implemented image enhancement techniques for low-visibility underwater conditions
• Developed classification system to categorize marine obstructions
• Received ₹15L MSME government funding for the project`,
    image: "/projects/underwater-detection.jpg",
    technologies: ["YOLOv11", "PyTorch", "Stable Diffusion", "OpenCV", "Python", "Computer Vision"],
    category: "AI/ML",
    featured: true,
    github: "https://github.com/P-Sreeshanth/Under-Water-Object-Detection-Using-YOLOV11",
    live: null,
    metrics: [
      { label: "Accuracy", value: "94%" },
      { label: "Images Trained", value: "15,000+" },
      { label: "Funding", value: "₹15L" },
    ],
  },
  {
    id: 2,
    title: "OpStream - OSINT Platform",
    slug: "opstream",
    tagline: "Open Source Intelligence Platform",
    description: "Full-stack platform using FastAPI and React to help developers discover beginner-friendly GitHub issues with vector search capabilities.",
    longDescription: `An Open Source Intelligence Platform designed to help developers discover and contribute to open source projects.

Key Features:
• Built full-stack platform using FastAPI backend and React frontend
• Integrated GitHub GraphQL API for real-time repository indexing
• Implemented vector search using Qdrant for contextual code explanations
• Real-time metadata updates and documentation retrieval
• Helps developers find beginner-friendly GitHub issues`,
    image: "/projects/opstream.jpg",
    technologies: ["Python", "FastAPI", "React", "Qdrant", "GitHub GraphQL API", "Vector Search"],
    category: "Full Stack",
    featured: true,
    github: "https://github.com/P-Sreeshanth/OpStream",
    live: null,
    metrics: [
      { label: "Search Speed", value: "<100ms" },
      { label: "Repos Indexed", value: "1000+" },
    ],
  },
  {
    id: 3,
    title: "NEXUS - Agentic GraphRAG",
    slug: "nexus",
    tagline: "Knowledge Intelligence Platform",
    description: "Knowledge intelligence platform with LangGraph-powered agent for intelligent query routing and self-correcting RAG with sub-500ms inference.",
    longDescription: `A cutting-edge knowledge intelligence platform leveraging graph-based RAG for advanced information retrieval.

Key Features:
• Built with LangGraph-powered agent for intelligent query routing
• Self-correcting RAG system for accurate responses
• Neo4j knowledge graph for relationship-aware retrieval
• Groq LLM integration achieving sub-500ms inference
• Immersive Three.js particle interface
• Real-time agent transparency showing reasoning steps`,
    image: "/projects/nexus.jpg",
    technologies: ["LangGraph", "Neo4j", "Groq", "Next.js", "Three.js", "RAG", "LLM"],
    category: "AI/ML",
    featured: true,
    github: "https://github.com/P-Sreeshanth/Nexus",
    live: null,
    metrics: [
      { label: "Inference", value: "<500ms" },
      { label: "Accuracy", value: "95%" },
    ],
  },
];

export const skills = {
  languages: [
    { name: "Python", level: 95 },
    { name: "JavaScript", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "C", level: 75 },
    { name: "SQL", level: 85 },
  ],
  frontend: [
    { name: "React.js", level: 92 },
    { name: "Next.js", level: 88 },
    { name: "Tailwind CSS", level: 90 },
    { name: "Three.js", level: 75 },
  ],
  backend: [
    { name: "Node.js", level: 85 },
    { name: "FastAPI", level: 88 },
    { name: "Firebase", level: 80 },
    { name: "REST APIs", level: 90 },
    { name: "Supabase", level: 82 },
  ],
  aiml: [
    { name: "PyTorch", level: 85 },
    { name: "TensorFlow", level: 78 },
    { name: "OpenCV", level: 82 },
    { name: "LLMs", level: 88 },
    { name: "Computer Vision", level: 85 },
    { name: "LangChain", level: 80 },
  ],
  tools: [
    { name: "Git", level: 92 },
    { name: "Docker", level: 78 },
    { name: "Kubernetes", level: 70 },
    { name: "PostgreSQL", level: 85 },
    { name: "AWS", level: 75 },
    { name: "Neo4j", level: 75 },
  ],
};

export const certifications = [
  {
    name: "AWS Cloud Practitioner Certificate",
    issuer: "Amazon Web Services",
    date: "2024",
  },
  {
    name: "Microsoft AI Product Manager Professional Certificate",
    issuer: "Microsoft",
    date: "2024",
  },
];

export const achievements = [
  {
    title: "MSME Government Funding",
    description: "Received ₹15L funding for Underwater Obstruction Detection project",
    icon: "trophy",
  },
  {
    title: "Mr. VNR 2024 Winner",
    description: "Won the prestigious Mr. VNR modeling competition",
    icon: "award",
  },
  {
    title: "Mr. SNIST 2024 Winner",
    description: "Won the Mr. SNIST modeling competition",
    icon: "award",
  },
  {
    title: "TEDxVNRVJIET Organizer Head",
    description: "Led event planning and coordinated 20+ volunteers",
    icon: "users",
  },
  {
    title: "NMMS Scholar",
    description: "Government scholarship recipient for academic excellence",
    icon: "graduation",
  },
  {
    title: "State Level Sports",
    description: "Represented at state-level competitions in athletics",
    icon: "medal",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Tech Lead",
    role: "Koluvu Company",
    content: "Sreeshanth demonstrated exceptional problem-solving skills and quickly adapted to our tech stack. His contributions to our AI-driven interview tools significantly improved system reliability.",
    avatar: "/testimonials/avatar1.jpg",
  },
  {
    id: 2,
    name: "Project Mentor",
    role: "MSME Project",
    content: "The underwater detection system Sreeshanth built exceeded our expectations. His expertise in computer vision and dedication to the project helped us secure government funding.",
    avatar: "/testimonials/avatar2.jpg",
  },
  {
    id: 3,
    name: "Team Lead",
    role: "ICMS",
    content: "Working with Sreeshanth has been a pleasure. His attention to detail in testing and development has greatly improved our product quality.",
    avatar: "/testimonials/avatar3.jpg",
  },
];

// Knowledge base for AI chatbot
export const knowledgeBase = [
  {
    id: "about-intro",
    content: `Sreeshanth Peddi is a Computer Science undergraduate at VNR Vignana Jyothi Institute of Engineering and Technology, graduating in May 2026 with a CGPA of 8.05/10. He has hands-on experience in full-stack development and machine learning, having built production-ready projects, AI-powered tools, and a government-funded computer vision system worth ₹15 Lakhs. He is based in Hyderabad, India and is proficient in Python, AI/ML, Full Stack Development, and cloud technologies.`,
    type: "about",
    tags: ["introduction", "background", "education"],
  },
  {
    id: "skills-overview",
    content: `Sreeshanth's technical skills include:
    - Languages: Python (expert), JavaScript (advanced), TypeScript, C, SQL
    - Frontend: React.js, Next.js, Tailwind CSS, Three.js, Responsive Web Design
    - Backend: Node.js, FastAPI, Firebase, REST APIs, Supabase
    - AI/ML: LLMs, PyTorch, TensorFlow, OpenCV, Computer Vision, LangChain, RAG
    - Tools: Git, GitHub, Docker, Kubernetes, PostgreSQL, AWS, Neo4j
    
    He also holds AWS Cloud Practitioner and Microsoft AI Product Manager certifications.`,
    type: "skills",
    tags: ["skills", "technologies", "programming", "certifications"],
  },
  {
    id: "experience-icms",
    content: `Current Role: Testing and Developer Intern at Interview Companion (ICMS) from November 2024 to Present.
    - Develops and tests features for a web-based interview management system using JavaScript, React, and Python
    - Building automated AI job application features with Python, focusing on clean code architecture and unit testing`,
    type: "experience",
    tags: ["work", "internship", "current", "ICMS"],
  },
  {
    id: "experience-koluvu",
    content: `Previous Role: Software Engineering Intern at Koluvu Company from March 2024 to June 2024.
    - Contributed to AI-driven interview tools involving Python backend, database optimization, and React frontend
    - Enhanced data parsing logic, improving system reliability and reducing processing errors by 25%`,
    type: "experience",
    tags: ["work", "internship", "Koluvu"],
  },
  {
    id: "project-underwater",
    content: `Underwater Obstruction Detection (MSME Government Funded - ₹15 Lakhs):
    - Built a PyTorch-based object detection pipeline for marine safety using YOLOv11
    - Achieved 94% accuracy on 15,000+ underwater images
    - Implemented image enhancement techniques for low-visibility underwater conditions
    - Developed classification system to categorize marine obstructions
    - Technologies: YOLOv11, Stable Diffusion, PyTorch, OpenCV, Python
    - GitHub: github.com/P-Sreeshanth/Under-Water-Object-Detection-Using-YOLOV11`,
    type: "project",
    tags: ["project", "AI", "computer vision", "government funded", "YOLOv11"],
  },
  {
    id: "project-opstream",
    content: `OpStream - Open Source Intelligence Platform:
    - Full-stack platform using FastAPI and React to help developers discover beginner-friendly GitHub issues
    - Integrated GitHub GraphQL API to index and search across repositories with real-time metadata updates
    - Implemented vector search using Qdrant for contextual code explanations and documentation retrieval
    - Technologies: Python, FastAPI, Qdrant, React, GitHub GraphQL API
    - GitHub: github.com/P-Sreeshanth/OpStream`,
    type: "project",
    tags: ["project", "full-stack", "open source", "FastAPI", "React"],
  },
  {
    id: "project-nexus",
    content: `NEXUS - Agentic GraphRAG Platform:
    - Knowledge intelligence platform with LangGraph-powered agent for intelligent query routing and self-correcting RAG
    - Integrated Neo4j knowledge graph for relationship-aware retrieval with Groq LLM achieving sub-500ms inference
    - Developed immersive Three.js particle interface with real-time agent transparency showing reasoning steps
    - Technologies: LangGraph, Neo4j, Groq, Next.js, Three.js
    - GitHub: github.com/P-Sreeshanth/Nexus`,
    type: "project",
    tags: ["project", "AI", "RAG", "LangGraph", "Neo4j", "Next.js"],
  },
  {
    id: "achievements",
    content: `Sreeshanth's achievements include:
    - MSME Government Funding of ₹15 Lakhs for Underwater Detection project
    - Mr. VNR 2024 (Winner) - College modeling competition
    - Mr. SNIST 2024 (Winner) - Inter-college modeling competition
    - Lulu Mall 2025 (Runner-up) - Professional modeling competition
    - TEDxVNRVJIET Event Organizer Head - Led event planning and coordinated 20+ volunteers
    - NMMS Scholar - Government scholarship for academic excellence
    - State Level Sports Certificate - Represented at state-level athletics competitions`,
    type: "achievements",
    tags: ["achievements", "awards", "extracurricular"],
  },
  {
    id: "contact",
    content: `Contact Information for Sreeshanth Peddi:
    - Email: peddisreeshanth18@gmail.com
    - Phone: +91-9052834976
    - LinkedIn: linkedin.com/in/sreeshanthpeddi
    - GitHub: github.com/P-Sreeshanth
    - Location: Hyderabad, India
    - Availability: Currently available for full-time opportunities and freelance projects`,
    type: "contact",
    tags: ["contact", "email", "phone", "social", "availability"],
  },
];
