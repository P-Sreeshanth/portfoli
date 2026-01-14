"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, ArrowUpRight, Waves, Search, Brain } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Underwater Obstruction Detection",
    subtitle: "MSME Government Funded Project",
    description:
      "Built a PyTorch-based object detection pipeline for marine safety using YOLOv11, achieving 94% accuracy on 15,000+ underwater images. Implemented image enhancement techniques and classification system for marine obstructions.",
    image: "/projects/underwater.jpg",
    tags: ["YOLOv11", "Stable Diffusion", "PyTorch", "Python", "OpenCV"],
    stats: { accuracy: "94%", images: "15K+", status: "Funded" },
    links: { github: "https://github.com/P-Sreeshanth/Under-Water-Object-Detection-Using-YOLOV11", demo: "#" },
    featured: true,
    icon: Waves,
  },
  {
    id: 2,
    title: "OpStream",
    subtitle: "Open Source Intelligence Platform",
    description:
      "Full-stack platform using FastAPI and React to help developers discover beginner-friendly GitHub issues. Features GitHub GraphQL API integration with real-time metadata and Qdrant vector search for contextual code explanations.",
    image: "/projects/opstream.jpg",
    tags: ["Python", "FastAPI", "Qdrant", "React", "GraphQL"],
    stats: { type: "Full Stack", search: "Vector", api: "GraphQL" },
    links: { github: "https://github.com/P-Sreeshanth/OpStream", demo: "#" },
    featured: true,
    icon: Search,
  },
  {
    id: 3,
    title: "NEXUS",
    subtitle: "Agentic GraphRAG Platform",
    description:
      "Knowledge intelligence platform with LangGraph-powered agent for intelligent query routing and self-correcting RAG. Neo4j knowledge graph with Groq LLM achieving sub-500ms inference. Features immersive Three.js particle interface.",
    image: "/projects/nexus.jpg",
    tags: ["LangGraph", "Neo4j", "Groq", "Next.js", "Three.js"],
    stats: { inference: "<500ms", type: "Agentic", graph: "Neo4j" },
    links: { github: "https://github.com/P-Sreeshanth/Nexus", demo: "#" },
    featured: true,
    icon: Brain,
  },
];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section id="projects" className="relative py-32 bg-[#1A1A17] overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FF4D00]/5 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#FF8C00]/5 blur-[150px] rounded-full" />
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,77,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,77,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[#FF4D00] text-sm font-mono tracking-widest">01</span>
            <div className="h-px w-12 bg-gradient-to-r from-[#FF4D00] to-transparent" />
            <span className="text-[#E6E6E1]/40 text-sm tracking-widest uppercase">Featured Work</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#E6E6E1] mb-4">
                Selected{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D00] to-[#FF8C00]">
                  Projects
                </span>
              </h2>
              <p className="text-[#E6E6E1]/50 max-w-md text-lg font-light">
                A collection of projects that showcase my passion for building intelligent systems.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FF4D00]">3</div>
                <div className="text-xs text-[#E6E6E1]/40 uppercase tracking-wider">Featured</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#FF8C00]">100%</div>
                <div className="text-xs text-[#E6E6E1]/40 uppercase tracking-wider">Open Source</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Projects grid */}
        <div className="space-y-24">
          {projects.map((project, index) => {
            const Icon = project.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  isEven ? "" : "lg:grid-flow-dense"
                }`}
              >
                {/* Project image/preview */}
                <div className={`relative group ${isEven ? "" : "lg:col-start-2"}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative aspect-[16/10] bg-gradient-to-br from-[#242421] to-[#1A1A17] border border-[#FF4D00]/20 overflow-hidden rounded-xl"
                  >
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FF4D00]/10 via-transparent to-[#FF8C00]/10" />

                    {/* Icon placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="w-24 h-24 border border-[#FF4D00]/30 rounded-xl flex items-center justify-center bg-[#FF4D00]/5"
                      >
                        <Icon className="w-12 h-12 text-[#FF4D00]/50" />
                      </motion.div>
                    </div>

                    {/* Hover overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-t from-[#1A1A17]/90 to-transparent flex items-end justify-center pb-8"
                    >
                      <div className="flex gap-4">
                        <motion.a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(255, 77, 0, 0.5)" }}
                          className="p-3 bg-[#FF4D00] text-white rounded-lg"
                        >
                          <Github className="w-5 h-5" />
                        </motion.a>
                        <motion.a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(255, 140, 0, 0.5)" }}
                          className="p-3 bg-[#FF8C00] text-white rounded-lg"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </motion.a>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Project number */}
                  <div className="absolute -top-6 -left-4 text-8xl font-bold text-[#FF4D00]/10">
                    0{index + 1}
                  </div>
                </div>

                {/* Project details */}
                <div className={`${isEven ? "" : "lg:col-start-1 lg:row-start-1"}`}>
                  {/* Subtitle badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF4D00]/10 border border-[#FF4D00]/30 rounded-full mb-4">
                    <span className="w-1.5 h-1.5 bg-[#FF4D00] rounded-full animate-pulse" />
                    <span className="text-[#FF4D00] text-xs font-medium tracking-wider uppercase">
                      {project.subtitle}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl md:text-4xl font-bold text-[#E6E6E1] mt-2 mb-4 group-hover:text-[#FF4D00] transition-colors">
                    {project.title}
                    <ArrowUpRight className="inline-block w-6 h-6 ml-2 text-[#FF4D00]" />
                  </h3>

                  {/* Description */}
                  <p className="text-[#E6E6E1]/60 font-light leading-relaxed mb-6 text-lg">
                    {project.description}
                  </p>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-4 mb-6">
                    {Object.entries(project.stats).map(([key, value]) => (
                      <div key={key} className="px-4 py-2 bg-[#242421] border border-[#FF4D00]/10 rounded-lg">
                        <div className="text-xl font-bold text-[#FF4D00]">{value}</div>
                        <div className="text-[10px] text-[#E6E6E1]/40 uppercase tracking-wider">{key}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 text-xs font-medium tracking-wider bg-[#242421] border border-[#E6E6E1]/10 text-[#E6E6E1]/70 rounded-full hover:border-[#FF4D00]/30 hover:text-[#FF4D00] transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-24 text-center"
        >
          <motion.a
            href="https://github.com/P-Sreeshanth"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255, 77, 0, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#FF4D00] to-[#FF8C00] text-white font-semibold uppercase tracking-wider rounded-lg group"
          >
            <Github className="w-5 h-5" />
            <span>View All Projects on GitHub</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
