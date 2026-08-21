"use client";

import type { Category } from "@/types/category";
import { localizeCategory } from "@/lib/i18n/localize";
import { useLocale } from "@/providers/locale-provider";

export function CategoryPageHeader({ category }: { category: Category }) {
  const { locale } = useLocale();
  const c = localizeCategory(category, locale);

  return (
    <header className="mb-8 border-b-2 border-ink pb-4">
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">{c.name}</h1>
      {c.description ? (
        <p className="mt-2 max-w-2xl text-foreground-muted">{c.description}</p>
      ) : null}
    </header>
  );
}
