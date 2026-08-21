"use client";

import Link from "next/link";
import Image from "next/image";
import type { ArticleListItem } from "@/types/article";
import { formatRelativeTime } from "@/lib/utils";
import { categoryLabel } from "@/lib/i18n/dictionary";
import { localizeArticleListItem } from "@/lib/i18n/localize";
import { useLocale } from "@/providers/locale-provider";

export function CompactNewsCard({ article }: { article: ArticleListItem }) {
  const { locale } = useLocale();
  const a = localizeArticleListItem(article, locale);

  return (
    <article className="group flex items-start gap-3 py-3 first:pt-0">
      <Link
        href={`/news/${a.slug}`}
        className="relative h-16 w-20 shrink-0 overflow-hidden rounded-sm bg-muted sm:h-20 sm:w-28"
      >
        <Image src={a.coverImageUrl} alt={a.coverImageAlt} fill sizes="120px" className="object-cover" />
      </Link>
      <div className="min-w-0">
        <p className="mb-0.5 text-[0.6875rem] font-bold tracking-wide text-accent">
          {categoryLabel(locale, article.category.slug, a.category.name)}
        </p>
        <h4 className="mb-1 font-display text-sm font-semibold leading-snug sm:text-base">
          <Link href={`/news/${a.slug}`} className="line-clamp-2 hover:underline underline-offset-2">
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
