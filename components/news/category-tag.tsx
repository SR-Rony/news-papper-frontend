"use client";

import Link from "next/link";
import type { Category } from "@/types/category";
import { cn } from "@/lib/utils";
import { categoryLabel } from "@/lib/i18n/dictionary";
import { useLocale } from "@/providers/locale-provider";

export function CategoryTag({ category, className }: { category: Category; className?: string }) {
  const { locale } = useLocale();

  return (
    <Link
      href={`/category/${category.slug}`}
      className={cn(
        "inline-block text-[0.6875rem] font-bold tracking-wide text-accent hover:underline",
        locale === "en" && "uppercase",
        className,
      )}
    >
      {categoryLabel(locale, category.slug, category.name)}
    </Link>
  );
}
