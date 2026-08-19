export const siteConfig = {
  name: "The Daily Column",
  shortName: "Column",
  description:
    "Independent, editorially-led coverage of Bangladesh and the world — politics, business, technology, sport, and culture.",
  url: "https://example-daily-column.com",
  ogImage: "/images/og-default.jpg",
  locales: ["en", "bn"] as const,
  defaultLocale: "en" as const,
  social: {
    twitter: "https://twitter.com/dailycolumn",
    facebook: "https://facebook.com/dailycolumn",
    youtube: "https://youtube.com/@dailycolumn",
  },
  nav: {
    primary: [
      { label: "Bangladesh", href: "/category/bangladesh" },
      { label: "World", href: "/category/world" },
      { label: "Politics", href: "/category/politics" },
      { label: "Business", href: "/category/business" },
      { label: "Technology", href: "/category/technology" },
      { label: "Sport", href: "/category/sport" },
      { label: "Entertainment", href: "/category/entertainment" },
      { label: "Opinion", href: "/category/opinion" },
    ],
    utility: [
      { label: "Videos", href: "/videos" },
      { label: "Trending", href: "/trending" },
    ],
  },
} as const;

export type NavLink = { label: string; href: string };
