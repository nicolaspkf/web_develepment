"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import OrnamentalDivider from "@/components/ui/OrnamentalDivider";
import {
  FESTIVAL_NAME,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  YOUTUBE_URL,
  SPOTIFY_URL,
} from "@/lib/constants";

export default function Footer() {
  const t = useTranslations("Common");

  return (
    <footer className="bg-dark-900 border-t border-border-subtle mt-auto">
      {/* Newsletter Section */}
      <div className="bg-dark-700 py-16 parchment-texture">
        <Container className="text-center relative z-10">
          <OrnamentalDivider variant="ornate" className="mb-6" />
          <h3 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl text-text-heading uppercase tracking-wide mb-3">
            {t("footer.newsletter")}
          </h3>
          <p className="text-text-muted mb-8 max-w-lg mx-auto">
            {t("footer.newsletterSub")}
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder={t("footer.emailPlaceholder")}
              required
              className="flex-1 px-4 py-3 bg-dark-800 border border-border-subtle rounded text-parchment placeholder:text-text-muted focus:outline-none focus:border-gold transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gold text-dark-900 font-bold uppercase tracking-widest text-sm rounded hover:bg-gold-light transition-colors"
            >
              {t("footer.subscribe")}
            </button>
          </form>
        </Container>
      </div>

      {/* Main Footer */}
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <span className="font-[family-name:var(--font-display)] text-3xl text-gold">
              {FESTIVAL_NAME}
            </span>
            <p className="mt-3 text-sm text-text-muted">
              Denmark&apos;s premier power &amp; fantasy metal festival.
              Roskilde.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-[family-name:var(--font-heading)] text-sm uppercase tracking-wider text-gold mb-4">
              Festival
            </h4>
            <ul className="space-y-2">
              {["lineup", "schedule", "tickets", "quests"].map((key) => (
                <li key={key}>
                  <Link
                    href={`/${key}`}
                    className="text-sm text-text-muted hover:text-gold transition-colors"
                  >
                    {t(`nav.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h4 className="font-[family-name:var(--font-heading)] text-sm uppercase tracking-wider text-gold mb-4">
              Info
            </h4>
            <ul className="space-y-2">
              {["venue", "news", "gallery", "about"].map((key) => (
                <li key={key}>
                  <Link
                    href={`/${key}`}
                    className="text-sm text-text-muted hover:text-gold transition-colors"
                  >
                    {t(`nav.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-[family-name:var(--font-heading)] text-sm uppercase tracking-wider text-gold mb-4">
              Follow Us
            </h4>
            <div className="flex gap-4">
              {[
                { name: "Facebook", url: FACEBOOK_URL, icon: "fb" },
                { name: "Instagram", url: INSTAGRAM_URL, icon: "ig" },
                { name: "YouTube", url: YOUTUBE_URL, icon: "yt" },
                { name: "Spotify", url: SPOTIFY_URL, icon: "sp" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded border border-border-subtle text-text-muted hover:text-gold hover:border-gold transition-colors"
                  aria-label={social.name}
                >
                  <SocialIcon type={social.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <OrnamentalDivider className="my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-text-muted">
          <p>
            &copy; {new Date().getFullYear()} {FESTIVAL_NAME}.{" "}
            {t("footer.rights")}
          </p>
          <p>
            Organized by{" "}
            <a
              href="mailto:info@nightcrawlermanagement.com"
              className="text-gold/70 hover:text-gold transition-colors"
            >
              Nightcrawler Management
            </a>
          </p>
          <p className="italic">{t("footer.customBrewed")}</p>
        </div>
      </Container>
    </footer>
  );
}

function SocialIcon({ type }: { type: string }) {
  switch (type) {
    case "fb":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
        </svg>
      );
    case "ig":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
        </svg>
      );
    case "yt":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23 9.71a8.5 8.5 0 00-.91-4.13 2.92 2.92 0 00-1.72-1.12A87.55 87.55 0 0012 4a87.55 87.55 0 00-8.37.46A2.92 2.92 0 001.91 5.58 8.5 8.5 0 001 9.71a44.38 44.38 0 000 4.58 8.5 8.5 0 00.91 4.13 2.92 2.92 0 001.72 1.12A87.55 87.55 0 0012 20a87.55 87.55 0 008.37-.46 2.92 2.92 0 001.72-1.12 8.5 8.5 0 00.91-4.13 44.38 44.38 0 000-4.58zM9.74 14.85V9.15l5.47 2.85z" />
        </svg>
      );
    case "sp":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
      );
    default:
      return null;
  }
}
