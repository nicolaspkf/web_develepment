"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import DragonDivider from "@/components/ui/DragonDivider";
import { DragonIcon, FireIcon, HelmIcon, GobletIcon } from "@/components/ui/MedievalIcons";

const questCategories = [
  {
    key: "dnd",
    Icon: DragonIcon,
    color: "from-red-900/20 to-transparent",
  },
  {
    key: "warhammer",
    Icon: FireIcon,
    color: "from-orange-900/20 to-transparent",
  },
  {
    key: "gaming",
    Icon: HelmIcon,
    color: "from-blue-900/20 to-transparent",
  },
  {
    key: "tavern",
    Icon: GobletIcon,
    color: "from-amber-900/20 to-transparent",
  },
];

export default function QuestPreview() {
  const t = useTranslations("Home.quests");

  return (
    <section className="py-20 bg-dark-800 relative overflow-hidden">
      <Container className="relative z-10">
        <DragonDivider className="mb-6" />
        <SectionHeading
          title={t("title")}
          divider={false}
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
          {questCategories.map((cat) => (
            <div
              key={cat.key}
              className="group relative bg-dark-600 border border-border-subtle rounded-lg p-6 text-center hover:border-gold hover:animate-fire-glow transition-all duration-300 cursor-pointer"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-b ${cat.color} rounded-lg opacity-0 group-hover:opacity-100 transition-opacity`}
              />
              <div className="relative z-10">
                <div className="flex justify-center mb-3">
                  <cat.Icon size={48} className="text-gold" />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-sm sm:text-base text-parchment uppercase tracking-wider">
                  {t(cat.key)}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button href="/quests" variant="outline">
            View All Quests
          </Button>
        </div>
      </Container>
    </section>
  );
}
