"use client";

import Link from "next/link";
import Image from "next/image";
import type { ArticleListItem } from "@/types/article";
import { CategoryTag } from "./category-tag";
import { ArticleMeta } from "./article-meta";
import { BreakingBadge } from "./breaking-badge";
import { localizeArticleListItem } from "@/lib/i18n/localize";
import { useLocale } from "@/providers/locale-provider";

export function NewsCard({ article, priority = false }: { article: ArticleListItem; priority?: boolean }) {
  const { locale } = useLocale();
  const a = localizeArticleListItem(article, locale);

  return (
    <article className="group flex flex-col">
      <Link href={`/news/${a.slug}`} className="relative mb-3 block aspect-[4/3] overflow-hidden rounded-md bg-muted">
        <Image
          src={a.coverImageUrl}
          alt={a.coverImageAlt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {a.isBreaking && <BreakingBadge className="absolute left-2 top-2" />}
      </Link>
      <CategoryTag category={article.category} className="mb-1.5" />
      <h3 className="mb-1.5 font-display text-lg font-semibold leading-snug">
        <Link href={`/news/${a.slug}`} className="hover:underline underline-offset-2 decoration-2">
          {a.title}
        </Link>
      </h3>
      <p className="mb-2 line-clamp-2 text-sm text-foreground-muted">{a.excerpt}</p>
      <ArticleMeta article={a} />
    </article>
  );
}
