"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Cpu, Globe, Server, Brain, Cloud } from "lucide-react";

const skillCategories = [
  {
    name: "Languages",
    icon: Cpu,
    color: "#FF4D00",
    skills: [
      { name: "Python", level: 95 },
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Java", level: 80 },
      { name: "C/C++", level: 75 },
      { name: "SQL", level: 85 },
    ],
  },
  {
    name: "Frontend",
    icon: Globe,
    color: "#FF8C00",
    skills: [
      { name: "React", level: 92 },
      { name: "Next.js", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Framer Motion", level: 85 },
      { name: "Redux", level: 80 },
    ],
  },
  {
    name: "Backend",
    icon: Server,
    color: "#FF4D00",
    skills: [
      { name: "FastAPI", level: 90 },
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 82 },
      { name: "Django", level: 78 },
      { name: "REST APIs", level: 92 },
    ],
  },
  {
    name: "AI/ML",
    icon: Brain,
    color: "#FF8C00",
    skills: [
      { name: "PyTorch", level: 88 },
      { name: "TensorFlow", level: 82 },
      { name: "OpenCV", level: 90 },
      { name: "Hugging Face", level: 85 },
      { name: "LangChain", level: 88 },
    ],
  },
  {
    name: "Tools & Cloud",
    icon: Cloud,
    color: "#FF4D00",
    skills: [
      { name: "Docker", level: 85 },
      { name: "Git", level: 92 },
      { name: "AWS", level: 78 },
      { name: "PostgreSQL", level: 85 },
      { name: "MongoDB", level: 80 },
    ],
  },
];

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState(0);

  const currentCategory = skillCategories[activeCategory];
  const Icon = currentCategory.icon;

  return (
    <section id="skills" className="relative py-32 bg-[#151513] overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#FF4D00]/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[#FF8C00]/5 blur-[150px] rounded-full" />
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,77,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,77,0,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[#FF4D00] text-sm font-mono tracking-widest">02</span>
            <div className="h-px w-12 bg-gradient-to-r from-[#FF4D00] to-transparent" />
            <span className="text-[#E6E6E1]/40 text-sm tracking-widest uppercase">Technical Arsenal</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#E6E6E1] mb-4">
                Skills &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D00] to-[#FF8C00]">
                  Expertise
                </span>
              </h2>
              <p className="text-[#E6E6E1]/50 max-w-md text-lg font-light">
                A comprehensive toolkit built through years of hands-on experience.
              </p>
            </div>

            {/* Power level indicator */}
            <div className="flex items-center gap-4 p-4 bg-[#242421] border border-[#FF4D00]/20 rounded-lg">
              <div className="relative w-16 h-16">
                <svg className="w-16 h-16 -rotate-90">
                  <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,77,0,0.1)" strokeWidth="4" />
                  <motion.circle
                    cx="32" cy="32" r="28" fill="none" stroke="url(#skillGradient)" strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={175}
                    initial={{ strokeDashoffset: 175 }}
                    animate={isInView ? { strokeDashoffset: 25 } : {}}
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                  <defs>
                    <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FF4D00" />
                      <stop offset="100%" stopColor="#FF8C00" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-[#FF4D00]">85%</span>
                </div>
              </div>
              <div>
                <div className="text-xs text-[#E6E6E1]/40 uppercase tracking-wider">Overall</div>
                <div className="text-xl font-bold text-[#E6E6E1]">Proficiency</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Category selector - Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-4"
          >
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
              {skillCategories.map((category, index) => {
                const CategoryIcon = category.icon;
                return (
                  <motion.button
                    key={category.name}
                    onClick={() => setActiveCategory(index)}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className={`relative px-5 py-4 text-left whitespace-nowrap transition-all rounded-xl border ${
                      activeCategory === index
                        ? "bg-gradient-to-r from-[#FF4D00]/20 to-[#FF8C00]/10 border-[#FF4D00]/50 text-[#E6E6E1]"
                        : "bg-[#242421] border-[#E6E6E1]/10 text-[#E6E6E1]/50 hover:text-[#E6E6E1] hover:border-[#FF4D00]/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CategoryIcon className="w-5 h-5" style={{ color: category.color }} />
                      <div>
                        <div className="text-sm font-medium tracking-wider">{category.name}</div>
                      </div>
                    </div>
                    {activeCategory === index && (
                      <motion.div
                        layoutId="skill-indicator"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-[#FF4D00] to-[#FF8C00] rounded-full"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Skills display - Right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-8"
          >
            {/* Category header */}
            <div className="mb-6 p-4 bg-[#242421] border border-[#FF4D00]/20 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${currentCategory.color}20`, border: `1px solid ${currentCategory.color}40` }}>
                  <Icon className="w-6 h-6" style={{ color: currentCategory.color }} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#E6E6E1]">{currentCategory.name} Proficiency</h3>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {currentCategory.skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group p-4 bg-[#242421] border border-[#E6E6E1]/10 rounded-xl hover:border-[#FF4D00]/30 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#E6E6E1] font-medium tracking-wide group-hover:text-[#FF4D00] transition-colors">
                      {skill.name}
                    </span>
                    <span className="text-[#E6E6E1]/80 text-sm font-bold">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-[#1A1A17] rounded-full overflow-hidden border border-[#E6E6E1]/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${currentCategory.color}, ${currentCategory.color}80)`,
                        boxShadow: `0 0 20px ${currentCategory.color}40`
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 p-6 bg-gradient-to-r from-[#FF4D00]/10 to-[#FF8C00]/5 border border-[#FF4D00]/20 rounded-xl"
            >
              <p className="text-[#E6E6E1]/60 text-sm leading-relaxed">
                <span className="text-[#FF4D00] font-semibold">Constantly evolving.</span> Currently exploring advanced LLM applications, 
                edge computing, and agentic AI frameworks. Always learning, always building.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
