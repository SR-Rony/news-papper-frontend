"use client";

import * as React from "react";
import { Eye, Users, Clock, MessageSquare, Loader2 } from "lucide-react";
import { DashboardTopbar } from "@/components/dashboard/topbar";
import { StatCard } from "@/components/dashboard/stat-card";
import { ViewsChart } from "@/components/dashboard/charts/views-chart";
import { CategoryBreakdownChart } from "@/components/dashboard/charts/category-breakdown-chart";
import { apiClient } from "@/lib/api-client";
import { formatCompactNumber } from "@/lib/utils";

interface DashboardStats {
  totalUsers: number;
  totalComments: number;
  totalViews: number;
  categoryBreakdown: { name: string; articles: number }[];
  trending: { id: string; title: string; viewCount: number; category?: string }[];
}

export default function DashboardAnalyticsPage() {
  const [stats, setStats] = React.useState<DashboardStats | null>(null);

  React.useEffect(() => {
    apiClient.get<DashboardStats>("/dashboard/stats").then(setStats).catch(() => undefined);
  }, []);

  if (!stats) {
    return (
      <>
        <DashboardTopbar title="Analytics" />
        <div className="flex justify-center py-16"><Loader2 className="size-6 animate-spin text-foreground-muted" /></div>
      </>
    );
  }

  return (
    <>
      <DashboardTopbar title="Analytics" />
      <div className="p-4 lg:p-6">
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Total page views" value={formatCompactNumber(stats.totalViews)} icon={Eye} />
          <StatCard label="Registered users" value={formatCompactNumber(stats.totalUsers)} icon={Users} />
          <StatCard label="Avg. reading time" value="4.2 min" icon={Clock} />
          <StatCard label="Total comments" value={formatCompactNumber(stats.totalComments)} icon={MessageSquare} />
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-md border border-border bg-surface p-5">
            <h2 className="mb-4 font-display text-base font-semibold">Traffic trend</h2>
            <ViewsChart />
          </div>
          <div className="rounded-md border border-border bg-surface p-5">
            <h2 className="mb-4 font-display text-base font-semibold">Distribution by category</h2>
            <CategoryBreakdownChart data={stats.categoryBreakdown} />
          </div>
        </div>

        <div className="rounded-md border border-border bg-surface p-5">
          <h2 className="mb-4 font-display text-base font-semibold">Top performing articles</h2>
          <div className="divide-y divide-border">
            {stats.trending.map((a, i) => (
              <div key={a.id} className="flex items-center gap-3 py-3 text-sm">
                <span className="w-5 text-foreground-muted">{i + 1}</span>
                <span className="flex-1 truncate font-medium">{a.title}</span>
                <span className="w-24 text-right text-foreground-muted">{formatCompactNumber(a.viewCount)} views</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
