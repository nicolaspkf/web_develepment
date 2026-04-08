"use client";

import { useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import OrnamentalDivider from "@/components/ui/OrnamentalDivider";
import Button from "@/components/ui/Button";
import { merchItems } from "@/data/merch";

export default function MerchCarousel() {
  const t = useTranslations("Home.merch");
  const locale = useLocale();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 280;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-20 bg-dark-900 relative overflow-hidden border-y border-gold/20">
      <Container>
        <SectionHeading title={t("title")} />

        <div className="relative">
          {/* Prev button */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-dark-800/90 border border-border-subtle text-gold hover:bg-dark-600 transition-colors -ml-2 lg:-ml-5"
            aria-label="Previous"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto mx-6 lg:mx-8 pb-4 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {merchItems.map((item) => (
              <div
                key={item.id}
                className="flex-none w-[220px] sm:w-[250px] group"
              >
                <div className="aspect-square bg-dark-700 rounded-lg border border-border-primary group-hover:border-gold transition-colors overflow-hidden mb-3 relative">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,75,0.06)_0%,transparent_70%)]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MerchPlaceholderIcon category={item.category} />
                  </div>
                  <div className="absolute bottom-2 right-2 text-[10px] text-text-muted/50 uppercase tracking-wider">
                    {locale === "da" ? "Billede kommer" : "Image TBD"}
                  </div>
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-sm text-parchment uppercase tracking-wider mb-1">
                  {locale === "da" ? item.name.da : item.name.en}
                </h3>
                <p className="text-gold font-bold text-sm">
                  {item.price} {item.currency}
                </p>
              </div>
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-dark-800/90 border border-border-subtle text-gold hover:bg-dark-600 transition-colors -mr-2 lg:-mr-5"
            aria-label="Next"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <OrnamentalDivider className="mt-12" />

        <div className="text-center mt-8">
          <Button href="/shop" variant="outline">
            {locale === "da" ? "Se Hele Shoppen" : "Visit Full Shop"}
          </Button>
        </div>
      </Container>
    </section>
  );
}

function MerchPlaceholderIcon({ category }: { category: string }) {
  const iconClass = "text-gold/60 w-16 h-16";
  switch (category) {
    case "apparel":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6.5 2L2 6.5V8h4v14h12V8h4V6.5L17.5 2h-3L12 5 9.5 2h-3z" />
        </svg>
      );
    case "accessories":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      );
    case "drinkware":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M8 2h8l-1 14H9L8 2zM7 22h10M9 16v6M15 16v6M6 6h12" />
        </svg>
      );
    default:
      return null;
  }
}
