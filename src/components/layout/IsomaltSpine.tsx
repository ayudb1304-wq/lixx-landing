"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Section definitions for navigation
const SECTIONS = [
  { id: "hero", label: "THE DROP", position: 0 },
  { id: "altar", label: "THE ALTAR", position: 0.25 },
  { id: "lixx-club", label: "ACCESS", position: 0.85 },
] as const;

export default function IsomaltSpine() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Hydration guard - prevent SSR mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll progress tracking
  const { scrollYProgress } = useScroll();

  // Mercury fill height based on scroll
  const mercuryHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Color interpolation across scroll progress
  // 0-25%: Yellow (#FAFF00), 25-60%: Lavender (#B6A6E9), 60-100%: Purple (#2D1B4E)
  const mercuryColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.6, 1],
    ["#FAFF00", "#FAFF00", "#B6A6E9", "#2D1B4E"]
  );

  // Glow color follows mercury color
  const glowColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.6, 1],
    [
      "0 0 20px rgba(250, 255, 0, 0.6)",
      "0 0 20px rgba(250, 255, 0, 0.6)",
      "0 0 20px rgba(182, 166, 233, 0.6)",
      "0 0 20px rgba(45, 27, 78, 0.8)",
    ]
  );

  // Handle smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Don't render until mounted to prevent hydration issues
  if (!mounted) return null;

  return (
    <motion.nav
      className="fixed right-4 top-1/2 z-50 -translate-y-1/2 md:right-8"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Page navigation"
    >
      <motion.div
        className="relative flex items-center gap-3"
        animate={{ gap: isHovered ? "0.75rem" : "0.5rem" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Labels Panel - Always visible but expands on hover */}
        <motion.div
          className="flex flex-col items-end justify-between overflow-hidden rounded-xl border border-white/10 py-3"
          style={{
            background: "linear-gradient(135deg, rgba(3, 3, 3, 0.95) 0%, rgba(20, 20, 25, 0.9) 100%)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
            height: "180px",
          }}
          animate={{
            width: isHovered ? "auto" : "0px",
            paddingLeft: isHovered ? "1rem" : "0px",
            paddingRight: isHovered ? "1rem" : "0px",
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
        >
          {SECTIONS.map((section, index) => (
            <motion.button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="whitespace-nowrap text-right font-mono text-[10px] uppercase tracking-wider text-white/60 transition-colors hover:text-lixx-charge md:text-xs"
              initial={{ opacity: 0, x: 10 }}
              animate={{ 
                opacity: isHovered ? 1 : 0, 
                x: isHovered ? 0 : 10 
              }}
              transition={{ delay: isHovered ? index * 0.05 : 0 }}
              whileHover={{ x: -4 }}
            >
              {section.label}
            </motion.button>
          ))}
        </motion.div>

        {/* The Glass Rod */}
        <div 
          className="relative h-[180px] w-2.5 cursor-pointer overflow-hidden rounded-full border border-white/15 md:h-[240px]"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.3), 0 0 20px rgba(0,0,0,0.5)",
          }}
        >
          {/* Mercury Fill - fills from bottom */}
          <motion.div
            className="absolute bottom-0 left-0 w-full rounded-full"
            style={{
              height: mercuryHeight,
              backgroundColor: mercuryColor,
              boxShadow: glowColor,
            }}
          />

          {/* Section Tick Marks - clickable */}
          <div className="absolute inset-0 flex flex-col justify-between py-2">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="group relative h-3 w-full"
                aria-label={`Scroll to ${section.label}`}
              >
                {/* Tick indicator */}
                <div className="absolute right-0 top-1/2 h-0.5 w-1.5 -translate-y-1/2 rounded-full bg-white/30 transition-all group-hover:w-full group-hover:bg-white/60" />
              </button>
            ))}
          </div>

          {/* Subtle inner glow */}
          <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/5 to-white/10" />
        </div>

        {/* Hover hint indicator - shows when not hovered */}
        <motion.div
          className="absolute -left-6 top-1/2 -translate-y-1/2"
          animate={{
            opacity: isHovered ? 0 : [0.3, 0.6, 0.3],
            x: isHovered ? 10 : [0, -4, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="text-white/40"
          >
            <path
              d="M8 2L4 6L8 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </motion.nav>
  );
}
