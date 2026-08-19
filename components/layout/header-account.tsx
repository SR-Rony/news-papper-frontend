"use client";

import Link from "next/link";
import { User as UserIcon, LogOut, LayoutDashboard } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import { hasRole } from "@/lib/auth";

export function HeaderAccount() {
  const { user, isLoading, logout } = useAuth();

  if (isLoading) return <span className="size-9" />;

  if (!user) {
    return (
      <Button variant="ghost" size="icon" aria-label="Account" asChild className="hidden sm:inline-flex">
        <Link href="/auth/login">
          <UserIcon className="size-[18px]" />
        </Link>
      </Button>
    );
  }

  const isStaff = hasRole(user, ["SUPER_ADMIN", "ADMIN", "EDITOR", "REPORTER"]);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="hidden rounded-full sm:inline-flex" aria-label="Account menu">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="z-50 min-w-48 rounded-md border border-border bg-surface p-1 shadow-lg"
        >
          <div className="px-2.5 py-2 text-sm">
            <p className="font-semibold">{user.name}</p>
            <p className="truncate text-xs text-foreground-muted">{user.email}</p>
          </div>
          <DropdownMenu.Separator className="my-1 h-px bg-border" />
          <DropdownMenu.Item asChild>
            <Link href="/profile" className="block cursor-pointer rounded-sm px-2.5 py-2 text-sm hover:bg-muted">
              Account settings
            </Link>
          </DropdownMenu.Item>
          {isStaff && (
            <DropdownMenu.Item asChild>
              <Link href="/dashboard" className="flex cursor-pointer items-center gap-2 rounded-sm px-2.5 py-2 text-sm hover:bg-muted">
                <LayoutDashboard className="size-3.5" /> Admin dashboard
              </Link>
            </DropdownMenu.Item>
          )}
          <DropdownMenu.Item
            onClick={logout}
            className="flex cursor-pointer items-center gap-2 rounded-sm px-2.5 py-2 text-sm text-destructive hover:bg-muted"
          >
            <LogOut className="size-3.5" /> Sign out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
