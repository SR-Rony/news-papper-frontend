"use client";

import * as React from "react";
import Link from "next/link";
import { FileText, CheckCircle2, FileEdit, Users, MessageSquare, Eye, Loader2 } from "lucide-react";
import { DashboardTopbar } from "@/components/dashboard/topbar";
import { StatCard } from "@/components/dashboard/stat-card";
import { ViewsChart } from "@/components/dashboard/charts/views-chart";
import { CategoryBreakdownChart } from "@/components/dashboard/charts/category-breakdown-chart";
import { apiClient } from "@/lib/api-client";
import { formatCompactNumber, formatNumber } from "@/lib/utils";
import { categoryLabel } from "@/lib/i18n/dictionary";
import { useLocale } from "@/providers/locale-provider";

interface DashboardStats {
  totalArticles: number;
  published: number;
  drafts: number;
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

export default function DashboardOverviewPage() {
  const [stats, setStats] = React.useState<DashboardStats | null>(null);
  const { locale, t } = useLocale();
  const d = t.dashboard;

  React.useEffect(() => {
    apiClient.get<DashboardStats>("/dashboard/stats").then(setStats).catch(() => undefined);
  }, [locale]);

  if (!stats) {
    return (
      <>
        <DashboardTopbar title={d.overview} />
        <div className="flex justify-center py-16">
          <Loader2 className="size-6 animate-spin text-foreground-muted" aria-label={d.loading} />
        </div>
      </>
    );
  }

  return (
    <>
      <DashboardTopbar title={d.overview} />
      <div className="p-4 lg:p-6">
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label={d.totalArticles} value={formatNumber(stats.totalArticles, locale)} icon={FileText} />
          <StatCard label={d.published} value={formatNumber(stats.published, locale)} icon={CheckCircle2} />
          <StatCard label={d.draftArticles} value={formatNumber(stats.drafts, locale)} icon={FileEdit} />
          <StatCard label={d.totalUsers} value={formatNumber(stats.totalUsers, locale)} icon={Users} />
          <StatCard label={d.totalComments} value={formatNumber(stats.totalComments, locale)} icon={MessageSquare} />
          <StatCard label={d.totalViews} value={formatCompactNumber(stats.totalViews, locale)} icon={Eye} />
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-md border border-border bg-surface p-5">
            <h2 className="mb-4 font-display text-base font-semibold">{d.viewsThisWeek}</h2>
            <ViewsChart />
          </div>
          <div className="rounded-md border border-border bg-surface p-5">
            <h2 className="mb-4 font-display text-base font-semibold">{d.articlesByCategory}</h2>
            <CategoryBreakdownChart data={stats.categoryBreakdown} />
          </div>
        </div>

        <div className="rounded-md border border-border bg-surface p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold">{d.trendingArticles}</h2>
            <Link href="/dashboard/articles" className="text-sm font-semibold text-accent hover:underline">
              {d.viewAll}
            </Link>
          </div>
          <div className="divide-y divide-border">
            {stats.trending.map((a, i) => {
              const title = locale === "en" ? a.titleEn || a.title : a.title;
              const category =
                a.categorySlug != null
                  ? categoryLabel(locale, a.categorySlug, locale === "en" ? a.categoryEn || a.category : a.category)
                  : locale === "en"
                    ? a.categoryEn || a.category
                    : a.category;
              return (
                <div key={a.id} className="flex items-center gap-3 py-3 text-sm">
                  <span className="w-5 text-foreground-muted">{formatNumber(i + 1, locale)}</span>
                  <span className="flex-1 truncate font-medium">{title}</span>
                  <span className="hidden text-foreground-muted sm:inline">{category}</span>
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
