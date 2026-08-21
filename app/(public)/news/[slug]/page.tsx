import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { serverFetch, serverFetchPaginated } from "@/lib/server-fetch";
import { ArticleHeader } from "@/components/article/article-header";
import { LocalizedArticleBody } from "@/components/article/localized-article-body";
import { ReactionBar } from "@/components/article/reaction-bar";
import { RelatedArticles } from "@/components/article/related-articles";
import { CommentsSection } from "@/components/comments/comments-section";
import { AdSlot } from "@/components/ads/ad-slot";
import { SidebarAd } from "@/components/ads/sidebar-ad";
import { TrendingNewsCard } from "@/components/news/trending-news-card";
import { LocalizedSectionHeader } from "@/components/home/localized-section-header";
import { Separator } from "@/components/ui/separator";
import { getServerLocale } from "@/lib/i18n/server-locale";
import { localizeArticle } from "@/lib/i18n/localize";
import type { Article, ArticleListItem } from "@/types/article";
import type { Comment } from "@/types/comment";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getArticle(slug: string) {
  return serverFetch<Article & { related: ArticleListItem[] }>(`/articles/${slug}`, undefined, { revalidate: 0 });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Article not found" };
  const locale = await getServerLocale();
  const a = localizeArticle(article, locale);
  return {
    title: a.title,
    description: a.excerpt,
    openGraph: {
      type: "article",
      title: a.title,
      description: a.excerpt,
      images: [a.coverImageUrl],
      publishedTime: a.publishedAt,
      authors: [a.author.name],
    },
    twitter: { card: "summary_large_image", title: a.title, description: a.excerpt, images: [a.coverImageUrl] },
    alternates: { canonical: `/news/${a.slug}` },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const [rawComments, trendingResult] = await Promise.all([
    serverFetch<any[]>(`/articles/${article.id}/comments`, undefined, { revalidate: 0 }),
    serverFetchPaginated<ArticleListItem>("/articles", { sort: "popular", limit: 5 }),
  ]);

  const trending = trendingResult.data ?? [];

  function normalizeComment(c: any): Comment {
    return {
      ...c,
      author: c.author ?? c.user ?? { id: "", name: "Unknown", avatarUrl: undefined },
      replies: (c.replies ?? []).map(normalizeComment),
    };
  }
  const comments = (rawComments ?? []).map(normalizeComment);
  const locale = await getServerLocale();
  const localized = localizeArticle(article, locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: localized.title,
    description: localized.excerpt,
    image: [localized.coverImageUrl],
    datePublished: localized.publishedAt,
    dateModified: localized.updatedAt,
    author: [{ "@type": "Person", name: localized.author.name }],
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
      {/* JSON-LD structured data for search engines */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        <article className="min-w-0 max-w-[720px]">
          <ArticleHeader article={article} />
          <AdSlot position="ARTICLE_TOP" className="mb-8" />
          <LocalizedArticleBody article={article} />
          <ReactionBar
            articleId={article.id}
            initialCounts={{ LIKE: article.reactionCount, LOVE: Math.round(article.reactionCount * 0.4), INSIGHTFUL: Math.round(article.reactionCount * 0.2) }}
          />
          <AdSlot position="ARTICLE_BOTTOM" className="mb-4" />
          <RelatedArticles articles={article.related ?? []} />
          <CommentsSection articleId={article.id} initialComments={comments} />
        </article>

        <aside className="space-y-10">
          <div>
            <LocalizedSectionHeader titleKey="trending" href="/trending" />
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
