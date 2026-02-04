"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Product SKU data
const PRODUCTS = [
    {
        id: "charge",
        name: "Charge",
        bgColor: "#FAFF00",
        textColorClass: "text-black",
        tagline: "The 3PM Resurrection",
        actives: "Caffeine + L-Theanine",
        vibe: "Electric, Sharp, Focus",
    },
    {
        id: "zen",
        name: "Zen",
        bgColor: "#B6A6E9",
        textColorClass: "text-lixx-black",
        tagline: "Social Lubricant",
        actives: "Ashwagandha + Chamomile",
        vibe: "Flow, Ease, Breath",
    },
    {
        id: "dream",
        name: "Dream",
        bgColor: "#2D1B4E",
        textColorClass: "text-white",
        tagline: "Bio-Hacked Hibernation",
        actives: "Melatonin + Valerian",
        vibe: "Deep, Heavy, REM",
    },
];

// Glowing Artifact Components
const ChargeArtifact = () => (
    <div className="relative h-64 w-64 md:h-80 md:w-80">
        {/* Core orb */}
        <motion.div
            className="absolute inset-0 rounded-full"
            style={{
                background: "radial-gradient(circle, #FAFF00 0%, #FFD700 40%, transparent 70%)",
                boxShadow: `
                    0 0 60px 30px rgba(250, 255, 0, 0.8),
                    0 0 100px 60px rgba(250, 255, 0, 0.5),
                    0 0 140px 90px rgba(250, 255, 0, 0.3),
                    inset 0 0 60px 30px rgba(255, 255, 255, 0.4)
                `,
            }}
            animate={{
                scale: [1, 1.1, 1],
                opacity: [0.9, 1, 0.9],
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        />
        {/* Electric pulse rings */}
        <motion.div
            className="absolute inset-0 rounded-full border-2 border-yellow-300/50"
            animate={{
                scale: [1, 1.5, 2],
                opacity: [0.8, 0.4, 0],
            }}
            transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
            }}
        />
        <motion.div
            className="absolute inset-0 rounded-full border-2 border-yellow-200/30"
            animate={{
                scale: [1, 1.5, 2],
                opacity: [0.6, 0.3, 0],
            }}
            transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.5,
            }}
        />
    </div>
);

const ZenArtifact = () => (
    <div className="relative h-64 w-64 md:h-80 md:w-80">
        {/* Soft undulating wave */}
        <motion.div
            className="absolute inset-0 rounded-full"
            style={{
                background: "radial-gradient(ellipse 120% 80% at 50% 50%, #B6A6E9 0%, #9B8AD4 30%, transparent 70%)",
                boxShadow: `
                    0 0 80px 40px rgba(182, 166, 233, 0.6),
                    0 0 120px 70px rgba(182, 166, 233, 0.3),
                    inset 0 0 40px 20px rgba(255, 255, 255, 0.2)
                `,
                filter: "blur(8px)",
            }}
            animate={{
                scale: [1, 1.08, 1.02, 1.06, 1],
                borderRadius: ["50%", "45% 55% 50% 50%", "50% 50% 45% 55%", "55% 45% 50% 50%", "50%"],
            }}
            transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        />
        {/* Inner glow */}
        <motion.div
            className="absolute inset-8 rounded-full"
            style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
            }}
            animate={{
                scale: [1, 1.15, 1],
                opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        />
    </div>
);

const DreamArtifact = () => (
    <div className="relative h-64 w-64 md:h-80 md:w-80">
        {/* Eclipse outer glow */}
        <motion.div
            className="absolute inset-0 rounded-full"
            style={{
                background: "radial-gradient(circle, transparent 30%, #1a0f30 50%, #2D1B4E 70%, transparent 90%)",
                boxShadow: `
                    0 0 100px 50px rgba(45, 27, 78, 0.8),
                    0 0 150px 80px rgba(45, 27, 78, 0.4),
                    inset 0 0 80px 40px rgba(0, 0, 0, 0.8)
                `,
            }}
            animate={{
                rotate: [0, 360],
            }}
            transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
            }}
        />
        {/* Dark core */}
        <div
            className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full md:h-40 md:w-40"
            style={{
                background: "radial-gradient(circle, #030303 0%, #0a0612 60%, transparent 100%)",
                boxShadow: `
                    0 0 40px 20px rgba(0, 0, 0, 0.9),
                    inset 0 0 30px 15px rgba(0, 0, 0, 1)
                `,
            }}
        />
        {/* Corona effect */}
        <motion.div
            className="absolute inset-2 rounded-full"
            style={{
                background: "conic-gradient(from 0deg, transparent, rgba(138, 100, 200, 0.3), transparent, rgba(100, 80, 180, 0.2), transparent)",
            }}
            animate={{
                rotate: [0, -360],
            }}
            transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
            }}
        />
    </div>
);

