"use client";

import Link from "next/link";
import type { ArticleListItem } from "@/types/article";
import { formatCompactNumber } from "@/lib/utils";
import { categoryLabel } from "@/lib/i18n/dictionary";
import { localizeArticleListItem } from "@/lib/i18n/localize";
import { useLocale } from "@/providers/locale-provider";

export function TrendingNewsCard({ article, rank }: { article: ArticleListItem; rank: number }) {
  const { locale, t } = useLocale();
  const a = localizeArticleListItem(article, locale);

  return (
    <article className="flex gap-4 border-b border-border py-4 last:border-0">
      <span className="font-display text-3xl font-semibold leading-none text-border-strong">
        {String(rank).padStart(2, "0")}
      </span>
      <div className="min-w-0">
        <p className="mb-1 text-[0.6875rem] font-bold tracking-wide text-accent">
          {categoryLabel(locale, article.category.slug, a.category.name)}
        </p>
        <h4 className="mb-1 font-display text-base font-semibold leading-snug">
          <Link href={`/news/${a.slug}`} className="hover:underline underline-offset-2">
            {a.title}
          </Link>
        </h4>
        <span className="text-xs text-foreground-muted">
          {formatCompactNumber(a.viewCount, locale)} {t.common.views}
        </span>
      </div>
    </article>
  );
}
