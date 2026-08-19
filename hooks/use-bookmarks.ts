"use client";

import * as React from "react";

const STORAGE_KEY = "bookmarked-article-ids";

function readStoredIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

/**
 * Local-only bookmark state until the NestJS bookmarks endpoint is wired up.
 * Keeps the same shape (`toggle`, `isBookmarked`) the API-backed version will have.
 */
export function useBookmarks() {
  const [ids, setIds] = React.useState<string[]>([]);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of persisted bookmarks on mount
    setIds(readStoredIds());
  }, []);

  const persist = (next: string[]) => {
    setIds(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const toggle = (articleId: string) => {
    persist(ids.includes(articleId) ? ids.filter((id) => id !== articleId) : [...ids, articleId]);
  };

  const isBookmarked = (articleId: string) => ids.includes(articleId);

  return { bookmarkedIds: ids, toggle, isBookmarked };
}
