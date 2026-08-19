"use client";

import * as React from "react";
import { ThumbsUp, Reply, Flag, Trash2 } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Comment } from "@/types/comment";
import { formatRelativeTime, cn } from "@/lib/utils";
import { apiClient } from "@/lib/api-client";
import { useAuth } from "@/hooks/use-auth";

export function CommentItem({ comment, depth = 0 }: { comment: Comment; depth?: number }) {
  const { user } = useAuth();
  const [liked, setLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(comment.likeCount);
  const [replying, setReplying] = React.useState(false);
  const [replyText, setReplyText] = React.useState("");
  const [deleted, setDeleted] = React.useState(false);

  const canDelete = user?.id === comment.author.id;

  const handleLike = async () => {
    setLiked((v) => !v);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
    try {
      await apiClient.patch(`/comments/${comment.id}/like`);
    } catch {
      // Non-critical — local optimistic state stays as-is.
    }
  };

  const handleDelete = async () => {
    try {
      await apiClient.delete(`/comments/${comment.id}`);
      setDeleted(true);
    } catch {
      // Leave the comment visible if deletion failed.
    }
  };

  const submitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    try {
      await apiClient.post(`/articles/${comment.articleId}/comments`, { content: replyText.trim(), parentId: comment.id });
    } finally {
      setReplying(false);
      setReplyText("");
    }
  };

  if (deleted) return null;

  return (
    <div className={cn(depth > 0 && "ml-8 border-l border-border pl-4 sm:ml-12")}>
      <div className="flex gap-3 py-4">
        <Avatar className="h-9 w-9 shrink-0">
          <AvatarImage src={comment.author.avatarUrl} alt={comment.author.name} />
          <AvatarFallback>{comment.author.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold">{comment.author.name}</span>
            <span className="text-xs text-foreground-muted">{formatRelativeTime(comment.createdAt)}</span>
          </div>
          <p className="mt-1 text-sm text-foreground">{comment.content}</p>
          <div className="mt-2 flex items-center gap-4 text-xs text-foreground-muted">
            <button
              type="button"
              onClick={handleLike}
              className={cn("inline-flex items-center gap-1 hover:text-foreground", liked && "text-accent")}
            >
              <ThumbsUp className={cn("size-3.5", liked && "fill-current")} /> {likeCount}
            </button>
            <button type="button" onClick={() => setReplying((v) => !v)} className="inline-flex items-center gap-1 hover:text-foreground">
              <Reply className="size-3.5" /> Reply
            </button>
            <button type="button" className="inline-flex items-center gap-1 hover:text-foreground">
              <Flag className="size-3.5" /> Report
            </button>
            {canDelete && (
              <button type="button" onClick={handleDelete} className="ml-auto inline-flex items-center gap-1 hover:text-destructive">
                <Trash2 className="size-3.5" />
              </button>
            )}
          </div>

          {replying && (
            <form className="mt-3 flex flex-col gap-2" onSubmit={submitReply}>
              <Textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={`Reply to ${comment.author.name}…`}
                rows={2}
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => setReplying(false)}>Cancel</Button>
                <Button type="submit" size="sm" disabled={!replyText.trim()}>Reply</Button>
              </div>
            </form>
          )}
        </div>
      </div>

      {comment.replies?.map((reply) => (
        <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
      ))}
    </div>
  );
}
