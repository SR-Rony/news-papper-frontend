import Link from "next/link";
import type { Category } from "@/types/category";
import { cn } from "@/lib/utils";

export function CategoryTag({ category, className }: { category: Category; className?: string }) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className={cn(
        "inline-block text-[0.6875rem] font-bold uppercase tracking-wide text-accent hover:underline",
        className
      )}
    >
      {category.name}
    </Link>
  );
}
