"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { apiClient } from "@/lib/api-client";
import type { ArticleListItem } from "@/types/article";

/** Client-side article queries for interactive pages (trending, dashboard widgets). */
export function useLatestArticles(limit = 12) {
  return useQuery({
    queryKey: [QUERY_KEYS.articles, "latest", limit],
    queryFn: () => apiClient.get<ArticleListItem[]>("/articles", { limit }),
  });
}

export function useTrendingArticles(limit = 10, sort: "latest" | "popular" = "popular") {
  return useQuery({
    queryKey: [QUERY_KEYS.trending, limit, sort],
    queryFn: () => apiClient.get<ArticleListItem[]>("/articles", { sort, limit }),
  });
}
