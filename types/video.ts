import type { Category } from "./category";

export interface VideoNews {
  id: string;
  title: string;
  titleEn?: string;
  slug: string;
  description?: string;
  descriptionEn?: string;
  thumbnailUrl: string;
  videoUrl: string;
  durationSeconds: number;
  category: Category;
  publishedAt: string;
  viewCount: number;
  related?: VideoNews[];
}

export interface VideoListItem extends Omit<VideoNews, "related" | "description" | "descriptionEn"> {}
