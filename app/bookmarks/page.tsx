"use client";

import * as React from "react";
import Link from "next/link";
import { Bookmark, Loader2 } from "lucide-react";
import { HorizontalNewsCard } from "@/components/news/horizontal-news-card";
import { apiClient } from "@/lib/api-client";
import { useAuth } from "@/hooks/use-auth";
import type { Article } from "@/types/article";

interface BookmarkEntry {
  id: string;
  articleId: string;
  article: Article;
}

export default function BookmarksPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [bookmarks, setBookmarks] = React.useState<BookmarkEntry[]>([]);
  const [loading, setLoading] = React.useState(true);

  const load = React.useCallback(() => {
    setLoading(true);
    apiClient.get<BookmarkEntry[]>("/bookmarks").then(setBookmarks).finally(() => setLoading(false));
  }, []);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- conditional initial fetch depending on auth state
    if (user) load();
    else setLoading(false);
  }, [user, load]);

  const remove = async (articleId: string) => {
    setBookmarks((prev) => prev.filter((b) => b.articleId !== articleId));
    try {
      await apiClient.delete(`/bookmarks/${articleId}`);
    } catch {
      load();
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:py-10">
      <h1 className="mb-6 flex items-center gap-2 font-display text-3xl font-semibold">
        <Bookmark className="size-7" /> Bookmarks
      </h1>

      {authLoading || loading ? (
        <div className="flex justify-center py-16"><Loader2 className="size-6 animate-spin text-foreground-muted" /></div>
      ) : !user ? (
        <div className="flex flex-col items-center py-16 text-center">
          <Bookmark className="mb-3 size-8 text-foreground-muted" />
          <p className="font-semibold">Sign in to see your bookmarks</p>
          <Link href="/auth/login" className="mt-2 text-sm font-semibold text-accent hover:underline">Sign in</Link>
        </div>
      ) : bookmarks.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-center">
          <Bookmark className="mb-3 size-8 text-foreground-muted" />
          <p className="font-semibold">No saved articles yet</p>
          <p className="mt-1 text-sm text-foreground-muted">Tap the save icon on any article to add it here.</p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {bookmarks.map((b) => (
            <div key={b.id} className="group relative">
              <HorizontalNewsCard article={b.article} />
              <button
                type="button"
                onClick={() => remove(b.articleId)}
                className="absolute right-0 top-5 text-xs font-semibold text-signal opacity-0 hover:underline group-hover:opacity-100"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
