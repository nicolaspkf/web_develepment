import { setRequestLocale } from "next-intl/server";
import ShopContent from "@/components/shop/ShopContent";

export default async function ShopPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ShopContent />;
}
