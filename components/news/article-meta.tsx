import { Clock, Eye } from "lucide-react";
import type { ArticleListItem } from "@/types/article";
import { formatRelativeTime, formatCompactNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function ArticleMeta({
  article,
  showViews = false,
  className,
}: {
  article: Pick<ArticleListItem, "author" | "publishedAt" | "readingTimeMinutes" | "viewCount">;
  showViews?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-foreground-muted", className)}>
      <span className="font-medium text-foreground">{article.author.name}</span>
      <span aria-hidden>·</span>
      <time>{formatRelativeTime(article.publishedAt)}</time>
      <span aria-hidden>·</span>
      <span className="inline-flex items-center gap-1">
        <Clock className="size-3" /> {article.readingTimeMinutes} min read
      </span>
      {showViews && (
        <>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <Eye className="size-3" /> {formatCompactNumber(article.viewCount)}
          </span>
        </>
      )}
    </div>
  );
}
