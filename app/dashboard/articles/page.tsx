"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, Pencil, Trash2, Loader2 } from "lucide-react";
import { DashboardTopbar } from "@/components/dashboard/topbar";
import { DataTableShell } from "@/components/dashboard/data-table-shell";
import { ArticleStatusBadge } from "@/components/dashboard/status-badge";
import { ConfirmDeleteDialog } from "@/components/dashboard/confirm-delete-dialog";
import { DashboardPagination } from "@/components/dashboard/pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiClient, ApiRequestError } from "@/lib/api-client";
import { formatDate } from "@/lib/utils";
import type { Article } from "@/types/article";
import type { Category } from "@/types/category";
import type { PaginationMeta } from "@/types/api";

const PAGE_SIZE = 8;

export default function DashboardArticlesPage() {
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [meta, setMeta] = React.useState<PaginationMeta | null>(null);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [query, setQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("ALL");
  const [categoryFilter, setCategoryFilter] = React.useState("ALL");
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    apiClient.get<Category[]>("/categories").then(setCategories).catch(() => undefined);
  }, []);

  const load = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiClient.getPaginated<Article>("/articles", {
        page,
        limit: PAGE_SIZE,
        search: query || undefined,
        status: statusFilter === "ALL" ? undefined : statusFilter,
        category: categoryFilter === "ALL" ? undefined : categoryFilter,
      });
      setArticles(result.data);
      setMeta(result.meta);
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : "Couldn't load articles.");
    } finally {
      setLoading(false);
    }
  }, [page, query, statusFilter, categoryFilter]);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data fetch on mount
    load();
  }, [load]);

  const removeArticle = async (id: string) => {
    try {
      await apiClient.delete(`/articles/${id}`);
      load();
    } catch {
      // Keep the row visible if deletion failed — no silent data loss.
    }
  };

  return (
    <>
      <DashboardTopbar title="Articles" />
      <div className="p-4 lg:p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-foreground-muted" />
            <Input
              placeholder="Search articles…"
              className="pl-8"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              className="rounded-sm border border-border-strong bg-surface px-3 py-2 text-sm"
            >
              <option value="ALL">All statuses</option>
              <option value="PUBLISHED">Published</option>
              <option value="DRAFT">Draft</option>
              <option value="SCHEDULED">Scheduled</option>
              <option value="ARCHIVED">Archived</option>
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
              className="rounded-sm border border-border-strong bg-surface px-3 py-2 text-sm"
            >
              <option value="ALL">All categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>{c.name}</option>
              ))}
            </select>
            <Button asChild size="sm">
              <Link href="/dashboard/articles/new"><Plus className="size-4" /> New article</Link>
            </Button>
          </div>
        </div>

        {error && <p className="mb-3 text-sm font-medium text-destructive">{error}</p>}

        <DataTableShell>
          <thead className="bg-muted text-xs font-semibold uppercase tracking-wide text-foreground-muted">
            <tr>
              <th className="px-4 py-3">Article</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Author</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Published</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr><td colSpan={6} className="px-4 py-10 text-center"><Loader2 className="mx-auto size-5 animate-spin text-foreground-muted" /></td></tr>
            ) : articles.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-10 text-center text-foreground-muted">No articles match your filters.</td></tr>
            ) : (
              articles.map((article) => (
                <tr key={article.id} className="bg-surface">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded-sm bg-muted">
                        <Image src={article.coverImageUrl} alt="" fill sizes="56px" className="object-cover" />
                      </div>
                      <span className="line-clamp-2 max-w-xs font-medium">{article.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-foreground-muted">{article.category?.name}</td>
                  <td className="px-4 py-3 text-foreground-muted">{article.author?.name}</td>
                  <td className="px-4 py-3"><ArticleStatusBadge status={article.status} /></td>
                  <td className="px-4 py-3 text-foreground-muted">{article.publishedAt ? formatDate(article.publishedAt) : "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/dashboard/articles/${article.id}/edit`} aria-label="Edit">
                          <Pencil className="size-4" />
                        </Link>
                      </Button>
                      <ConfirmDeleteDialog
                        trigger={<Button variant="ghost" size="icon" aria-label="Delete"><Trash2 className="size-4" /></Button>}
                        title="Delete article?"
                        description={`This will permanently remove "${article.title}". This action cannot be undone.`}
                        onConfirm={() => removeArticle(article.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </DataTableShell>
        <div className="rounded-b-md border border-t-0 border-border bg-surface">
          <DashboardPagination page={meta?.page ?? 1} totalPages={meta?.totalPages ?? 1} onPageChange={setPage} />
        </div>
      </div>
    </>
  );
}
