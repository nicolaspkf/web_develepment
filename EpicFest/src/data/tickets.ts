import type { TicketTier } from "@/types";

export const tickets: TicketTier[] = [
  {
    id: "two-day",
    name: { da: "Partout (2 dage)", en: "Two-Day Pass" },
    icon: "\uD83D\uDC51",
    price: 995,
    currency: "DKK",
    features: {
      da: [
        "Adgang til alle scener begge dage",
        "Adgang til alle Quest Board aktiviteter",
        "Adgang til The Raven Tavern",
        "Adgang til The Gaming Corner",
        "Festival-armbånd",
      ],
      en: [
        "Access to all stages both days",
        "Access to all Quest Board activities",
        "Access to The Raven Tavern",
        "Access to The Gaming Corner",
        "Festival wristband",
      ],
    },
    externalUrl: "https://gimle.dk/event/epic-fest-chapter-4-two-days/",
    soldOut: false,
  },
  {
    id: "friday",
    name: { da: "Fredag (10. april)", en: "Friday (April 10)" },
    icon: "\u2694\uFE0F",
    price: 695,
    currency: "DKK",
    features: {
      da: [
        "Adgang til alle scener fredag",
        "Ensiferum, Rhapsody of Fire, Sirenia, Masterplan",
        "Angus McSix, Fairyland, Mercenary, Dragony",
        "Mob Rules, Trick or Treat, Ipomonia",
        "Adgang til Quest Board aktiviteter",
      ],
      en: [
        "Access to all stages Friday",
        "Ensiferum, Rhapsody of Fire, Sirenia, Masterplan",
        "Angus McSix, Fairyland, Mercenary, Dragony",
        "Mob Rules, Trick or Treat, Ipomonia",
        "Access to Quest Board activities",
      ],
    },
    externalUrl: "https://gimle.dk/event/epic-fest-chapter-4-friday/",
    soldOut: false,
  },
  {
    id: "saturday",
    name: { da: "Lørdag (11. april)", en: "Saturday (April 11)" },
    icon: "\uD83D\uDEE1\uFE0F",
    price: 695,
    currency: "DKK",
    features: {
      da: [
        "Adgang til alle scener lørdag",
        "Sonata Arctica (30 års jubilæum), Roy Khan (eksklusiv!)",
        "Twilight Force, Dark Moor, Victorius, Hagane",
        "Seven Spires, InnerWish, Moonlight Haze",
        "Adgang til Quest Board aktiviteter",
      ],
      en: [
        "Access to all stages Saturday",
        "Sonata Arctica (30th anniversary), Roy Khan (exclusive!)",
        "Twilight Force, Dark Moor, Victorius, Hagane",
        "Seven Spires, InnerWish, Moonlight Haze",
        "Access to Quest Board activities",
      ],
    },
    externalUrl: "https://gimle.dk/event/epic-fest-chapter-4-saturday/",
    soldOut: false,
  },
];
