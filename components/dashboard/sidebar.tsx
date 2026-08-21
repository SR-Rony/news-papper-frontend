"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  FolderTree,
  Users2,
  MessageSquare,
  Megaphone,
  ImageIcon,
  BarChart3,
  Settings,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { useLocale } from "@/providers/locale-provider";

type DashLabel =
  | "overviewSection"
  | "contentSection"
  | "manageSection"
  | "overview"
  | "articles"
  | "categories"
  | "authors"
  | "media"
  | "comments"
  | "users"
  | "advertisements"
  | "analytics"
  | "settings";

const navStructure: Array<{
  sectionKey: DashLabel;
  items: Array<{ href: string; labelKey: DashLabel; icon: typeof LayoutDashboard; exact?: boolean }>;
}> = [
  {
    sectionKey: "overviewSection",
    items: [{ href: "/dashboard", labelKey: "overview", icon: LayoutDashboard, exact: true }],
  },
  {
    sectionKey: "contentSection",
    items: [
      { href: "/dashboard/articles", labelKey: "articles", icon: Newspaper },
      { href: "/dashboard/categories", labelKey: "categories", icon: FolderTree },
      { href: "/dashboard/authors", labelKey: "authors", icon: Users2 },
      { href: "/dashboard/media", labelKey: "media", icon: ImageIcon },
      { href: "/dashboard/comments", labelKey: "comments", icon: MessageSquare },
    ],
  },
  {
    sectionKey: "manageSection",
    items: [
      { href: "/dashboard/users", labelKey: "users", icon: Users },
      { href: "/dashboard/advertisements", labelKey: "advertisements", icon: Megaphone },
      { href: "/dashboard/analytics", labelKey: "analytics", icon: BarChart3 },
      { href: "/dashboard/settings", labelKey: "settings", icon: Settings },
    ],
  },
];

export function DashboardSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { t } = useLocale();
  const d = t.dashboard;

  return (
    <div className="flex h-full flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="flex items-center justify-between border-b border-sidebar-border px-5 py-5">
        <Link href="/dashboard" className="font-display text-lg font-semibold text-sidebar-foreground">
          {siteConfig.shortName} {d.brand}
        </Link>
        {onNavigate && (
          <button
            onClick={onNavigate}
            className="rounded-sm p-1 text-sidebar-muted transition-colors hover:bg-sidebar-hover hover:text-sidebar-foreground lg:hidden"
            aria-label={d.closeMenu}
          >
            <X className="size-5" />
          </button>
        )}
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {navStructure.map((group) => (
          <div key={group.sectionKey} className="mb-6">
            <p className="mb-2 px-3 text-[0.6875rem] font-bold uppercase tracking-wide text-sidebar-muted">
              {d[group.sectionKey]}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = item.exact
                  ? pathname === item.href
                  : pathname === item.href || pathname?.startsWith(`${item.href}/`);
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className={cn(
                        "flex items-center gap-2.5 rounded-sm px-3 py-2 text-sm font-medium transition-colors",
                        "text-sidebar-muted hover:bg-sidebar-hover hover:text-sidebar-foreground",
                        active &&
                          "bg-sidebar-active font-semibold text-sidebar-foreground shadow-[inset_3px_0_0_0_var(--accent)]",
                      )}
                    >
                      <Icon className={cn("size-4 shrink-0", active ? "opacity-100" : "opacity-80")} />
                      {d[item.labelKey]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
}
