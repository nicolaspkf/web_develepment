import type { MetadataRoute } from "next";

const baseUrl = "https://epicfest.dk";

const pages = [
  "",
  "/lineup",
  "/schedule",
  "/quests",
  "/tickets",
  "/venue",
  "/news",
  "/gallery",
  "/about",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    routes.push({
      url: `${baseUrl}${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: page === "" ? 1 : 0.8,
      alternates: {
        languages: {
          da: `${baseUrl}${page}`,
          en: `${baseUrl}/en${page}`,
        },
      },
    });
  }

  return routes;
}
