import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-04-08",
  useCdn: process.env.NODE_ENV === "production",
};

export const client = createClient(sanityConfig);

const builder = imageUrlBuilder(client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}
