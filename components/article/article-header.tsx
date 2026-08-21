"use client";

import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/types/article";
import { CategoryTag } from "@/components/news/category-tag";
import { BreakingBadge } from "@/components/news/breaking-badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";
import { ArticleBreadcrumb } from "./breadcrumb";
import { ShareBar } from "./share-bar";
import { localizeArticle } from "@/lib/i18n/localize";
import { useLocale } from "@/providers/locale-provider";

export function ArticleHeader({ article }: { article: Article }) {
  const { locale, t } = useLocale();
  const a = localizeArticle(article, locale);

  return (
    <header>
      <ArticleBreadcrumb category={article.category} title={a.title} />
      <div className="mb-3 flex items-center gap-2">
        <CategoryTag category={article.category} />
        {a.isBreaking && <BreakingBadge />}
      </div>
      <h1 className="mb-3 font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.75rem]">
        {a.title}
      </h1>
      <p className="mb-5 text-lg text-foreground-muted">{a.excerpt}</p>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
        <Link href={`/author/${a.author.slug}`} className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={a.author.avatarUrl} alt={a.author.name} />
            <AvatarFallback>{a.author.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">{a.author.name}</p>
            <p className="text-xs text-foreground-muted">
              {formatDate(a.publishedAt, locale)} · {a.readingTimeMinutes} {t.common.minRead}
            </p>
          </div>
        </Link>
        <ShareBar title={a.title} />
      </div>

      <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-md bg-muted">
        <Image
          src={a.coverImageUrl}
          alt={a.coverImageAlt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 800px"
          className="object-cover"
        />
      </div>
    </header>
  );
}
