import { setRequestLocale } from "next-intl/server";
import QuestsContent from "@/components/quests/QuestsContent";

export default async function QuestsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <QuestsContent />;
}
