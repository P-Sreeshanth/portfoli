"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Calendar, MapPin, Briefcase, Award, ExternalLink } from "lucide-react";

const experiences = [
  {
    id: 1,
    role: "Testing & Developer Intern",
    company: "Interview Companion (ICMS)",
    location: "Hyderabad",
    period: "Nov 2024 - Feb 2026",
    description: [
      "Developed and tested features for a web-based interview management system using JavaScript, React, and Python",
      "Developing automated AI job application features with Python, focusing on clean code architecture and unit testing",
    ],
    technologies: ["JavaScript", "React", "Python", "Testing", "AI Automation"],
    current: true,
  },
  {
    id: 2,
    role: "Software Engineering Intern",
    company: "Koluvu",
    location: "Remote",
    period: "Mar 2024 - Jun 2024",
    description: [
      "Contributed to AI-driven interview tools involving Python backend, database optimization, and React frontend",
      "Enhanced data parsing logic, improving system reliability and reducing processing errors by 25%",
    ],
    technologies: ["Python", "React", "Database", "AI Tools", "Data Parsing"],
    current: false,
  },
];

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="relative py-32 bg-[#1A1A17] overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#FF4D00]/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[#FF8C00]/5 blur-[150px] rounded-full" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,77,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,77,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[#FF4D00] text-sm font-mono tracking-widest">03</span>
            <div className="h-px w-12 bg-gradient-to-r from-[#FF4D00] to-transparent" />
            <span className="text-[#E6E6E1]/40 text-sm tracking-widest uppercase">Career Journey</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#E6E6E1] mb-4">
            Work{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D00] to-[#FF8C00]">
              Experience
            </span>
          </h2>
          <p className="text-[#E6E6E1]/50 max-w-md text-lg font-light">
            Professional milestones and hands-on experience in the tech industry.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#FF4D00]/50 via-[#FF4D00]/20 to-transparent hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative grid md:grid-cols-2 gap-8 ${
                  index % 2 === 0 ? "" : "md:grid-flow-dense"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 -ml-2 rounded-full bg-[#1A1A17] border-2 border-[#FF4D00] hidden md:block">
                  {exp.current && (
                    <span className="absolute inset-0 rounded-full bg-[#FF4D00] animate-ping opacity-50" />
                  )}
                </div>

                {/* Card */}
                <div className={`${index % 2 === 0 ? "md:pr-12" : "md:pl-12 md:col-start-2"}`}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="p-6 bg-[#242421] border border-[#E6E6E1]/10 rounded-xl hover:border-[#FF4D00]/30 transition-all"
                  >
                    {/* Current badge */}
                    {exp.current && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF4D00]/10 border border-[#FF4D00]/30 rounded-full mb-4">
                        <span className="w-2 h-2 bg-[#FF4D00] rounded-full animate-pulse" />
                        <span className="text-xs text-[#FF4D00] font-medium">Currently Working</span>
                      </div>
                    )}

                    {/* Period */}
                    <div className="flex items-center gap-2 text-[#E6E6E1]/40 text-sm mb-3">
                      <Calendar className="w-4 h-4 text-[#FF4D00]" />
                      {exp.period}
                    </div>

                    {/* Role */}
                    <h3 className="text-xl md:text-2xl font-bold text-[#E6E6E1] mb-2">
                      {exp.role}
                    </h3>

                    {/* Company & Location */}
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className="flex items-center gap-2 text-[#FF4D00] font-medium">
                        <Building2 className="w-4 h-4" />
                        {exp.company}
                      </span>
                      <span className="flex items-center gap-2 text-[#E6E6E1]/40 text-sm">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </span>
                    </div>

                    {/* Description */}
                    <ul className="space-y-3 mb-6">
                      {exp.description.map((item, i) => (
                        <li
                          key={i}
                          className="flex gap-3 text-[#E6E6E1]/60 font-light leading-relaxed"
                        >
                          <span className="text-[#FF4D00] mt-1.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 text-xs font-medium tracking-wide bg-[#1A1A17] border border-[#E6E6E1]/10 text-[#E6E6E1]/60 rounded-lg hover:border-[#FF4D00]/30 hover:text-[#FF4D00] transition-all"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Empty space for alternating layout */}
                <div className={`hidden md:block ${index % 2 === 0 ? "" : "md:col-start-1 md:row-start-1"}`} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 p-8 bg-[#242421] border border-[#E6E6E1]/10 rounded-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-5 h-5 text-[#FF4D00]" />
            <h4 className="text-[#E6E6E1] text-lg font-semibold">Certifications & Achievements</h4>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "AWS Certified Cloud Practitioner", org: "Amazon Web Services" },
              { name: "Generative AI with LLMs", org: "DeepLearning.AI" },
              { name: "Deep Learning Specialization", org: "DeepLearning.AI" },
            ].map((cert, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 p-4 bg-[#1A1A17] border border-[#E6E6E1]/10 rounded-xl hover:border-[#FF4D00]/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#FF4D00]/10 border border-[#FF4D00]/30 flex items-center justify-center">
                  <Award className="w-5 h-5 text-[#FF4D00]" />
                </div>
                <div>
                  <div className="text-[#E6E6E1] text-sm font-medium group-hover:text-[#FF4D00] transition-colors">
                    {cert.name}
                  </div>
                  <div className="text-[#E6E6E1]/40 text-xs">{cert.org}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
