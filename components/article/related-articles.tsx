import type { ArticleListItem } from "@/types/article";
import { NewsCard } from "@/components/news/news-card";
import { SectionHeader } from "@/components/home/section-header";

export function RelatedArticles({ articles }: { articles: ArticleListItem[] }) {
  if (articles.length === 0) return null;
  return (
    <section className="mt-10 border-t border-border pt-8">
      <SectionHeader title="Related articles" />
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <NewsCard key={a.id} article={a} />
        ))}
      </div>
    </section>
  );
}
