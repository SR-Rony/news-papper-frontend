"use client";

import type { Category } from "@/types/category";
import { LocalizedSectionHeader } from "@/components/home/localized-section-header";
import { categoryLabel } from "@/lib/i18n/dictionary";
import { useLocale } from "@/providers/locale-provider";

export function CategorySectionHeader({ category }: { category: Category }) {
  const { locale } = useLocale();
  return (
    <LocalizedSectionHeader
      title={categoryLabel(locale, category.slug, category.name)}
      href={`/category/${category.slug}`}
    />
  );
}
