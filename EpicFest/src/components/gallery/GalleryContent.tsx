"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import EmberOverlay from "@/components/ui/EmberOverlay";
import { galleryItems } from "@/data/gallery";
import { cn } from "@/lib/utils";

export default function GalleryContent() {
  const t = useTranslations("Gallery");
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const chapters = [1, 2, 3];
  const filtered = selectedChapter
    ? galleryItems.filter((g) => g.chapter === selectedChapter)
    : galleryItems;

  const photos = filtered.filter((g) => g.type === "photo");
  const videos = filtered.filter((g) => g.type === "video");

  return (
    <div className="pt-24 pb-20 relative overflow-hidden">
      <EmberOverlay density={25} className="z-0 opacity-40" />
      <Container className="relative z-10">
        <SectionHeading title={t("title")} />

        {/* Chapter filters */}
        <div className="flex justify-center gap-3 mb-10">
          <button
            onClick={() => setSelectedChapter(null)}
            className={cn(
              "px-4 py-2 rounded border text-sm transition-colors",
              selectedChapter === null
                ? "bg-gold text-dark-900 border-gold font-bold"
                : "border-border-subtle text-text-muted hover:border-gold hover:text-gold"
            )}
          >
            All
          </button>
          {chapters.map((ch) => (
            <button
              key={ch}
              onClick={() => setSelectedChapter(ch)}
              className={cn(
                "px-4 py-2 rounded border text-sm transition-colors",
                selectedChapter === ch
                  ? "bg-gold text-dark-900 border-gold font-bold"
                  : "border-border-subtle text-text-muted hover:border-gold hover:text-gold"
              )}
            >
              {t("chapter")} {ch}
            </button>
          ))}
        </div>

        {/* Photo grid (masonry-style with CSS columns) */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 mb-12">
          {photos.map((item, i) => (
            <div
              key={item.id}
              className="break-inside-avoid mb-4 group cursor-pointer"
              onClick={() => setLightboxIndex(i)}
            >
              <div
                className={cn(
                  "rounded-lg overflow-hidden border border-border-subtle group-hover:border-gold group-hover:shadow-[0_0_20px_rgba(212,168,75,0.1)] transition-all duration-300",
                  i % 3 === 0 ? "aspect-square" : i % 3 === 1 ? "aspect-[4/3]" : "aspect-[3/4]",
                  // Unique gradient per image for visual variety
                  i % 5 === 0 ? "bg-gradient-to-br from-amber-900/40 via-dark-600 to-dark-800" :
                  i % 5 === 1 ? "bg-gradient-to-br from-purple-900/40 via-dark-600 to-dark-800" :
                  i % 5 === 2 ? "bg-gradient-to-br from-red-900/40 via-dark-600 to-dark-800" :
                  i % 5 === 3 ? "bg-gradient-to-br from-blue-900/40 via-dark-600 to-dark-800" :
                  "bg-gradient-to-br from-green-900/40 via-dark-600 to-dark-800"
                )}
              >
                <div className="w-full h-full flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,75,0.06)_0%,transparent_60%)]" />
                  <span className="text-xs text-gold/25 text-center px-4 font-[family-name:var(--font-heading)] uppercase tracking-wider">
                    {item.alt}
                  </span>
                </div>
              </div>
              {item.credit && (
                <p className="text-xs text-text-muted mt-1 text-right">
                  Photo: {item.credit}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Videos */}
        {videos.length > 0 && (
          <>
            <h3 className="font-[family-name:var(--font-heading)] text-xl text-gold uppercase tracking-widest text-center mb-6">
              Videos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="aspect-video bg-dark-600 rounded-lg overflow-hidden border border-border-subtle"
                >
                  {video.videoUrl ? (
                    <iframe
                      src={video.videoUrl}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={video.alt}
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-muted">
                      {video.alt}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Simple lightbox */}
        {lightboxIndex !== null && (
          <div
            className="fixed inset-0 z-50 bg-dark-900/95 flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              className="absolute top-4 right-4 text-parchment hover:text-gold p-2"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="max-w-4xl w-full aspect-video bg-dark-600 rounded-lg flex items-center justify-center">
              <span className="text-lg text-gold/30">
                {photos[lightboxIndex]?.alt}
              </span>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
