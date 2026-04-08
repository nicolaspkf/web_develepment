"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import EmberOverlay from "@/components/ui/EmberOverlay";
import BandModal from "@/components/lineup/BandModal";
import { schedule, getStagesForDay } from "@/data/schedule";
import { getBandBySlug } from "@/data/bands";
import { cn } from "@/lib/utils";
import type { ScheduleSlot, Band } from "@/types";

export default function ScheduleContent() {
  const t = useTranslations("Schedule");
  const locale = useLocale();
  const [selectedDay, setSelectedDay] = useState<"Friday" | "Saturday">("Friday");
  const [selectedBand, setSelectedBand] = useState<Band | null>(null);

  const stages = getStagesForDay(selectedDay);
  const daySlots = schedule
    .filter((s) => s.day === selectedDay)
    .sort((a, b) => {
      const aT = a.startTime < "06:00" ? "24" + a.startTime.slice(2) : a.startTime;
      const bT = b.startTime < "06:00" ? "24" + b.startTime.slice(2) : b.startTime;
      return aT.localeCompare(bT);
    });

  const timeSlots = Array.from(new Set(daySlots.map((s) => {
    const t = s.startTime < "06:00" ? "24" + s.startTime.slice(2) : s.startTime;
    return t;
  }))).sort().map(t => t.startsWith("24") ? t.slice(2) : t);

  const handleSlotClick = (slot: ScheduleSlot) => {
    const band = getBandBySlug(slot.bandId);
    if (band) setSelectedBand(band);
  };

  return (
    <div className="pt-24 pb-20 relative overflow-hidden">
      <EmberOverlay density={35} className="z-0 opacity-50" />
      <Container className="relative z-10">
        <SectionHeading title={t("title")} />

        {/* Day tabs */}
        <div className="flex justify-center gap-3 mb-10">
          {(["Friday", "Saturday"] as const).map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={cn(
                "px-6 py-3 font-[family-name:var(--font-heading)] uppercase tracking-widest text-sm rounded border transition-all",
                selectedDay === day
                  ? "bg-gold text-dark-900 border-gold font-bold"
                  : "border-border-subtle text-text-muted hover:border-gold hover:text-gold"
              )}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Desktop grid */}
        <div className="hidden lg:block overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Stage headers */}
            <div className="grid gap-2" style={{ gridTemplateColumns: `100px repeat(${stages.length}, 1fr)` }}>
              <div />
              {stages.map((stage) => (
                <div
                  key={stage}
                  className="text-center py-3 bg-dark-700 rounded-t border border-border-subtle"
                >
                  <span className="font-[family-name:var(--font-heading)] text-xs uppercase tracking-wider text-gold">
                    {stage}
                  </span>
                </div>
              ))}
            </div>

            {/* Time rows */}
            {timeSlots.map((time) => {
              const slotsAtTime = stages.map((stage) =>
                daySlots.find((s) => s.startTime === time && s.stage === stage)
              );

              return (
                <div
                  key={time}
                  className="grid gap-2 mt-2"
                  style={{ gridTemplateColumns: `100px repeat(${stages.length}, 1fr)` }}
                >
                  <div className="flex items-center justify-center text-sm text-text-muted font-mono">
                    {time}
                  </div>
                  {slotsAtTime.map((slot, i) => (
                    <ScheduleSlotCard
                      key={`${time}-${stages[i]}`}
                      slot={slot}
                      onClick={slot ? () => handleSlotClick(slot) : undefined}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile list */}
        <div className="lg:hidden space-y-3">
          {daySlots.map((slot) => (
            <button
              key={slot.id}
              onClick={() => handleSlotClick(slot)}
              className="w-full flex gap-4 bg-dark-600 rounded-lg p-4 border border-border-subtle hover:border-gold transition-colors text-left"
            >
              <div className="text-sm text-text-muted font-mono shrink-0 w-20">
                {slot.startTime}
                <br />
                <span className="text-xs">- {slot.endTime}</span>
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-heading)] text-parchment uppercase tracking-wider text-sm">
                  {slot.bandName}
                </h3>
                <p className="text-xs text-gold mt-1">{slot.stage}</p>
                {slot.genre && (
                  <p className="text-xs text-text-muted mt-0.5">{slot.genre}</p>
                )}
              </div>
            </button>
          ))}
        </div>
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

function ScheduleSlotCard({ slot, onClick }: { slot: ScheduleSlot | undefined; onClick?: () => void }) {
  if (!slot) {
    return <div className="bg-dark-800/50 rounded min-h-[80px]" />;
  }

  const isAfterparty = slot.bandId.startsWith("afterparty");

  return (
    <button
      onClick={onClick}
      disabled={isAfterparty}
      className={cn(
        "bg-dark-600 border border-border-subtle rounded p-3 min-h-[80px] text-left transition-colors",
        !isAfterparty && "hover:border-gold hover:bg-dark-500 cursor-pointer",
        isAfterparty && "cursor-default opacity-70"
      )}
    >
      <h4 className="font-[family-name:var(--font-heading)] text-sm text-parchment uppercase tracking-wider">
        {slot.bandName}
      </h4>
      <p className="text-xs text-text-muted mt-1">
        {slot.startTime} - {slot.endTime}
      </p>
      {slot.genre && (
        <p className="text-xs text-gold/70 mt-1">{slot.genre}</p>
      )}
    </button>
  );
}
