"use client";

import type { Article } from "@/types/article";
import { ArticleContent } from "@/components/article/article-content";
import { ArticleTags } from "@/components/article/article-tags";
import { localizeArticle } from "@/lib/i18n/localize";
import { useLocale } from "@/providers/locale-provider";

export function LocalizedArticleBody({ article }: { article: Article }) {
  const { locale } = useLocale();
  const a = localizeArticle(article, locale);

  return (
    <>
      <ArticleContent html={a.content} />
      <ArticleTags tags={a.tags} />
    </>
  );
}
