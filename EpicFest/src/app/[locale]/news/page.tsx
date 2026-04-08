import { setRequestLocale } from "next-intl/server";
import NewsContent from "@/components/news/NewsContent";

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <NewsContent />;
}
