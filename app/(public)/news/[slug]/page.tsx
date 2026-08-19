import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { serverFetch, serverFetchPaginated } from "@/lib/server-fetch";
import { ArticleHeader } from "@/components/article/article-header";
import { ArticleContent } from "@/components/article/article-content";
import { ArticleTags } from "@/components/article/article-tags";
import { ReactionBar } from "@/components/article/reaction-bar";
import { RelatedArticles } from "@/components/article/related-articles";
import { CommentsSection } from "@/components/comments/comments-section";
import { AdSlot } from "@/components/ads/ad-slot";
import { SidebarAd } from "@/components/ads/sidebar-ad";
import { TrendingNewsCard } from "@/components/news/trending-news-card";
import { Separator } from "@/components/ui/separator";
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
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      images: [article.coverImageUrl],
      publishedTime: article.publishedAt,
      authors: [article.author.name],
    },
    twitter: { card: "summary_large_image", title: article.title, description: article.excerpt, images: [article.coverImageUrl] },
    alternates: { canonical: `/news/${article.slug}` },
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: [article.coverImageUrl],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: [{ "@type": "Person", name: article.author.name }],
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
      {/* JSON-LD structured data for search engines */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        <article className="min-w-0 max-w-[720px]">
          <ArticleHeader article={article} />
          <AdSlot position="ARTICLE_TOP" className="mb-8" />
          <ArticleContent html={article.content} />
          <ArticleTags tags={article.tags} />
          <ReactionBar
            articleId={article.id}
            initialCounts={{ LIKE: article.reactionCount, LOVE: Math.round(article.reactionCount * 0.4), INSIGHTFUL: Math.round(article.reactionCount * 0.2) }}
          />
          <AdSlot position="ARTICLE_BOTTOM" className="mb-4" />
          <RelatedArticles articles={article.related} />
          <CommentsSection articleId={article.id} initialComments={comments} />
        </article>

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
