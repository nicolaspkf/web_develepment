"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import CountdownTimer from "./CountdownTimer";
import ParticleField from "./ParticleField";
import { FESTIVAL_DATE_START } from "@/lib/constants";

export default function HeroSection() {
  const t = useTranslations("Home.hero");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-800" />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,75,0.08)_0%,transparent_60%)]" />

      {/* Particles */}
      <ParticleField />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#0a0908_100%)]" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Festival name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="font-[family-name:var(--font-display)] text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-gold-shimmer leading-none mb-4"
        >
          EpicFest
        </motion.h1>

        {/* Chapter subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-[family-name:var(--font-heading)] text-xl sm:text-2xl md:text-3xl text-text-heading uppercase tracking-widest mb-2"
        >
          {t("chapter")}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-[family-name:var(--font-accent)] text-lg sm:text-xl md:text-2xl text-gold italic mb-6"
        >
          {t("subtitle")}
        </motion.p>

        {/* Date & location */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="font-[family-name:var(--font-heading)] text-sm sm:text-base text-parchment-dark uppercase tracking-[0.2em] mb-10"
        >
          {t("date")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Button href="/tickets" size="lg">
            GET TICKETS
          </Button>
          <Button href="/lineup" variant="outline" size="lg">
            EXPLORE LINEUP
          </Button>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <CountdownTimer targetDate={FESTIVAL_DATE_START} />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="text-gold/50"
        >
          <path
            d="M12 5v14M5 12l7 7 7-7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </section>
  );
}
