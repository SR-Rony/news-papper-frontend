"use client";

import Link from "next/link";
import type { ArticleListItem } from "@/types/article";
import { BreakingBadge } from "./breaking-badge";
import { formatRelativeTime } from "@/lib/utils";
import { localizeArticleListItem } from "@/lib/i18n/localize";
import { useLocale } from "@/providers/locale-provider";

export function BreakingNewsCard({ article }: { article: ArticleListItem }) {
  const { locale } = useLocale();
  const a = localizeArticleListItem(article, locale);

  return (
    <article className="flex items-start gap-3 border-l-2 border-signal py-3 pl-4">
      <div>
        <BreakingBadge className="mb-1.5" />
        <h4 className="font-display text-base font-semibold leading-snug">
          <Link href={`/news/${a.slug}`} className="hover:underline underline-offset-2">
            {a.title}
          </Link>
        </h4>
        <span className="text-xs text-foreground-muted">
          {formatRelativeTime(a.publishedAt, locale)}
        </span>
      </div>
    </article>
  );
}
