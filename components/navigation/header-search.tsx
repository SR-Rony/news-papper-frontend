"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLocale } from "@/providers/locale-provider";

export function HeaderSearch() {
  const router = useRouter();
  const { t } = useLocale();
  const [query, setQuery] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="hidden flex-1 justify-center px-4 lg:flex lg:max-w-md">
      <div className="relative w-full">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-foreground-muted" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.nav.search}
          aria-label={t.nav.search}
          className="pl-9"
        />
      </div>
    </form>
  );
}
