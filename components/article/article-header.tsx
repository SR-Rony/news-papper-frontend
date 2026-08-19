import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/types/article";
import { CategoryTag } from "@/components/news/category-tag";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";
import { ArticleBreadcrumb } from "./breadcrumb";
import { ShareBar } from "./share-bar";

export function ArticleHeader({ article }: { article: Article }) {
  return (
    <header>
      <ArticleBreadcrumb category={article.category} title={article.title} />
      <div className="mb-3 flex items-center gap-2">
        <CategoryTag category={article.category} />
        {article.isBreaking && <Badge variant="destructive">Breaking</Badge>}
      </div>
      <h1 className="mb-3 font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.75rem]">
        {article.title}
      </h1>
      <p className="mb-5 text-lg text-foreground-muted">{article.excerpt}</p>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
        <Link href={`/author/${article.author.slug}`} className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={article.author.avatarUrl} alt={article.author.name} />
            <AvatarFallback>{article.author.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">{article.author.name}</p>
            <p className="text-xs text-foreground-muted">
              {formatDate(article.publishedAt)} · {article.readingTimeMinutes} min read
            </p>
          </div>
        </Link>
        <ShareBar title={article.title} />
      </div>

      <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-md bg-muted">
        <Image src={article.coverImageUrl} alt={article.coverImageAlt} fill priority sizes="(max-width: 1024px) 100vw, 800px" className="object-cover" />
      </div>
    </header>
  );
}
