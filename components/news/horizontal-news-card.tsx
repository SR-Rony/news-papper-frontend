"use client";

import Link from "next/link";
import Image from "next/image";
import type { ArticleListItem } from "@/types/article";
import { CategoryTag } from "./category-tag";
import { ArticleMeta } from "./article-meta";
import { localizeArticleListItem } from "@/lib/i18n/localize";
import { useLocale } from "@/providers/locale-provider";

export function HorizontalNewsCard({ article }: { article: ArticleListItem }) {
  const { locale } = useLocale();
  const a = localizeArticleListItem(article, locale);

  return (
    <article className="group grid grid-cols-[128px_1fr] gap-4 border-b border-border py-5 last:border-0 sm:grid-cols-[220px_1fr] sm:gap-6">
      <Link href={`/news/${a.slug}`} className="relative aspect-[4/3] overflow-hidden rounded-md bg-muted">
        <Image
          src={a.coverImageUrl}
          alt={a.coverImageAlt}
          fill
          sizes="(max-width: 640px) 128px, 220px"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="flex min-w-0 flex-col justify-center">
        <CategoryTag category={article.category} className="mb-1.5" />
        <h3 className="mb-1.5 font-display text-base font-semibold leading-snug sm:text-xl">
          <Link href={`/news/${a.slug}`} className="hover:underline underline-offset-2">
            {a.title}
          </Link>
        </h3>
        <p className="mb-2 hidden text-sm text-foreground-muted sm:line-clamp-2 sm:block">{a.excerpt}</p>
        <ArticleMeta article={a} />
      </div>
    </article>
  );
}
