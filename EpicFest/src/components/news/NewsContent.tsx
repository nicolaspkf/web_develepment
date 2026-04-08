"use client";

import { useTranslations, useLocale } from "next-intl";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import EmberOverlay from "@/components/ui/EmberOverlay";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { newsArticles } from "@/data/news";
import { formatDate, cn } from "@/lib/utils";

export default function NewsContent() {
  const t = useTranslations("News");
  const locale = useLocale();

  const categoryVariant = (cat: string) => {
    switch (cat) {
      case "lineup": return "gold" as const;
      case "recap": return "outline" as const;
      default: return "default" as const;
    }
  };

  return (
    <div className="pt-24 pb-20 relative overflow-hidden">
      <EmberOverlay density={25} className="z-0 opacity-40" />
      <Container className="relative z-10">
        <SectionHeading title={t("title")} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {newsArticles
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((article) => {
              const title = locale === "da" ? article.title.da : article.title.en;
              const excerpt = locale === "da" ? article.excerpt.da : article.excerpt.en;
              const categoryKey = article.category as "lineup" | "update" | "recap";

              return (
                <Card key={article.slug} hover className="p-0 overflow-hidden">
                  {/* Thumbnail placeholder with atmospheric gradient */}
                  <div className={cn(
                    "aspect-video flex items-center justify-center relative overflow-hidden",
                    article.category === "lineup" ? "bg-gradient-to-br from-amber-900/50 via-dark-600 to-dark-800" :
                    article.category === "recap" ? "bg-gradient-to-br from-purple-900/50 via-dark-600 to-dark-800" :
                    "bg-gradient-to-br from-blue-900/50 via-dark-600 to-dark-800"
                  )}>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(212,168,75,0.08)_0%,transparent_50%)]" />
                    <span className="font-[family-name:var(--font-heading)] text-lg text-gold/15 uppercase tracking-widest">
                      {article.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant={categoryVariant(article.category)} size="sm">
                        {t(`categories.${categoryKey}`)}
                      </Badge>
                      <span className="text-xs text-text-muted">
                        {formatDate(article.date, locale)}
                      </span>
                    </div>
                    <h3 className="font-[family-name:var(--font-heading)] text-lg text-parchment uppercase tracking-wider mb-2">
                      {title}
                    </h3>
                    <p className="text-sm text-parchment-dark leading-relaxed">
                      {excerpt}
                    </p>
                  </div>
                </Card>
              );
            })}
        </div>
      </Container>
    </div>
  );
}
