import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Category } from "@/types/category";

export function ArticleBreadcrumb({ category, title }: { category: Category; title: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-xs text-foreground-muted">
      <Link href="/" className="hover:text-foreground">Home</Link>
      <ChevronRight className="size-3" />
      <Link href={`/category/${category.slug}`} className="hover:text-foreground">{category.name}</Link>
      <ChevronRight className="size-3" />
      <span className="truncate text-foreground-muted/70" aria-current="page">{title}</span>
    </nav>
  );
}
