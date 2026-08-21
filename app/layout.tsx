import type { Metadata } from "next";
import Script from "next/script";
import { fontVariables } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/providers/theme-provider";
import { QueryProvider } from "@/providers/query-provider";
import { LocaleProvider } from "@/providers/locale-provider";
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY } from "@/lib/i18n/dictionary";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

const localeBootScript = `
(function(){
  try {
    var key = ${JSON.stringify(LOCALE_STORAGE_KEY)};
    var stored = localStorage.getItem(key);
    var locale = (stored === "en" || stored === "bn") ? stored : ${JSON.stringify(DEFAULT_LOCALE)};
    document.documentElement.lang = locale;
    document.documentElement.dataset.locale = locale;
    document.cookie = "locale=" + locale + ";path=/;max-age=31536000;samesite=lax";
  } catch (e) {
    document.documentElement.lang = ${JSON.stringify(DEFAULT_LOCALE)};
    document.documentElement.dataset.locale = ${JSON.stringify(DEFAULT_LOCALE)};
  }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={DEFAULT_LOCALE} className={fontVariables} suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="flex min-h-screen flex-col antialiased">
        <Script id="locale-boot" strategy="beforeInteractive">
          {localeBootScript}
        </Script>
        <ThemeProvider>
          <LocaleProvider>
            <QueryProvider>
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
              >
                মূল বিষয়ে যান
              </a>
              {children}
            </QueryProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
