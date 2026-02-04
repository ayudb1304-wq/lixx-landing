"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock } from "lucide-react";

// Redacted secret content - the mystery that induces FOMO
const REDACTED_SECRETS = [
  "Exclusive access to nootropic research protocols",
  "Underground rave locations in [REDACTED] cities",
  "Beta product drops before public release",
  "Private Discord with chemists & bio-hackers",
  "Early access to Batch 002 formulations",
];

// Redaction bar positions for the "classified document" effect
const REDACTION_BARS = [
  { top: "15%", width: "60%", rotation: -1 },
  { top: "35%", width: "75%", rotation: 0.5 },
  { top: "55%", width: "50%", rotation: -0.5 },
  { top: "75%", width: "65%", rotation: 1 },
];

export default function TheLixxClub() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    console.log("Email submitted:", email);

    // Mock API call - trigger success after 1.5s
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <section id="lixx-club" className="relative min-h-screen w-full overflow-hidden bg-lixx-black py-24 md:py-32">
      {/* LAYER 1: Redacted Background Content - The Mystery */}
      <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <div className="relative w-full max-w-2xl px-8">
          {/* Blurred secret text */}
          <div className="select-none text-center text-lg leading-relaxed text-white/30 blur-[6px] md:text-xl">
            {REDACTED_SECRETS.map((secret, index) => (
              <p key={index} className="my-4">
                {secret}
              </p>
            ))}
          </div>

          {/* Redaction bars overlay */}
          {REDACTION_BARS.map((bar, index) => (
            <motion.div
              key={index}
              className="absolute left-1/2 h-6 -translate-x-1/2 bg-lixx-black md:h-8"
              style={{
                top: bar.top,
                width: bar.width,
                transform: `translateX(-50%) rotate(${bar.rotation}deg)`,
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            />
          ))}
        </div>
      </div>

      {/* LAYER 2: Urgency Indicator - The Scarcity */}
      <motion.div
        className="absolute right-4 top-4 md:right-8 md:top-8"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-center gap-2 border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs uppercase tracking-wider">
          <span className="h-2 w-2 animate-pulse rounded-full bg-lixx-charge" />
          <span className="text-white/50">Batch 001 Status:</span>
          <span className="text-lixx-charge">closing_soon</span>
        </div>
      </motion.div>

      {/* LAYER 3: Main Content - The Gateway */}
      <div className="relative z-10 flex min-h-[80vh] flex-col items-center justify-center px-6">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              className="w-full max-w-xl text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              {/* The Guest List Header */}
              <motion.div
                className="mb-4 flex items-center justify-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="h-px w-8 bg-white/20" />
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">
                  The Guest List
                </span>
                <div className="h-px w-8 bg-white/20" />
              </motion.div>

              {/* Main Headline - Aggressive Typography */}
              <motion.h2
                className="mb-12 text-4xl font-extrabold uppercase leading-none tracking-tight text-white md:text-6xl lg:text-7xl"
                style={{ fontFamily: "var(--font-syne), sans-serif" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Are You On
                <br />
                <span className="text-lixx-charge">The List?</span>
              </motion.h2>

              {/* Lock Icon */}
              <motion.div
                className="mb-8 flex justify-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              >
                <div className="rounded-full border border-white/10 bg-white/5 p-4">
                  <Lock className="h-6 w-6 text-white/60" />
                </div>
              </motion.div>

              {/* The Form - Minimalist Gateway */}
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {/* Input Field */}
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER_CODENAME_OR_EMAIL"
                    required
                    className="w-full border-b-2 border-white/20 bg-transparent px-2 py-4 text-center font-mono text-lg text-white placeholder-white/30 outline-none transition-all duration-300 focus:border-lixx-charge focus:shadow-[0_4px_20px_-4px_rgba(250,255,0,0.3)] md:text-xl"
                    style={{ caretColor: "#FAFF00" }}
                  />
                </div>

                {/* Submit Button - The Velvet Rope */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="group relative overflow-hidden border-2 border-white bg-transparent px-12 py-4 font-mono text-sm uppercase tracking-[0.2em] text-white transition-colors duration-200 hover:bg-white hover:text-lixx-black disabled:cursor-not-allowed disabled:opacity-50"
                  whileHover={{
                    skewX: [0, -2, 2, -1, 0],
                    transition: { duration: 0.3 },
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Chromatic aberration layers on hover */}
                  <span className="relative z-10 inline-block transition-all duration-100 group-hover:[-webkit-text-stroke:0.5px_rgba(255,0,0,0.5)] group-hover:[text-shadow:_-2px_0_#ff0000,_2px_0_#00ffff]">
                    {isLoading ? "Processing..." : "Request Access"}
                  </span>

                  {/* Glitch overlay on hover */}
                  <motion.span
                    className="absolute inset-0 bg-lixx-charge opacity-0 mix-blend-difference"
                    whileHover={{ opacity: [0, 0.5, 0, 0.3, 0] }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>
              </motion.form>

              {/* Disclaimer */}
              <motion.p
                className="mt-8 font-mono text-[10px] uppercase tracking-wider text-white/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                No spam. Only classified drops.
              </motion.p>
            </motion.div>
          ) : (
            /* SUCCESS STATE - The Digital Access Card */
            <motion.div
              key="success"
              className="w-full max-w-md text-center"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.8,
              }}
            >
              {/* The Access Card */}
              <motion.div
                className="relative overflow-hidden border border-white/20 bg-gradient-to-b from-white/10 to-white/5 p-8 backdrop-blur-sm"
                initial={{ rotateX: -15 }}
                animate={{ rotateX: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {/* Card Header */}
                <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                    Lixx Club
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-lixx-charge">
                    Batch 001
                  </span>
                </div>

                {/* Unlocked Icon */}
                <motion.div
                  className="mb-6 flex justify-center"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.4,
                    type: "spring",
                    stiffness: 200,
                    damping: 12,
                  }}
                >
                  <div className="rounded-full border border-lixx-charge/30 bg-lixx-charge/10 p-4">
                    <Unlock className="h-8 w-8 text-lixx-charge" />
                  </div>
                </motion.div>

                {/* Status Message */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <h3
                    className="mb-2 text-2xl font-extrabold uppercase tracking-tight text-white md:text-3xl"
                    style={{ fontFamily: "var(--font-syne), sans-serif" }}
                  >
                    Access_Pending
                  </h3>
                  <p className="font-mono text-sm uppercase tracking-wider text-white/50">
                    Stand by.
                  </p>
                </motion.div>

                {/* Animated scan line */}
                <motion.div
                  className="absolute left-0 h-px w-full bg-gradient-to-r from-transparent via-lixx-charge to-transparent"
                  initial={{ top: "0%" }}
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Corner accents */}
                <div className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-lixx-charge" />
                <div className="absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-lixx-charge" />
                <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-lixx-charge" />
                <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-lixx-charge" />
              </motion.div>

              {/* Email confirmation */}
              <motion.p
                className="mt-6 font-mono text-xs text-white/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Confirmation sent to: <span className="text-white/50">{email}</span>
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* LAYER 4: Bottom gradient fade */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-lixx-black to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
