"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Globe3D from "@/components/ui/3d-globe";

gsap.registerPlugin(ScrollTrigger);

const LAYERS = [
  {
    id: "shell",
    layerClass: "pt-layer-shell",
    textClass: "pt-text-shell",
    bg: "bg-gradient-to-b from-[#1a2a0f] to-[#0d1a06] border-2 border-[var(--accent-toxic)]",
    heading: "THE INTRODUCTION",
    body: "Citrus/Mint Cooling Shell. Numb the palate.",
    accent: "border-[var(--accent-toxic)]",
    accentText: "text-[var(--accent-toxic)]",
    tag: "LAYER_01",
  },
  {
    id: "core",
    layerClass: "pt-layer-core",
    textClass: "pt-text-core",
    bg: "bg-[var(--accent-magenta)]",
    heading: "THE PAYLOAD",
    body: "40mg Caffeine + L-Theanine Core.",
    accent: "border-[var(--accent-magenta)]",
    accentText: "text-[var(--accent-magenta)]",
    tag: "LAYER_02",
  },
  {
    id: "center",
    layerClass: "pt-layer-center",
    textClass: "pt-text-center",
    bg: "bg-white",
    heading: "THE FINISH",
    body: "Fizzing Center. Dopamine Reward.",
    accent: "border-white",
    accentText: "text-white",
    tag: "LAYER_03",
  },
] as const;

export default function PayloadTeardown() {
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
        ".pt-section-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.06, ease: "power2.out" },
        0,
      );

      tl.fromTo(
        ".pt-video-wrap",
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.2, ease: "power2.out" },
        0.06,
      );

      tl.fromTo(
        ".pt-text-shell",
        { x: 120, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.2, ease: "power3.out" },
        0.1,
      );

      tl.fromTo(
        ".pt-text-core",
        { x: 120, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.2, ease: "power3.out" },
        0.35,
      );

      tl.fromTo(
        ".pt-text-center",
        { x: 120, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.2, ease: "power3.out" },
        0.6,
      );

      tl.to(
        ".pt-content",
        { opacity: 0, duration: 0.15, ease: "power2.in" },
        0.96,
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-20 h-screen w-full overflow-hidden bg-black"
    >
      <div className="pt-content flex h-full w-full flex-col px-6 py-16 md:px-12 lg:px-20">
        {/* Section header */}
        <div className="pt-section-title shrink-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--terminal-muted)]">
            &gt; SENSORY_ARCHITECTURE_TEARDOWN_
          </p>
          <h2 className="mt-2 text-[clamp(2rem,5vw,4rem)] font-black uppercase leading-[0.9] tracking-tighter text-white">
            PAYLOAD
            <br />
            <span className="text-[var(--accent-magenta)]">TEARDOWN</span>
          </h2>
        </div>

        {/* Main content: layers left, text right */}
        <div className="grid flex-1 grid-cols-1 items-center gap-6 pt-8 md:grid-cols-[1.15fr_1fr] md:gap-2">
          {/* 3D globe */}
          <div className="relative flex items-center justify-center md:justify-start">
            <div className="pt-video-wrap relative w-full max-w-[38rem] will-change-transform md:max-w-[44rem]">
              <div className="relative z-10">
                <Globe3D
                  className="h-[420px] w-full md:h-[500px]"
                  config={{
                    autoRotateSpeed: 0.45,
                    showAtmosphere: false,
                  }}
                />
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-[72%] z-0 h-[32%] w-[10px] -translate-x-1/2 rounded-full bg-gradient-to-b from-white/85 via-white/65 to-white/25 shadow-[0_0_22px_rgba(255,255,255,0.25)]"
              />
            </div>
          </div>

          {/* Text reveals stacked on the right */}
          <div className="flex flex-col justify-center gap-10 md:pl-12">
            {LAYERS.map((layer) => (
              <div
                key={`text-${layer.id}`}
                className={`${layer.textClass} border-l-4 ${layer.accent} pl-4 will-change-transform md:pl-6`}
              >
                <h3
                  className={`text-xl font-black uppercase tracking-tighter md:text-2xl lg:text-3xl ${layer.accentText}`}
                >
                  {layer.heading}
                </h3>
                <p className="mt-1 font-mono text-xs leading-relaxed tracking-[0.08em] text-white/60 md:text-sm">
                  {layer.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom readout */}
        <div className="shrink-0 pt-6">
          <p className="font-mono text-[10px] tracking-[0.1em] text-white/20">
            CROSS_SECTION // EXPLODED_VIEW // 3_SENSORY_LAYERS //
            DISSOLUTION_SEQUENCE_ACTIVE
          </p>
        </div>
      </div>
    </section>
  );
}
