import { FeaturedNewsCard } from "@/components/news/featured-news-card";
import { NewsCard } from "@/components/news/news-card";
import { CompactNewsCard } from "@/components/news/compact-news-card";
import { HorizontalNewsCard } from "@/components/news/horizontal-news-card";
import { TrendingNewsCard } from "@/components/news/trending-news-card";
import { VideoNewsCard } from "@/components/news/video-news-card";
import { SectionHeader } from "@/components/home/section-header";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { AdSlot } from "@/components/ads/ad-slot";
import { SidebarAd } from "@/components/ads/sidebar-ad";
import { Separator } from "@/components/ui/separator";
import { serverFetch, serverFetchPaginated } from "@/lib/server-fetch";
import { mockVideos } from "@/lib/mock-data/videos";
import type { ArticleListItem } from "@/types/article";
import type { Category } from "@/types/category";

export const revalidate = 60;

export default async function HomePage() {
  const [featuredResult, latestResult, trendingResult, categories] = await Promise.all([
    serverFetchPaginated<ArticleListItem>("/articles", { featured: "true", limit: 4 }),
    serverFetchPaginated<ArticleListItem>("/articles", { limit: 6 }),
    serverFetchPaginated<ArticleListItem>("/articles", { sort: "popular", limit: 5 }),
    serverFetch<Category[]>("/categories"),
  ]);

  const featured = featuredResult.data ?? [];
  const latest = latestResult.data ?? [];
  const trending = trendingResult.data ?? [];
  const sections = (categories ?? []).slice(0, 4);

  const [lead, ...secondaryFeatured] = featured;

  const categoryArticles = await Promise.all(
    sections.map((category) => serverFetchPaginated<ArticleListItem>("/articles", { category: category.slug, limit: 4 })),
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
      {lead && (
        <section className="mb-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_1fr]">
          <FeaturedNewsCard article={lead} />
          <div className="divide-y divide-border">
            {secondaryFeatured.slice(0, 3).map((article) => (
              <div key={article.id} className="py-4 first:pt-0">
                <CompactNewsCard article={article} />
              </div>
            ))}
          </div>
        </section>
      )}

      <AdSlot position="TOP_BANNER" className="mb-10" />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0">
          {latest.length > 0 && (
            <section className="mb-12">
              <SectionHeader title="Latest news" href="/category/bangladesh" />
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                {latest.map((article, i) => (
                  <NewsCard key={article.id} article={article} priority={i < 2} />
                ))}
              </div>
            </section>
          )}

          {sections.map((category, idx) => {
            const items = categoryArticles[idx]?.data ?? [];
            if (items.length === 0) return null;
            return (
              <section key={category.id} className="mb-12">
                <SectionHeader title={category.name} href={`/category/${category.slug}`} />
                <div className="divide-y divide-border">
                  {items.map((article) => (
                    <HorizontalNewsCard key={article.id} article={article} />
                  ))}
                </div>
                {idx === 1 && <AdSlot position="ARTICLE_MIDDLE" className="mt-8" />}
              </section>
            );
          })}

          <section className="mb-12">
            <SectionHeader title="Video news" href="/videos" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {mockVideos.slice(0, 3).map((video) => (
                <VideoNewsCard key={video.id} video={video} />
              ))}
            </div>
          </section>

          <NewsletterSection />
        </div>

        <aside className="space-y-10">
          {trending.length > 0 && (
            <div>
              <SectionHeader title="Trending now" href="/trending" />
              <div>
                {trending.map((article, i) => (
                  <TrendingNewsCard key={article.id} article={article} rank={i + 1} />
                ))}
              </div>
            </div>
          )}
          <Separator />
          <SidebarAd />
        </aside>
      </div>
    </div>
  );
}
