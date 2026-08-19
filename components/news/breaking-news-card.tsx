import Link from "next/link";
import type { ArticleListItem } from "@/types/article";
import { Badge } from "@/components/ui/badge";
import { formatRelativeTime } from "@/lib/utils";

export function BreakingNewsCard({ article }: { article: ArticleListItem }) {
  return (
    <article className="flex items-start gap-3 border-l-2 border-signal py-3 pl-4">
      <div>
        <Badge variant="destructive" className="mb-1.5">Breaking</Badge>
        <h4 className="font-display text-base font-semibold leading-snug">
          <Link href={`/news/${article.slug}`} className="hover:underline underline-offset-2">
            {article.title}
          </Link>
        </h4>
        <span className="text-xs text-foreground-muted">{formatRelativeTime(article.publishedAt)}</span>
      </div>
    </article>
  );
}
