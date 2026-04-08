"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import EmberOverlay from "@/components/ui/EmberOverlay";
import OrnamentalDivider from "@/components/ui/OrnamentalDivider";
import { merchItems, merchCategories, type MerchCategory, type MerchItem } from "@/data/merch";
import { cn } from "@/lib/utils";
import ProductModal from "./ProductModal";

type SortOption = "featured" | "price-asc" | "price-desc" | "name";

export default function ShopContent() {
  const t = useTranslations("Shop");
  const locale = useLocale();
  const [selectedCategory, setSelectedCategory] = useState<MerchCategory | "all">("all");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [showEur, setShowEur] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<MerchItem | null>(null);

  const DKK_TO_EUR = 7.45;

  const filtered = selectedCategory === "all"
    ? merchItems
    : merchItems.filter((item) => item.category === selectedCategory);

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name":
        return (locale === "da" ? a.name.da : a.name.en).localeCompare(
          locale === "da" ? b.name.da : b.name.en
        );
      case "featured":
      default:
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        if (a.new !== b.new) return a.new ? -1 : 1;
        return 0;
    }
  });

  return (
    <div className="pt-24 pb-20 relative overflow-hidden">
      <EmberOverlay density={20} className="z-0 opacity-30" />
      <Container className="relative z-10">
        <SectionHeading title={t("title")} />
        <p className="text-center text-parchment-dark mb-12 max-w-xl mx-auto">
          {t("subtitle")}
        </p>

        {/* Filters & Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={cn(
                "px-4 py-2 rounded border text-sm transition-colors",
                selectedCategory === "all"
                  ? "bg-gold text-dark-900 border-gold font-bold"
                  : "border-border-subtle text-text-muted hover:border-gold hover:text-gold"
              )}
            >
              {t("allProducts")}
            </button>
            {(Object.entries(merchCategories) as [MerchCategory, { da: string; en: string }][]).map(
              ([key, val]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={cn(
                    "px-4 py-2 rounded border text-sm transition-colors",
                    selectedCategory === key
                      ? "bg-gold text-dark-900 border-gold font-bold"
                      : "border-border-subtle text-text-muted hover:border-gold hover:text-gold"
                  )}
                >
                  {locale === "da" ? val.da : val.en}
                </button>
              )
            )}
          </div>

          {/* Currency toggle + Sort */}
          <div className="flex items-center gap-3">
          <button
            onClick={() => setShowEur(!showEur)}
            className="px-3 py-2 bg-dark-700 border border-border-subtle rounded text-sm text-parchment hover:border-gold transition-colors whitespace-nowrap"
          >
            {showEur ? "€ EUR" : "kr DKK"}
          </button>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-3 py-2 bg-dark-700 border border-border-subtle rounded text-sm text-parchment focus:outline-none focus:border-gold"
          >
            <option value="featured">{t("sortFeatured")}</option>
            <option value="price-asc">{t("sortPriceLow")}</option>
            <option value="price-desc">{t("sortPriceHigh")}</option>
            <option value="name">{t("sortName")}</option>
          </select>
          </div>
        </div>

        <OrnamentalDivider className="mb-8" />

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {sorted.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedProduct(item)}
              className="text-left group"
            >
              {/* Image */}
              <div className="aspect-square bg-dark-700 rounded-lg border border-border-subtle group-hover:border-gold transition-all duration-200 overflow-hidden mb-3 relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,75,0.05)_0%,transparent_70%)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <CategoryIcon category={item.category} />
                </div>

                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {item.new && (
                    <span className="px-2 py-0.5 bg-gold text-dark-900 text-[10px] font-bold uppercase tracking-wider rounded">
                      {t("new")}
                    </span>
                  )}
                  {item.soldOut && (
                    <span className="px-2 py-0.5 bg-red-800 text-parchment text-[10px] font-bold uppercase tracking-wider rounded">
                      {t("soldOut")}
                    </span>
                  )}
                </div>

                {/* Quick view overlay */}
                <div className="absolute inset-0 bg-dark-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-gold text-sm font-[family-name:var(--font-heading)] uppercase tracking-wider">
                    {t("quickView")}
                  </span>
                </div>
              </div>

              {/* Info */}
              <h3 className="font-[family-name:var(--font-heading)] text-sm text-parchment uppercase tracking-wider mb-1 group-hover:text-gold transition-colors line-clamp-2">
                {locale === "da" ? item.name.da : item.name.en}
              </h3>
              <p className="text-gold font-bold text-sm">
                {showEur
                  ? `€${Math.round(item.price / DKK_TO_EUR)}`
                  : `${item.price} DKK`}
                <span className="text-text-muted font-normal text-xs ml-1">
                  {showEur
                    ? `(${item.price} DKK)`
                    : `(~€${Math.round(item.price / DKK_TO_EUR)})`}
                </span>
              </p>
              {item.sizes && (
                <p className="text-[11px] text-text-muted mt-1">
                  {item.sizes.filter((s) => s.inStock).map((s) => s.label).join(" · ")}
                </p>
              )}
            </button>
          ))}
        </div>

        {sorted.length === 0 && (
          <p className="text-center text-text-muted py-16">{t("noProducts")}</p>
        )}

        {/* Bottom info */}
        <OrnamentalDivider className="my-12" />
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="font-[family-name:var(--font-heading)] text-xl text-text-heading uppercase tracking-wider mb-3">
            {t("infoTitle")}
          </h3>
          <p className="text-sm text-parchment-dark leading-relaxed">
            {t("infoText")}
          </p>
        </div>
      </Container>

      {/* Product modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          locale={locale}
          showEur={showEur}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

function CategoryIcon({ category }: { category: MerchCategory }) {
  const cls = "text-gold/40 w-14 h-14";
  switch (category) {
    case "t-shirts":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6.5 2L2 6.5V8h4v14h12V8h4V6.5L17.5 2h-3L12 5 9.5 2h-3z" />
        </svg>
      );
    case "hoodies":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6.5 2L2 6.5V8h4v14h12V8h4V6.5L17.5 2h-3L12 5 9.5 2h-3z" />
          <path d="M8 8v2a4 4 0 008 0V8" />
        </svg>
      );
    case "accessories":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      );
    case "drinkware":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M8 2h8l-1 14H9L8 2zM7 22h10M9 16v6M15 16v6M6 6h12" />
        </svg>
      );
    case "posters":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 15l5-5 4 4 3-3 6 6" />
          <circle cx="15" cy="8" r="2" />
        </svg>
      );
  }
}
