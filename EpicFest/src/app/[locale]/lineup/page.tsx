import { setRequestLocale } from "next-intl/server";
import LineupContent from "@/components/lineup/LineupContent";

export default async function LineupPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LineupContent />;
}
