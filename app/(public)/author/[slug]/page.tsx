import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mail, AtSign, Globe } from "lucide-react";
import { serverFetch, serverFetchPaginated } from "@/lib/server-fetch";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { HorizontalNewsCard } from "@/components/news/horizontal-news-card";
import { NewsCard } from "@/components/news/news-card";
import { SectionHeader } from "@/components/home/section-header";
import type { Author } from "@/types/author";
import type { ArticleListItem } from "@/types/article";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = await serverFetch<Author>(`/authors/${slug}`);
  if (!author) return { title: "Author not found" };
  return { title: author.name, description: author.bio, alternates: { canonical: `/author/${author.slug}` } };
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const author = await serverFetch<Author>(`/authors/${slug}`);
  if (!author) notFound();

  const articlesResult = await serverFetchPaginated<ArticleListItem>("/articles", { author: author.slug, limit: 20 });
  const articles = articlesResult.data ?? [];
  const popular = [...articles].sort((a, b) => b.viewCount - a.viewCount).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
      <header className="mb-10 flex flex-col items-center gap-4 border-b border-border pb-8 text-center sm:flex-row sm:items-start sm:text-left">
        <Avatar className="h-24 w-24">
          <AvatarImage src={author.avatarUrl} alt={author.name} />
          <AvatarFallback className="text-2xl">{author.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-display text-2xl font-semibold sm:text-3xl">{author.name}</h1>
          <p className="mb-2 text-sm font-medium uppercase tracking-wide text-accent">{author.role}</p>
          <p className="max-w-2xl text-foreground-muted">{author.bio}</p>
          <div className="mt-3 flex items-center justify-center gap-3 sm:justify-start">
            <span className="text-xs text-foreground-muted">{author.articleCount} articles</span>
            {author.socials?.twitter && (
              <a href={author.socials.twitter} className="text-foreground-muted hover:text-foreground" aria-label="Twitter">
                <AtSign className="size-4" />
              </a>
            )}
            {author.socials?.facebook && (
              <a href={author.socials.facebook} className="text-foreground-muted hover:text-foreground" aria-label="Facebook">
                <Globe className="size-4" />
              </a>
            )}
            {author.socials?.email && (
              <a href={`mailto:${author.socials.email}`} className="text-foreground-muted hover:text-foreground" aria-label="Email">
                <Mail className="size-4" />
              </a>
            )}
          </div>
        </div>
      </header>

      {popular.length > 0 && (
        <section className="mb-10">
          <SectionHeader title="Popular articles" />
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
            {popular.map((a) => (
              <NewsCard key={a.id} article={a} />
            ))}
          </div>
        </section>
      )}

      <section>
        <SectionHeader title="Latest articles" />
        <div className="divide-y divide-border">
          {articles.map((a) => (
            <HorizontalNewsCard key={a.id} article={a} />
          ))}
        </div>
      </section>
    </div>
  );
}
