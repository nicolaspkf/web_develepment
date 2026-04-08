import { setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/home/HeroSection";
import HeadlinerStrip from "@/components/home/HeadlinerStrip";
import StatsCounters from "@/components/home/StatsCounters";
import StorySection from "@/components/home/StorySection";
import QuestPreview from "@/components/home/QuestPreview";
import MerchCarousel from "@/components/home/MerchCarousel";
import SponsorLogos from "@/components/home/SponsorLogos";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <HeadlinerStrip />
      <StatsCounters />
      <StorySection />
      <QuestPreview />
      <MerchCarousel />
      <SponsorLogos />
    </>
  );
}
