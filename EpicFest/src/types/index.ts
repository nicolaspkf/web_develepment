export interface Band {
  id: string;
  name: string;
  slug: string;
  genre: string;
  country: string;
  bio: { da: string; en: string };
  image?: string;
  logo?: string;
  day: "Friday" | "Saturday";
  stage: string;
  time?: string;
  spotifyUrl?: string;
  website?: string;
  isHeadliner: boolean;
}

export interface ScheduleSlot {
  id: string;
  bandId: string;
  bandName: string;
  day: "Friday" | "Saturday";
  stage: string;
  startTime: string;
  endTime: string;
  genre?: string;
}

export type QuestCategory =
  | "dnd"
  | "warhammer"
  | "gaming"
  | "tavern"
  | "heroes"
  | "special";

export type QuestDifficulty = 1 | 2 | 3 | 4 | 5;

export interface Quest {
  id: string;
  title: { da: string; en: string };
  description: { da: string; en: string };
  category: QuestCategory;
  difficulty: QuestDifficulty;
  day: "Friday" | "Saturday";
  timeSlot: string;
  location: string;
  maxSpots: number;
  currentSpots: number;
  dmOrInstructor?: string;
}

export interface TicketTier {
  id: string;
  name: { da: string; en: string };
  icon: string;
  price: number;
  currency: string;
  features: { da: string[]; en: string[] };
  externalUrl: string;
  soldOut: boolean;
}

export interface NewsArticle {
  slug: string;
  title: { da: string; en: string };
  excerpt: { da: string; en: string };
  date: string;
  category: "lineup" | "update" | "recap";
  thumbnail?: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  chapter: 1 | 2 | 3 | 4;
  type: "photo" | "video";
  videoUrl?: string;
  credit?: string;
}

export interface Venue {
  id: string;
  name: string;
  fantasyName: string;
  description: { da: string; en: string };
  address: string;
  image?: string;
}

export interface Accommodation {
  id: string;
  name: string;
  distance: string;
  priceRange: string;
  bookingUrl: string;
  image?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: { da: string; en: string };
  bio: { da: string; en: string };
  image?: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  url: string;
  tier: "main" | "partner" | "supporter";
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
