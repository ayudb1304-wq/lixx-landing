"use client";

import React, { useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import LollipopCanvas from "@/components/three/LollipopCanvas";
import { cn } from "@/lib/utils";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

gsap.registerPlugin(ScrollTrigger);

type Product = {
  id: "charge" | "zen" | "dream";
  name: string;
  subtitle: string;
  bg: string;
  accent: string;
  accent2: string;
  stats: { energy: number; focus: number; mood: number };
};

const PRODUCTS: Product[] = [
  {
    id: "charge",
    name: "Charge",
    subtitle: "The 3PM Resurrection",
    bg: "#050505",
    accent: "#FAFF00",
    accent2: "#ffffff",
    stats: { energy: 92, focus: 88, mood: 64 },
  },
  {
    id: "zen",
    name: "Zen",
    subtitle: "Social Lubricant",
    bg: "#050505",
    accent: "#B6A6E9",
    accent2: "#ffffff",
    stats: { energy: 56, focus: 72, mood: 90 },
  },
  {
    id: "dream",
    name: "Dream",
    subtitle: "Bio‑Hacked Hibernation",
    bg: "#050505",
    accent: "#8a64c8",
    accent2: "#ffffff",
    stats: { energy: 22, focus: 44, mood: 78 },
  },
];

function StatBar({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: string;
}) {
  return (
    <div className="grid grid-cols-[72px_1fr_40px] items-center gap-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/45">
        {label}
      </div>
      <div className="relative h-2 overflow-hidden rounded-full border border-white/10 bg-white/5">
        <div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            width: `${Math.max(0, Math.min(100, value))}%`,
            background: `linear-gradient(90deg, ${accent} 0%, rgba(255,255,255,0.75) 60%, ${accent} 100%)`,
            boxShadow: `0 0 18px ${accent}55`,
          }}
        />
      </div>
      <div className="text-right font-mono text-[10px] tracking-wide text-white/40">
        {value}
      </div>
    </div>
  );
}