// Map artifact components to product IDs
const ARTIFACTS: Record<string, React.FC> = {
    charge: ChargeArtifact,
    zen: ZenArtifact,
    dream: DreamArtifact,
};

export default function TheAltar() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const textRefs = useRef<(HTMLDivElement | null)[]>([]);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;
        const bg = bgRef.current;

        if (!section || !container || !bg) return;

        const ctx = gsap.context(() => {
            // Main horizontal scroll animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    pin: true,
                    scrub: 1,
                    end: "+=2000",
                    // markers: true, // Uncomment for debugging
                },
            });

            // Move the container horizontally
            tl.to(container, {
                xPercent: -100 * (PRODUCTS.length - 1),
                ease: "none",
            });

            // Background color transitions
            const colorTl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    scrub: 1,
                    start: "top top",
                    end: "+=2000",
                },
            });

            // Transition through each product's background color
            PRODUCTS.forEach((product, index) => {
                if (index < PRODUCTS.length - 1) {
                    colorTl.to(bg, {
                        backgroundColor: PRODUCTS[index + 1].bgColor,
                        duration: 1,
                        ease: "none",
                    });
                }
            });

            // Parallax effect on text (moves slightly faster than container)
            textRefs.current.forEach((textEl, index) => {
                if (textEl && index > 0) {
                    gsap.to(textEl, {
                        xPercent: -25, // Text moves 25% extra relative to its card
                        ease: "none",
                        scrollTrigger: {
                            trigger: section,
                            scrub: 1,
                            start: "top top",
                            end: "+=2000",
                        },
                    });
                }
            });
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="altar"
            ref={sectionRef}
            className="relative h-screen w-full overflow-hidden"
        >
            {/* Background color layer */}
            <div
                ref={bgRef}
                className="absolute inset-0 transition-colors"
                style={{ backgroundColor: PRODUCTS[0].bgColor }}
            />

            {/* Horizontal scrolling container */}
            <div
                ref={containerRef}
                className="relative flex h-full"
                style={{ width: `${PRODUCTS.length * 100}vw` }}
            >
                {PRODUCTS.map((product, index) => {
                    const ArtifactComponent = ARTIFACTS[product.id];
                    return (
                        <div
                            id={product.id}
                            key={product.id}
                            className="relative flex h-screen w-screen flex-shrink-0 items-center justify-center"
                        >
                            {/* Glowing Artifact */}
                            <div className="absolute z-10">
                                <ArtifactComponent />
                            </div>

                            {/* Text Content with Parallax */}
                            <div
                                ref={(el) => { textRefs.current[index] = el; }}
                                className={`relative z-20 flex flex-col items-center text-center ${product.textColorClass}`}
                            >
                                {/* Product Name */}
                                <motion.h2
                                    className="font-display text-[12vw] leading-none tracking-tight md:text-[10vw]"
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.1 }}
                                    viewport={{ once: false, amount: 0.5 }}
                                >
                                    {product.name}
                                </motion.h2>

                                {/* Tagline */}
                                <motion.p
                                    className="mt-4 font-body text-lg uppercase tracking-[0.2em] opacity-80 md:text-xl"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    viewport={{ once: false, amount: 0.5 }}
                                >
                                    {product.tagline}
                                </motion.p>

                                {/* Actives */}
                                <motion.p
                                    className="mt-6 font-body text-sm tracking-wide opacity-60 md:text-base"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                    viewport={{ once: false, amount: 0.5 }}
                                >
                                    {product.actives}
                                </motion.p>

                                {/* Vibe */}
                                <motion.p
                                    className="mt-2 font-body text-xs uppercase tracking-[0.3em] opacity-40 md:text-sm"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 0.4, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.7 }}
                                    viewport={{ once: false, amount: 0.5 }}
                                >
                                    {product.vibe}
                                </motion.p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Progress indicator dots */}
            <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-3">
                {PRODUCTS.map((product) => (
                    <div
                        key={`dot-${product.id}`}
                        className="h-2 w-2 rounded-full bg-current opacity-30"
                        style={{ color: product.textColorClass.includes("white") ? "white" : "black" }}
                    />
                ))}
            </div>
        </section>
    );
}
