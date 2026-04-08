"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileNav from "./MobileNav";
import FireText from "@/components/ui/FireText";

const navItems = [
  { key: "lineup", href: "/lineup" },
  { key: "schedule", href: "/schedule" },
  { key: "quests", href: "/quests" },
  { key: "tickets", href: "/tickets" },
  { key: "venue", href: "/venue" },
  { key: "news", href: "/news" },
  { key: "gallery", href: "/gallery" },
  { key: "about", href: "/about" },
] as const;

export default function Header() {
  const t = useTranslations("Common");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-dark-800/95 backdrop-blur-md border-b border-border-subtle shadow-lg"
          : "bg-gradient-to-b from-dark-900/80 to-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 lg:h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="font-[family-name:var(--font-display)] text-2xl lg:text-3xl text-gold">
              EpicFest
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" role="navigation">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-[family-name:var(--font-heading)] uppercase tracking-wider transition-colors",
                  pathname === item.href || pathname.startsWith(item.href + "/")
                    ? "text-gold"
                    : "text-parchment-dark hover:text-gold"
                )}
              >
                <FireText>{t(`nav.${item.key}`)}</FireText>
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-parchment hover:text-gold transition-colors"
              aria-label="Open menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navItems={navItems}
      />
    </header>
  );
}
