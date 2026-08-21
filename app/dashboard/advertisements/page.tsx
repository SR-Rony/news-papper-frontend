"use client";

import * as React from "react";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { DashboardTopbar } from "@/components/dashboard/topbar";
import { DataTableShell } from "@/components/dashboard/data-table-shell";
import { ConfirmDeleteDialog } from "@/components/dashboard/confirm-delete-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { apiClient } from "@/lib/api-client";
import { formatCompactNumber, formatDate } from "@/lib/utils";
import { useLocale } from "@/providers/locale-provider";
import type { Advertisement } from "@/types/advertisement";

export default function DashboardAdvertisementsPage() {
  const { t, locale } = useLocale();
  const d = t.dashboard;
  const [ads, setAds] = React.useState<Advertisement[]>([]);
  const [loading, setLoading] = React.useState(true);

  const load = React.useCallback(() => {
    setLoading(true);
    apiClient.get<Advertisement[]>("/advertisements").then(setAds).finally(() => setLoading(false));
  }, []);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data fetch on mount
    load();
  }, [load]);

  const remove = async (id: string) => {
    try {
      await apiClient.delete(`/advertisements/${id}`);
      setAds((prev) => prev.filter((a) => a.id !== id));
    } catch {
      // Keep visible on failure.
    }
  };

  const toggleActive = async (ad: Advertisement) => {
    setAds((prev) => prev.map((a) => (a.id === ad.id ? { ...a, isActive: !a.isActive } : a)));
    try {
      await apiClient.patch(`/advertisements/${ad.id}`, { isActive: !ad.isActive });
    } catch {
      load();
    }
  };

  return (
    <>
      <DashboardTopbar title={d.advertisements} />
      <div className="p-4 lg:p-6">
        <div className="mb-4 flex justify-end">
          <Button size="sm">
            <Plus className="size-4" /> {d.newAdvertisement}
          </Button>
        </div>

        <DataTableShell>
          <thead className="bg-muted text-xs font-semibold uppercase tracking-wide text-foreground-muted">
            <tr>
              <th className="px-4 py-3">{d.colCampaign}</th>
              <th className="px-4 py-3">{d.colPosition}</th>
              <th className="px-4 py-3">{d.colImpressions}</th>
              <th className="px-4 py-3">{d.colClicks}</th>
              <th className="px-4 py-3">{d.colEnds}</th>
              <th className="px-4 py-3">{d.colStatus}</th>
              <th className="px-4 py-3 text-right">{d.colActions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center">
                  <Loader2 className="mx-auto size-5 animate-spin text-foreground-muted" />
                </td>
              </tr>
            ) : (
              ads.map((ad) => (
                <tr key={ad.id} className="bg-surface">
                  <td className="max-w-[220px] truncate px-4 py-3 font-medium">{ad.name}</td>
                  <td className="px-4 py-3 text-foreground-muted">{ad.position.replace("_", " ")}</td>
                  <td className="px-4 py-3 text-foreground-muted">
                    {formatCompactNumber(ad.impressions, locale)}
                  </td>
                  <td className="px-4 py-3 text-foreground-muted">
                    {formatCompactNumber(ad.clicks, locale)}
                  </td>
                  <td className="px-4 py-3 text-foreground-muted">
                    {ad.endDate ? formatDate(ad.endDate, locale) : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleActive(ad)}>
                      <Badge variant={ad.isActive ? "success" : "outline"}>
                        {ad.isActive ? d.active : d.paused}
                      </Badge>
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" aria-label="Edit">
                        <Pencil className="size-4" />
                      </Button>
                      <ConfirmDeleteDialog
                        trigger={
                          <Button variant="ghost" size="icon" aria-label="Delete">
                            <Trash2 className="size-4" />
                          </Button>
                        }
                        title="Delete advertisement?"
                        description={`This will permanently remove "${ad.name}".`}
                        onConfirm={() => remove(ad.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </DataTableShell>
      </div>
    </>
  );
}
