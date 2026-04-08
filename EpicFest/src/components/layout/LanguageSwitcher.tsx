"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const toggleLocale = () => {
    const next = locale === "da" ? "en" : "da";
    router.replace(pathname, { locale: next });
  };

  return (
    <button
      onClick={toggleLocale}
      className="px-2 py-1 text-sm font-medium text-text-muted hover:text-gold transition-colors uppercase tracking-wider border border-border-subtle rounded hover:border-gold"
      aria-label={`Switch to ${locale === "da" ? "English" : "Danish"}`}
    >
      {locale === "da" ? "EN" : "DA"}
    </button>
  );
}
