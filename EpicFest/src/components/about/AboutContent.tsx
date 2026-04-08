"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import EmberOverlay from "@/components/ui/EmberOverlay";
import OrnamentalDivider from "@/components/ui/OrnamentalDivider";
import { cn } from "@/lib/utils";

const pastEditions = [
  {
    chapter: "I",
    year: 2023,
    name: "Dawn of the Dragon Age",
    attendees: 550,
    headliners: ["Blind Guardian", "Orden Ogan"],
    description: {
      da: "Det hele startede her. 550 krigere samledes i Roskilde til Danmarks allerførste dedikerede power metal festival.",
      en: "It all started here. 550 warriors gathered in Roskilde for Denmark's very first dedicated power metal festival.",
    },
  },
  {
    chapter: "II",
    year: 2024,
    name: "Rise of the Raven Beast",
    headliners: ["Stratovarius", "Beast In Black"],
    attendees: 1500,
    description: {
      da: "EpicFest tredobledes i størrelse. Tre scener, D&D quests debuterede, og The Raven Tavern åbnede sine døre.",
      en: "EpicFest tripled in size. Three stages, D&D quests debuted, and The Raven Tavern opened its doors.",
    },
  },
  {
    chapter: "III",
    year: 2025,
    name: "The Battle of Beasts",
    headliners: ["Rhapsody of Fire", "Ensiferum", "Gloryhammer"],
    attendees: 3000,
    description: {
      da: "Den hidtil største udgave. 3.000 deltagere fra 28+ lande. Åbningsceremonien med Roskilde Domkirkes Pigekor blev et uforglemmelig øjeblik.",
      en: "The biggest edition yet. 3,000 attendees from 28+ countries. The opening ceremony with the Roskilde Cathedral Girls' Choir was an unforgettable moment.",
    },
  },
];

const faq = [
  {
    q: { da: "Hvad er aldersgrænsen?", en: "What is the age limit?" },
    a: { da: "EpicFest er for alle aldre. Børn under 12 har gratis adgang med en betalende voksen.", en: "EpicFest is for all ages. Children under 12 enter free with a paying adult." },
  },
  {
    q: { da: "Hvad er den lovlige drikkealder i Danmark?", en: "What is the legal drinking age in Denmark?" },
    a: { da: "I Danmark er der ingen aldersgrænse for at drikke alkohol, men du skal være 16 år for at købe drikkevarer med under 16,5% alkohol i butikker, og 18 år for stærkere drikkevarer. I barer og til festivaler skal du være 18 år for at købe alkohol.", en: "In Denmark there is no legal age for consuming alcohol, but you must be 16 to purchase beverages under 16.5% ABV in stores, and 18 for stronger drinks. At bars and festivals you must be 18 to purchase alcohol." },
  },
  {
    q: { da: "Kan jeg få refusion?", en: "Can I get a refund?" },
    a: { da: "Billetter kan refunderes op til 30 dage før festivalen. Kontakt os via email.", en: "Tickets can be refunded up to 30 days before the festival. Contact us via email." },
  },
  {
    q: { da: "Er der tilgængelighed for kørestolsbrugere?", en: "Is there wheelchair accessibility?" },
    a: { da: "Ja, alle tre venues har kørestolsadgang. Kontakt os på forhånd for at arrangere assistance.", en: "Yes, all three venues have wheelchair access. Contact us in advance to arrange assistance." },
  },
  {
    q: { da: "Må jeg klæde mig ud / cosplaye?", en: "Can I dress up / cosplay?" },
    a: { da: "Absolut! Cosplay og LARP-kostumer er meget velkomne. Dog ingen rigtige våben — kun rekvisitter af skum eller lignende.", en: "Absolutely! Cosplay and LARP costumes are very welcome. No real weapons though — only foam props or similar." },
  },
  {
    q: { da: "Hvad skal jeg tage med?", en: "What should I bring?" },
    a: { da: "Dit gode humør, dit kostume (hvis du har et), og ørepropper. Vi anbefaler også behageligt fodtøj — du kommer til at stå meget.", en: "Your good mood, your costume (if you have one), and earplugs. We also recommend comfortable footwear — you'll be standing a lot." },
  },
  {
    q: { da: "Kan jeg købe merch på festivalen?", en: "Can I buy merch at the festival?" },
    a: { da: "Ja! Der er en merch-stand med officiel EpicFest merch samt merchandise fra de optrædende bands.", en: "Yes! There's a merch stand with official EpicFest merchandise as well as merchandise from the performing bands." },
  },
];

