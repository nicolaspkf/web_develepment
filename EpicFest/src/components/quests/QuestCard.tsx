"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { questCategoryLabels } from "@/data/quests";
import type { Quest } from "@/types";
import { cn } from "@/lib/utils";
import { DragonIcon, FireIcon, HelmIcon, GobletIcon, ShieldIcon, CrystalBallIcon } from "@/components/ui/MedievalIcons";

const iconMap: Record<string, React.FC<{ className?: string; size?: number }>> = {
  dragon: DragonIcon,
  fire: FireIcon,
  helm: HelmIcon,
  goblet: GobletIcon,
  shield: ShieldIcon,
  crystal: CrystalBallIcon,
};

interface QuestCardProps {
  quest: Quest;
  locale: string;
}

export default function QuestCard({ quest, locale }: QuestCardProps) {
  const t = useTranslations("Quests");
  const [flipped, setFlipped] = useState(false);

  const title = locale === "da" ? quest.title.da : quest.title.en;
  const description = locale === "da" ? quest.description.da : quest.description.en;
  const categoryLabel = questCategoryLabels[quest.category];
  const CategoryIcon = categoryLabel ? iconMap[categoryLabel.iconType] : null;
  const spotsLeft = quest.maxSpots - quest.currentSpots;
  const isFull = spotsLeft <= 0;

  return (
    <div
      className="relative h-80 cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => setFlipped(!flipped)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && setFlipped(!flipped)}
      aria-label={`${title} - click to ${flipped ? "hide" : "show"} details`}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 bg-dark-600 border border-border-subtle rounded-lg p-6 flex flex-col items-center justify-center text-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          {CategoryIcon && <CategoryIcon size={48} className="text-gold mb-4" />}
          <h3 className="font-[family-name:var(--font-heading)] text-lg text-parchment uppercase tracking-wider mb-3">
            {title}
          </h3>

          {/* Difficulty swords */}
          <div className="flex gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="none" className={i < quest.difficulty ? "text-gold" : "text-dark-500"}>
                <path d="M12 2L14 8H10L12 2ZM12 22L10 16H14L12 22ZM12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ))}
          </div>

          <p className="text-xs text-text-muted">{quest.day} &middot; {quest.timeSlot}</p>

          <div className="mt-4">
            {isFull ? (
              <span className="text-xs text-blood-bright font-bold uppercase">
                {t("full")}
              </span>
            ) : (
              <span className="text-xs text-gold">
                {spotsLeft}/{quest.maxSpots} {t("spotsLeft")}
              </span>
            )}
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 bg-dark-700 border border-gold rounded-lg p-6 flex flex-col overflow-y-auto"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {CategoryIcon && <CategoryIcon size={28} className="text-gold mb-2" />}
          <h3 className="font-[family-name:var(--font-heading)] text-base text-gold uppercase tracking-wider mb-3">
            {title}
          </h3>
          <p className="text-sm text-parchment-dark leading-relaxed flex-1">
            {description}
          </p>
          <div className="mt-4 space-y-1 text-xs text-text-muted">
            <p>{quest.day} &middot; {quest.timeSlot}</p>
            <p>{quest.location}</p>
            {quest.dmOrInstructor && <p>{quest.dmOrInstructor}</p>}
          </div>
          {!isFull && (
            <button className="mt-4 w-full py-2 bg-gold text-dark-900 rounded font-bold text-sm uppercase tracking-widest hover:bg-gold-light transition-colors">
              JOIN QUEST
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
