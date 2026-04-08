"use client";

import Container from "@/components/ui/Container";
import EmberOverlay from "@/components/ui/EmberOverlay";

const headliners = [
  "Sonata Arctica",
  "Ensiferum",
  "Roy Khan",
  "Rhapsody of Fire",
  "Masterplan",
];

export default function HeadlinerStrip() {
  return (
    <section className="py-10 bg-dark-900 border-y border-gold/20 overflow-hidden relative fire-line">
      {/* Warm glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,75,0.04)_0%,transparent_70%)]" />
      <EmberOverlay density={35} className="z-0 opacity-70" />

      <Container className="relative z-10">
        <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap">
          {headliners.map((band) => (
            <span
              key={band}
              className="font-[family-name:var(--font-heading)] text-lg sm:text-xl lg:text-2xl text-gold/70 hover:text-gold hover:drop-shadow-[0_0_8px_rgba(212,168,75,0.4)] uppercase tracking-widest transition-all duration-300 cursor-default whitespace-nowrap"
            >
              {band}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
