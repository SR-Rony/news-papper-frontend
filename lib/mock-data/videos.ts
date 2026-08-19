import type { VideoNews } from "@/types/video";
import type { Category } from "@/types/category";

// Video news has no backend entity yet — kept as local placeholder data
// until a Video module is added to the NestJS API.
const categories: Record<string, Category> = {
  bangladesh: { id: "c1", name: "Bangladesh", slug: "bangladesh", articleCount: 0, isActive: true },
  sport: { id: "c6", name: "Sport", slug: "sport", articleCount: 0, isActive: true },
  technology: { id: "c5", name: "Technology", slug: "technology", articleCount: 0, isActive: true },
  business: { id: "c4", name: "Business", slug: "business", articleCount: 0, isActive: true },
  entertainment: { id: "c7", name: "Entertainment", slug: "entertainment", articleCount: 0, isActive: true },
  world: { id: "c2", name: "World", slug: "world", articleCount: 0, isActive: true },
};

const seeds = [
  { title: "Inside the new metro line: a first look at Dhaka's fastest commute", categorySlug: "bangladesh", duration: 184, daysAgo: 0, img: "photo-1544620347-c4fd4a3d5957" },
  { title: "Match highlights: the final over that sealed the series", categorySlug: "sport", duration: 312, daysAgo: 1, img: "photo-1540747913346-19e32dc3e97e" },
  { title: "How AI diagnostics are reaching rural clinics", categorySlug: "technology", duration: 246, daysAgo: 1, img: "photo-1576091160399-112ba8d25d1d" },
  { title: "Budget explained in four minutes", categorySlug: "business", duration: 258, daysAgo: 2, img: "photo-1454165804606-c3d57bc86b40" },
  { title: "Behind the scenes at this year's film festival", categorySlug: "entertainment", duration: 197, daysAgo: 3, img: "photo-1489599849927-2ee91cede3ba" },
  { title: "What the new trade corridor means for the region", categorySlug: "world", duration: 221, daysAgo: 4, img: "photo-1526304640581-d334cdbbf45e" },
];

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function unsplash(id: string, w = 900, h = 560) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
}

export const mockVideos: VideoNews[] = seeds.map((s, i) => ({
  id: `video-${i + 1}`,
  title: s.title,
  slug: slugify(s.title),
  thumbnailUrl: unsplash(s.img),
  videoUrl: "https://example.com/video.mp4",
  durationSeconds: s.duration,
  category: categories[s.categorySlug],
  publishedAt: new Date(Date.now() - s.daysAgo * 86400000).toISOString(),
  viewCount: 5000 + i * 1200,
}));
