"use client";

import { type FormEvent, useState } from "react";
import { motion } from "framer-motion";

export default function WaitlistCTA() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSuccess(true);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 72 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
      className="relative px-4 py-12 md:px-8 md:py-16"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-12 gap-y-10 md:gap-x-8">
        <div className="col-span-12 md:col-span-8 lg:col-span-7">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-terminal-muted)]">
            &gt; CLUB_CLEARANCE_PROTOCOL
          </p>

          <motion.h2
            onHoverStart={() => setIsGlitching(true)}
            onHoverEnd={() => setIsGlitching(false)}
            className="ml-[-0.02em] mt-4 max-w-4xl -rotate-[0.8deg] font-black uppercase leading-[0.88] tracking-tighter text-white"
          >
            <span className="relative inline-block">
              <span className="relative z-20 block text-[clamp(2.5rem,9vw,6.5rem)]">
                LIXX CLUB // SYNC ACCESS.
              </span>
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-10 text-[clamp(2.5rem,9vw,6.5rem)] text-[var(--color-accent-toxic)] mix-blend-screen"
                animate={
                  isGlitching
                    ? { x: [0, -2, 1, 0], y: [0, 1, -1, 0], opacity: [0, 0.75, 0.25, 0] }
                    : { x: 0, y: 0, opacity: 0 }
                }
                transition={{ duration: 0.2, repeat: isGlitching ? Infinity : 0, repeatDelay: 0.03 }}
              >
                LIXX CLUB // SYNC ACCESS.
              </motion.span>
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 text-[clamp(2.5rem,9vw,6.5rem)] text-[var(--color-accent-magenta)] mix-blend-screen"
                animate={isGlitching ? { x: [0, 2, -1, 0], opacity: [0, 0.45, 0.2, 0] } : { x: 0, opacity: 0 }}
                transition={{ duration: 0.18, repeat: isGlitching ? Infinity : 0, repeatDelay: 0.04 }}
              >
                LIXX CLUB // SYNC ACCESS.
              </motion.span>
            </span>
          </motion.h2>

          <p className="mt-5 max-w-xl border-l-4 border-[var(--color-accent-toxic)] pl-4 font-mono text-xs uppercase tracking-[0.12em] text-white/60">
            The Day-One Hamper drops to the waitlist first. Unverified users will be locked out.
          </p>
        </div>

        <div className="col-span-12 md:col-span-6 md:col-start-7 md:-mt-12 lg:col-span-5 lg:col-start-8">
          <div className="border border-zinc-700 bg-black/70 p-4 md:p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-terminal-muted)]">
              &gt; WAITLIST_TERMINAL
            </p>

            {isSuccess ? (
              <p className="mt-5 border-l-2 border-white pl-3 font-mono text-sm uppercase tracking-[0.12em] text-white">
                &gt; CREDENTIALS LOGGED. WELCOME TO THE CLUB.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-12 gap-3">
                <label htmlFor="waitlist-email" className="sr-only">
                  Email
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  required
                  placeholder="&gt; ENTER_EMAIL_PROTOCOL..."
                  className="col-span-12 rounded-none border-0 border-b-2 border-zinc-700 bg-transparent px-0 pb-3 pt-2 font-mono text-sm uppercase tracking-[0.12em] text-white outline-none focus:border-[var(--color-accent-toxic)]"
                />
                <button
                  type="submit"
                  data-custom-hover
                  className="col-span-12 border-2 border-white bg-black px-4 py-3 text-left font-mono text-[11px] uppercase tracking-[0.14em] text-white transition-none hover:bg-white hover:text-black"
                >
                  REQUEST_CLUB_CLEARANCE
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
