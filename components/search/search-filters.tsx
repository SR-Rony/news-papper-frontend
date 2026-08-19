"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { apiClient } from "@/lib/api-client";
import type { Category } from "@/types/category";

interface Props {
  categorySlug?: string;
  onCategoryChange: (slug?: string) => void;
  sort: "latest" | "popular";
  onSortChange: (sort: "latest" | "popular") => void;
}

export function SearchFilters({ categorySlug, onCategoryChange, sort, onSortChange }: Props) {
  const [categories, setCategories] = React.useState<Category[]>([]);

  React.useEffect(() => {
    apiClient.get<Category[]>("/categories").then(setCategories).catch(() => undefined);
  }, []);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={!categorySlug ? "secondary" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(undefined)}
        >
          All
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={categorySlug === cat.slug ? "secondary" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(cat.slug)}
          >
            {cat.name}
          </Button>
        ))}
      </div>
      <div className="flex gap-1 rounded-sm border border-border-strong p-0.5">
        {(["latest", "popular"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onSortChange(s)}
            className={cn(
              "rounded-sm px-3 py-1.5 text-xs font-semibold capitalize",
              sort === s ? "bg-primary text-primary-foreground" : "text-foreground-muted"
            )}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
