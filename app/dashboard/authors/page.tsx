"use client";

import * as React from "react";
import { Search, Loader2 } from "lucide-react";
import { DashboardTopbar } from "@/components/dashboard/topbar";
import { DataTableShell } from "@/components/dashboard/data-table-shell";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { apiClient } from "@/lib/api-client";
import type { Author } from "@/types/author";

export default function DashboardAuthorsPage() {
  const [authors, setAuthors] = React.useState<Author[]>([]);
  const [query, setQuery] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    apiClient.get<Author[]>("/authors").then(setAuthors).finally(() => setLoading(false));
  }, []);

  const filtered = authors.filter((a) => a.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <DashboardTopbar title="Authors" />
      <div className="p-4 lg:p-6">
        <div className="relative mb-4 w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-foreground-muted" />
          <Input placeholder="Search authors…" className="pl-8" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>

        <DataTableShell>
          <thead className="bg-muted text-xs font-semibold uppercase tracking-wide text-foreground-muted">
            <tr>
              <th className="px-4 py-3">Author</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Articles</th>
              <th className="px-4 py-3">Contact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr><td colSpan={4} className="px-4 py-10 text-center"><Loader2 className="mx-auto size-5 animate-spin text-foreground-muted" /></td></tr>
            ) : (
              filtered.map((author) => (
                <tr key={author.id} className="bg-surface">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={author.avatarUrl} alt={author.name} />
                        <AvatarFallback>{author.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{author.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-foreground-muted">{author.role}</td>
                  <td className="px-4 py-3 text-foreground-muted">{author.articleCount}</td>
                  <td className="px-4 py-3 text-foreground-muted">{author.socials?.email ?? "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </DataTableShell>
      </div>
    </>
  );
}
