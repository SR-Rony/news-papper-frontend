"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, Search, Bell, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { DashboardSidebar } from "./sidebar";
import { useAuth } from "@/hooks/use-auth";

export function DashboardTopbar({ title }: { title: string }) {
  const [open, setOpen] = React.useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background px-4 py-3 lg:px-6">
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <button className="lg:hidden" aria-label="Open menu">
            <Menu className="size-5" />
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40" />
          <Dialog.Content className="fixed inset-y-0 left-0 z-50 w-72 outline-none">
            <Dialog.Title className="sr-only">Dashboard navigation</Dialog.Title>
            <DashboardSidebar onNavigate={() => setOpen(false)} />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <h1 className="font-display text-lg font-semibold">{title}</h1>

      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden sm:block">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-foreground-muted" />
          <Input placeholder="Search…" className="h-9 w-56 pl-8" aria-label="Search dashboard" />
        </div>
        <button className="relative rounded-sm p-2 hover:bg-muted" aria-label="Notifications">
          <Bell className="size-[18px]" />
          <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-signal" />
        </button>
        <ThemeToggle />
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button aria-label="Account menu">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatarUrl} alt={user?.name ?? "Account"} />
                <AvatarFallback>{user?.name?.slice(0, 2) ?? "??"}</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content align="end" sideOffset={8} className="z-50 min-w-48 rounded-md border border-border bg-surface p-1 shadow-lg">
              <div className="px-2.5 py-2 text-sm">
                <p className="font-semibold">{user?.name}</p>
                <p className="truncate text-xs text-foreground-muted">{user?.email}</p>
              </div>
              <DropdownMenu.Separator className="my-1 h-px bg-border" />
              <DropdownMenu.Item asChild>
                <Link href="/profile" className="block cursor-pointer rounded-sm px-2.5 py-2 text-sm hover:bg-muted">
                  Account settings
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <Link href="/" className="block cursor-pointer rounded-sm px-2.5 py-2 text-sm hover:bg-muted">
                  View site
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onClick={handleLogout}
                className="flex cursor-pointer items-center gap-2 rounded-sm px-2.5 py-2 text-sm text-destructive hover:bg-muted"
              >
                <LogOut className="size-3.5" /> Sign out
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </header>
  );
}
