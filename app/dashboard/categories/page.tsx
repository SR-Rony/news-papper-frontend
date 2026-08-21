"use client";

import { useLocale } from "@/providers/locale-provider";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Plus, Search, Pencil, Trash2, Loader2 } from "lucide-react";
import { DashboardTopbar } from "@/components/dashboard/topbar";
import { DataTableShell } from "@/components/dashboard/data-table-shell";
import { ConfirmDeleteDialog } from "@/components/dashboard/confirm-delete-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { apiClient, ApiRequestError } from "@/lib/api-client";
import { formatNumber } from "@/lib/utils";
import type { Category } from "@/types/category";

function CategoryFormDialog({ trigger, category, onSaved }: { trigger: React.ReactNode; category?: Category; onSaved: () => void }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(category?.name ?? "");
  const [description, setDescription] = React.useState(category?.description ?? "");
  const [error, setError] = React.useState<string | null>(null);
  const [saving, setSaving] = React.useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      if (category) await apiClient.patch(`/categories/${category.id}`, { name, description });
      else await apiClient.post("/categories", { name, description });
      setOpen(false);
      onSaved();
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : "Couldn't save category.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-surface p-6 shadow-xl outline-none">
          <Dialog.Title className="mb-4 font-display text-lg font-semibold">
            {category ? "Edit category" : "New category"}
          </Dialog.Title>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label htmlFor="cat-name">Name</Label>
              <Input id="cat-name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="cat-desc">Description</Label>
              <Input id="cat-desc" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1.5" />
            </div>
            {error && <p className="text-xs font-medium text-destructive">{error}</p>}
            <div className="flex justify-end gap-2">
              <Dialog.Close asChild><Button type="button" variant="outline" size="sm">Cancel</Button></Dialog.Close>
              <Button type="submit" size="sm" disabled={saving}>{saving ? "Saving…" : "Save"}</Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default function DashboardCategoriesPage() {
  const { t, locale } = useLocale();
  const d = t.dashboard;
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [query, setQuery] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  const load = React.useCallback(() => {
    setLoading(true);
    apiClient.get<Category[]>("/categories").then(setCategories).finally(() => setLoading(false));
  }, []);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data fetch on mount
    load();
  }, [load]);

  const filtered = categories.filter((c) => {
    const name = locale === "en" ? c.nameEn || c.name : c.name;
    const description = locale === "en" ? c.descriptionEn || c.description || "" : c.description || "";
    return `${name} ${description}`.toLowerCase().includes(query.toLowerCase());
  });

  const remove = async (id: string) => {
    try {
      await apiClient.delete(`/categories/${id}`);
      load();
    } catch {
      // Keep the row visible if deletion failed.
    }
  };

  return (
    <>
      <DashboardTopbar title={d.categories} />
      <div className="p-4 lg:p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-foreground-muted" />
            <Input
              placeholder={d.searchCategories}
              className="pl-8"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <CategoryFormDialog
            trigger={
              <Button size="sm">
                <Plus className="size-4" /> {d.newCategory}
              </Button>
            }
            onSaved={load}
          />
        </div>

        <DataTableShell>
          <thead className="bg-muted text-xs font-semibold uppercase tracking-wide text-foreground-muted">
            <tr>
              <th className="px-4 py-3">{d.colName}</th>
              <th className="px-4 py-3">{d.colDescription}</th>
              <th className="px-4 py-3">{d.colArticles}</th>
              <th className="px-4 py-3">{d.colStatus}</th>
              <th className="px-4 py-3 text-right">{d.colActions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center">
                  <Loader2 className="mx-auto size-5 animate-spin text-foreground-muted" />
                </td>
              </tr>
            ) : (
              filtered.map((category) => {
                const name =
                  locale === "en" ? category.nameEn || category.name : category.name;
                const description =
                  locale === "en"
                    ? category.descriptionEn || category.description
                    : category.description;
                return (
                  <tr key={category.id} className="bg-surface">
                    <td className="px-4 py-3 font-medium">{name}</td>
                    <td className="max-w-xs truncate px-4 py-3 text-foreground-muted">
                      {description}
                    </td>
                    <td className="px-4 py-3 text-foreground-muted">
                      {formatNumber(category.articleCount ?? 0, locale)}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={category.isActive ? "success" : "outline"}>
                        {category.isActive ? d.active : d.inactive}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <CategoryFormDialog
                          category={category}
                          onSaved={load}
                          trigger={
                            <Button variant="ghost" size="icon" aria-label="Edit">
                              <Pencil className="size-4" />
                            </Button>
                          }
                        />
                        <ConfirmDeleteDialog
                          trigger={
                            <Button variant="ghost" size="icon" aria-label="Delete">
                              <Trash2 className="size-4" />
                            </Button>
                          }
                          title="Delete category?"
                          description={`This will permanently remove "${name}".`}
                          onConfirm={() => remove(category.id)}
                        />
                      </div>
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
