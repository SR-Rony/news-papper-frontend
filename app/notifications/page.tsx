"use client";

import * as React from "react";
import Link from "next/link";
import { Bell, Zap, MessageCircle, Settings, UserCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatRelativeTime } from "@/lib/utils";
import { apiClient } from "@/lib/api-client";
import { useAuth } from "@/hooks/use-auth";
import type { AppNotification, NotificationType } from "@/types/notification";

const iconByType: Record<NotificationType, typeof Bell> = {
  BREAKING: Zap,
  COMMENT: MessageCircle,
  SYSTEM: Settings,
  ACCOUNT: UserCircle,
};

export default function NotificationsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [items, setItems] = React.useState<AppNotification[]>([]);
  const [loading, setLoading] = React.useState(true);

  const load = React.useCallback(() => {
    setLoading(true);
    apiClient.get<AppNotification[]>("/notifications").then(setItems).finally(() => setLoading(false));
  }, []);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- conditional initial fetch depending on auth state
    if (user) load();
    else setLoading(false);
  }, [user, load]);

  const unreadCount = items.filter((n) => !n.isRead).length;

  const markAllRead = async () => {
    setItems((prev) => prev.map((n) => ({ ...n, isRead: true })));
    try {
      await apiClient.patch("/notifications/read-all");
    } catch {
      load();
    }
  };

  const markRead = async (id: string) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
    try {
      await apiClient.patch(`/notifications/${id}/read`);
    } catch {
      load();
    }
  };

  if (authLoading || loading) {
    return <div className="flex justify-center py-16"><Loader2 className="size-6 animate-spin text-foreground-muted" /></div>;
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <Bell className="mx-auto mb-3 size-8 text-foreground-muted" />
        <p className="font-semibold">Sign in to see your notifications</p>
        <Link href="/auth/login" className="mt-2 inline-block text-sm font-semibold text-accent hover:underline">Sign in</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="flex items-center gap-2 font-display text-3xl font-semibold">
          <Bell className="size-7" /> Notifications
          {unreadCount > 0 && <span className="rounded-full bg-signal px-2 py-0.5 text-sm font-bold text-white">{unreadCount}</span>}
        </h1>
        {unreadCount > 0 && <Button variant="ghost" size="sm" onClick={markAllRead}>Mark all as read</Button>}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-center">
          <Bell className="mb-3 size-8 text-foreground-muted" />
          <p className="font-semibold">You&rsquo;re all caught up</p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {items.map((n) => {
            const Icon = iconByType[n.type];
            const content = (
              <div className={cn("flex items-start gap-3 py-4 px-2 -mx-2 rounded-sm", !n.isRead && "bg-accent-soft")}>
                <span className={cn("mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full", n.type === "BREAKING" ? "bg-signal-soft text-signal" : "bg-muted text-foreground-muted")}>
                  <Icon className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{n.title}</p>
                  <p className="mt-0.5 text-sm text-foreground-muted">{n.message}</p>
                  <span className="mt-1 block text-xs text-foreground-muted">{formatRelativeTime(n.createdAt)}</span>
                </div>
                {!n.isRead && <span className="mt-2 size-2 shrink-0 rounded-full bg-signal" aria-label="Unread" />}
              </div>
            );

            return n.href ? (
              <Link key={n.id} href={n.href} onClick={() => markRead(n.id)} className="block">{content}</Link>
            ) : (
              <button key={n.id} type="button" onClick={() => markRead(n.id)} className="block w-full text-left">{content}</button>
            );
          })}
        </div>
      )}
    </div>
  );
}
