"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Newspaper, FolderTree, Users2, MessageSquare,
  Megaphone, ImageIcon, BarChart3, Settings, Users, X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

const links = [
  { section: "Overview", items: [{ href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true }] },
  {
    section: "Content",
    items: [
      { href: "/dashboard/articles", label: "Articles", icon: Newspaper },
      { href: "/dashboard/categories", label: "Categories", icon: FolderTree },
      { href: "/dashboard/authors", label: "Authors", icon: Users2 },
      { href: "/dashboard/media", label: "Media", icon: ImageIcon },
      { href: "/dashboard/comments", label: "Comments", icon: MessageSquare },
    ],
  },
  {
    section: "Manage",
    items: [
      { href: "/dashboard/users", label: "Users", icon: Users },
      { href: "/dashboard/advertisements", label: "Advertisements", icon: Megaphone },
      { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
      { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ],
  },
];

export function DashboardSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-ink text-paper">
      <div className="flex items-center justify-between px-5 py-5">
        <Link href="/dashboard" className="font-display text-lg font-semibold">
          {siteConfig.shortName} Admin
        </Link>
        {onNavigate && (
          <button onClick={onNavigate} className="lg:hidden" aria-label="Close menu">
            <X className="size-5" />
          </button>
        )}
      </div>
      <nav className="flex-1 overflow-y-auto px-3 pb-6">
        {links.map((group) => (
          <div key={group.section} className="mb-6">
            <p className="mb-2 px-3 text-[0.6875rem] font-bold uppercase tracking-wide text-paper/40">{group.section}</p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = "exact" in item && item.exact ? pathname === item.href : pathname?.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className={cn(
                        "flex items-center gap-2.5 rounded-sm px-3 py-2 text-sm font-medium text-paper/70 hover:bg-white/5 hover:text-paper",
                        active && "bg-white/10 text-paper"
                      )}
                    >
                      <Icon className="size-4" /> {item.label}
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