export default function TheProductVault() {
  const mainRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const typeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glitchTimer = useRef<number | null>(null);

  const [active, setActive] = useState<Product["id"]>("charge");

  const totalSlides = PRODUCTS.length;

  const accentById = useMemo(() => {
    const m = new Map<Product["id"], string>();
    PRODUCTS.forEach((p) => m.set(p.id, p.accent));
    return m;
  }, []);

  useIsomorphicLayoutEffect(() => {
    const main = mainRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    if (!main || !sticky || !track) return;

    const ctx = gsap.context(() => {
      // Horizontal scrubbed movement
      const horizontalTween = gsap.to(track, {
        xPercent: -100 * (totalSlides - 1),
        ease: "none",
        scrollTrigger: {
          trigger: main,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: sticky,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });

      // Background vertical typography parallax
      typeRefs.current.forEach((el, index) => {
        if (!el) return;
        gsap.to(el, {
          xPercent: -18 - index * 6,
          ease: "none",
          scrollTrigger: {
            trigger: main,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });
      });

      // Slide entry triggers + glitch pulse (whole slide)
      slideRefs.current.forEach((slideEl, idx) => {
        if (!slideEl) return;
        ScrollTrigger.create({
          trigger: slideEl,
          containerAnimation: horizontalTween,
          start: "left center",
          end: "right center",
          onEnter: () => {
            const p = PRODUCTS[idx];
            if (p) setActive(p.id);
            slideEl.classList.add("vault-glitch");
            if (glitchTimer.current) window.clearTimeout(glitchTimer.current);
            glitchTimer.current = window.setTimeout(() => {
              slideEl.classList.remove("vault-glitch");
            }, 260);
          },
          onEnterBack: () => {
            const p = PRODUCTS[idx];
            if (p) setActive(p.id);
            slideEl.classList.add("vault-glitch");
            if (glitchTimer.current) window.clearTimeout(glitchTimer.current);
            glitchTimer.current = window.setTimeout(() => {
              slideEl.classList.remove("vault-glitch");
            }, 260);
          },
        });
      });

      // Ensure ScrollTrigger measures after layouts/fonts settle
      ScrollTrigger.refresh();
    }, main);

    return () => {
      if (glitchTimer.current) window.clearTimeout(glitchTimer.current);
      glitchTimer.current = null;
      ctx.revert();
    };
    // totalSlides stable; refs are stable; run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main
      id="product-vault"
      ref={mainRef}
      className="relative h-[400vh] w-full bg-[#050505]"
      style={{ backgroundColor: "#050505" }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 flex h-screen items-center overflow-hidden"
      >
        {/* Vault header / HUD */}
        <div className="pointer-events-none absolute left-0 top-0 z-30 w-full">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 md:px-10">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 animate-pulse rounded-full bg-white/30" />
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
                Product_Vault
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/30">
                Active:
              </span>
              <span
                className="font-mono text-[10px] uppercase tracking-[0.35em]"
                style={{ color: accentById.get(active) ?? "#ffffff" }}
              >
                {active}
              </span>
            </div>
          </div>
          <div className="h-px w-full bg-white/10" />
        </div>

        {/* Horizontal track */}
        <div
          ref={trackRef}
          className="relative flex h-full"
          style={{ width: `${totalSlides * 100}vw` }}
        >
          {PRODUCTS.map((p, index) => (
            <section
              key={p.id}
              ref={(el) => {
                slideRefs.current[index] = el;
              }}
              className={cn(
                "vault-slide relative h-screen w-screen flex-shrink-0",
                "bg-[#050505]"
              )}
              style={{ backgroundColor: p.bg }}
              aria-label={`${p.name} product`}
            >
              {/* Blueprint frame */}
              <div className="absolute inset-0 border border-white/10" />
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-0 top-0 h-6 w-6 border-l border-t border-white/20" />
                <div className="absolute right-0 top-0 h-6 w-6 border-r border-t border-white/20" />
                <div className="absolute bottom-0 left-0 h-6 w-6 border-b border-l border-white/20" />
                <div className="absolute bottom-0 right-0 h-6 w-6 border-b border-r border-white/20" />
              </div>

              {/* Vertical background typography */}
              <div
                ref={(el) => {
                  typeRefs.current[index] = el;
                }}
                className="vault-verticalType pointer-events-none absolute left-6 top-1/2 z-0 -translate-y-1/2 select-none md:left-10"
                style={{ color: `${p.accent}` }}
                aria-hidden="true"
              >
                {p.name.toUpperCase()}
              </div>

              {/* Content grid */}
              <div className="relative z-10 mx-auto grid h-full w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 py-24 md:grid-cols-2 md:px-10">
                {/* Text + stats */}
                <div className="relative">
                  <div className="mb-5 inline-flex items-center gap-3 border border-white/10 bg-white/5 px-4 py-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: p.accent, boxShadow: `0 0 18px ${p.accent}aa` }}
                    />
                    <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/50">
                      Underground_Armory
                    </span>
                  </div>

                  <h2
                    className="vault-glitchable font-display text-[13vw] leading-none tracking-tight text-white md:text-[6.2vw]"
                    style={{
                      textShadow: `0 0 70px ${p.accent}20`,
                    }}
                  >
                    {p.name}
                  </h2>
                  <p className="mt-4 font-body text-xs uppercase tracking-[0.3em] text-white/55 md:text-sm">
                    {p.subtitle}
                  </p>

                  <div className="mt-10 space-y-5 border border-white/10 bg-white/5 p-5 backdrop-blur-[6px] md:p-6">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
                        Flavor_Stats
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/30">
                        v0.1
                      </span>
                    </div>
                    <div className="h-px w-full bg-white/10" />
                    <div className="space-y-4">
                      <StatBar label="Energy" value={p.stats.energy} accent={p.accent} />
                      <StatBar label="Focus" value={p.stats.focus} accent={p.accent} />
                      <StatBar label="Mood" value={p.stats.mood} accent={p.accent} />
                    </div>
                  </div>
                </div>

                {/* 3D lollipop render */}
                <div className="relative flex items-center justify-center">
                  {/* Glow base */}
                  <div
                    className="pointer-events-none absolute -inset-10 rounded-full opacity-60 blur-3xl"
                    style={{
                      background: `radial-gradient(circle, ${p.accent}33 0%, transparent 65%)`,
                    }}
                    aria-hidden="true"
                  />

                  <div className="relative h-[56vh] w-[56vh] max-h-[520px] max-w-[520px]">
                    <LollipopCanvas
                      color={p.accent}
                      highlight={p.accent2}
                      className="absolute inset-0"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom fade */}
              <div
                className="pointer-events-none absolute bottom-0 left-0 z-20 h-28 w-full bg-gradient-to-t from-[#050505] to-transparent"
                aria-hidden="true"
              />
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

