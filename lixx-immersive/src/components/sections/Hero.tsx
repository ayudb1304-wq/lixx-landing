"use client";

import { motion } from "framer-motion";

// SVG noise pattern as base64 for film grain effect
const noiseDataUri = `data:image/svg+xml;base64,${Buffer.from(`
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <filter id="noise">
    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
  </filter>
  <rect width="100%" height="100%" filter="url(#noise)" opacity="1"/>
</svg>
`).toString("base64")}`;

// Blob configuration for the three "lights"
const blobs = [
    {
        color: "#FAFF00", // Charge - electric yellow
        initialX: "-10%",
        initialY: "10%",
        size: "50vw",
        animation: {
            x: ["-10%", "5%", "-15%", "0%", "-10%"],
            y: ["10%", "25%", "5%", "20%", "10%"],
            scale: [1, 1.15, 1.05, 1.1, 1],
        },
        duration: 12,
    },
    {
        color: "#B6A6E9", // Zen - lavender
        initialX: "50%",
        initialY: "-20%",
        size: "60vw",
        animation: {
            x: ["50%", "40%", "55%", "45%", "50%"],
            y: ["-20%", "-5%", "-25%", "-10%", "-20%"],
            scale: [1, 1.1, 1.2, 1.05, 1],
        },
        duration: 15,
    },
    {
        color: "#2D1B4E", // Dream - deep purple
        initialX: "30%",
        initialY: "60%",
        size: "70vw",
        animation: {
            x: ["30%", "20%", "35%", "25%", "30%"],
            y: ["60%", "50%", "65%", "55%", "60%"],
            scale: [1.1, 1, 1.15, 1.05, 1.1],
        },
        duration: 18,
    },
];

export default function Hero() {
    return (
        <section id="hero" className="relative h-screen w-full overflow-hidden bg-lixx-black">
            {/* LAYER 1: Gradient Blobs - The Living Smoke */}
            <div className="absolute inset-0" aria-hidden="true">
                {blobs.map((blob, index) => (
                    <motion.div
                        key={index}
                        className="absolute rounded-full mix-blend-screen"
                        style={{
                            background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
                            width: blob.size,
                            height: blob.size,
                            left: blob.initialX,
                            top: blob.initialY,
                            filter: "blur(120px)",
                        }}
                        animate={blob.animation}
                        transition={{
                            duration: blob.duration,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* LAYER 2: Noise Overlay - The Grit */}
            <div
                className="pointer-events-none absolute inset-0 z-10 opacity-20 mix-blend-overlay"
                style={{
                    backgroundImage: `url("${noiseDataUri}")`,
                    backgroundRepeat: "repeat",
                }}
                aria-hidden="true"
            />

            {/* LAYER 3: Content - The Isomalt Typography */}
            <div className="relative z-20 flex h-full flex-col items-center justify-center">
                {/* Glass Typography Container */}
                <div className="relative">
                    {/* The refraction layer - blurred background visible through text shape */}
                    <h1
                        className="select-none font-display text-[15vw] leading-none tracking-tight"
                        style={{
                            color: "transparent",
                            WebkitTextStroke: "2px rgba(255, 255, 255, 0.2)",
                            textShadow: "0 0 80px rgba(250, 255, 0, 0.15)",
                        }}
                    >
                        LIXX
                    </h1>

                    {/* Backdrop blur overlay using clip-path to match text */}
                    <div
                        className="pointer-events-none absolute inset-0 flex items-center justify-center backdrop-blur-[2px]"
                        style={{
                            WebkitMaskImage:
                                "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
                            maskImage:
                                "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
                        }}
                        aria-hidden="true"
                    />
                </div>

                {/* Sub-headline */}
                <motion.p
                    className="mt-6 font-body text-xs uppercase tracking-[0.3em] text-white/50 md:text-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    Bio-Hacking Confectionery
                </motion.p>
            </div>

            {/* LAYER 4: Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
            >
                <motion.div
                    className="flex flex-col items-center gap-3"
                    animate={{ y: [0, 8, 0] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <span className="font-body text-[10px] uppercase tracking-[0.25em] text-white/40">
                        Scroll to Enter
                    </span>
                    <svg
                        width="16"
                        height="24"
                        viewBox="0 0 16 24"
                        fill="none"
                        className="text-white/30"
                    >
                        <rect
                            x="1"
                            y="1"
                            width="14"
                            height="22"
                            rx="7"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        />
                        <motion.circle
                            cx="8"
                            cy="8"
                            r="2"
                            fill="currentColor"
                            animate={{ y: [0, 8, 0] }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    </svg>
                </motion.div>
            </motion.div>
        </section>
    );
}
