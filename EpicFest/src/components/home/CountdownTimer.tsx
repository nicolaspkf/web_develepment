"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useCountdown } from "@/hooks/useCountdown";

interface CountdownTimerProps {
  targetDate: string;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const t = useTranslations("Home.countdown");
  const { days, hours, minutes, seconds, isExpired } =
    useCountdown(targetDate);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (isExpired && mounted) return null;

  const units = [
    { value: days, label: t("days") },
    { value: hours, label: t("hours") },
    { value: minutes, label: t("minutes") },
    { value: seconds, label: t("seconds") },
  ];

  return (
    <div className="flex justify-center gap-3 sm:gap-6">
      {units.map((unit) => (
        <div key={unit.label} className="text-center">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-dark-700 border border-border-subtle rounded-lg">
            <span className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl text-gold tabular-nums">
              {mounted ? String(unit.value).padStart(2, "0") : "--"}
            </span>
          </div>
          <span className="mt-2 block text-xs sm:text-sm text-text-muted uppercase tracking-wider">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
