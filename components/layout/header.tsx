import { serverFetchPaginated } from "@/lib/server-fetch";
import { SiteHeader } from "@/components/layout/site-header";
import type { ArticleListItem } from "@/types/article";

export async function Header() {
  const { data: breaking } = await serverFetchPaginated<ArticleListItem>("/articles", {
    breaking: "true",
    limit: 6,
  });

  return <SiteHeader breaking={breaking ?? []} />;
}
