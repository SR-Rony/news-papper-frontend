import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { LanguageToggle } from "@/components/navigation/language-toggle";
import { HeaderAccount } from "@/components/layout/header-account";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import { MainNav } from "@/components/navigation/main-nav";
import { BreakingNewsBar } from "@/components/navigation/breaking-news-bar";
import { HeaderSearch } from "@/components/navigation/header-search";
import { serverFetchPaginated } from "@/lib/server-fetch";
import type { ArticleListItem } from "@/types/article";

const today = () =>
  new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }).format(new Date());

export async function Header() {
  const { data: breaking } = await serverFetchPaginated<ArticleListItem>("/articles", { breaking: "true", limit: 6 });
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      {/* Utility strip — desktop only */}
      <div className="hidden border-b border-border lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5 text-xs text-foreground-muted">
          <span>{today()}</span>
          <div className="flex items-center gap-4">
            <Link href="/videos" className="hover:text-foreground">Videos</Link>
            <Link href="/trending" className="hover:text-foreground">Trending</Link>
            <LanguageToggle />
          </div>
        </div>
      </div>

      {/* Masthead */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <MobileMenu />

        <Link href="/" className="shrink-0 lg:mx-0">
          <span className="font-display text-[1.75rem] font-semibold tracking-tight text-foreground sm:text-[2.15rem]">
            {siteConfig.name}
          </span>
        </Link>

        <HeaderSearch />

        <div className="flex items-center gap-1">
          <span className="hidden sm:inline-flex">
            <ThemeToggle />
          </span>
          <HeaderAccount />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/auth/register">Subscribe</Link>
          </Button>
        </div>
      </div>

      <MainNav />
      <BreakingNewsBar items={breaking ?? []} />
    </header>
  );
}
