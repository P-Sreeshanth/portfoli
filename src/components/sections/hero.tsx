"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  { href: "https://github.com/P-Sreeshanth", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com/in/sreeshanthpeddi", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:peddisreeshanth18@gmail.com", icon: Mail, label: "Email" },
];

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle canvas effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      isEmber: boolean;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 15000);
      
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.4 + 0.1,
          isEmber: Math.random() > 0.92,
        });
      }
    };

    const animate = () => {
      ctx.fillStyle = "rgba(26, 26, 23, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        if (p.isEmber) {
          ctx.fillStyle = `rgba(255, 77, 0, ${p.opacity})`;
          ctx.shadowBlur = 15;
          ctx.shadowColor = "#FF4D00";
        } else {
          ctx.fillStyle = `rgba(230, 230, 225, ${p.opacity * 0.3})`;
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connect nearby particles
        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const opacity = (1 - dist / 120) * 0.08;
            ctx.strokeStyle = (p.isEmber || p2.isEmber)
              ? `rgba(255, 77, 0, ${opacity})`
              : `rgba(230, 230, 225, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1A1A17]">
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A17] via-transparent to-[#1A1A17] z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1A1A17] to-transparent z-10" />

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-12 relative z-20">
        <div className="max-w-5xl">
          {/* Availability badge - Clickable CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <motion.button
              onClick={() => scrollToSection("contact")}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-3 px-5 py-2.5 bg-[#FF4D00]/10 border border-[#FF4D00]/40 hover:border-[#FF4D00] hover:bg-[#FF4D00]/20 text-xs tracking-[0.15em] uppercase text-[#FF4D00] transition-all duration-300 cursor-pointer"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4D00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF4D00]"></span>
              </span>
              <span>Open to Full-Time / Intern Roles</span>
              <motion.span 
                className="text-[#FF4D00]/60 group-hover:text-[#FF4D00] group-hover:translate-x-1 transition-all"
              >
                → Contact
              </motion.span>
            </motion.button>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-extralight text-[#E6E6E1] leading-[0.9] tracking-tight">
              <motion.span
                initial={{ opacity: 0, x: -100, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 100 }}
                className="block relative"
              >
                <span className="relative inline-block hover:animate-pulse cursor-default">
                  {"Sreeshanth".split("").map((letter, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 + i * 0.05 }}
                      whileHover={{ color: "#FF4D00", scale: 1.2, y: -10 }}
                      className="inline-block transition-colors duration-200"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 100, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.7, type: "spring", stiffness: 100 }}
                className="block text-[#FF4D00] relative"
                style={{ textShadow: "0 0 60px rgba(255, 77, 0, 0.5)" }}
              >
                <span className="relative inline-block">
                  {"Peddi".split("").map((letter, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.9 + i * 0.05 }}
                      whileHover={{ color: "#FFFFFF", scale: 1.2, y: -10, textShadow: "0 0 20px #FF4D00" }}
                      className="inline-block transition-all duration-200"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
                <motion.span 
                  className="text-[#E6E6E1]/20"
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >.</motion.span>
              </motion.span>
            </h1>
          </motion.div>

          {/* Animated line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 h-[2px] w-40 md:w-64 bg-gradient-to-r from-[#FF4D00] via-[#FF8C00] to-transparent origin-left relative overflow-hidden rounded-full shadow-[0_0_20px_rgba(255,77,0,0.5)]"
          >
            <motion.span 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          {/* Role & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-8 md:mt-10 max-w-2xl"
          >
            <p className="text-lg md:text-xl lg:text-2xl text-[#E6E6E1]/60 font-light leading-relaxed">
              <motion.span 
                className="text-[#FF4D00] font-semibold inline-block"
                animate={{ textShadow: ["0 0 10px rgba(255,77,0,0)", "0 0 20px rgba(255,77,0,0.5)", "0 0 10px rgba(255,77,0,0)"] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Full-Stack & AI Engineer
              </motion.span>
              {" "}shipping real-time ML systems
              <br />
              <span className="text-[#E6E6E1]/40 inline-flex items-center gap-2">
                from prototype 
                <motion.span
                  animate={{ x: [0, 5, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-[#FF4D00]"
                >
                  →
                </motion.span> 
                production
              </span>
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="mt-10 flex flex-wrap gap-6"
          >
            <motion.button
              onClick={() => scrollToSection("projects")}
              whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(255, 77, 0, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-5 bg-gradient-to-r from-[#FF4D00] via-[#FF6B00] to-[#FF4D00] bg-[length:200%_100%] animate-gradient text-[#1A1A17] font-bold tracking-wide overflow-hidden rounded-lg shadow-[0_0_30px_rgba(255,77,0,0.3)]"
            >
              <span className="relative z-10 flex items-center gap-3">
                View Projects
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="inline-block text-xl"
                >
                  →
                </motion.span>
              </span>
              <span className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
            </motion.button>
            
            <motion.button
              onClick={() => scrollToSection("contact")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-5 border-2 border-[#E6E6E1]/30 text-[#E6E6E1] font-bold tracking-wide rounded-lg overflow-hidden backdrop-blur-sm transition-all duration-300 hover:border-[#FF4D00] hover:shadow-[0_0_30px_rgba(255,77,0,0.2)]"
            >
              <span className="relative z-10 group-hover:text-[#FF4D00] transition-colors">Get In Touch</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#FF4D00]/0 via-[#FF4D00]/10 to-[#FF4D00]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-gradient-to-r from-[#FF4D00] to-[#FF8C00] group-hover:w-full transition-all duration-500" />
            </motion.button>
          </motion.div>
        </div>

        {/* Right side decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-8"
        >
          {/* Vertical line */}
          <motion.div 
            className="w-[2px] h-24 bg-gradient-to-b from-transparent via-[#FF4D00] to-transparent rounded-full"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Social links */}
          <div className="flex flex-col gap-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="p-3 border border-[#E6E6E1]/20 text-[#E6E6E1]/50 hover:text-[#FF4D00] hover:border-[#FF4D00] hover:bg-[#FF4D00]/10 hover:shadow-[0_0_20px_rgba(255,77,0,0.3)] transition-all duration-300 rounded-lg"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              );
            })}
          </div>

          {/* Vertical line */}
          <motion.div 
            className="w-[2px] h-24 bg-gradient-to-b from-transparent via-[#FF4D00] to-transparent rounded-full"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.button
          onClick={() => scrollToSection("about")}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-[#E6E6E1]/30 hover:text-[#FF4D00] transition-colors"
        >
          <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.button>
      </motion.div>

      {/* Corner decoration */}
      <div className="absolute bottom-8 left-8 z-20 hidden md:block">
        <p className="text-[10px] text-[#E6E6E1]/20 tracking-[0.3em] uppercase">
          Based in Hyderabad, India
        </p>
      </div>
    </section>
  );
}
