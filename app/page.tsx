import Image from "next/image";
import Hero from "@/components/sections/Hero";
import WaitlistCTA from "@/components/sections/WaitlistCTA";
import PharmacokineticHack from "@/components/sections/PharmacokineticHack";
import PayloadTeardown from "@/components/sections/PayloadTeardown";

export default function Home() {
  return (
    <main className="relative flex flex-col bg-black text-[var(--color-foreground)]">
      <div className="relative flex h-screen flex-col overflow-hidden">
        <Hero />
      </div>

      <PharmacokineticHack />
      <PayloadTeardown />

      <section className="relative z-30 flex h-screen items-center border-t-2 border-zinc-800 bg-black">
        <div className="w-full px-4 md:px-8">
          <WaitlistCTA />
        </div>
      </section>

      {/* Fixed brand mark — bottom-left */}
      <div className="fixed bottom-6 left-6 z-50 md:bottom-8 md:left-8">
        <Image
          src="/logo.png"
          alt="Lixx logo"
          width={48}
          height={48}
          className="h-10 w-auto drop-shadow-[0_0_6px_rgba(255,42,212,0.5)] md:h-12"
          priority
        />
      </div>
    </main>
  );
}
