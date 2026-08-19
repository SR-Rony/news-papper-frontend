import Link from "next/link";
import Image from "next/image";
import type { ArticleListItem } from "@/types/article";
import { formatRelativeTime } from "@/lib/utils";

export function CompactNewsCard({ article }: { article: ArticleListItem }) {
  return (
    <article className="group flex items-start gap-3 py-3 first:pt-0">
      <Link href={`/news/${article.slug}`} className="relative h-16 w-20 shrink-0 overflow-hidden rounded-sm bg-muted sm:h-20 sm:w-28">
        <Image src={article.coverImageUrl} alt={article.coverImageAlt} fill sizes="120px" className="object-cover" />
      </Link>
      <div className="min-w-0">
        <p className="mb-0.5 text-[0.6875rem] font-bold uppercase tracking-wide text-accent">{article.category.name}</p>
        <h4 className="mb-1 font-display text-sm font-semibold leading-snug sm:text-base">
          <Link href={`/news/${article.slug}`} className="line-clamp-2 hover:underline underline-offset-2">
            {article.title}
          </Link>
        </h4>
        <span className="text-xs text-foreground-muted">{formatRelativeTime(article.publishedAt)}</span>
      </div>
    </article>
  );
}
