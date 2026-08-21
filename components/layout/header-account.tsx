"use client";

import Link from "next/link";
import { ChevronDown, LogOut, LayoutDashboard, Bookmark, Bell } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import { hasRole } from "@/lib/auth";
import { useLocale } from "@/providers/locale-provider";
import { cn } from "@/lib/utils";

export function HeaderAccount() {
  const { user, isLoading, logout } = useAuth();
  const { t } = useLocale();

  if (isLoading) {
    return <span className="inline-block h-9 w-36 animate-pulse rounded-sm bg-muted" aria-hidden />;
  }

  if (!user) {
    return (
      <div className="flex items-center gap-1.5 sm:gap-2">
        <Button variant="ghost" size="sm" asChild className="px-2.5 sm:px-3">
          <Link href="/auth/login">{t.nav.signIn}</Link>
        </Button>
        <Button size="sm" asChild className="px-2.5 sm:px-3">
          <Link href="/auth/register">{t.nav.register}</Link>
        </Button>
      </div>
    );
  }

  const isStaff = hasRole(user, ["SUPER_ADMIN", "ADMIN", "EDITOR", "REPORTER"]);
  const initials = user.name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          aria-label={t.nav.accountMenu}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border border-border bg-surface py-1 pl-1 pr-2",
            "group text-sm font-medium text-foreground transition-colors",
            "hover:border-border-strong hover:bg-muted",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "data-[state=open]:border-border-strong data-[state=open]:bg-muted",
          )}
        >
          <Avatar className="h-7 w-7">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback className="text-[11px]">{initials}</AvatarFallback>
          </Avatar>
          <span className="hidden max-w-[7rem] truncate sm:inline">{user.name.split(" ")[0]}</span>
          <ChevronDown
            className="size-3.5 shrink-0 text-foreground-muted transition-transform duration-200 group-data-[state=open]:rotate-180"
            aria-hidden
          />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="z-50 min-w-52 rounded-md border border-border bg-surface p-1 shadow-lg"
        >
          <div className="px-2.5 py-2 text-sm">
            <p className="font-semibold">{user.name}</p>
            <p className="truncate text-xs text-foreground-muted">{user.email}</p>
          </div>
          <DropdownMenu.Separator className="my-1 h-px bg-border" />
          <DropdownMenu.Item asChild>
            <Link href="/profile" className="block cursor-pointer rounded-sm px-2.5 py-2 text-sm hover:bg-muted">
              {t.nav.accountSettings}
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <Link
              href="/bookmarks"
              className="flex cursor-pointer items-center gap-2 rounded-sm px-2.5 py-2 text-sm hover:bg-muted"
            >
              <Bookmark className="size-3.5" /> {t.nav.bookmarks}
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <Link
              href="/notifications"
              className="flex cursor-pointer items-center gap-2 rounded-sm px-2.5 py-2 text-sm hover:bg-muted"
            >
              <Bell className="size-3.5" /> {t.nav.notifications}
            </Link>
          </DropdownMenu.Item>
          {isStaff && (
            <DropdownMenu.Item asChild>
              <Link
                href="/dashboard"
                className="flex cursor-pointer items-center gap-2 rounded-sm px-2.5 py-2 text-sm hover:bg-muted"
              >
                <LayoutDashboard className="size-3.5" /> {t.nav.adminDashboard}
              </Link>
            </DropdownMenu.Item>
          )}
          <DropdownMenu.Separator className="my-1 h-px bg-border" />
          <DropdownMenu.Item
            onClick={logout}
            className="flex cursor-pointer items-center gap-2 rounded-sm px-2.5 py-2 text-sm text-destructive hover:bg-muted"
          >
            <LogOut className="size-3.5" /> {t.nav.signOut}
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
