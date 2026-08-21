import type { Category } from "./category";

export interface VideoNews {
  id: string;
  title: string;
  titleEn?: string;
  slug: string;
  thumbnailUrl: string;
  videoUrl: string;
  durationSeconds: number;
  category: Category;
  publishedAt: string;
  viewCount: number;
}
