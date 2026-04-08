"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import BandCard from "./BandCard";
import BandModal from "./BandModal";
import EmberOverlay from "@/components/ui/EmberOverlay";
import { bands, getHeadliners } from "@/data/bands";
import { STAGES, DAYS } from "@/lib/constants";
import type { Band } from "@/types";
import { cn } from "@/lib/utils";

export default function LineupContent() {
  const t = useTranslations("Lineup");
  const locale = useLocale();
  const [selectedDay, setSelectedDay] = useState<string>("All");
  const [selectedStage, setSelectedStage] = useState<string>("All");
  const [selectedBand, setSelectedBand] = useState<Band | null>(null);

  const headliners = getHeadliners();
  const filteredBands = bands.filter((band) => {
    if (selectedDay !== "All" && band.day !== selectedDay) return false;
    if (selectedStage !== "All" && band.stage !== selectedStage) return false;
    return true;
  });

  return (
    <div className="pt-24 pb-20 relative overflow-hidden">
      <EmberOverlay density={45} className="z-0 opacity-60" />
      <Container className="relative z-10">
        <SectionHeading title={t("title")} />

        {/* Headliners */}
        <div className="mb-16">
          <h3 className="font-[family-name:var(--font-heading)] text-xl text-gold uppercase tracking-widest text-center mb-8">
            {t("headliners")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {headliners.map((band) => (
              <BandCard
                key={band.id}
                band={band}
                locale={locale}
                ornate
                onClick={() => setSelectedBand(band)}
              />
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          <FilterGroup
            label={t("filterDay")}
            options={["All", ...DAYS]}
            selected={selectedDay}
            onSelect={setSelectedDay}
            allLabel={t("filterAll")}
          />
          <div className="w-px h-8 bg-border-subtle hidden sm:block" />
          <FilterGroup
            label={t("filterStage")}
            options={["All", ...STAGES]}
            selected={selectedStage}
            onSelect={setSelectedStage}
            allLabel={t("filterAll")}
          />
        </div>

        {/* Full lineup */}
        <h3 className="font-[family-name:var(--font-heading)] text-xl text-gold uppercase tracking-widest text-center mb-8">
          {t("fullLineup")}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredBands.map((band) => (
            <BandCard
              key={band.id}
              band={band}
              locale={locale}
              onClick={() => setSelectedBand(band)}
            />
          ))}
        </div>

        {filteredBands.length === 0 && (
          <p className="text-center text-text-muted py-12">
            No bands match your filters.
          </p>
        )}
      </Container>

      {/* Band modal */}
      {selectedBand && (
        <BandModal
          band={selectedBand}
          locale={locale}
          onClose={() => setSelectedBand(null)}
        />
      )}
    </div>
  );
}

function FilterGroup({
  label,
  options,
  selected,
  onSelect,
  allLabel,
}: {
  label: string;
  options: readonly string[];
  selected: string;
  onSelect: (v: string) => void;
  allLabel: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-text-muted uppercase tracking-wider">
        {label}:
      </span>
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          className={cn(
            "px-3 py-1.5 text-xs rounded border transition-colors",
            selected === opt
              ? "bg-gold text-dark-900 border-gold font-bold"
              : "border-border-subtle text-text-muted hover:border-gold hover:text-gold"
          )}
        >
          {opt === "All" ? allLabel : opt}
        </button>
      ))}
    </div>
  );
}
