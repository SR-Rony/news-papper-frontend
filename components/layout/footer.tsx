"use client";

import Link from "next/link";
import { Globe, AtSign, PlaySquare } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Separator } from "@/components/ui/separator";
import { categoryLabel } from "@/lib/i18n/dictionary";
import { useLocale } from "@/providers/locale-provider";

export function Footer() {
  const { locale, t } = useLocale();

  const columns = [
    {
      title: t.footer.sections,
      links: siteConfig.nav.primary.map((link) => ({
        href: link.href,
        label: categoryLabel(locale, link.href.replace("/category/", ""), link.label),
      })),
    },
    {
      title: t.footer.company,
      links: [
        { label: t.footer.about, href: "/about" },
        { label: t.footer.careers, href: "/careers" },
        { label: t.footer.contact, href: "/contact" },
        { label: t.footer.advertise, href: "/dashboard/advertisements" },
      ],
    },
    {
      title: t.footer.account,
      links: [
        { label: t.nav.signIn, href: "/auth/login" },
        { label: t.nav.createAccount, href: "/auth/register" },
        { label: t.nav.bookmarks, href: "/bookmarks" },
        { label: t.nav.notifications, href: "/notifications" },
      ],
    },
    {
      title: t.footer.legal,
      links: [
        { label: t.footer.terms, href: "/terms" },
        { label: t.footer.privacy, href: "/privacy" },
        { label: t.footer.corrections, href: "/corrections" },
      ],
    },
  ];

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-foreground-muted">
                {col.title}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-foreground-muted hover:text-signal">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <span className="font-display text-xl font-semibold">{siteConfig.name}</span>
            <p className="mt-1 max-w-md text-xs text-foreground-muted">{t.common.siteDescription}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={siteConfig.social.facebook}
              aria-label="Facebook"
              className="text-foreground-muted hover:text-foreground"
            >
              <Globe className="size-4" />
            </Link>
            <Link
              href={siteConfig.social.twitter}
              aria-label="Twitter / X"
              className="text-foreground-muted hover:text-foreground"
            >
              <AtSign className="size-4" />
            </Link>
            <Link
              href={siteConfig.social.youtube}
              aria-label="YouTube"
              className="text-foreground-muted hover:text-foreground"
            >
              <PlaySquare className="size-4" />
            </Link>
          </div>
        </div>

        <p className="mt-6 text-xs text-foreground-muted">
          © {new Date().getFullYear()} {siteConfig.name}. {t.common.allRightsReserved}
        </p>
      </div>
    </footer>
  );
}
