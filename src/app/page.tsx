"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { About, Skills, Projects, Experience, Contact } from "@/components/sections";
import { Hero } from "@/components/sections/hero";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { PortfolioAgent } from "@/components/ai-chatbot/portfolio-agent";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Custom cursor - only on desktop */}
      <div className="hidden lg:block">
        <CustomCursor />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Navigation */}
        <Navbar />

        {/* Main content */}
        <main>
          {/* Hero Section */}
          <Hero />
          
          {/* About Section */}
          <About />
          
          {/* Skills Section */}
          <Skills />
          
          {/* Projects Section */}
          <Projects />
          
          {/* Experience Section */}
          <Experience />
          
          {/* Contact Section */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* AI Portfolio Agent */}
        <PortfolioAgent />
      </motion.div>
    </>
  );
}
