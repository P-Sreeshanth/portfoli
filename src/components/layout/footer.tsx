"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart, ArrowUp, MapPin, Phone } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/P-Sreeshanth", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/sreeshanthpeddi", label: "LinkedIn" },
  { icon: Mail, href: "mailto:peddisreeshanth18@gmail.com", label: "Email" },
];

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#1A1A17] border-t border-[#FF4D00]/20">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF4D00] to-transparent" />

      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand section */}
          <div>
            <a href="#home" className="inline-flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 bg-[#FF4D00] rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-[#1A1A17]">S</span>
              </div>
              <div>
                <span className="block text-lg font-bold text-[#E6E6E1] group-hover:text-[#FF4D00] transition-colors">
                  Sreeshanth Peddi
                </span>
                <span className="text-sm text-[#A3A39E]">Full Stack Developer</span>
              </div>
            </a>
            <p className="text-[#A3A39E] leading-relaxed mb-6">
              CS Student passionate about AI, Full Stack Development & DevOps. 
              Building impactful solutions, one project at a time.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 bg-[#242420] border border-[#3A3A35] rounded-lg flex items-center justify-center text-[#A3A39E] hover:text-[#FF4D00] hover:border-[#FF4D00]/50 transition-all"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-lg font-semibold text-[#E6E6E1] mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-2 text-[#A3A39E] hover:text-[#FF4D00] transition-colors"
                  >
                    <div className="w-1 h-1 bg-[#FF4D00] rounded-full" />
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-[#E6E6E1] mb-6">
              Contact
            </h4>
            <div className="space-y-4">
              <a 
                href="mailto:peddisreeshanth18@gmail.com"
                className="flex items-center gap-3 text-[#A3A39E] hover:text-[#FF4D00] transition-colors"
              >
                <Mail className="w-5 h-5 text-[#FF4D00]" />
                <span className="text-sm">peddisreeshanth18@gmail.com</span>
              </a>
              
              <a 
                href="tel:+919052834976"
                className="flex items-center gap-3 text-[#A3A39E] hover:text-[#FF4D00] transition-colors"
              >
                <Phone className="w-5 h-5 text-[#FF4D00]" />
                <span className="text-sm">+91 9052834976</span>
              </a>
              
              <div className="flex items-center gap-3 text-[#A3A39E]">
                <MapPin className="w-5 h-5 text-[#FF4D00]" />
                <span className="text-sm">Hyderabad, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#3A3A35] gap-4">
          <p className="text-[#A3A39E] text-sm">
            © {currentYear} Sreeshanth Peddi. All rights reserved.
          </p>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-[#FF4D00] text-[#1A1A17] rounded-lg transition-all hover:bg-[#FF8C00]"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
