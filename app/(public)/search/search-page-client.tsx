"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SearchX } from "lucide-react";
import { SearchBar } from "@/components/search/search-bar";
import { SearchFilters } from "@/components/search/search-filters";
import { HorizontalNewsCard } from "@/components/news/horizontal-news-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/hooks/use-debounce";
import { useSearchArticles } from "@/hooks/use-search";

function SearchResultsSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="grid grid-cols-[220px_1fr] gap-6">
          <Skeleton className="aspect-[4/3] w-full" />
          <div className="space-y-2 py-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SearchPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = React.useState(searchParams.get("q") ?? "");
  const [categorySlug, setCategorySlug] = React.useState<string | undefined>(undefined);
  const [sort, setSort] = React.useState<"latest" | "popular">("latest");
  const debouncedQuery = useDebounce(query, 350);

  React.useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedQuery) params.set("q", debouncedQuery);
    router.replace(`/search${params.toString() ? `?${params}` : ""}`, { scroll: false });
  }, [debouncedQuery, router]);

  const { data: results, isLoading, isError, refetch } = useSearchArticles({
    query: debouncedQuery,
    categorySlug,
    sort,
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:py-10">
      <h1 className="mb-6 font-display text-3xl font-semibold">Search</h1>
      <div className="mb-6">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      {debouncedQuery && (
        <div className="mb-6">
          <SearchFilters
            categorySlug={categorySlug}
            onCategoryChange={setCategorySlug}
            sort={sort}
            onSortChange={setSort}
          />
        </div>
      )}

      {!debouncedQuery && (
        <p className="py-16 text-center text-foreground-muted">Start typing to search articles, topics, and authors.</p>
      )}

      {debouncedQuery && isLoading && <SearchResultsSkeleton />}

      {debouncedQuery && isError && (
        <div className="py-16 text-center">
          <p className="mb-3 text-foreground-muted">Something went wrong while searching.</p>
          <button onClick={() => refetch()} className="text-sm font-semibold text-accent hover:underline">
            Try again
          </button>
        </div>
      )}

      {debouncedQuery && !isLoading && !isError && results && results.length === 0 && (
        <div className="flex flex-col items-center py-16 text-center">
          <SearchX className="mb-3 size-8 text-foreground-muted" />
          <p className="font-semibold">No results for &ldquo;{debouncedQuery}&rdquo;</p>
          <p className="mt-1 text-sm text-foreground-muted">Try a different search term or browse by category.</p>
        </div>
      )}

      {debouncedQuery && !isLoading && !isError && results && results.length > 0 && (
        <>
          <p className="mb-4 text-sm text-foreground-muted">
            {results.length} result{results.length === 1 ? "" : "s"} for &ldquo;{debouncedQuery}&rdquo;
          </p>
          <div className="divide-y divide-border">
            {results.map((article) => (
              <HorizontalNewsCard key={article.id} article={article} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
