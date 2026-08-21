import type { Author } from "./author";
import type { Category } from "./category";
import type { Tag } from "./tag";

export type ArticleStatus = "DRAFT" | "PUBLISHED" | "SCHEDULED" | "ARCHIVED";

export interface Article {
  id: string;
  title: string;
  titleEn?: string;
  slug: string;
  excerpt: string;
  excerptEn?: string;
  content: string;
  contentEn?: string;
  coverImageUrl: string;
  coverImageAlt: string;
  coverImageAltEn?: string;
  category: Category;
  author: Author;
  tags: Tag[];
  status: ArticleStatus;
  isFeatured: boolean;
  isBreaking: boolean;
  readingTimeMinutes: number;
  viewCount: number;
  commentCount: number;
  reactionCount: number;
  publishedAt: string;
  updatedAt: string;
  related?: ArticleListItem[];
}

export type ArticleListItem = Pick<
  Article,
  | "id"
  | "title"
  | "titleEn"
  | "slug"
  | "excerpt"
  | "excerptEn"
  | "coverImageUrl"
  | "coverImageAlt"
  | "coverImageAltEn"
  | "category"
  | "author"
  | "isFeatured"
  | "isBreaking"
  | "readingTimeMinutes"
  | "viewCount"
  | "commentCount"
  | "publishedAt"
>;
