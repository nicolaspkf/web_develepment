"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function CookieConsent() {
  const t = useTranslations("Common");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("epicfest-cookie-consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("epicfest-cookie-consent", "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("epicfest-cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="mx-auto max-w-3xl bg-dark-700 border border-border-subtle rounded-lg p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 shadow-2xl">
        <p className="text-sm text-parchment-dark flex-1 text-center sm:text-left">
          {t("cookieConsent")}
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm text-text-muted hover:text-parchment border border-border-subtle rounded transition-colors"
          >
            {t("decline")}
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm bg-gold text-dark-900 font-bold rounded hover:bg-gold-light transition-colors"
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
