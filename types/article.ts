import type { Author } from "./author";
import type { Category } from "./category";
import type { Tag } from "./tag";

export type ArticleStatus = "DRAFT" | "PUBLISHED" | "SCHEDULED" | "ARCHIVED";

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  coverImageAlt: string;
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
}

export type ArticleListItem = Pick<
  Article,
  | "id"
  | "title"
  | "slug"
  | "excerpt"
  | "coverImageUrl"
  | "coverImageAlt"
  | "category"
  | "author"
  | "isFeatured"
  | "isBreaking"
  | "readingTimeMinutes"
  | "viewCount"
  | "commentCount"
  | "publishedAt"
>;
