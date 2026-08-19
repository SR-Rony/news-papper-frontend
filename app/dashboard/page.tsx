"use client";

import * as React from "react";
import Link from "next/link";
import { FileText, CheckCircle2, FileEdit, Users, MessageSquare, Eye, Loader2 } from "lucide-react";
import { DashboardTopbar } from "@/components/dashboard/topbar";
import { StatCard } from "@/components/dashboard/stat-card";
import { ViewsChart } from "@/components/dashboard/charts/views-chart";
import { CategoryBreakdownChart } from "@/components/dashboard/charts/category-breakdown-chart";
import { apiClient } from "@/lib/api-client";
import { formatCompactNumber } from "@/lib/utils";

interface DashboardStats {
  totalArticles: number;
  published: number;
  drafts: number;
  totalUsers: number;
  totalComments: number;
  totalViews: number;
  categoryBreakdown: { name: string; articles: number }[];
  trending: { id: string; title: string; viewCount: number; category?: string }[];
}

export default function DashboardOverviewPage() {
  const [stats, setStats] = React.useState<DashboardStats | null>(null);

  React.useEffect(() => {
    apiClient.get<DashboardStats>("/dashboard/stats").then(setStats).catch(() => undefined);
  }, []);

  if (!stats) {
    return (
      <>
        <DashboardTopbar title="Overview" />
        <div className="flex justify-center py-16"><Loader2 className="size-6 animate-spin text-foreground-muted" /></div>
      </>
    );
  }

  return (
    <>
      <DashboardTopbar title="Overview" />
      <div className="p-4 lg:p-6">
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Total articles" value={String(stats.totalArticles)} icon={FileText} />
          <StatCard label="Published" value={String(stats.published)} icon={CheckCircle2} />
          <StatCard label="Draft articles" value={String(stats.drafts)} icon={FileEdit} />
          <StatCard label="Total users" value={formatCompactNumber(stats.totalUsers)} icon={Users} />
          <StatCard label="Total comments" value={formatCompactNumber(stats.totalComments)} icon={MessageSquare} />
          <StatCard label="Total views" value={formatCompactNumber(stats.totalViews)} icon={Eye} />
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-md border border-border bg-surface p-5">
            <h2 className="mb-4 font-display text-base font-semibold">Views this week</h2>
            <ViewsChart />
          </div>
          <div className="rounded-md border border-border bg-surface p-5">
            <h2 className="mb-4 font-display text-base font-semibold">Articles by category</h2>
            <CategoryBreakdownChart data={stats.categoryBreakdown} />
          </div>
        </div>

        <div className="rounded-md border border-border bg-surface p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold">Trending articles</h2>
            <Link href="/dashboard/articles" className="text-sm font-semibold text-accent hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-border">
            {stats.trending.map((a, i) => (
              <div key={a.id} className="flex items-center gap-3 py-3 text-sm">
                <span className="w-5 text-foreground-muted">{i + 1}</span>
                <span className="flex-1 truncate font-medium">{a.title}</span>
                <span className="hidden text-foreground-muted sm:inline">{a.category}</span>
                <span className="w-20 text-right text-foreground-muted">{formatCompactNumber(a.viewCount)} views</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
