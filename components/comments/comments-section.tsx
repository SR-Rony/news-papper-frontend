"use client";

import * as React from "react";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CommentItem } from "./comment-item";
import type { Comment } from "@/types/comment";
import { apiClient, ApiRequestError } from "@/lib/api-client";
import { useAuth } from "@/hooks/use-auth";

export function CommentsSection({ articleId, initialComments }: { articleId: string; initialComments: Comment[] }) {
  const { user } = useAuth();
  const [comments, setComments] = React.useState(initialComments);
  const [draft, setDraft] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setError(null);
    setSubmitting(true);
    try {
      const created = await apiClient.post<Comment>(`/articles/${articleId}/comments`, { content: draft.trim() });
      setComments((prev) => [{ ...created, author: { id: user!.id, name: user!.name, avatarUrl: user!.avatarUrl }, replies: [] }, ...prev]);
      setDraft("");
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : "Couldn't post your comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="comments" className="mt-10 border-t border-border pt-8">
      <h2 className="mb-5 font-display text-xl font-semibold">
        Comments <span className="text-foreground-muted">({comments.length})</span>
      </h2>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-2">
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Join the discussion…"
            rows={3}
            aria-label="Write a comment"
          />
          {error && <p className="text-xs font-medium text-destructive">{error}</p>}
          <div className="flex justify-end">
            <Button type="submit" size="sm" disabled={!draft.trim() || submitting}>
              {submitting ? "Posting…" : "Post comment"}
            </Button>
          </div>
        </form>
      ) : (
        <p className="mb-6 rounded-sm border border-border bg-muted px-4 py-3 text-sm text-foreground-muted">
          <Link href="/auth/login" className="font-semibold text-accent hover:underline">Sign in</Link> to join the discussion.
        </p>
      )}

      {comments.length === 0 ? (
        <p className="py-8 text-center text-sm text-foreground-muted">Be the first to comment.</p>
      ) : (
        <div className="divide-y divide-border">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </section>
  );
}
