"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  navItems: readonly { key: string; href: string }[];
}

export default function MobileNav({ open, onClose, navItems }: MobileNavProps) {
  const t = useTranslations("Common");
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      drawerRef.current?.querySelector("a")?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Close on route change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-dark-900/80 backdrop-blur-sm transition-opacity lg:hidden",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-72 bg-dark-700 border-l border-border-subtle shadow-2xl transition-transform duration-300 lg:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="p-2 text-parchment hover:text-gold transition-colors"
            aria-label="Close menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col px-6 gap-1">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "py-3 text-lg font-[family-name:var(--font-heading)] uppercase tracking-wider transition-colors border-b border-border-subtle",
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "text-gold"
                  : "text-parchment hover:text-gold"
              )}
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>

        <div className="px-6 mt-8">
          <Button href="/tickets" className="w-full">
            {t("cta.buyTickets")}
          </Button>
        </div>
      </div>
    </>
  );
}
