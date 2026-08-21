"use client";

import * as React from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { categoryLabel } from "@/lib/i18n/dictionary";
import { useLocale } from "@/providers/locale-provider";
import { LanguageToggle } from "@/components/navigation/language-toggle";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { useAuth } from "@/hooks/use-auth";

export function MobileMenu() {
  const [open, setOpen] = React.useState(false);
  const { locale, t } = useLocale();
  const { user } = useAuth();

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button variant="ghost" size="icon" aria-label={t.nav.menu} className="lg:hidden">
          <Menu className="size-5" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-in data-[state=open]:fade-in" />
        <Dialog.Content className="fixed inset-y-0 left-0 z-50 flex w-[86%] max-w-sm flex-col bg-surface p-0 shadow-xl outline-none">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <Dialog.Title className="font-display text-lg font-semibold">{t.nav.menu}</Dialog.Title>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" aria-label={t.nav.closeMenu}>
                <X className="size-5" />
              </Button>
            </Dialog.Close>
          </div>
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-2 py-3">
            <ul>
              {siteConfig.nav.primary.map((link) => {
                const slug = link.href.replace("/category/", "");
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-sm px-3 py-3 text-base font-semibold text-foreground hover:bg-muted"
                    >
                      {categoryLabel(locale, slug, link.label)}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link
                  href="/videos"
                  onClick={() => setOpen(false)}
                  className="block rounded-sm px-3 py-3 text-base font-semibold text-foreground hover:bg-muted"
                >
                  {t.nav.videos}
                </Link>
              </li>
              <li>
                <Link
                  href="/trending"
                  onClick={() => setOpen(false)}
                  className="block rounded-sm px-3 py-3 text-base font-semibold text-foreground hover:bg-muted"
                >
                  {t.nav.trending}
                </Link>
              </li>
            </ul>
          </nav>
          <div className="space-y-3 border-t border-border p-4">
            <div className="flex items-center gap-2">
              <LanguageToggle />
              <ThemeToggle />
            </div>
            {user ? (
              <Button asChild className="w-full" onClick={() => setOpen(false)}>
                <Link href="/profile">{t.nav.account}</Link>
              </Button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" asChild className="w-full" onClick={() => setOpen(false)}>
                  <Link href="/auth/login">{t.nav.signIn}</Link>
                </Button>
                <Button asChild className="w-full" onClick={() => setOpen(false)}>
                  <Link href="/auth/register">{t.nav.register}</Link>
                </Button>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
