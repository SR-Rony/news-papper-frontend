import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export function StatCard({
  label, value, icon: Icon, trend, trendUp = true,
}: { label: string; value: string; icon: LucideIcon; trend?: string; trendUp?: boolean }) {
  return (
    <div className="rounded-md border border-border bg-surface p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-foreground-muted">{label}</span>
        <Icon className="size-4 text-foreground-muted" />
      </div>
      <p className="font-display text-2xl font-semibold">{value}</p>
      {trend && (
        <p className={cn("mt-1 text-xs font-medium", trendUp ? "text-success" : "text-destructive")}>{trend}</p>
      )}
    </div>
  );
}
