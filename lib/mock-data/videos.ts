import type { VideoNews } from "@/types/video";
import type { Category } from "@/types/category";

const categories: Record<string, Category> = {
  bangladesh: {
    id: "c1",
    name: "বাংলাদেশ",
    nameEn: "Bangladesh",
    slug: "bangladesh",
    articleCount: 0,
    isActive: true,
  },
  sport: { id: "c6", name: "খেলা", nameEn: "Sport", slug: "sport", articleCount: 0, isActive: true },
  technology: {
    id: "c5",
    name: "প্রযুক্তি",
    nameEn: "Technology",
    slug: "technology",
    articleCount: 0,
    isActive: true,
  },
  business: {
    id: "c4",
    name: "ব্যবসা",
    nameEn: "Business",
    slug: "business",
    articleCount: 0,
    isActive: true,
  },
  entertainment: {
    id: "c7",
    name: "বিনোদন",
    nameEn: "Entertainment",
    slug: "entertainment",
    articleCount: 0,
    isActive: true,
  },
  world: { id: "c2", name: "বিশ্ব", nameEn: "World", slug: "world", articleCount: 0, isActive: true },
};

const seeds = [
  {
    title: "নতুন মেট্রো লাইন: ঢাকার দ্রুততম যাতায়াতের ভেতরের চিত্র",
    titleEn: "Inside the new metro line: a first look at Dhaka's fastest commute",
    slug: "inside-new-metro-line",
    categorySlug: "bangladesh",
    duration: 184,
    daysAgo: 0,
    img: "photo-1544620347-c4fd4a3d5957",
  },
  {
    title: "ম্যাচ হাইলাইটস: যে ওভারে সিরিজ জয় নিশ্চিত হলো",
    titleEn: "Match highlights: the final over that sealed the series",
    slug: "match-highlights-final-over",
    categorySlug: "sport",
    duration: 312,
    daysAgo: 1,
    img: "photo-1540747913346-19e32dc3e97e",
  },
  {
    title: "গ্রামীণ ক্লিনিকে কীভাবে পৌঁছাচ্ছে এআই রোগনির্ণয়",
    titleEn: "How AI diagnostics are reaching rural clinics",
    slug: "ai-diagnostics-rural-clinics-video",
    categorySlug: "technology",
    duration: 246,
    daysAgo: 1,
    img: "photo-1576091160399-112ba8d25d1d",
  },
  {
    title: "চার মিনিটে বাজেট ব্যাখ্যা",
    titleEn: "Budget explained in four minutes",
    slug: "budget-explained-four-minutes",
    categorySlug: "business",
    duration: 258,
    daysAgo: 2,
    img: "photo-1454165804606-c3d57bc86b40",
  },
  {
    title: "এবারের চলচ্চিত্র উৎসবের নেপথ্যে",
    titleEn: "Behind the scenes at this year's film festival",
    slug: "behind-scenes-film-festival",
    categorySlug: "entertainment",
    duration: 197,
    daysAgo: 3,
    img: "photo-1489599849927-2ee91cede3ba",
  },
  {
    title: "নতুন বাণিজ্য করিডর অঞ্চলের জন্য কী অর্থ রাখে",
    titleEn: "What the new trade corridor means for the region",
    slug: "new-trade-corridor-region",
    categorySlug: "world",
    duration: 221,
    daysAgo: 4,
    img: "photo-1526304640581-d334cdbbf45e",
  },
];

function unsplash(id: string, w = 900, h = 560) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
}

export const mockVideos: VideoNews[] = seeds.map((s, i) => ({
  id: `video-${i + 1}`,
  title: s.title,
  titleEn: s.titleEn,
  slug: s.slug,
  thumbnailUrl: unsplash(s.img),
  videoUrl: "https://example.com/video.mp4",
  durationSeconds: s.duration,
  category: categories[s.categorySlug],
  publishedAt: new Date(Date.now() - s.daysAgo * 86400000).toISOString(),
  viewCount: 5000 + i * 1200,
}));
