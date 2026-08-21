"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { categoryLabel } from "@/lib/i18n/dictionary";
import { useLocale } from "@/providers/locale-provider";

export function MainNav() {
  const pathname = usePathname();
  const { locale, t } = useLocale();

  return (
    <nav aria-label="Primary" className="hidden border-t border-border lg:block">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-2">
        {siteConfig.nav.primary.map((link) => {
          const active = pathname?.startsWith(link.href);
          const slug = link.href.replace("/category/", "");
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[13px] font-semibold tracking-wide text-foreground-muted transition-colors hover:text-foreground",
                locale === "en" && "uppercase",
                active && "text-signal",
              )}
            >
              {categoryLabel(locale, slug, link.label)}
            </Link>
          );
        })}
        <span className="mx-1 h-4 w-px bg-border" aria-hidden />
        <Link
          href="/videos"
          className={cn(
            "text-[13px] font-semibold tracking-wide text-foreground-muted transition-colors hover:text-foreground",
            locale === "en" && "uppercase",
          )}
        >
          {t.nav.videos}
        </Link>
        <Link
          href="/trending"
          className={cn(
            "text-[13px] font-semibold tracking-wide text-foreground-muted transition-colors hover:text-foreground",
            locale === "en" && "uppercase",
          )}
        >
          {t.nav.trending}
        </Link>
      </div>
    </nav>
  );
}
