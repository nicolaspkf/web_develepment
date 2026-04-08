"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import EmberOverlay from "@/components/ui/EmberOverlay";
import Card from "@/components/ui/Card";
import OrnamentalDivider from "@/components/ui/OrnamentalDivider";
import { venues, accommodations, transport } from "@/data/venue";

export default function VenueContent() {
  const t = useTranslations("Venue");
  const locale = useLocale();

  return (
    <div className="pt-24 pb-20 relative overflow-hidden">
      <EmberOverlay density={25} className="z-0 opacity-40" />
      <Container className="relative z-10">
        <SectionHeading title={t("title")} />

        {/* Venues */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {venues.map((venue) => (
            <Card key={venue.id} ornate className="p-6">
              <div className="aspect-video bg-gradient-to-br from-dark-900 via-dark-600 to-dark-800 rounded mb-4 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(212,168,75,0.08)_0%,transparent_50%)]" />
                <span className="font-[family-name:var(--font-accent)] text-lg text-gold/20 uppercase text-center px-2 italic">
                  {venue.fantasyName}
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-lg text-gold uppercase tracking-wider mb-1">
                {venue.fantasyName}
              </h3>
              <p className="text-xs text-text-muted mb-3">{venue.name}</p>
              <p className="text-sm text-parchment-dark leading-relaxed">
                {locale === "da" ? venue.description.da : venue.description.en}
              </p>
              <p className="text-xs text-text-muted mt-3">{venue.address}</p>
            </Card>
          ))}
        </div>

        {/* Festival Maps */}
        <OrnamentalDivider variant="ornate" className="mb-12" />
        <h3 className="font-[family-name:var(--font-heading)] text-2xl text-text-heading uppercase tracking-wider text-center mb-4">
          {locale === "da" ? "Festivalområdet" : "Festival Realms"}
        </h3>
        <p className="text-center text-parchment-dark text-sm mb-8 max-w-xl mx-auto">
          {locale === "da"
            ? "Alle venues ligger inden for gåafstand af hinanden i Roskilde centrum (5-7 min gang)."
            : "All venues are within walking distance of each other in central Roskilde (5-7 min walk)."}
        </p>

        <FestivalMaps locale={locale} />

        {/* Transport */}
        <OrnamentalDivider variant="ornate" className="mb-12 mt-16" />
        <h3 className="font-[family-name:var(--font-heading)] text-2xl text-text-heading uppercase tracking-wider text-center mb-8">
          {t("gettingThere")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: "\uD83D\uDE82", label: "Train", text: locale === "da" ? transport.train.da : transport.train.en },
            { icon: "\uD83D\uDE97", label: "Car", text: locale === "da" ? transport.car.da : transport.car.en },
            { icon: "\u2708\uFE0F", label: "Airport", text: locale === "da" ? transport.airport.da : transport.airport.en },
          ].map((item) => (
            <div key={item.label} className="bg-dark-700 rounded-lg p-6 border border-border-subtle">
              <span className="text-3xl block mb-3">{item.icon}</span>
              <h4 className="font-[family-name:var(--font-heading)] text-sm text-gold uppercase tracking-wider mb-2">
                {item.label}
              </h4>
              <p className="text-sm text-parchment-dark leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Accommodation */}
        <OrnamentalDivider variant="ornate" className="mb-12" />
        <h3 className="font-[family-name:var(--font-heading)] text-2xl text-text-heading uppercase tracking-wider text-center mb-8">
          {t("accommodation")}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {accommodations.map((acc) => (
            <a
              key={acc.id}
              href={acc.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-dark-700 rounded-lg p-5 border border-border-subtle hover:border-gold transition-colors group"
            >
              <h4 className="font-[family-name:var(--font-heading)] text-sm text-parchment uppercase tracking-wider group-hover:text-gold transition-colors">
                {acc.name}
              </h4>
              <p className="text-xs text-text-muted mt-2">{acc.distance}</p>
              <p className="text-xs text-gold mt-1">{acc.priceRange}</p>
            </a>
          ))}
        </div>

        {/* Roskilde info */}
        <OrnamentalDivider variant="ornate" className="my-12" />
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="font-[family-name:var(--font-heading)] text-2xl text-text-heading uppercase tracking-wider mb-4">
            {t("aboutRoskilde")}
          </h3>
          <p className="text-parchment-dark leading-relaxed">
            {locale === "da"
              ? "Roskilde er en af Danmarks ældste byer med en rig historie. Besøg det UNESCO-listede Roskilde Domkirke, Vikingeskibsmuseet, eller udforsk byens hyggelige cafeer og restauranter."
              : "Roskilde is one of Denmark's oldest cities with a rich history. Visit the UNESCO-listed Roskilde Cathedral, the Viking Ship Museum, or explore the city's cozy cafés and restaurants."}
          </p>
          <a
            href="https://www.visitfjordlandet.dk/en/areas/roskilde/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-gold hover:text-gold-light underline underline-offset-4 transition-colors"
          >
            {locale === "da" ? "Besøg Roskilde Turistkontor →" : "Visit Roskilde Tourist Office →"}
          </a>
        </div>
      </Container>
    </div>
  );
}

function FestivalMaps({ locale }: { locale: string }) {
  const [expanded, setExpanded] = useState<"area" | "tavern" | null>(null);

  const maps = [
    {
      id: "area" as const,
      src: "/maps/epicfest-area-map.png",
      alt: "The Glorious Map of EpicFest — fantasy illustrated area map showing all venues",
      title: locale === "da" ? "The Glorious Map of EpicFest" : "The Glorious Map of EpicFest",
      description: locale === "da"
        ? "Oversigt over alle venues: The Realm of Might & Magic, The Drunken Siege Inn, Gimle og The Raven Tavern."
        : "Overview of all venues: The Realm of Might & Magic, The Drunken Siege Inn, Gimle, and The Raven Tavern.",
    },
    {
      id: "tavern" as const,
      src: "/maps/raven-tavern-map.png",
      alt: "The Raven Tavern floor plan — showing bar, boardgames, and toilets",
      title: "The Raven Tavern",
      description: locale === "da"
        ? "Detaljekort over The Raven Tavern med bar, brætspil og toiletter."
        : "Detailed floor plan of The Raven Tavern with bar, boardgames, and toilets.",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {maps.map((map) => (
          <div key={map.id} className="group">
            <button
              onClick={() => setExpanded(expanded === map.id ? null : map.id)}
              className="w-full text-left"
            >
              <div className="relative rounded-lg overflow-hidden border-2 border-border-subtle hover:border-gold/60 transition-colors">
                <Image
                  src={map.src}
                  alt={map.alt}
                  width={800}
                  height={800}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h4 className="font-[family-name:var(--font-heading)] text-lg text-gold uppercase tracking-wider">
                    {map.title}
                  </h4>
                  <p className="text-xs text-parchment-dark mt-1">{map.description}</p>
                  <span className="inline-block mt-2 text-xs text-gold/70 uppercase tracking-wider">
                    {expanded === map.id
                      ? (locale === "da" ? "Klik for at lukke" : "Click to close")
                      : (locale === "da" ? "Klik for at forstørre" : "Click to enlarge")}
                  </span>
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* Expanded lightbox */}
      {expanded && (
        <div
          className="fixed inset-0 z-50 bg-dark-900/95 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setExpanded(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh]">
            <Image
              src={maps.find((m) => m.id === expanded)!.src}
              alt={maps.find((m) => m.id === expanded)!.alt}
              width={1600}
              height={1600}
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
            />
            <button
              onClick={() => setExpanded(null)}
              className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full bg-dark-800/80 border border-border-subtle text-gold hover:bg-dark-600 transition-colors"
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
