"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { apiClient } from "@/lib/api-client";
import type { Category } from "@/types/category";

export function useCategories() {
  return useQuery({
    queryKey: [QUERY_KEYS.categories],
    queryFn: () => apiClient.get<Category[]>("/categories"),
  });
}
