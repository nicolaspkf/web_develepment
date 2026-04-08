"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import type { Band } from "@/types";

interface BandModalProps {
  band: Band;
  locale: string;
  onClose: () => void;
}

export default function BandModal({ band, locale, onClose }: BandModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  const bio = locale === "da" ? band.bio.da : band.bio.en;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={band.name}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-dark-900/90 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={ref}
        className="relative bg-dark-700 border border-border-ornate rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-text-muted hover:text-gold transition-colors z-10"
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Header image */}
        <BandModalImage band={band} />

        {/* Content */}
        <div className="p-6">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl text-text-heading uppercase tracking-wider mb-3">
            {band.name}
          </h2>

          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="gold">{band.genre}</Badge>
            <Badge>{band.country}</Badge>
            <Badge variant="outline">{band.day}</Badge>
            {band.time && <Badge variant="outline">{band.time}</Badge>}
          </div>

          <p className="text-parchment-dark leading-relaxed mb-6">{bio}</p>

          {/* Stage & time */}
          <div className="bg-dark-600 rounded-lg p-4 mb-6">
            <p className="text-sm text-text-muted uppercase tracking-wider mb-1">
              Playing
            </p>
            <p className="text-gold font-[family-name:var(--font-heading)] uppercase tracking-wider">
              {band.stage}
            </p>
            <p className="text-parchment text-sm">
              {band.day} {band.time && `· ${band.time}`}
            </p>
          </div>

          {/* Spotify embed */}
          {band.spotifyUrl && (
            <div className="mb-6">
              <iframe
                src={`https://open.spotify.com/embed/artist/${band.spotifyUrl.split("/artist/")[1]}?theme=0`}
                width="100%"
                height="152"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-lg"
                title={`${band.name} on Spotify`}
              />
            </div>
          )}

          {/* Links */}
          <div className="flex gap-3">
            {band.website && (
              <Button href={band.website} external variant="outline" size="sm">
                Official Website
              </Button>
            )}
            {band.spotifyUrl && (
              <Button href={band.spotifyUrl} external variant="ghost" size="sm">
                Spotify
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function BandModalImage({ band }: { band: Band }) {
  const [imgError, setImgError] = useState(false);
  const imagePath = `/images/bands/${band.slug}.jpg`;

  if (imgError) {
    return (
      <div className="aspect-video bg-gradient-to-br from-dark-900 via-dark-600 to-dark-800 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,75,0.1)_0%,transparent_60%)]" />
        <span className="font-[family-name:var(--font-display)] text-6xl text-gold/15 select-none relative z-10">
          {band.name.charAt(0)}
        </span>
        <span className="absolute bottom-4 left-6 font-[family-name:var(--font-heading)] text-2xl text-gold/30 uppercase tracking-widest">
          {band.name}
        </span>
      </div>
    );
  }

  return (
    <div className="aspect-video relative overflow-hidden">
      <Image
        src={imagePath}
        alt={band.name}
        fill
        className="object-cover"
        sizes="(max-width: 672px) 100vw, 672px"
        onError={() => setImgError(true)}
      />
      <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-dark-700 to-transparent" />
    </div>
  );
}
