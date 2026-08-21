"use client";

import { Clock, Eye } from "lucide-react";
import type { ArticleListItem } from "@/types/article";
import { formatRelativeTime, formatCompactNumber, cn } from "@/lib/utils";
import { useLocale } from "@/providers/locale-provider";

export function ArticleMeta({
  article,
  showViews = false,
  className,
}: {
  article: Pick<ArticleListItem, "author" | "publishedAt" | "readingTimeMinutes" | "viewCount">;
  showViews?: boolean;
  className?: string;
}) {
  const { locale, t } = useLocale();

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-foreground-muted",
        className,
      )}
    >
      <span className="font-medium text-foreground">
        {locale === "en" && article.author.nameEn ? article.author.nameEn : article.author.name}
      </span>
      <span aria-hidden>·</span>
      <time>{formatRelativeTime(article.publishedAt, locale)}</time>
      <span aria-hidden>·</span>
      <span className="inline-flex items-center gap-1">
        <Clock className="size-3" /> {article.readingTimeMinutes} {t.common.minRead}
      </span>
      {showViews && (
        <>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <Eye className="size-3" /> {formatCompactNumber(article.viewCount, locale)}
          </span>
        </>
      )}
    </div>
  );
}
