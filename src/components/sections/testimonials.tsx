"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Engineering Manager",
    company: "TechCorp",
    image: "/testimonials/sarah.jpg",
    content:
      "Sreeshanth is an exceptional developer who consistently delivers high-quality work. His attention to detail and problem-solving skills are outstanding.",
    rating: 5,
  },
  {
    name: "Alex Kumar",
    role: "Startup Founder",
    company: "InnovateTech",
    image: "/testimonials/alex.jpg",
    content:
      "Working with Sreeshanth was a game-changer for our startup. He built our entire platform from scratch and it scaled beautifully.",
    rating: 5,
  },
  {
    name: "Maria Garcia",
    role: "Product Designer",
    company: "DesignLab",
    image: "/testimonials/maria.jpg",
    content:
      "Sreeshanth has an incredible eye for design implementation. He brings designs to life pixel-perfectly while adding thoughtful interactions.",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "CTO",
    company: "DataFlow",
    image: "/testimonials/james.jpg",
    content:
      "Sreeshanth's technical expertise and communication skills make him an ideal team member. He's always eager to learn and share knowledge.",
    rating: 5,
  },
];

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all"
    >
      {/* Quote icon */}
      <div className="absolute -top-3 -left-3 w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
        <Quote className="w-4 h-4 text-white" />
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4 text-warning fill-warning"
          />
        ))}
      </div>

      {/* Content */}
      <p className="text-muted-foreground mb-6 leading-relaxed">
        "{testimonial.content}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary font-bold">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
          <p className="text-sm text-muted-foreground">
            {testimonial.role} at {testimonial.company}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            What People
            <span className="gradient-text"> Say</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Feedback from colleagues, clients, and collaborators I've worked with
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
