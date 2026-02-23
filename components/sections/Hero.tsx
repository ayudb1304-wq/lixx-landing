"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

const Lightning = dynamic(() => import("@/components/Lightning"), {
  ssr: false,
});

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-reveal",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative flex flex-1 flex-col px-4 pt-6 md:px-8 md:pt-10">
      {/* Lightning background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Lightning hue={330} xOffset={0} speed={1} intensity={1} size={1} />
      </div>

      {/* Top bar */}
      <div className="hero-reveal z-10 mx-auto grid w-full max-w-5xl grid-cols-12 items-center gap-y-2 border border-white/20 p-4">
        <p className="col-span-12 font-mono text-xs tracking-[0.14em] text-[var(--color-terminal-muted)] md:col-span-9 md:whitespace-nowrap">
          SOLID_STATE_ENERGY_PROTOCOL
        </p>
        <p className="col-span-12 text-left font-mono text-xs tracking-[0.14em] text-[var(--color-accent-magenta)] md:col-span-3 md:text-right">
          DROP_001
        </p>
      </div>

      {/* Centred hero content */}
      <div className="hero-reveal z-10 flex flex-1 items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <Image
            src="/logo.png"
            alt="Lixx"
            width={600}
            height={300}
            className="h-auto w-[clamp(14rem,42vw,36rem)] mix-blend-screen"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
