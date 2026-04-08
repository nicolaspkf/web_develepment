"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { MerchItem } from "@/data/merch";

interface ProductModalProps {
  product: MerchItem;
  locale: string;
  showEur: boolean;
  onClose: () => void;
}

const DKK_TO_EUR = 7.45;

export default function ProductModal({ product, locale, showEur, onClose }: ProductModalProps) {
  const t = useTranslations("Shop");
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes?.[0]?.label ?? null
  );

  const name = locale === "da" ? product.name.da : product.name.en;
  const desc = locale === "da" ? product.description.da : product.description.en;
  const eurPrice = Math.round(product.price / 7.45);

  return (
    <div
      className="fixed inset-0 z-50 bg-dark-900/95 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-dark-800 border border-border-subtle rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="aspect-square bg-dark-700 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,75,0.06)_0%,transparent_70%)]" />
            <svg className="text-gold/30 w-24 h-24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M6.5 2L2 6.5V8h4v14h12V8h4V6.5L17.5 2h-3L12 5 9.5 2h-3z" />
            </svg>
            <div className="absolute bottom-3 right-3 text-xs text-text-muted/50 uppercase">
              {locale === "da" ? "Billede kommer" : "Image TBD"}
            </div>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {product.new && (
                <span className="px-2 py-1 bg-gold text-dark-900 text-xs font-bold uppercase tracking-wider rounded">
                  {t("new")}
                </span>
              )}
              {product.soldOut && (
                <span className="px-2 py-1 bg-red-800 text-parchment text-xs font-bold uppercase tracking-wider rounded">
                  {t("soldOut")}
                </span>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="p-6">
            {/* Close button */}
            <button
              onClick={onClose}
              className="float-right w-8 h-8 flex items-center justify-center rounded-full hover:bg-dark-600 text-text-muted hover:text-gold transition-colors"
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <h2 className="font-[family-name:var(--font-heading)] text-xl text-gold uppercase tracking-wider mb-2 pr-8">
              {name}
            </h2>

            <div className="mb-4">
              <span className="text-2xl font-bold text-parchment">
                {showEur ? `€${eurPrice}` : `${product.price} DKK`}
              </span>
              <span className="text-sm text-text-muted ml-2">
                {showEur ? `(${product.price} DKK)` : `(~€${eurPrice})`}
              </span>
            </div>

            <p className="text-sm text-parchment-dark leading-relaxed mb-6">{desc}</p>

            {/* Sizes */}
            {product.sizes && (
              <div className="mb-6">
                <label className="text-xs text-text-muted uppercase tracking-wider block mb-2">
                  {t("size")}
                </label>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size.label}
                      onClick={() => size.inStock && setSelectedSize(size.label)}
                      disabled={!size.inStock}
                      className={`w-10 h-10 rounded border text-sm transition-colors ${
                        selectedSize === size.label
                          ? "bg-gold text-dark-900 border-gold font-bold"
                          : size.inStock
                          ? "border-border-subtle text-parchment hover:border-gold"
                          : "border-border-subtle/30 text-text-muted/30 cursor-not-allowed line-through"
                      }`}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Info note */}
            <div className="bg-dark-700 rounded p-3 text-xs text-text-muted leading-relaxed">
              <p>{t("purchaseNote")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