export default function AboutContent() {
  const t = useTranslations("About");
  const locale = useLocale();

  return (
    <div className="pt-24 pb-20 relative overflow-hidden">
      <EmberOverlay density={25} className="z-0 opacity-40" />
      <Container className="relative z-10">
        <SectionHeading title={t("title")} />

        {/* The Story */}
        <section className="max-w-3xl mx-auto mb-20">
          <h3 className="font-[family-name:var(--font-heading)] text-2xl text-gold uppercase tracking-wider text-center mb-6">
            {t("story")}
          </h3>
          <div className="prose-epicfest space-y-4 text-parchment-dark leading-relaxed">
            <p className="first-letter:font-[family-name:var(--font-accent)] first-letter:text-5xl first-letter:text-gold first-letter:float-left first-letter:mr-3 first-letter:mt-1">
              {locale === "da"
                ? "I april 2023 samledes 550 metal-fans i Roskilde til noget aldrig set før i Danmark: en festival dedikeret udelukkende til power metal og fantasy-kultur. Grundlagt af Søren Weiss Kristiansen — manden bag Udgårdsfest — blev EpicFest født ud af en passion for episk musik og tabletop-rollespil."
                : "In April 2023, 550 metal fans gathered in Roskilde for something never seen before in Denmark: a festival dedicated exclusively to power metal and fantasy culture. Founded by Søren Weiss Kristiansen — the man behind Udgårdsfest — EpicFest was born from a passion for epic music and tabletop RPGs."}
            </p>
            <p>
              {locale === "da"
                ? "Det der startede som et eksperiment er vokset til Nordens mest unikke metalfestival. Fra 550 til over 3.000 deltagere fra mere end 28 lande på bare tre år. Hvert år tilføjes nye elementer: D&D quests, Warhammer-værksteder, cosplay-møder, custom-bryggede øl og en åbningsceremoni der sætter standarden."
                : "What started as an experiment has grown into the Nordic region's most unique metal festival. From 550 to over 3,000 attendees from more than 28 countries in just three years. Each year adds new elements: D&D quests, Warhammer workshops, cosplay meetups, custom-brewed beers, and an opening ceremony that sets the standard."}
            </p>
            <p>
              {locale === "da"
                ? "EpicFest er ikke bare en festival — det er et kapitel i en fortælling der stadig bliver skrevet. Og du er inviteret til at skrive det næste kapitel sammen med os."
                : "EpicFest is not just a festival — it's a chapter in a story still being written. And you're invited to write the next chapter with us."}
            </p>
          </div>
        </section>

        {/* Past Editions */}
        <OrnamentalDivider variant="ornate" className="mb-12" />
        <h3 className="font-[family-name:var(--font-heading)] text-2xl text-text-heading uppercase tracking-wider text-center mb-8">
          {t("pastEditions")}
        </h3>
        <div className="space-y-6 max-w-3xl mx-auto mb-20">
          {pastEditions.map((ed) => (
            <div
              key={ed.year}
              className="bg-dark-700 rounded-lg p-6 border border-border-subtle"
            >
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-[family-name:var(--font-heading)] text-2xl text-gold">
                  Chapter {ed.chapter}
                </span>
                <span className="text-text-muted text-sm">{ed.year}</span>
              </div>
              <h4 className="font-[family-name:var(--font-accent)] text-lg text-text-heading italic mb-2">
                {ed.name}
              </h4>
              <p className="text-sm text-parchment-dark mb-3">
                {locale === "da" ? ed.description.da : ed.description.en}
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="text-gold">
                  {ed.attendees.toLocaleString()} warriors
                </span>
                <span className="text-text-muted">·</span>
                <span className="text-text-muted">
                  {ed.headliners.join(", ")}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <OrnamentalDivider variant="ornate" className="mb-12" />
        <h3 className="font-[family-name:var(--font-heading)] text-2xl text-text-heading uppercase tracking-wider text-center mb-8">
          {t("faq")}
        </h3>
        <div className="max-w-2xl mx-auto space-y-2 mb-20">
          {faq.map((item, i) => (
            <FaqItem
              key={i}
              question={locale === "da" ? item.q.da : item.q.en}
              answer={locale === "da" ? item.a.da : item.a.en}
            />
          ))}
        </div>

        {/* Nightcrawler Management */}
        <OrnamentalDivider variant="ornate" className="mb-12" />
        <div className="max-w-2xl mx-auto bg-dark-700 border border-border-ornate rounded-lg p-8 text-center mb-20">
          <h3 className="font-[family-name:var(--font-heading)] text-2xl text-gold uppercase tracking-wider mb-4">
            Nightcrawler Management
          </h3>
          <p className="text-parchment-dark leading-relaxed mb-4">
            {locale === "da"
              ? "EpicFest er organiseret af Nightcrawler Management. For bookingforespørgsler, presseakkreditering, samarbejde eller generelle henvendelser — kontakt os nedenfor."
              : "EpicFest is organized by Nightcrawler Management. For booking inquiries, press accreditation, partnerships, or general inquiries — contact us below."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
            <a
              href="mailto:info@nightcrawlermanagement.com"
              className="text-gold hover:text-gold-light transition-colors underline underline-offset-4"
            >
              info@nightcrawlermanagement.com
            </a>
          </div>
          <p className="text-xs text-text-muted mt-4">
            {locale === "da"
              ? "Grundlagt af Søren Weiss Kristiansen & Lauge Hede Kjærum"
              : "Founded by Søren Weiss Kristiansen & Lauge Hede Kjærum"}
          </p>
        </div>

        {/* Contact */}
        <OrnamentalDivider variant="ornate" className="mb-12" />
        <h3 className="font-[family-name:var(--font-heading)] text-2xl text-text-heading uppercase tracking-wider text-center mb-8">
          {t("contact")}
        </h3>
        <div className="max-w-lg mx-auto">
          <p className="text-center text-text-muted text-sm mb-6">
            {locale === "da"
              ? "Send en mail direkte til Nightcrawler Management, eller brug formularen nedenfor."
              : "Send an email directly to Nightcrawler Management, or use the form below."}
          </p>
          <div className="text-center mb-8">
            <a
              href="mailto:info@nightcrawlermanagement.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-dark-900 font-bold uppercase tracking-widest text-sm rounded hover:bg-gold-light transition-colors"
            >
              info@nightcrawlermanagement.com
            </a>
          </div>
          <form
            action="https://formsubmit.co/info@nightcrawlermanagement.com"
            method="POST"
            className="space-y-4"
          >
            <input type="hidden" name="_subject" value="EpicFest Contact Form" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value="https://epicfest.dk/about" />
            <input
              type="text"
              name="name"
              required
              placeholder={locale === "da" ? "Dit navn" : "Your name"}
              className="w-full px-4 py-3 bg-dark-700 border border-border-subtle rounded text-parchment placeholder:text-text-muted focus:outline-none focus:border-gold transition-colors"
            />
            <input
              type="email"
              name="email"
              required
              placeholder={locale === "da" ? "Din e-mail" : "Your email"}
              className="w-full px-4 py-3 bg-dark-700 border border-border-subtle rounded text-parchment placeholder:text-text-muted focus:outline-none focus:border-gold transition-colors"
            />
            <textarea
              rows={5}
              name="message"
              required
              placeholder={locale === "da" ? "Din besked" : "Your message"}
              className="w-full px-4 py-3 bg-dark-700 border border-border-subtle rounded text-parchment placeholder:text-text-muted focus:outline-none focus:border-gold transition-colors resize-none"
            />
            <button
              type="submit"
              className="w-full py-3 bg-gold text-dark-900 font-bold uppercase tracking-widest text-sm rounded hover:bg-gold-light transition-colors"
            >
              {locale === "da" ? "Send besked" : "Send message"}
            </button>
          </form>
          <p className="text-center text-text-muted text-xs mt-4">
            {locale === "da"
              ? "Formularen sender via FormSubmit.co — ingen backend krævet."
              : "Form sends via FormSubmit.co — no backend required."}
          </p>
        </div>
      </Container>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-border-subtle rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-dark-700/50 transition-colors"
      >
        <span className="text-sm text-parchment font-medium pr-4">
          {question}
        </span>
        <svg
          className={cn(
            "w-5 h-5 text-gold shrink-0 transition-transform",
            open && "rotate-180"
          )}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {open && (
        <div className="px-4 pb-4 text-sm text-parchment-dark leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}
