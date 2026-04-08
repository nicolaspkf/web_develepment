import { setRequestLocale } from "next-intl/server";
import GalleryContent from "@/components/gallery/GalleryContent";

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <GalleryContent />;
}
