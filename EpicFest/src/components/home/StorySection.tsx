"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import DragonDivider from "@/components/ui/DragonDivider";

const chapters = [
  { year: 2023, number: "I", name: "Dawn of the Dragon Age", attendees: "550" },
  { year: 2024, number: "II", name: "Rise of the Raven Beast", attendees: "1,500" },
  { year: 2025, number: "III", name: "The Battle of Beasts", attendees: "3,000" },
  { year: 2026, number: "IV", name: "Tales of Might & Magic", attendees: "3,000+" },
];

export default function StorySection() {
  const t = useTranslations("Home.story");

  return (
    <section className="py-20 bg-dark-800 dragon-watermark fire-line">
      <Container>
        <DragonDivider className="mb-8" />
        <SectionHeading title={t("title")} divider={false} />
        <p className="text-center text-lg text-text-muted max-w-3xl mx-auto mb-12">
          {t("description")}
        </p>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold via-gold-muted to-transparent" />

          <div className="space-y-8">
            {chapters.map((ch, i) => (
              <div
                key={ch.year}
                className={`relative flex items-start gap-6 sm:gap-0 ${
                  i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 sm:left-1/2 w-3 h-3 -translate-x-1/2 mt-2 rounded-full bg-gold border-2 border-dark-800 z-10" />

                {/* Content */}
                <div
                  className={`ml-12 sm:ml-0 sm:w-1/2 ${
                    i % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:pl-12"
                  }`}
                >
                  <span className="text-gold font-[family-name:var(--font-heading)] text-sm uppercase tracking-widest">
                    {ch.year} — Chapter {ch.number}
                  </span>
                  <h3 className="font-[family-name:var(--font-accent)] text-xl text-text-heading mt-1">
                    {ch.name}
                  </h3>
                  <p className="text-text-muted text-sm mt-1">
                    {ch.attendees} warriors
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Button href="/about" variant="outline">
            Read the Full Story
          </Button>
        </div>
      </Container>
    </section>
  );
}
