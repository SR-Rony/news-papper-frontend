import Link from "next/link";
import Image from "next/image";
import type { ArticleListItem } from "@/types/article";
import { CategoryTag } from "./category-tag";
import { ArticleMeta } from "./article-meta";
import { Badge } from "@/components/ui/badge";

export function FeaturedNewsCard({ article }: { article: ArticleListItem }) {
  return (
    <article className="group relative flex flex-col">
      <Link href={`/news/${article.slug}`} className="relative mb-4 block aspect-[16/10] overflow-hidden rounded-md bg-muted">
        <Image
          src={article.coverImageUrl}
          alt={article.coverImageAlt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 65vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
        {article.isBreaking && (
          <Badge variant="destructive" className="absolute left-3 top-3">Breaking</Badge>
        )}
      </Link>
      <CategoryTag category={article.category} className="mb-2" />
      <h2 className="mb-2 font-display text-2xl font-semibold leading-tight sm:text-3xl">
        <Link href={`/news/${article.slug}`} className="hover:underline underline-offset-4 decoration-2">
          {article.title}
        </Link>
      </h2>
      <p className="mb-3 max-w-2xl text-[15px] text-foreground-muted">{article.excerpt}</p>
      <ArticleMeta article={article} showViews />
    </article>
  );
}
