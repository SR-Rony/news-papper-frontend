import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { serverFetch, serverFetchPaginated } from "@/lib/server-fetch";
import { FeaturedNewsCard } from "@/components/news/featured-news-card";
import { NewsCard } from "@/components/news/news-card";
import { TrendingNewsCard } from "@/components/news/trending-news-card";
import { SidebarAd } from "@/components/ads/sidebar-ad";
import { Separator } from "@/components/ui/separator";
import type { Category } from "@/types/category";
import type { ArticleListItem } from "@/types/article";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await serverFetch<Category>(`/categories/${slug}`);
  if (!category) return { title: "Category not found" };
  return { title: category.name, description: category.description, alternates: { canonical: `/category/${category.slug}` } };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await serverFetch<Category>(`/categories/${slug}`);
  if (!category) notFound();

  const [articlesResult, trendingResult] = await Promise.all([
    serverFetchPaginated<ArticleListItem>("/articles", { category: category.slug, limit: 13 }),
    serverFetchPaginated<ArticleListItem>("/articles", { sort: "popular", limit: 5 }),
  ]);

  const articles = articlesResult.data ?? [];
  const trending = trendingResult.data ?? [];
  const [featured, ...rest] = articles;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
      <header className="mb-8 border-b-2 border-ink pb-4">
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">{category.name}</h1>
        {category.description && <p className="mt-2 max-w-2xl text-foreground-muted">{category.description}</p>}
      </header>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0">
          {articles.length === 0 ? (
            <p className="py-16 text-center text-foreground-muted">No articles in this category yet.</p>
          ) : (
            <>
              {featured && (
                <div className="mb-10">
                  <FeaturedNewsCard article={featured} />
                </div>
              )}
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                {rest.map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>
            </>
          )}
        </div>

        <aside className="space-y-10">
          <div>
            <h2 className="mb-4 border-b-2 border-ink pb-2 font-display text-xl font-semibold">Trending now</h2>
            {trending.map((a, i) => (
              <TrendingNewsCard key={a.id} article={a} rank={i + 1} />
            ))}
          </div>
          <Separator />
          <SidebarAd />
        </aside>
      </div>
    </div>
  );
}
