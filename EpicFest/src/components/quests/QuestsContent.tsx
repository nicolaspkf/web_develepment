"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import EmberOverlay from "@/components/ui/EmberOverlay";
import QuestCard from "./QuestCard";
import { quests, questCategoryLabels } from "@/data/quests";
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

export default function QuestsContent() {
  const t = useTranslations("Quests");
  const locale = useLocale();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = Object.entries(questCategoryLabels);
  const filteredQuests =
    selectedCategory === "all"
      ? quests
      : quests.filter((q) => q.category === selectedCategory);

  return (
    <div className="pt-24 pb-20 relative overflow-hidden">
      <EmberOverlay density={30} className="z-0 opacity-50" />
      <Container className="relative z-10">
        {/* Hero */}
        <div className="text-center mb-16 parchment-texture py-12 rounded-lg bg-dark-700 relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl text-gold mb-4">
              {t("title")}
            </h1>
            <p className="font-[family-name:var(--font-accent)] text-lg text-parchment-dark italic">
              {t("subtitle")}
            </p>
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedCategory("all")}
            className={cn(
              "px-4 py-2 rounded border text-sm transition-colors",
              selectedCategory === "all"
                ? "bg-gold text-dark-900 border-gold font-bold"
                : "border-border-subtle text-text-muted hover:border-gold hover:text-gold"
            )}
          >
            All Quests
          </button>
          {categories.map(([key, val]) => {
            const Icon = iconMap[val.iconType];
            return (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={cn(
                  "px-4 py-2 rounded border text-sm transition-colors inline-flex items-center gap-2",
                  selectedCategory === key
                    ? "bg-gold text-dark-900 border-gold font-bold"
                    : "border-border-subtle text-text-muted hover:border-gold hover:text-gold"
                )}
              >
                {Icon && <Icon size={18} className="inline" />}
                {locale === "da" ? val.da : val.en}
              </button>
            );
          })}
        </div>

        {/* Quest grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuests.map((quest) => (
            <QuestCard key={quest.id} quest={quest} locale={locale} />
          ))}
        </div>

        {filteredQuests.length === 0 && (
          <p className="text-center text-text-muted py-12">
            No quests in this category.
          </p>
        )}
      </Container>
    </div>
  );
}
