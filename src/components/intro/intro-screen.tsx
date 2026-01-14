"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroScreenProps {
  onComplete: () => void;
}

export function IntroScreen({ onComplete }: IntroScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showQuote, setShowQuote] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Particle animation
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
      ember: boolean;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 8000);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
          ember: Math.random() > 0.9,
        });
      }
    };

    const animate = () => {
      ctx.fillStyle = "rgba(26, 26, 23, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        if (particle.ember) {
          ctx.fillStyle = `rgba(255, 77, 0, ${particle.opacity})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = "#FF4D00";
        } else {
          ctx.fillStyle = `rgba(230, 230, 225, ${particle.opacity * 0.3})`;
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const opacity = (1 - distance / 100) * 0.1;
            ctx.strokeStyle = p1.ember || p2.ember 
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
    createParticles();
    animate();

    window.addEventListener("resize", () => {
      resize();
      createParticles();
    });

    // Show quote after particles start
    setTimeout(() => setShowQuote(true), 500);
    setTimeout(() => setShowButton(true), 2000);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const handleExplore = () => {
    setIsExiting(true);
    setTimeout(onComplete, 1000);
  };

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A17] overflow-hidden"
        >
          {/* Canvas background */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0"
          />

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A1A17]/50 to-[#1A1A17] z-10" />
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#1A1A17] z-10" />

          {/* Content */}
          <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
            {/* Small intro text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={showQuote ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <span className="text-[#FF4D00] text-sm tracking-[0.3em] uppercase font-light">
                Welcome to my universe
              </span>
            </motion.div>

            {/* Main quote */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={showQuote ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative"
            >
              <span className="block text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight text-[#E6E6E1] leading-tight tracking-tight">
                The only{" "}
                <motion.span
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={showQuote ? { opacity: 1, filter: "blur(0px)" } : {}}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="text-[#FF4D00] font-normal"
                  style={{
                    textShadow: "0 0 40px rgba(255, 77, 0, 0.5)",
                  }}
                >
                  limitations
                </motion.span>
              </span>
              <span className="block text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight text-[#E6E6E1] leading-tight tracking-tight mt-2">
                are the ones we put on
              </span>
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={showQuote ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="block text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-normal text-[#E6E6E1] leading-tight tracking-tight mt-2"
              >
                ourselves<span className="text-[#FF4D00]">.</span>
              </motion.span>
            </motion.h1>

            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={showQuote ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, delay: 2 }}
              className="w-32 h-[1px] mx-auto mt-12 mb-8 origin-left"
              style={{
                background: "linear-gradient(90deg, transparent, #FF4D00, transparent)",
              }}
            />

            {/* Author/name */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={showQuote ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 2.2 }}
              className="text-[#E6E6E1]/50 text-sm tracking-[0.2em] uppercase mb-16"
            >
              — Sreeshanth Peddi
            </motion.p>

            {/* Explore button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={showButton ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <button
                onClick={handleExplore}
                className="group relative px-12 py-5 overflow-hidden"
              >
                {/* Button border */}
                <span className="absolute inset-0 border border-[#FF4D00]/50 group-hover:border-[#FF4D00] transition-colors duration-300" />
                
                {/* Button fill on hover */}
                <span className="absolute inset-0 bg-[#FF4D00] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                
                {/* Button text */}
                <span className="relative z-10 flex items-center gap-4 text-[#FF4D00] group-hover:text-[#1A1A17] transition-colors duration-300">
                  <span className="text-sm tracking-[0.3em] uppercase font-medium">
                    Deep Dive
                  </span>
                  <motion.svg
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </motion.svg>
                </span>

                {/* Corner decorations */}
                <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#FF4D00]" />
                <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#FF4D00]" />
                <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#FF4D00]" />
                <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#FF4D00]" />
              </button>
            </motion.div>

            {/* Scroll hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={showButton ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-16"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex flex-col items-center gap-2 text-[#E6E6E1]/30"
              >
                <span className="text-xs tracking-[0.2em] uppercase">Click to explore</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            </motion.div>
          </div>

          {/* Side decorations */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 z-20">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 0.3, x: 0 }}
                transition={{ duration: 0.5, delay: 2.5 + i * 0.1 }}
                className="w-8 h-[1px] bg-[#FF4D00]"
              />
            ))}
          </div>

          <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 z-20">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 0.3, x: 0 }}
                transition={{ duration: 0.5, delay: 2.5 + i * 0.1 }}
                className="w-8 h-[1px] bg-[#FF4D00]"
              />
            ))}
          </div>

          {/* Bottom info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3 }}
            className="absolute bottom-8 left-8 z-20 hidden md:block"
          >
            <p className="text-[#E6E6E1]/30 text-xs tracking-wider">
              FULL STACK DEVELOPER
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3 }}
            className="absolute bottom-8 right-8 z-20 hidden md:block"
          >
            <p className="text-[#E6E6E1]/30 text-xs tracking-wider">
              © 2026
            </p>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-50 bg-[#1A1A17]"
        />
      )}
    </AnimatePresence>
  );
}
