"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#about", label: "About", number: "01" },
  { href: "#skills", label: "Skills", number: "02" },
  { href: "#projects", label: "Projects", number: "03" },
  { href: "#experience", label: "Experience", number: "04" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll
      const sections = navLinks.map(link => link.href.replace("#", ""));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "py-4 bg-[#1A1A17]/90 backdrop-blur-xl border-b border-[#FF4D00]/10"
            : "py-6 bg-transparent"
        )}
      >
        <nav className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => scrollToSection("#home")}
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <span className="text-3xl font-bold tracking-tight text-[#E6E6E1] group-hover:text-[#FF4D00] transition-colors duration-300">
              S<span className="text-[#FF4D00] group-hover:text-[#E6E6E1] animate-pulse">.</span>
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#FF4D00] to-[#FF8C00] group-hover:w-full transition-all duration-300 shadow-[0_0_10px_#FF4D00]" />
            <span className="absolute inset-0 rounded-full bg-[#FF4D00]/0 group-hover:bg-[#FF4D00]/10 blur-xl transition-all duration-500" />
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link, index) => (
              <motion.button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -2 }}
                className={cn(
                  "group relative px-5 py-3 text-sm tracking-wide transition-all duration-300 rounded-lg",
                  activeSection === link.href.replace("#", "")
                    ? "text-[#FF4D00] bg-[#FF4D00]/10"
                    : "text-[#E6E6E1]/60 hover:text-[#E6E6E1] hover:bg-[#E6E6E1]/5"
                )}
              >
                <span className="text-[10px] font-mono text-[#FF4D00] mr-2 opacity-60 group-hover:opacity-100 transition-opacity">{link.number}</span>
                <span className="relative">
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#FF4D00] to-[#FF8C00] group-hover:w-full transition-all duration-300" />
                </span>
                {activeSection === link.href.replace("#", "") && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-1 left-4 right-4 h-[2px] bg-gradient-to-r from-[#FF4D00] via-[#FF8C00] to-[#FF4D00] shadow-[0_0_10px_#FF4D00]"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <motion.a
              href="/resume.pdf"
              target="_blank"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 77, 0, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF4D00] to-[#FF6B00] text-[#1A1A17] text-sm font-semibold tracking-wide rounded-lg overflow-hidden transition-all duration-300"
            >
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Download className="w-4 h-4" />
              </motion.span>
              <span>Resume</span>
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#E6E6E1] hover:text-[#FF4D00] transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#1A1A17]/95 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-[#242421] border-l border-[#FF4D00]/10 p-8 pt-24"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={cn(
                      "group flex items-center gap-4 px-4 py-4 text-left border-b border-[#E6E6E1]/5 transition-colors",
                      activeSection === link.href.replace("#", "")
                        ? "text-[#FF4D00]"
                        : "text-[#E6E6E1]/60 hover:text-[#FF4D00]"
                    )}
                  >
                    <span className="text-xs text-[#FF4D00]/50 font-mono">{link.number}</span>
                    <span className="text-2xl font-light tracking-wide">{link.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Mobile CTA */}
              <motion.a
                href="/resume.pdf"
                target="_blank"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="mt-8 flex items-center justify-center gap-2 w-full px-6 py-4 bg-[#FF4D00] text-[#1A1A17] font-medium tracking-wide"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </motion.a>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="mt-12 flex justify-center gap-6"
              >
                {[
                  { href: "https://github.com/P-Sreeshanth", label: "GitHub" },
                  { href: "https://linkedin.com/in/sreeshanthpeddi", label: "LinkedIn" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#E6E6E1]/40 hover:text-[#FF4D00] text-sm tracking-wide transition-colors"
                  >
                    {social.label}
                  </a>
                ))}
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
