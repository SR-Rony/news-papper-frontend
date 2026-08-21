"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { categoryLabel } from "@/lib/i18n/dictionary";
import { useLocale } from "@/providers/locale-provider";
import { formatNumber } from "@/lib/utils";

interface DataPoint {
  name: string;
  nameEn?: string;
  slug?: string;
  articles: number;
}

export function CategoryBreakdownChart({ data }: { data: DataPoint[] }) {
  const { locale, t } = useLocale();

  const chartData = data.map((row) => ({
    ...row,
    label:
      row.slug != null
        ? categoryLabel(locale, row.slug, locale === "en" ? row.nameEn || row.name : row.name)
        : locale === "en"
          ? row.nameEn || row.name
          : row.name,
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={chartData} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 11, fill: "var(--foreground-muted)" }}
          axisLine={false}
          tickLine={false}
          interval={0}
          angle={-20}
          textAnchor="end"
          height={50}
        />
        <YAxis
          tick={{ fontSize: 12, fill: "var(--foreground-muted)" }}
          axisLine={false}
          tickLine={false}
          width={36}
          tickFormatter={(v: number) => formatNumber(v, locale)}
        />
        <Tooltip
          contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 4, fontSize: 12 }}
          formatter={(value) => [formatNumber(Number(value ?? 0), locale), t.dashboard.articles]}
        />
        <Bar dataKey="articles" fill="var(--signal)" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
