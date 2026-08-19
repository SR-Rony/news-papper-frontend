import { z } from "zod";

export const articleSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters").regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers, and hyphens only"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters").max(300, "Excerpt must be 300 characters or fewer"),
  content: z.string().min(20, "Content is too short"),
  coverImageUrl: z.string().url("Enter a valid image URL"),
  categoryId: z.string().min(1, "Select a category"),
  authorId: z.string().min(1, "Select an author"),
  tagIds: z.array(z.string()).optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "SCHEDULED", "ARCHIVED"]),
  isFeatured: z.boolean().optional(),
  isBreaking: z.boolean().optional(),
  publishedAt: z.string().optional(),
});
export type ArticleInput = z.infer<typeof articleSchema>;
