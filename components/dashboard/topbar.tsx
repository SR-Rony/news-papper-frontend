"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, Search, Bell, LogOut, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { LanguageToggle } from "@/components/navigation/language-toggle";
import { DashboardSidebar } from "./sidebar";
import { useAuth } from "@/hooks/use-auth";
import { useLocale } from "@/providers/locale-provider";
import { cn } from "@/lib/utils";

export function DashboardTopbar({ title }: { title: string }) {
  const [open, setOpen] = React.useState(false);
  const { user, logout } = useAuth();
  const { t } = useLocale();
  const router = useRouter();
  const d = t.dashboard;

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background px-4 py-3 lg:px-6">
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <button className="lg:hidden" aria-label={d.openMenu}>
            <Menu className="size-5" />
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40" />
          <Dialog.Content className="fixed inset-y-0 left-0 z-50 w-72 outline-none">
            <Dialog.Title className="sr-only">{d.navTitle}</Dialog.Title>
            <DashboardSidebar onNavigate={() => setOpen(false)} />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <h1 className="font-display text-lg font-semibold">{title}</h1>

      <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-foreground-muted" />
          <Input
            placeholder={d.searchPlaceholder}
            className="h-9 w-52 pl-8 lg:w-56"
            aria-label={d.searchAria}
          />
        </div>
        <button className="relative rounded-sm p-2 hover:bg-muted" aria-label={t.nav.notifications}>
          <Bell className="size-[18px]" />
          <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-signal" />
        </button>
        <LanguageToggle />
        <ThemeToggle />
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              type="button"
              aria-label={d.accountMenu}
              className={cn(
                "group inline-flex items-center gap-1 rounded-full border border-border bg-surface py-1 pl-1 pr-1.5",
                "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              )}
            >
              <Avatar className="h-7 w-7">
                <AvatarImage src={user?.avatarUrl} alt={user?.name ?? "Account"} />
                <AvatarFallback>{user?.name?.slice(0, 2) ?? "??"}</AvatarFallback>
              </Avatar>
              <ChevronDown className="size-3.5 text-foreground-muted transition-transform group-data-[state=open]:rotate-180" />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              align="end"
              sideOffset={8}
              className="z-50 min-w-48 rounded-md border border-border bg-surface p-1 shadow-lg"
            >
              <div className="px-2.5 py-2 text-sm">
                <p className="font-semibold">{user?.name}</p>
                <p className="truncate text-xs text-foreground-muted">{user?.email}</p>
              </div>
              <DropdownMenu.Separator className="my-1 h-px bg-border" />
              <DropdownMenu.Item asChild>
                <Link href="/profile" className="block cursor-pointer rounded-sm px-2.5 py-2 text-sm hover:bg-muted">
                  {t.nav.accountSettings}
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <Link href="/" className="block cursor-pointer rounded-sm px-2.5 py-2 text-sm hover:bg-muted">
                  {d.viewSite}
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onClick={handleLogout}
                className="flex cursor-pointer items-center gap-2 rounded-sm px-2.5 py-2 text-sm text-destructive hover:bg-muted"
              >
                <LogOut className="size-3.5" /> {t.nav.signOut}
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </header>
  );
}
