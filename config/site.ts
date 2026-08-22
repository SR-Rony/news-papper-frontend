export const siteConfig = {
  name: "The Daily Column",
  shortName: "Column",
  description:
    "বাংলাদেশ ও বিশ্বের স্বাধীন, সম্পাদকীয় নেতৃত্বাধীন সংবাদ — রাজনীতি, ব্যবসা, প্রযুক্তি, খেলা ও সংস্কৃতি।",
  url: "https://newspaper.mhadnan.com",
  ogImage: "/images/og-default.jpg",
  locales: ["bn", "en"] as const,
  defaultLocale: "bn" as const,
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
