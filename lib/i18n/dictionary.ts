export const dictionaries = {
  en: {
    nav: { subscribe: "Subscribe", signIn: "Sign in", search: "Search", menu: "Menu" },
    common: {
      breaking: "Breaking", featured: "Featured", latest: "Latest news", trending: "Trending now",
      readMore: "Read more", minRead: "min read", views: "views", comments: "comments",
      relatedArticles: "Related articles", moreNews: "More news", loading: "Loading…",
      tryAgain: "Try again", noResults: "No results found", newsletterTitle: "Never miss a headline",
      newsletterBody: "Get our top stories delivered to your inbox every morning.",
      emailPlaceholder: "you@example.com", subscribeCta: "Subscribe",
    },
  },
  bn: {
    nav: { subscribe: "সাবস্ক্রাইব", signIn: "সাইন ইন", search: "অনুসন্ধান", menu: "মেনু" },
    common: {
      breaking: "জরুরি", featured: "বিশেষ প্রতিবেদন", latest: "সর্বশেষ সংবাদ", trending: "এই মুহূর্তে",
      readMore: "আরও পড়ুন", minRead: "মিনিট পড়া", views: "ভিউ", comments: "মন্তব্য",
      relatedArticles: "সম্পর্কিত সংবাদ", moreNews: "আরও সংবাদ", loading: "লোড হচ্ছে…",
      tryAgain: "আবার চেষ্টা করুন", noResults: "কোনো ফলাফল পাওয়া যায়নি", newsletterTitle: "কোনো শিরোনাম মিস করবেন না",
      newsletterBody: "প্রতিদিন সকালে আমাদের শীর্ষ সংবাদ পান আপনার ইনবক্সে।",
      emailPlaceholder: "you@example.com", subscribeCta: "সাবস্ক্রাইব",
    },
  },
} as const;

export type Locale = keyof typeof dictionaries;
export type Dictionary = {
  nav: { subscribe: string; signIn: string; search: string; menu: string };
  common: {
    breaking: string; featured: string; latest: string; trending: string;
    readMore: string; minRead: string; views: string; comments: string;
    relatedArticles: string; moreNews: string; loading: string;
    tryAgain: string; noResults: string; newsletterTitle: string;
    newsletterBody: string; emailPlaceholder: string; subscribeCta: string;
  };
};
