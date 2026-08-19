import Link from "next/link";
import type { Tag } from "@/types/tag";

export function ArticleTags({ tags }: { tags: Tag[] }) {
  if (tags.length === 0) return null;
  return (
    <div className="mt-8 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link
          key={tag.id}
          href={`/search?q=${encodeURIComponent(tag.name)}`}
          className="rounded-sm border border-border-strong px-2.5 py-1 text-xs font-medium text-foreground-muted hover:border-accent hover:text-accent"
        >
          #{tag.name}
        </Link>
      ))}
    </div>
  );
}
