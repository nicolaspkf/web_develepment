"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import EmberOverlay from "@/components/ui/EmberOverlay";

const stats = [
  { key: "days", value: 2 },
  { key: "stages", value: 3 },
  { key: "bands", value: 25, suffix: "+" },
  { key: "countries", value: 28, suffix: "+" },
  { key: "warriors", value: 3000, suffix: "+" },
];

export default function StatsCounters() {
  const t = useTranslations("Home.stats");
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 bg-dark-700 relative overflow-hidden">
      {/* Fire/ember effect at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gold/[0.02] to-transparent" />
      <EmberOverlay density={40} className="z-0" />

      <Container className="relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.key} className="group">
              <div className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl text-gold mb-2 drop-shadow-[0_0_10px_rgba(212,168,75,0.3)]">
                {visible ? (
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                ) : (
                  "0"
                )}
              </div>
              <div className="text-sm uppercase tracking-widest text-text-muted">
                {t(stat.key)}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function AnimatedNumber({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 40;
    const increment = value / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      if (step >= steps) {
        setCurrent(value);
        clearInterval(timer);
      } else {
        setCurrent(Math.round(increment * step));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {current.toLocaleString()}
      {suffix}
    </span>
  );
}
