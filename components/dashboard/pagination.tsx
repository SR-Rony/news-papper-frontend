"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatNumber } from "@/lib/utils";
import { useLocale } from "@/providers/locale-provider";

export function DashboardPagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const { locale, t } = useLocale();
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between border-t border-border px-4 py-3">
      <span className="text-xs text-foreground-muted">
        {t.dashboard.pageOf
          .replace("{page}", formatNumber(page, locale))
          .replace("{total}", formatNumber(totalPages, locale))}
      </span>
      <div className="flex gap-1">
        <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
          <ChevronLeft className="size-4" /> {t.dashboard.prev}
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          {t.dashboard.next} <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
