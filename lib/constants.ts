export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

export const DEFAULT_PAGE_SIZE = 12;

export const QUERY_KEYS = {
  articles: "articles",
  article: "article",
  categories: "categories",
  category: "category",
  authors: "authors",
  author: "author",
  search: "search",
  trending: "trending",
  videos: "videos",
  comments: "comments",
  notifications: "notifications",
  bookmarks: "bookmarks",
  currentUser: "current-user",
  dashboardStats: "dashboard-stats",
  users: "users",
  advertisements: "advertisements",
} as const;
