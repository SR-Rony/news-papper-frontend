"use client";

import * as React from "react";
import { Search, Loader2 } from "lucide-react";
import { DashboardTopbar } from "@/components/dashboard/topbar";
import { DataTableShell } from "@/components/dashboard/data-table-shell";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { apiClient } from "@/lib/api-client";
import { formatNumber } from "@/lib/utils";
import { useLocale } from "@/providers/locale-provider";
import type { Author } from "@/types/author";

export default function DashboardAuthorsPage() {
  const { t, locale } = useLocale();
  const d = t.dashboard;
  const [authors, setAuthors] = React.useState<Author[]>([]);
  const [query, setQuery] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    apiClient.get<Author[]>("/authors").then(setAuthors).finally(() => setLoading(false));
  }, []);

  const filtered = authors.filter((a) => {
    const name = locale === "en" ? a.nameEn || a.name : a.name;
    const role = locale === "en" ? a.roleEn || a.role : a.role;
    const hay = `${name} ${role}`.toLowerCase();
    return hay.includes(query.toLowerCase());
  });

  return (
    <>
      <DashboardTopbar title={d.authors} />
      <div className="p-4 lg:p-6">
        <div className="relative mb-4 w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-foreground-muted" />
          <Input
            placeholder={d.searchAuthors}
            className="pl-8"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <DataTableShell>
          <thead className="bg-muted text-xs font-semibold uppercase tracking-wide text-foreground-muted">
            <tr>
              <th className="px-4 py-3">{d.colAuthor}</th>
              <th className="px-4 py-3">{d.colRole}</th>
              <th className="px-4 py-3">{d.colArticles}</th>
              <th className="px-4 py-3">{d.colContact}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center">
                  <Loader2 className="mx-auto size-5 animate-spin text-foreground-muted" />
                </td>
              </tr>
            ) : (
              filtered.map((author) => {
                const name = locale === "en" ? author.nameEn || author.name : author.name;
                const role = locale === "en" ? author.roleEn || author.role : author.role;
                return (
                  <tr key={author.id} className="bg-surface">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={author.avatarUrl} alt={name} />
                          <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-foreground-muted">{role}</td>
                    <td className="px-4 py-3 text-foreground-muted">
                      {formatNumber(author.articleCount ?? 0, locale)}
                    </td>
                    <td className="px-4 py-3 text-foreground-muted">
                      {(author as Author & { email?: string }).email ??
                        author.socials?.email ??
                        "—"}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </DataTableShell>
      </div>
    </>
  );
}
