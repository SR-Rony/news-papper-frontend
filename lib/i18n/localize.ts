import type { Locale } from "@/lib/i18n/dictionary";
import type { Article, ArticleListItem } from "@/types/article";
import type { Author } from "@/types/author";
import type { Category } from "@/types/category";
import type { Tag } from "@/types/tag";
import type { VideoNews } from "@/types/video";

function pick(bn: string | undefined, en: string | undefined, locale: Locale, fallback = ""): string {
  if (locale === "en") return en?.trim() || bn?.trim() || fallback;
  return bn?.trim() || en?.trim() || fallback;
}

export function localizeCategory(category: Category, locale: Locale): Category {
  return {
    ...category,
    name: pick(category.name, category.nameEn, locale, category.slug),
    description: pick(category.description, category.descriptionEn, locale, category.description ?? ""),
  };
}

export function localizeAuthor<T extends Pick<Author, "name" | "role" | "bio"> & Partial<Author>>(
  author: T,
  locale: Locale,
): T {
  return {
    ...author,
    name: pick(author.name, author.nameEn, locale, author.name),
    role: pick(author.role, author.roleEn, locale, author.role),
    bio: pick(author.bio, author.bioEn, locale, author.bio),
  };
}

export function localizeTag(tag: Tag, locale: Locale): Tag {
  return {
    ...tag,
    name: pick(tag.name, tag.nameEn, locale, tag.name),
  };
}

export function localizeArticleListItem(article: ArticleListItem, locale: Locale): ArticleListItem {
  return {
    ...article,
    title: pick(article.title, article.titleEn, locale),
    excerpt: pick(article.excerpt, article.excerptEn, locale),
    coverImageAlt: pick(article.coverImageAlt, article.coverImageAltEn, locale, article.title),
    category: localizeCategory(article.category, locale),
    author: localizeAuthor(article.author, locale),
  };
}

export function localizeArticle(article: Article, locale: Locale): Article {
  return {
    ...article,
    title: pick(article.title, article.titleEn, locale),
    excerpt: pick(article.excerpt, article.excerptEn, locale),
    content: pick(article.content, article.contentEn, locale),
    coverImageAlt: pick(article.coverImageAlt, article.coverImageAltEn, locale, article.title),
    category: localizeCategory(article.category, locale),
    author: localizeAuthor(article.author, locale),
    tags: (article.tags ?? []).map((tag) => localizeTag(tag, locale)),
    related: article.related?.map((item) => localizeArticleListItem(item, locale)),
  };
}

export function localizeVideo(video: VideoNews, locale: Locale): VideoNews {
  return {
    ...video,
    title: pick(video.title, video.titleEn, locale),
    category: localizeCategory(video.category, locale),
  };
}
