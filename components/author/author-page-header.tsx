"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { Author } from "@/types/author";
import { localizeAuthor } from "@/lib/i18n/localize";
import { useLocale } from "@/providers/locale-provider";

export function AuthorPageHeader({ author }: { author: Author }) {
  const { locale } = useLocale();
  const a = localizeAuthor(author, locale);

  return (
    <div className="mb-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
      <Avatar className="h-24 w-24">
        <AvatarImage src={a.avatarUrl} alt={a.name} />
        <AvatarFallback className="text-2xl">{a.name.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div>
        <h1 className="font-display text-2xl font-semibold sm:text-3xl">{a.name}</h1>
        {a.role ? <p className="mt-1 text-sm font-medium text-accent">{a.role}</p> : null}
        {a.bio ? <p className="mt-3 max-w-2xl text-sm text-foreground-muted">{a.bio}</p> : null}
      </div>
    </div>
  );
}
