import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { HeaderAccount } from "@/components/layout/header-account";
import { HeaderUtilityBar } from "@/components/layout/header-utility-bar";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import { MainNav } from "@/components/navigation/main-nav";
import { BreakingNewsBar } from "@/components/navigation/breaking-news-bar";
import { HeaderSearch } from "@/components/navigation/header-search";
import { LanguageToggle } from "@/components/navigation/language-toggle";
import type { ArticleListItem } from "@/types/article";

/**
 * Utility + breaking scroll away with the page.
 * Only the masthead + category nav are sticky — no height toggling,
 * so the sticky header never fights scroll position (no jitter).
 */
export function SiteHeader({ breaking }: { breaking: ArticleListItem[] }) {
  return (
    <div className="relative z-40">
      <HeaderUtilityBar />

      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-3.5">
          <MobileMenu />

          <Link href="/" className="min-w-0 shrink-0 lg:mx-0">
            <span className="font-display text-[1.55rem] font-semibold tracking-tight text-foreground sm:text-[1.9rem]">
              {siteConfig.name}
            </span>
          </Link>

          <HeaderSearch />

          <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
            <span className="hidden sm:inline-flex">
              <ThemeToggle />
            </span>
            <span className="hidden lg:inline-flex">
              <LanguageToggle />
            </span>
            <HeaderAccount />
          </div>
        </div>

        <MainNav />
      </header>

      <BreakingNewsBar items={breaking} />
    </div>
  );
}
