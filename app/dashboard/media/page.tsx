"use client";

import { useLocale } from "@/providers/locale-provider";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Search, Upload, Copy, Trash2, Check, Loader2 } from "lucide-react";
import { DashboardTopbar } from "@/components/dashboard/topbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteDialog } from "@/components/dashboard/confirm-delete-dialog";
import { apiClient } from "@/lib/api-client";

interface MediaItem {
  id: string;
  url: string;
  filename: string;
  sizeKb: number;
  uploadedAt: string;
}

function AddMediaDialog({ onAdded }: { onAdded: () => void }) {
  const [open, setOpen] = React.useState(false);
  const [url, setUrl] = React.useState("");
  const [filename, setFilename] = React.useState("");
  const [saving, setSaving] = React.useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await apiClient.post("/media", { url, filename: filename || url.split("/").pop(), sizeKb: 0 });
      setOpen(false);
      setUrl("");
      setFilename("");
      onAdded();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button size="sm"><Upload className="size-4" /> Add by URL</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-surface p-6 shadow-xl outline-none">
          <Dialog.Title className="mb-1 font-display text-lg font-semibold">Add image</Dialog.Title>
          <Dialog.Description className="mb-4 text-sm text-foreground-muted">
            File uploads require object storage on the backend (e.g. S3). For now, add an image by URL.
          </Dialog.Description>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label htmlFor="media-url">Image URL</Label>
              <Input id="media-url" value={url} onChange={(e) => setUrl(e.target.value)} required className="mt-1.5" placeholder="https://…" />
            </div>
            <div>
              <Label htmlFor="media-name">Filename (optional)</Label>
              <Input id="media-name" value={filename} onChange={(e) => setFilename(e.target.value)} className="mt-1.5" />
            </div>
            <div className="flex justify-end gap-2">
              <Dialog.Close asChild><Button type="button" variant="outline" size="sm">Cancel</Button></Dialog.Close>
              <Button type="submit" size="sm" disabled={saving || !url}>{saving ? "Adding…" : "Add"}</Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default function DashboardMediaPage() {
  const { t } = useLocale();
  const [items, setItems] = React.useState<MediaItem[]>([]);
  const [query, setQuery] = React.useState("");
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  const load = React.useCallback(() => {
    setLoading(true);
    apiClient.get<MediaItem[]>("/media").then(setItems).finally(() => setLoading(false));
  }, []);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data fetch on mount
    load();
  }, [load]);

  const filtered = items.filter((m) => m.filename.toLowerCase().includes(query.toLowerCase()));

  const remove = async (id: string) => {
    try {
      await apiClient.delete(`/media/${id}`);
      setItems((prev) => prev.filter((m) => m.id !== id));
    } catch {
      // Keep visible on failure.
    }
  };

  const copyUrl = async (id: string, url: string) => {
    await navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <>
      <DashboardTopbar title={t.dashboard.mediaLibrary} />
      <div className="p-4 lg:p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-foreground-muted" />
            <Input placeholder="Search media…" className="pl-8" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <AddMediaDialog onAdded={load} />
        </div>

        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="size-6 animate-spin text-foreground-muted" /></div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {filtered.map((item) => (
              <div key={item.id} className="group overflow-hidden rounded-md border border-border bg-surface">
                <div className="relative aspect-square bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary admin-supplied URLs, not in the next/image domain allowlist */}
                  <img src={item.url} alt={item.filename} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center gap-1.5 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                    <button onClick={() => copyUrl(item.id, item.url)} className="rounded-sm bg-white/90 p-1.5" aria-label="Copy URL">
                      {copiedId === item.id ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                    </button>
                    <ConfirmDeleteDialog
                      trigger={<button className="rounded-sm bg-white/90 p-1.5" aria-label="Delete"><Trash2 className="size-3.5" /></button>}
                      title="Delete image?"
                      description={`This will permanently remove "${item.filename}".`}
                      onConfirm={() => remove(item.id)}
                    />
                  </div>
                </div>
                <div className="p-2">
                  <p className="truncate text-xs font-medium">{item.filename}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
