import Link from "next/link";
import { Globe, AtSign, PlaySquare } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Separator } from "@/components/ui/separator";

const columns = [
  {
    title: "Sections",
    links: siteConfig.nav.primary,
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
      { label: "Advertise", href: "/dashboard/advertisements" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign in", href: "/auth/login" },
      { label: "Create account", href: "/auth/register" },
      { label: "Bookmarks", href: "/bookmarks" },
      { label: "Notifications", href: "/notifications" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of service", href: "/terms" },
      { label: "Privacy policy", href: "/privacy" },
      { label: "Corrections policy", href: "/corrections" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-foreground-muted">{col.title}</h3>
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
            <p className="mt-1 max-w-md text-xs text-foreground-muted">{siteConfig.description}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href={siteConfig.social.facebook} aria-label="Facebook" className="text-foreground-muted hover:text-foreground">
              <Globe className="size-4" />
            </Link>
            <Link href={siteConfig.social.twitter} aria-label="Twitter / X" className="text-foreground-muted hover:text-foreground">
              <AtSign className="size-4" />
            </Link>
            <Link href={siteConfig.social.youtube} aria-label="YouTube" className="text-foreground-muted hover:text-foreground">
              <PlaySquare className="size-4" />
            </Link>
          </div>
        </div>

        <p className="mt-6 text-xs text-foreground-muted">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
