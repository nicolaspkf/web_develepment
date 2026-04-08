"use client";

import { useTranslations, useLocale } from "next-intl";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import EmberOverlay from "@/components/ui/EmberOverlay";
import { tickets } from "@/data/tickets";
import { cn } from "@/lib/utils";

export default function TicketsContent() {
  const t = useTranslations("Tickets");
  const locale = useLocale();

  return (
    <div className="pt-24 pb-20 relative overflow-hidden">
      <EmberOverlay density={40} className="z-0 opacity-60" />
      <Container className="relative z-10">
        <SectionHeading title={t("title")} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tickets.map((tier, i) => {
            const name = locale === "da" ? tier.name.da : tier.name.en;
            const features = locale === "da" ? tier.features.da : tier.features.en;
            const isChampion = tier.id === "champion";

            return (
              <div
                key={tier.id}
                className={cn(
                  "relative rounded-lg border p-6 sm:p-8 flex flex-col",
                  isChampion
                    ? "bg-dark-600 border-gold glow-gold scale-105 z-10"
                    : "bg-dark-700 border-border-subtle"
                )}
              >
                {isChampion && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold text-dark-900 text-xs font-bold uppercase tracking-widest rounded-full">
                    Most Popular
                  </div>
                )}

                {/* Icon & name */}
                <div className="text-center mb-6">
                  <span className="text-5xl block mb-3">{tier.icon}</span>
                  <h3 className="font-[family-name:var(--font-heading)] text-xl text-parchment uppercase tracking-wider">
                    {name}
                  </h3>
                </div>

                {/* Price */}
                <div className="text-center mb-6">
                  <span className="font-[family-name:var(--font-heading)] text-4xl text-gold">
                    {tier.price}
                  </span>
                  <span className="text-text-muted text-sm ml-2">
                    {tier.currency}
                  </span>
                  <p className="text-xs text-text-muted mt-1">
                    ~{Math.round(tier.price / 7.45)} EUR
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <svg
                        className="w-4 h-4 text-gold shrink-0 mt-0.5"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                      </svg>
                      <span className="text-parchment-dark">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {tier.soldOut ? (
                  <div className="w-full py-3 bg-blood/20 border border-blood text-blood-bright text-center rounded font-bold uppercase tracking-widest text-sm">
                    {t("soldOut")}
                  </div>
                ) : (
                  <a
                    href={tier.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "w-full py-3 text-center rounded font-bold uppercase tracking-widest text-sm transition-colors block",
                      isChampion
                        ? "bg-gold text-dark-900 hover:bg-gold-light"
                        : "border-2 border-gold text-gold hover:bg-gold/10"
                    )}
                  >
                    {t("buyNow")}
                  </a>
                )}
              </div>
            );
          })}
        </div>

        {/* International guide hint */}
        <div className="mt-16 max-w-2xl mx-auto bg-dark-700 border border-border-subtle rounded-lg p-6 text-center">
          <h3 className="font-[family-name:var(--font-heading)] text-lg text-gold uppercase tracking-wider mb-3">
            {t("internationalGuide")}
          </h3>
          <p className="text-sm text-text-muted">
            The ticket system on Gimle.dk is in Danish. Select your ticket, click
            &quot;Køb&quot; (Buy), fill in your details, and pay with card. International
            cards are accepted. Contact us if you need help!
          </p>
        </div>
      </Container>
    </div>
  );
}
