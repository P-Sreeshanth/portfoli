"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Download, MapPin, GraduationCap, Calendar, Code, Brain, Rocket } from "lucide-react";

const highlights = [
  { label: "Passion", value: "AI/ML", icon: Brain },
  { label: "CGPA", value: "8.05", icon: GraduationCap },
  { label: "Focus", value: "Full Stack", icon: Code },
  { label: "Goal", value: "Innovation", icon: Rocket },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32 bg-[#1A1A17] overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF4D00]/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FF8C00]/5 blur-[150px] rounded-full" />
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
            <span className="text-[#FF4D00] text-sm font-mono tracking-widest">04</span>
            <div className="h-px w-12 bg-gradient-to-r from-[#FF4D00] to-transparent" />
            <span className="text-[#E6E6E1]/40 text-sm tracking-widest uppercase">About Me</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#E6E6E1]">
            The Person Behind
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D00] to-[#FF8C00]">
              The Code
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column - Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Profile image placeholder */}
            <div className="relative w-32 h-32 rounded-2xl bg-gradient-to-br from-[#FF4D00]/20 to-[#FF8C00]/10 border border-[#FF4D00]/30 flex items-center justify-center">
              <span className="text-5xl">👨‍💻</span>
              <div className="absolute -bottom-2 -right-2 px-3 py-1 bg-[#FF4D00] text-[#1A1A17] text-xs font-bold rounded-full">
                Available
              </div>
            </div>

            {/* Bio paragraphs */}
            <div className="space-y-6">
              <p className="text-lg text-[#E6E6E1]/70 font-light leading-relaxed">
                I'm a <span className="text-[#FF4D00] font-medium">Computer Science student</span> at 
                VNR VJIET, Hyderabad, with a deep passion for AI/ML and Full Stack development. 
                I love building intelligent systems that solve real-world problems.
              </p>
              
              <p className="text-lg text-[#E6E6E1]/70 font-light leading-relaxed">
                My journey spans from crafting elegant <span className="text-[#FF4D00] font-medium">React interfaces</span> to 
                building robust Python backends. I'm constantly exploring new technologies and pushing the boundaries of what's possible.
              </p>

              <p className="text-lg text-[#E6E6E1]/70 font-light leading-relaxed">
                Currently diving deeper into <span className="text-[#FF4D00] font-medium">DevOps</span> and 
                cloud technologies to build more scalable and efficient systems.
              </p>
            </div>

            {/* Location & Education */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-[#242421] border border-[#E6E6E1]/10 rounded-lg text-[#E6E6E1]/60 hover:border-[#FF4D00]/30 transition-colors">
                <MapPin className="w-4 h-4 text-[#FF4D00]" />
                <span className="text-sm">Hyderabad, India</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[#242421] border border-[#E6E6E1]/10 rounded-lg text-[#E6E6E1]/60 hover:border-[#FF4D00]/30 transition-colors">
                <GraduationCap className="w-4 h-4 text-[#FF4D00]" />
                <span className="text-sm">VNR VJIET</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[#242421] border border-[#E6E6E1]/10 rounded-lg text-[#E6E6E1]/60 hover:border-[#FF4D00]/30 transition-colors">
                <Calendar className="w-4 h-4 text-[#FF4D00]" />
                <span className="text-sm">2022 - 2026</span>
              </div>
            </div>

            {/* Resume button */}
            <motion.a
              href="/resume.pdf"
              target="_blank"
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(255, 77, 0, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-[#FF4D00] to-[#FF6B00] text-[#1A1A17] font-semibold tracking-wide rounded-lg group"
            >
              <Download className="w-5 h-5 group-hover:animate-bounce" />
              <span>Download Resume</span>
            </motion.a>
          </motion.div>

          {/* Right column - Stats & Quote */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.03, y: -5 }}
                    className="p-6 bg-[#242421] border border-[#E6E6E1]/10 rounded-xl hover:border-[#FF4D00]/30 transition-all group"
                  >
                    <Icon className="w-6 h-6 text-[#FF4D00] mb-3 group-hover:scale-110 transition-transform" />
                    <div className="text-2xl md:text-3xl font-bold text-[#E6E6E1] group-hover:text-[#FF4D00] transition-colors">
                      {item.value}
                    </div>
                    <div className="text-sm text-[#E6E6E1]/40 mt-1">
                      {item.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Philosophy quote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="p-8 bg-gradient-to-br from-[#FF4D00]/10 to-[#FF8C00]/5 border border-[#FF4D00]/20 rounded-xl"
            >
              <div className="text-5xl text-[#FF4D00]/30 mb-4">"</div>
              <p className="text-xl md:text-2xl font-light text-[#E6E6E1]/80 italic leading-relaxed">
                The only limitations are the ones we put on ourselves.
              </p>
              <p className="mt-4 text-sm text-[#FF4D00] tracking-wider">— Personal Philosophy</p>
            </motion.div>

            {/* Interest areas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1 }}
              className="p-6 bg-[#242421] border border-[#E6E6E1]/10 rounded-xl"
            >
              <h4 className="text-sm text-[#E6E6E1]/40 uppercase tracking-wider mb-4">Areas of Interest</h4>
              <div className="flex flex-wrap gap-2">
                {["AI/ML", "Full Stack", "Computer Vision", "Cloud Computing", "DevOps"].map((area, i) => (
                  <motion.span
                    key={area}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 1.1 + i * 0.05 }}
                    className="px-4 py-2 text-sm bg-[#1A1A17] border border-[#E6E6E1]/10 text-[#E6E6E1]/60 rounded-lg hover:border-[#FF4D00]/30 hover:text-[#FF4D00] transition-all cursor-default"
                  >
                    {area}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
