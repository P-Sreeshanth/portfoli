"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Send,
  ArrowUpRight,
  CheckCircle2
} from "lucide-react";

const contactInfo = [
  { icon: Mail, label: "Email", value: "peddisreeshanth18@gmail.com", href: "mailto:peddisreeshanth18@gmail.com" },
  { icon: Phone, label: "Phone", value: "+91 9052834976", href: "tel:+919052834976" },
  { icon: MapPin, label: "Location", value: "Hyderabad, India", href: "#" },
];

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/P-Sreeshanth" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/sreeshanthpeddi" },
];

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: "", email: "", subject: "", message: "" });
    
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="relative py-32 bg-[#1A1A17] overflow-hidden">
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
            <span className="text-[#FF4D00] text-sm font-mono tracking-widest">05</span>
            <div className="h-px w-12 bg-gradient-to-r from-[#FF4D00] to-transparent" />
            <span className="text-[#E6E6E1]/40 text-sm tracking-widest uppercase">Get In Touch</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#E6E6E1] mb-4">
                Let's{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D00] to-[#FF8C00]">
                  Connect
                </span>
              </h2>
              <p className="text-[#E6E6E1]/50 max-w-md text-lg font-light">
                Have a project in mind? Let's talk about how we can work together.
              </p>
            </div>

            {/* Status indicator */}
            <div className="flex items-center gap-3 px-4 py-3 bg-[#242421] border border-[#E6E6E1]/10 rounded-lg">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[#E6E6E1]/60 text-sm">Available for opportunities</span>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Contact details */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-6 p-5 bg-[#242421] border border-[#E6E6E1]/10 rounded-xl hover:border-[#FF4D00]/30 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-[#FF4D00]/10 border border-[#FF4D00]/30 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#FF4D00]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-[#E6E6E1]/40 tracking-widest uppercase mb-1">
                        {item.label}
                      </div>
                      <div className="text-[#E6E6E1] font-medium group-hover:text-[#FF4D00] transition-colors">
                        {item.value}
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-[#E6E6E1]/20 group-hover:text-[#FF4D00] transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </motion.a>
                );
              })}
            </div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="pt-6 border-t border-[#E6E6E1]/10"
            >
              <h4 className="text-sm text-[#E6E6E1]/40 uppercase tracking-wider mb-4">Follow Me</h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -5 }}
                      className="p-4 bg-[#242421] border border-[#E6E6E1]/10 rounded-xl text-[#E6E6E1]/60 hover:text-[#FF4D00] hover:border-[#FF4D00]/30 transition-all"
                    >
                      <Icon className="w-6 h-6" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="p-6 bg-gradient-to-br from-[#FF4D00]/10 to-[#FF8C00]/5 border border-[#FF4D00]/20 rounded-xl"
            >
              <div className="text-4xl text-[#FF4D00]/30 mb-3">"</div>
              <p className="text-lg font-light text-[#E6E6E1]/80 italic leading-relaxed">
                Great things are done by a series of small things brought together.
              </p>
              <p className="mt-3 text-sm text-[#FF4D00]">— Vincent Van Gogh</p>
            </motion.div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Form header */}
            <div className="mb-6 p-4 bg-[#242421] border border-[#E6E6E1]/10 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FF4D00]/10 border border-[#FF4D00]/30 rounded-lg flex items-center justify-center">
                  <Send className="w-5 h-5 text-[#FF4D00]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#E6E6E1]">Send a Message</h3>
                  <p className="text-xs text-[#E6E6E1]/40">I'll get back to you within 24-48 hours</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-[#E6E6E1]/60 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 bg-[#242421] border border-[#E6E6E1]/10 rounded-xl text-[#E6E6E1] placeholder-[#E6E6E1]/30 focus:border-[#FF4D00]/50 focus:outline-none focus:ring-2 focus:ring-[#FF4D00]/20 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#E6E6E1]/60 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 bg-[#242421] border border-[#E6E6E1]/10 rounded-xl text-[#E6E6E1] placeholder-[#E6E6E1]/30 focus:border-[#FF4D00]/50 focus:outline-none focus:ring-2 focus:ring-[#FF4D00]/20 transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-[#E6E6E1]/60 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 bg-[#242421] border border-[#E6E6E1]/10 rounded-xl text-[#E6E6E1] placeholder-[#E6E6E1]/30 focus:border-[#FF4D00]/50 focus:outline-none focus:ring-2 focus:ring-[#FF4D00]/20 transition-all"
                  placeholder="What's this about?"
                />
              </div>
              <div>
                <label className="block text-sm text-[#E6E6E1]/60 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-4 bg-[#242421] border border-[#E6E6E1]/10 rounded-xl text-[#E6E6E1] placeholder-[#E6E6E1]/30 focus:border-[#FF4D00]/50 focus:outline-none focus:ring-2 focus:ring-[#FF4D00]/20 transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(255, 77, 0, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-5 bg-gradient-to-r from-[#FF4D00] to-[#FF6B00] text-[#1A1A17] font-semibold tracking-wide flex items-center justify-center gap-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-[#1A1A17]/30 border-t-[#1A1A17] rounded-full animate-spin" />
                    Sending...
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
