import { setRequestLocale } from "next-intl/server";
import VenueContent from "@/components/venue/VenueContent";

export default async function VenuePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <VenueContent />;
}
