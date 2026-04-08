"use client";

import Image from "next/image";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { FlagRippleCanvas } from "@/components/ui/FlagRipple";
import type { Band } from "@/types";
import { useState } from "react";

interface BandCardProps {
  band: Band;
  locale: string;
  ornate?: boolean;
  onClick: () => void;
}

const genreGradients: Record<string, string> = {
  "Power Metal": "from-amber-900/60 via-dark-600 to-dark-700",
  "Folk Metal": "from-green-900/60 via-dark-600 to-dark-700",
  "Symphonic Power Metal": "from-purple-900/60 via-dark-600 to-dark-700",
  "Heavy/Power Metal": "from-red-900/60 via-dark-600 to-dark-700",
  "Viking/Power Metal": "from-cyan-900/60 via-dark-600 to-dark-700",
  "Symphonic Gothic Metal": "from-violet-900/60 via-dark-600 to-dark-700",
  "Symphonic Metal": "from-indigo-900/60 via-dark-600 to-dark-700",
  "Melodic Death/Power Metal": "from-red-950/60 via-dark-600 to-dark-700",
};

export default function BandCard({ band, locale, ornate = false, onClick }: BandCardProps) {
  const gradient = genreGradients[band.genre] || "from-dark-500 via-dark-600 to-dark-700";
  const [imgError, setImgError] = useState(false);
  const imagePath = `/images/bands/${band.slug}.jpg`;

  return (
    <FlagRippleCanvas>
    <Card
      ornate={ornate}
      hover
      className="cursor-pointer group"
      as="article"
    >
      <button onClick={onClick} className="w-full text-left">
        {/* Band image or gradient placeholder */}
        <div className={`aspect-square overflow-hidden relative ${imgError ? `bg-gradient-to-br ${gradient}` : ''}`}>
          {!imgError ? (
            <Image
              src={imagePath}
              alt={band.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              onError={() => setImgError(true)}
            />
          ) : (
            <>
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: "radial-gradient(circle at 30% 40%, rgba(212,168,75,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(212,168,75,0.2) 0%, transparent 40%)"
              }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-[family-name:var(--font-display)] text-7xl sm:text-8xl text-gold/15 select-none">
                  {band.name.charAt(0)}
                </span>
              </div>
            </>
          )}

          {/* Headliner star */}
          {band.isHeadliner && (
            <div className="absolute top-3 right-3 z-10">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-gold drop-shadow-lg">
                <path d="M12 2l3 6 6 1-4.5 4 1.5 6-6-3.5L6 19l1.5-6L3 9l6-1z" />
              </svg>
            </div>
          )}

          {/* Bottom gradient overlay for text readability */}
          <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-dark-900/80 to-transparent z-[1]" />

          {/* Country */}
          <div className="absolute bottom-2 left-3 text-xs text-gold/70 font-[family-name:var(--font-body)] z-[2]">
            {band.country}
          </div>
        </div>

        {/* Info */}
        <div className="p-4 sm:p-5">
          <h3 className="font-[family-name:var(--font-heading)] text-sm sm:text-base text-parchment uppercase tracking-wider mb-2 group-hover:text-gold transition-colors">
            {band.name}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="gold" size="sm">
              {band.genre}
            </Badge>
            <Badge size="sm">{band.day}</Badge>
          </div>
        </div>
      </button>
    </Card>
    </FlagRippleCanvas>
  );
}
