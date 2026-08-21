"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Category } from "@/types/category";
import { categoryLabel } from "@/lib/i18n/dictionary";
import { useLocale } from "@/providers/locale-provider";

export function ArticleBreadcrumb({ category, title }: { category: Category; title: string }) {
  const { locale, t } = useLocale();

  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-xs text-foreground-muted">
      <Link href="/" className="hover:text-foreground">
        {t.common.home}
      </Link>
      <ChevronRight className="size-3" />
      <Link href={`/category/${category.slug}`} className="hover:text-foreground">
        {categoryLabel(locale, category.slug, category.name)}
      </Link>
      <ChevronRight className="size-3" />
      <span className="truncate text-foreground-muted/70" aria-current="page">
        {title}
      </span>
    </nav>
  );
}
