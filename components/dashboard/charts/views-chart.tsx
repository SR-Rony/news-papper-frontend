"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useLocale } from "@/providers/locale-provider";
import { formatNumber } from "@/lib/utils";

export function ViewsChart() {
  const { locale, t } = useLocale();
  const days = t.dashboard.weekdays;

  const data = [
    { day: days.mon, views: 42000 },
    { day: days.tue, views: 38500 },
    { day: days.wed, views: 51200 },
    { day: days.thu, views: 47800 },
    { day: days.fri, views: 55600 },
    { day: days.sat, views: 61200 },
    { day: days.sun, views: 58400 },
  ];

  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
        <defs>
          <linearGradient id="viewsFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.35} />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="day" tick={{ fontSize: 12, fill: "var(--foreground-muted)" }} axisLine={false} tickLine={false} />
        <YAxis
          tick={{ fontSize: 12, fill: "var(--foreground-muted)" }}
          axisLine={false}
          tickLine={false}
          width={44}
          tickFormatter={(v: number) => formatNumber(v, locale)}
        />
        <Tooltip
          contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 4, fontSize: 12 }}
          formatter={(value) => [formatNumber(Number(value ?? 0), locale), t.dashboard.viewsLabel]}
        />
        <Area type="monotone" dataKey="views" stroke="var(--accent)" strokeWidth={2} fill="url(#viewsFill)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
