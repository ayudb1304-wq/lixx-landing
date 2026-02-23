"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const BAR_DATA = [
  {
    label: "LIQUID_LATENCY",
    time: "45 MIN",
    barClass: "bg-[#3a3a3a]",
    glowClass: "",
    id: "liquid-bar",
  },
  {
    label: "BUCCAL_OVERRIDE",
    time: "IMMEDIATE",
    barClass: "bg-[var(--accent-magenta)]",
    glowClass: "shadow-[0_0_30px_var(--accent-magenta),0_0_60px_var(--accent-magenta)]",
    id: "buccal-bar",
  },
] as const;

export default function PharmacokineticHack() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=360%",
          pin: true,
          pinSpacing: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        ".pk-headline-1",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.15, ease: "power3.out" },
        0,
      );

      tl.fromTo(
        ".pk-headline-2",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.15, ease: "power3.out" },
        0.12,
      );

      tl.fromTo(
        ".pk-headline-3",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.15, ease: "power3.out" },
        0.24,
      );

      tl.fromTo(
        ".pk-dataviz",
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.12, ease: "power2.out" },
        0.28,
      );

      tl.fromTo(
        ".pk-liquid-bar",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.4, ease: "power1.inOut" },
        0.35,
      );

      tl.fromTo(
        ".pk-buccal-bar",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.12, ease: "power4.out" },
        0.35,
      );

      tl.fromTo(
        ".pk-buccal-bar",
        { opacity: 0.7 },
        { opacity: 1, duration: 0.08, repeat: 2, yoyo: true },
        0.48,
      );

      tl.fromTo(
        ".pk-scanline",
        { xPercent: -100, opacity: 0 },
        { xPercent: 200, opacity: 1, duration: 0.18, ease: "none" },
        0.48,
      );

      tl.to(
        ".pk-content",
        { opacity: 0, duration: 0.1, ease: "power2.in" },
        0.96,
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-10 h-screen w-full overflow-hidden bg-black"
    >
      <div className="pk-content flex h-full w-full flex-col justify-center px-6 md:px-12 lg:px-20">
        {/* Asymmetric grid: typography left, data viz right */}
        <div className="grid w-full grid-cols-1 items-center gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
          {/* Left: Kinetic Typography */}
          <div className="flex flex-col gap-2">
            <h2 className="pk-headline-1 text-[clamp(2.8rem,9vw,7.5rem)] font-black uppercase leading-[0.88] tracking-tighter text-white will-change-transform">
              BYPASS
              <br />
              <span className="text-[var(--accent-magenta)]">THE LIVER.</span>
            </h2>

            <h2 className="pk-headline-2 ml-[-1vw] text-[clamp(1.8rem,5.5vw,4.5rem)] font-black uppercase leading-[0.92] tracking-tighter text-white/90 will-change-transform">
              DIRECT BUCCAL
              <br />
              ABSORPTION.
            </h2>

            <h2 className="pk-headline-3 ml-[3vw] text-[clamp(1.6rem,4.5vw,3.8rem)] font-black uppercase leading-[0.92] tracking-tighter text-[var(--accent-toxic)] will-change-transform">
              ZERO LIQUID
              <br />
              FATIGUE.
            </h2>
          </div>

          {/* Right: Brutalist Data Viz */}
          <div className="pk-dataviz flex flex-col gap-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--terminal-muted)]">
              &gt; ABSORPTION_LATENCY_COMPARISON_
            </p>

            {BAR_DATA.map((bar) => (
              <div key={bar.id} className="flex flex-col gap-2">
                <div className="flex items-baseline justify-between">
                  <span
                    className={`font-mono text-xs uppercase tracking-[0.15em] ${
                      bar.id === "buccal-bar"
                        ? "text-[var(--accent-magenta)]"
                        : "text-white/70"
                    }`}
                  >
                    {bar.label}
                  </span>
                  <span
                    className={`font-mono text-sm font-black tracking-[0.1em] ${
                      bar.id === "buccal-bar"
                        ? "text-[var(--accent-toxic)]"
                        : "text-[var(--terminal-muted)]"
                    }`}
                  >
                    {bar.time}
                  </span>
                </div>

                <div className="relative h-3 w-full overflow-hidden border border-white/20 bg-white/5">
                  <div
                    className={`${bar.id === "liquid-bar" ? "pk-liquid-bar" : "pk-buccal-bar"} absolute inset-0 origin-left ${bar.barClass} ${bar.glowClass}`}
                    style={{ transform: "scaleX(0)" }}
                  />
                  {bar.id === "buccal-bar" && (
                    <div className="pk-scanline absolute inset-0 w-1/4 bg-gradient-to-r from-transparent via-white/60 to-transparent mix-blend-screen" />
                  )}
                </div>
              </div>
            ))}

            <div className="mt-4 border-l-2 border-[var(--accent-toxic)] pl-3">
              <p className="font-mono text-[10px] leading-relaxed tracking-[0.1em] text-white/40">
                SUBLINGUAL_PATHWAY: ACTIVE
                <br />
                HEPATIC_FIRST_PASS: BYPASSED
                <br />
                BIOAVAILABILITY: ▓▓▓▓▓▓▓▓░░ 87%
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
