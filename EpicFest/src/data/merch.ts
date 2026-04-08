export type MerchCategory = "t-shirts" | "hoodies" | "accessories" | "drinkware" | "posters";

export interface MerchSize {
  label: string;
  inStock: boolean;
}

export interface MerchItem {
  id: string;
  name: { da: string; en: string };
  description: { da: string; en: string };
  price: number;
  currency: string;
  image: string;
  images?: string[];
  category: MerchCategory;
  sizes?: MerchSize[];
  featured: boolean;
  soldOut: boolean;
  new: boolean;
}

export const merchCategories: Record<MerchCategory, { da: string; en: string }> = {
  "t-shirts": { da: "T-shirts", en: "T-Shirts" },
  "hoodies": { da: "Hoodies & Trøjer", en: "Hoodies & Sweaters" },
  "accessories": { da: "Tilbehør", en: "Accessories" },
  "drinkware": { da: "Drikkevarer & Krus", en: "Drinkware" },
  "posters": { da: "Plakater & Kunst", en: "Posters & Art" },
};

export const merchItems: MerchItem[] = [
  {
    id: "tee-chapter4",
    name: { da: "Chapter IV T-shirt", en: "Chapter IV T-shirt" },
    description: {
      da: "Officiel Chapter IV: Tales of Might & Magic t-shirt. 100% bomuld, trykt i Danmark.",
      en: "Official Chapter IV: Tales of Might & Magic t-shirt. 100% cotton, printed in Denmark.",
    },
    price: 299,
    currency: "DKK",
    image: "/merch/tee-chapter4.jpg",
    category: "t-shirts",
    sizes: [
      { label: "S", inStock: true },
      { label: "M", inStock: true },
      { label: "L", inStock: true },
      { label: "XL", inStock: true },
      { label: "XXL", inStock: true },
    ],
    featured: true,
    soldOut: false,
    new: true,
  },
  {
    id: "tee-quest-board",
    name: { da: "Quest Board T-shirt", en: "Quest Board T-shirt" },
    description: {
      da: "D&D-inspireret Quest Board design. 100% bomuld.",
      en: "D&D-inspired Quest Board design. 100% cotton.",
    },
    price: 299,
    currency: "DKK",
    image: "/merch/tee-quest-board.jpg",
    category: "t-shirts",
    sizes: [
      { label: "S", inStock: true },
      { label: "M", inStock: true },
      { label: "L", inStock: true },
      { label: "XL", inStock: true },
      { label: "XXL", inStock: false },
    ],
    featured: false,
    soldOut: false,
    new: false,
  },
  {
    id: "tee-dragon",
    name: { da: "Dragon Crest T-shirt", en: "Dragon Crest T-shirt" },
    description: {
      da: "EpicFest drage-våbenskjold på sort t-shirt. Unisex fit.",
      en: "EpicFest dragon crest on black t-shirt. Unisex fit.",
    },
    price: 279,
    currency: "DKK",
    image: "/merch/tee-dragon.jpg",
    category: "t-shirts",
    sizes: [
      { label: "S", inStock: true },
      { label: "M", inStock: true },
      { label: "L", inStock: true },
      { label: "XL", inStock: true },
    ],
    featured: false,
    soldOut: false,
    new: false,
  },
  {
    id: "hoodie-dragon",
    name: { da: "Dragon Hoodie", en: "Dragon Hoodie" },
    description: {
      da: "Varm hoodie med EpicFest dragedesign. 80% bomuld, 20% polyester.",
      en: "Warm hoodie with EpicFest dragon design. 80% cotton, 20% polyester.",
    },
    price: 499,
    currency: "DKK",
    image: "/merch/hoodie-dragon.jpg",
    category: "hoodies",
    sizes: [
      { label: "S", inStock: true },
      { label: "M", inStock: true },
      { label: "L", inStock: true },
      { label: "XL", inStock: true },
      { label: "XXL", inStock: true },
    ],
    featured: true,
    soldOut: false,
    new: true,
  },
  {
    id: "longsleeve-raven",
    name: { da: "Raven Longsleeve", en: "Raven Longsleeve" },
    description: {
      da: "Langærmet t-shirt med The Raven Tavern motiv.",
      en: "Long sleeve t-shirt with The Raven Tavern design.",
    },
    price: 349,
    currency: "DKK",
    image: "/merch/longsleeve-raven.jpg",
    category: "hoodies",
    sizes: [
      { label: "S", inStock: false },
      { label: "M", inStock: true },
      { label: "L", inStock: true },
      { label: "XL", inStock: true },
    ],
    featured: false,
    soldOut: false,
    new: false,
  },
  {
    id: "patch-epicfest",
    name: { da: "EpicFest Broderet Patch", en: "EpicFest Embroidered Patch" },
    description: {
      da: "Broderet patch med EpicFest logo. 10x8 cm.",
      en: "Embroidered patch with EpicFest logo. 10x8 cm.",
    },
    price: 79,
    currency: "DKK",
    image: "/merch/patch-epicfest.jpg",
    category: "accessories",
    featured: false,
    soldOut: false,
    new: false,
  },
  {
    id: "pin-dragon",
    name: { da: "Dragon Pin", en: "Dragon Pin" },
    description: {
      da: "Emaljeret metal pin med EpicFest dragelogo.",
      en: "Enamel metal pin with EpicFest dragon logo.",
    },
    price: 59,
    currency: "DKK",
    image: "/merch/pin-dragon.jpg",
    category: "accessories",
    featured: false,
    soldOut: false,
    new: true,
  },
  {
    id: "tankard-ale",
    name: { da: "Ale of the Mountain King Krus", en: "Ale of the Mountain King Tankard" },
    description: {
      da: "Keramik ølkrus med EpicFest og Ale of the Mountain King branding. 500ml.",
      en: "Ceramic beer tankard with EpicFest and Ale of the Mountain King branding. 500ml.",
    },
    price: 199,
    currency: "DKK",
    image: "/merch/tankard-ale.jpg",
    category: "drinkware",
    featured: true,
    soldOut: false,
    new: false,
  },
  {
    id: "poster-chapter4",
    name: { da: "Chapter IV Plakat", en: "Chapter IV Poster" },
    description: {
      da: "Officiel Chapter IV eventplakat. A2 format, trykt på kvalitetspapir.",
      en: "Official Chapter IV event poster. A2 size, printed on quality paper.",
    },
    price: 149,
    currency: "DKK",
    image: "/merch/poster-chapter4.jpg",
    category: "posters",
    featured: false,
    soldOut: false,
    new: true,
  },
  {
    id: "poster-realms",
    name: { da: "Festival Realms Kort Plakat", en: "Festival Realms Map Poster" },
    description: {
      da: "The Glorious Map of EpicFest som A2 plakat. Perfekt til væggen derhjemme.",
      en: "The Glorious Map of EpicFest as an A2 poster. Perfect for your wall at home.",
    },
    price: 129,
    currency: "DKK",
    image: "/merch/poster-realms.jpg",
    category: "posters",
    featured: false,
    soldOut: false,
    new: false,
  },
];
