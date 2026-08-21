import type { AdPosition, Advertisement } from "@/types/advertisement";

/** Local demo creatives used when the API has no active ad for a slot. */
export const demoAds: Record<AdPosition, Advertisement> = {
  HEADER: {
    id: "demo-header",
    name: "City Bank — Everyday Banking",
    position: "HEADER",
    imageUrl:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=728&h=90&q=80",
    targetUrl: "https://example.com/city-bank",
    isActive: true,
    impressions: 0,
    clicks: 0,
    startDate: new Date().toISOString(),
  },
  TOP_BANNER: {
    id: "demo-top-banner",
    name: "Grameenphone — 5G Unlimited",
    position: "TOP_BANNER",
    imageUrl:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&h=120&q=80",
    targetUrl: "https://example.com/gp-5g",
    isActive: true,
    impressions: 0,
    clicks: 0,
    startDate: new Date().toISOString(),
  },
  SIDEBAR: {
    id: "demo-sidebar",
    name: "bKash — Send Money Instantly",
    position: "SIDEBAR",
    imageUrl:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=300&h=250&q=80",
    targetUrl: "https://example.com/bkash",
    isActive: true,
    impressions: 0,
    clicks: 0,
    startDate: new Date().toISOString(),
  },
  ARTICLE_TOP: {
    id: "demo-article-top",
    name: "Walton — Smart Living",
    position: "ARTICLE_TOP",
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&h=120&q=80",
    targetUrl: "https://example.com/walton",
    isActive: true,
    impressions: 0,
    clicks: 0,
    startDate: new Date().toISOString(),
  },
  ARTICLE_MIDDLE: {
    id: "demo-article-middle",
    name: "Pathao — Ride · Food · Pay",
    position: "ARTICLE_MIDDLE",
    imageUrl:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=960&h=250&q=80",
    targetUrl: "https://example.com/pathao",
    isActive: true,
    impressions: 0,
    clicks: 0,
    startDate: new Date().toISOString(),
  },
  ARTICLE_BOTTOM: {
    id: "demo-article-bottom",
    name: "Daraz — Mega Deal Days",
    position: "ARTICLE_BOTTOM",
    imageUrl:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&h=120&q=80",
    targetUrl: "https://example.com/daraz",
    isActive: true,
    impressions: 0,
    clicks: 0,
    startDate: new Date().toISOString(),
  },
  FOOTER: {
    id: "demo-footer",
    name: "BRAC University — Apply Now",
    position: "FOOTER",
    imageUrl:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&h=120&q=80",
    targetUrl: "https://example.com/bracu",
    isActive: true,
    impressions: 0,
    clicks: 0,
    startDate: new Date().toISOString(),
  },
};

export const demoAdCopy: Record<
  AdPosition,
  { brand: string; headline: string; cta: string; accent: string }
> = {
  HEADER: {
    brand: "City Bank",
    headline: "Banking made simple for every day",
    cta: "Open an account",
    accent: "#1e3a5f",
  },
  TOP_BANNER: {
    brand: "Grameenphone",
    headline: "Experience true 5G speed — unlimited packs from ৳499",
    cta: "Get 5G now",
    accent: "#00a651",
  },
  SIDEBAR: {
    brand: "bKash",
    headline: "Send money in seconds. Safe, simple, everywhere.",
    cta: "Download app",
    accent: "#e2136e",
  },
  ARTICLE_TOP: {
    brand: "Walton",
    headline: "Smart appliances for a smarter home",
    cta: "Shop deals",
    accent: "#0b5cab",
  },
  ARTICLE_MIDDLE: {
    brand: "Pathao",
    headline: "Ride, food & payments — one app for the city",
    cta: "Order now",
    accent: "#ef4e23",
  },
  ARTICLE_BOTTOM: {
    brand: "Daraz",
    headline: "Mega Deal Days — up to 70% off bestsellers",
    cta: "Shop mega deals",
    accent: "#f57224",
  },
  FOOTER: {
    brand: "BRAC University",
    headline: "Shape your future. Admissions open for Fall 2026.",
    cta: "Apply today",
    accent: "#004b87",
  },
};
