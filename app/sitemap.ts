import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { serverFetch, serverFetchPaginated } from "@/lib/server-fetch";
import type { ArticleListItem } from "@/types/article";
import type { Category } from "@/types/category";
import type { Author } from "@/types/author";
import type { VideoNews } from "@/types/video";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = ["", "/search", "/trending", "/videos"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
  }));

  const [articlesResult, categories, authors, videosResult] = await Promise.all([
    serverFetchPaginated<ArticleListItem>("/articles", { limit: 200 }),
    serverFetch<Category[]>("/categories"),
    serverFetch<Author[]>("/authors"),
    serverFetchPaginated<VideoNews>("/videos", { limit: 100 }),
  ]);

  const articleRoutes: MetadataRoute.Sitemap = (articlesResult.data ?? []).map((a) => ({
    url: `${siteConfig.url}/news/${a.slug}`,
    lastModified: new Date(a.publishedAt),
  }));

  const categoryRoutes: MetadataRoute.Sitemap = (categories ?? []).map((c) => ({
    url: `${siteConfig.url}/category/${c.slug}`,
    lastModified: new Date(),
  }));

  const authorRoutes: MetadataRoute.Sitemap = (authors ?? []).map((a) => ({
    url: `${siteConfig.url}/author/${a.slug}`,
    lastModified: new Date(),
  }));

  const videoRoutes: MetadataRoute.Sitemap = (videosResult.data ?? []).map((v) => ({
    url: `${siteConfig.url}/videos/${v.slug}`,
    lastModified: new Date(v.publishedAt),
  }));

  return [...staticRoutes, ...articleRoutes, ...categoryRoutes, ...authorRoutes, ...videoRoutes];
}
