"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="hidden border-t border-border lg:block">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-2.5">
        {siteConfig.nav.primary.map((link) => {
          const active = pathname?.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[13px] font-semibold uppercase tracking-wide text-foreground-muted transition-colors hover:text-foreground",
                active && "text-signal"
              )}
            >
              {link.label}
            </Link>
          );
        })}
        <span className="mx-1 h-4 w-px bg-border" aria-hidden />
        {siteConfig.nav.utility.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-[13px] font-semibold uppercase tracking-wide text-foreground-muted transition-colors hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
