"use client";

import Link from "next/link";
import { LanguageToggle } from "@/components/navigation/language-toggle";
import { formatFullDate } from "@/lib/utils";
import { useLocale } from "@/providers/locale-provider";

export function HeaderUtilityBar() {
  const { locale, t } = useLocale();

  return (
    <div className="hidden border-b border-border lg:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5 text-xs text-foreground-muted">
        <span suppressHydrationWarning>{formatFullDate(new Date(), locale)}</span>
        <div className="flex items-center gap-4">
          <Link href="/videos" className="hover:text-foreground">
            {t.nav.videos}
          </Link>
          <Link href="/trending" className="hover:text-foreground">
            {t.nav.trending}
          </Link>
        </div>
      </div>
    </div>
  );
}
