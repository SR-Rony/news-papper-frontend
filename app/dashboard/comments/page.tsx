"use client";

import * as React from "react";
import { Trash2, Search, Loader2 } from "lucide-react";
import { DashboardTopbar } from "@/components/dashboard/topbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ConfirmDeleteDialog } from "@/components/dashboard/confirm-delete-dialog";
import { apiClient } from "@/lib/api-client";
import { formatRelativeTime } from "@/lib/utils";
import { useLocale } from "@/providers/locale-provider";

interface ModerationComment {
  id: string;
  content: string;
  createdAt: string;
  userId: string;
  articleId: string;
}

export default function DashboardCommentsPage() {
  const { t, locale } = useLocale();
  const d = t.dashboard;
  const [comments, setComments] = React.useState<ModerationComment[]>([]);
  const [query, setQuery] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  const load = React.useCallback(() => {
    setLoading(true);
    apiClient
      .get<ModerationComment[]>("/dashboard/comments")
      .then(setComments)
      .finally(() => setLoading(false));
  }, []);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data fetch on mount
    load();
  }, [load]);

  const filtered = comments.filter((c) => c.content.toLowerCase().includes(query.toLowerCase()));

  const remove = async (id: string) => {
    try {
      await apiClient.delete(`/comments/${id}`);
      setComments((prev) => prev.filter((c) => c.id !== id));
    } catch {
      // Keep visible on failure.
    }
  };

  return (
    <>
      <DashboardTopbar title={d.comments} />
      <div className="p-4 lg:p-6">
        <div className="relative mb-4 w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-foreground-muted" />
          <Input
            placeholder={d.searchComments}
            className="pl-8"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="divide-y divide-border rounded-md border border-border bg-surface">
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="size-5 animate-spin text-foreground-muted" />
            </div>
          ) : filtered.length === 0 ? (
            <p className="p-8 text-center text-foreground-muted">{d.noComments}</p>
          ) : (
            filtered.map((comment) => (
              <div key={comment.id} className="flex items-start gap-3 p-4">
                <Avatar className="h-9 w-9 shrink-0">
                  <AvatarImage src={undefined} alt="" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span className="text-xs text-foreground-muted">
                      {formatRelativeTime(comment.createdAt, locale)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-foreground">{comment.content}</p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <ConfirmDeleteDialog
                    trigger={
                      <Button variant="ghost" size="icon" aria-label="Delete">
                        <Trash2 className="size-4" />
                      </Button>
                    }
                    title="Delete comment?"
                    description="This will permanently remove this comment."
                    onConfirm={() => remove(comment.id)}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
