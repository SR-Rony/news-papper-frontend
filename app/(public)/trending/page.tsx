"use client";

import * as React from "react";
import { TrendingNewsCard } from "@/components/news/trending-news-card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useTrendingArticles } from "@/hooks/use-articles";

const tabs = [
  { key: "viewed", label: "Most viewed" },
  { key: "commented", label: "Most commented" },
  { key: "latest", label: "Latest" },
] as const;

export default function TrendingPage() {
  const [active, setActive] = React.useState<(typeof tabs)[number]["key"]>("viewed");
  const { data: articles, isLoading } = useTrendingArticles(20, active === "latest" ? "latest" : "popular");

  const ranked = React.useMemo(() => {
    if (!articles) return [];
    if (active === "commented") return [...articles].sort((a, b) => b.commentCount - a.commentCount);
    return articles;
  }, [articles, active]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:py-10">
      <h1 className="mb-2 font-display text-3xl font-semibold sm:text-4xl">Trending</h1>
      <p className="mb-6 text-foreground-muted">What readers are following right now.</p>

      <div className="mb-6 flex flex-wrap gap-2 border-b border-border pb-4" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={active === tab.key}
            onClick={() => setActive(tab.key)}
            className={cn(
              "rounded-sm px-3 py-1.5 text-sm font-semibold",
              active === tab.key ? "bg-primary text-primary-foreground" : "text-foreground-muted hover:bg-muted"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : (
        <div>
          {ranked.slice(0, 12).map((article, i) => (
            <TrendingNewsCard key={article.id} article={article} rank={i + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
