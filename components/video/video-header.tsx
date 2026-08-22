"use client";

import Link from "next/link";
import { formatDate, formatNumber } from "@/lib/utils";
import { categoryLabel } from "@/lib/i18n/dictionary";
import { localizeVideo } from "@/lib/i18n/localize";
import { useLocale } from "@/providers/locale-provider";
import type { VideoNews } from "@/types/video";

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function VideoHeader({ video }: { video: VideoNews }) {
  const { locale, t } = useLocale();
  const v = localizeVideo(video, locale);

  return (
    <header className="mb-6">
      <p className="mb-2 text-[0.6875rem] font-bold tracking-wide text-accent">
        <Link href={`/category/${video.category.slug}`} className="hover:underline underline-offset-2">
          {categoryLabel(locale, video.category.slug, v.category.name)}
        </Link>
      </p>
      <h1 className="mb-3 font-display text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl">
        {v.title}
      </h1>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-foreground-muted">
        <time dateTime={v.publishedAt}>{formatDate(v.publishedAt, locale)}</time>
        <span aria-hidden>·</span>
        <span>
          {formatNumber(v.viewCount, locale)} {t.common.views}
        </span>
        <span aria-hidden>·</span>
        <span>{formatDuration(v.durationSeconds)}</span>
      </div>
    </header>
  );
}
