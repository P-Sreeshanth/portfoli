"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Palette, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

const themes = [
  { id: "cosmic", name: "Cosmic Purple", icon: Moon, color: "#8B5CF6" },
  { id: "ocean", name: "Ocean Breeze", icon: Sun, color: "#0EA5E9" },
  { id: "sunset", name: "Sunset Ember", icon: Palette, color: "#F97316" },
  { id: "forest", name: "Forest Mint", icon: Monitor, color: "#22C55E" },
];

export function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("cosmic");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") || "cosmic";
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId);
    localStorage.setItem("theme", themeId);
    document.documentElement.setAttribute("data-theme", themeId);
    setIsOpen(false);
  };

  const currentThemeData = themes.find((t) => t.id === currentTheme) || themes[0];
  const CurrentIcon = currentThemeData.icon;

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-card animate-pulse" />
    );
  }

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
        aria-label="Change theme"
      >
        <CurrentIcon className="w-5 h-5" style={{ color: currentThemeData.color }} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 z-50 w-48 rounded-xl bg-card border border-border shadow-2xl p-2"
            >
              {themes.map((theme) => {
                const Icon = theme.icon;
                return (
                  <button
                    key={theme.id}
                    onClick={() => handleThemeChange(theme.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                      currentTheme === theme.id
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )}
                  >
                    <Icon className="w-4 h-4" style={{ color: theme.color }} />
                    <span>{theme.name}</span>
                    {currentTheme === theme.id && (
                      <motion.div
                        layoutId="theme-check"
                        className="ml-auto w-2 h-2 rounded-full bg-primary"
                      />
                    )}
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
