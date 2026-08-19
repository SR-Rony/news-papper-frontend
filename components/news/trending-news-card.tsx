import Link from "next/link";
import type { ArticleListItem } from "@/types/article";
import { formatCompactNumber } from "@/lib/utils";

export function TrendingNewsCard({ article, rank }: { article: ArticleListItem; rank: number }) {
  return (
    <article className="flex gap-4 border-b border-border py-4 last:border-0">
      <span className="font-display text-3xl font-semibold leading-none text-border-strong">
        {String(rank).padStart(2, "0")}
      </span>
      <div className="min-w-0">
        <p className="mb-1 text-[0.6875rem] font-bold uppercase tracking-wide text-accent">{article.category.name}</p>
        <h4 className="mb-1 font-display text-base font-semibold leading-snug">
          <Link href={`/news/${article.slug}`} className="hover:underline underline-offset-2">
            {article.title}
          </Link>
        </h4>
        <span className="text-xs text-foreground-muted">{formatCompactNumber(article.viewCount)} views</span>
      </div>
    </article>
  );
}
