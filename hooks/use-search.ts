"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { apiClient } from "@/lib/api-client";
import type { ArticleListItem } from "@/types/article";

interface SearchFilters {
  query: string;
  categorySlug?: string;
  sort?: "latest" | "popular";
}

export function useSearchArticles({ query, categorySlug, sort = "latest" }: SearchFilters) {
  return useQuery({
    queryKey: [QUERY_KEYS.search, query, categorySlug, sort],
    enabled: query.trim().length > 0,
    queryFn: async (): Promise<ArticleListItem[]> => {
      const result = await apiClient.get<ArticleListItem[]>("/articles", {
        search: query.trim(),
        category: categorySlug,
        sort,
        limit: 30,
      });
      return result;
    },
  });
}
