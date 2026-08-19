"use client";

import * as React from "react";
import { ThumbsUp, Heart, Lightbulb, Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatCompactNumber } from "@/lib/utils";
import { apiClient } from "@/lib/api-client";
import { useAuth } from "@/hooks/use-auth";
import type { ReactionType } from "@/types/reaction";

const reactionIcons: Record<Extract<ReactionType, "LIKE" | "LOVE" | "INSIGHTFUL">, typeof ThumbsUp> = {
  LIKE: ThumbsUp,
  LOVE: Heart,
  INSIGHTFUL: Lightbulb,
};

export function ReactionBar({ articleId, initialCounts }: { articleId: string; initialCounts: Record<string, number> }) {
  const { user } = useAuth();
  const [active, setActive] = React.useState<ReactionType | null>(null);
  const [counts, setCounts] = React.useState(initialCounts);
  const [bookmarked, setBookmarked] = React.useState(false);

  React.useEffect(() => {
    if (!user) return;
    apiClient
      .get<{ counts: Record<string, number>; viewerReaction: ReactionType | null }>(`/articles/${articleId}/reactions`, { userId: user.id })
      .then((summary) => {
        setCounts(summary.counts);
        setActive(summary.viewerReaction);
      })
      .catch(() => undefined);
  }, [articleId, user]);

  const react = async (type: ReactionType) => {
    if (!user) return;
    const previous = { active, counts };
    setCounts((prev) => {
      const next = { ...prev };
      if (active === type) next[type] = Math.max(0, (next[type] ?? 0) - 1);
      else {
        if (active) next[active] = Math.max(0, (next[active] ?? 0) - 1);
        next[type] = (next[type] ?? 0) + 1;
      }
      return next;
    });
    setActive(active === type ? null : type);
    try {
      await apiClient.post(`/articles/${articleId}/reactions`, { type });
    } catch {
      setActive(previous.active);
      setCounts(previous.counts);
    }
  };

  const toggleBookmark = async () => {
    setBookmarked((v) => !v);
    try {
      if (bookmarked) await apiClient.delete(`/bookmarks/${articleId}`);
      else await apiClient.post(`/bookmarks/${articleId}`);
    } catch {
      setBookmarked((v) => !v);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 py-6" role="group" aria-label="Reactions">
      {(Object.keys(reactionIcons) as Array<keyof typeof reactionIcons>).map((type) => {
        const Icon = reactionIcons[type];
        const isActive = active === type;
        return (
          <Button
            key={type}
            variant={isActive ? "secondary" : "outline"}
            size="sm"
            onClick={() => react(type)}
            disabled={!user}
            aria-pressed={isActive}
          >
            <Icon className={cn("size-4", isActive && "fill-current")} />
            {formatCompactNumber(counts[type] ?? 0)}
          </Button>
        );
      })}
      <Button
        variant={bookmarked ? "secondary" : "outline"}
        size="sm"
        onClick={toggleBookmark}
        disabled={!user}
        aria-pressed={bookmarked}
        className="ml-auto"
      >
        {bookmarked ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
        {bookmarked ? "Saved" : "Save"}
      </Button>
    </div>
  );
}
