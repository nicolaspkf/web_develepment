import { setRequestLocale } from "next-intl/server";
import TicketsContent from "@/components/tickets/TicketsContent";

export default async function TicketsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TicketsContent />;
}
