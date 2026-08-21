"use client";

import * as React from "react";
import { Eye, Users, Clock, MessageSquare, Loader2 } from "lucide-react";
import { DashboardTopbar } from "@/components/dashboard/topbar";
import { StatCard } from "@/components/dashboard/stat-card";
import { ViewsChart } from "@/components/dashboard/charts/views-chart";
import { CategoryBreakdownChart } from "@/components/dashboard/charts/category-breakdown-chart";
import { apiClient } from "@/lib/api-client";
import { formatCompactNumber, formatNumber } from "@/lib/utils";
import { useLocale } from "@/providers/locale-provider";

interface DashboardStats {
  totalUsers: number;
  totalComments: number;
  totalViews: number;
  categoryBreakdown: { name: string; nameEn?: string; slug?: string; articles: number }[];
  trending: {
    id: string;
    title: string;
    titleEn?: string;
    viewCount: number;
    category?: string;
    categoryEn?: string;
    categorySlug?: string;
  }[];
}

export default function DashboardAnalyticsPage() {
  const [stats, setStats] = React.useState<DashboardStats | null>(null);
  const { locale, t } = useLocale();
  const d = t.dashboard;

  React.useEffect(() => {
    apiClient.get<DashboardStats>("/dashboard/stats").then(setStats).catch(() => undefined);
  }, [locale]);

  if (!stats) {
    return (
      <>
        <DashboardTopbar title={d.analytics} />
        <div className="flex justify-center py-16">
          <Loader2 className="size-6 animate-spin text-foreground-muted" aria-label={d.loading} />
        </div>
      </>
    );
  }

  return (
    <>
      <DashboardTopbar title={d.analytics} />
      <div className="p-4 lg:p-6">
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label={d.totalPageViews} value={formatCompactNumber(stats.totalViews, locale)} icon={Eye} />
          <StatCard label={d.registeredUsers} value={formatNumber(stats.totalUsers, locale)} icon={Users} />
          <StatCard label={d.avgReadingTime} value={d.avgReadingTimeValue} icon={Clock} />
          <StatCard label={d.totalComments} value={formatNumber(stats.totalComments, locale)} icon={MessageSquare} />
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-md border border-border bg-surface p-5">
            <h2 className="mb-4 font-display text-base font-semibold">{d.trafficTrend}</h2>
            <ViewsChart />
          </div>
          <div className="rounded-md border border-border bg-surface p-5">
            <h2 className="mb-4 font-display text-base font-semibold">{d.distributionByCategory}</h2>
            <CategoryBreakdownChart data={stats.categoryBreakdown} />
          </div>
        </div>

        <div className="rounded-md border border-border bg-surface p-5">
          <h2 className="mb-4 font-display text-base font-semibold">{d.topPerforming}</h2>
          <div className="divide-y divide-border">
            {stats.trending.map((a, i) => {
              const title = locale === "en" ? a.titleEn || a.title : a.title;
              return (
                <div key={a.id} className="flex items-center gap-3 py-3 text-sm">
                  <span className="w-5 text-foreground-muted">{formatNumber(i + 1, locale)}</span>
                  <span className="flex-1 truncate font-medium">{title}</span>
                  <span className="w-28 text-right text-foreground-muted">
                    {formatCompactNumber(a.viewCount, locale)} {d.viewsLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
