"use client";

import Link from "next/link";
import type { Tag } from "@/types/tag";
import { localizeTag } from "@/lib/i18n/localize";
import { useLocale } from "@/providers/locale-provider";

export function ArticleTags({ tags }: { tags: Tag[] }) {
  const { locale } = useLocale();
  if (tags.length === 0) return null;

  return (
    <div className="mt-8 flex flex-wrap gap-2">
      {tags.map((tag) => {
        const t = localizeTag(tag, locale);
        return (
          <Link
            key={tag.id}
            href={`/search?q=${encodeURIComponent(t.name)}`}
            className="rounded-sm border border-border-strong px-2.5 py-1 text-xs font-medium text-foreground-muted hover:border-accent hover:text-accent"
          >
            #{t.name}
          </Link>
        );
      })}
    </div>
  );
}
