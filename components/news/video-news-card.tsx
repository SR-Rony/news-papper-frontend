"use client";

import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";
import type { VideoNews } from "@/types/video";
import { formatRelativeTime } from "@/lib/utils";
import { categoryLabel } from "@/lib/i18n/dictionary";
import { localizeVideo } from "@/lib/i18n/localize";
import { useLocale } from "@/providers/locale-provider";

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function VideoNewsCard({ video }: { video: VideoNews }) {
  const { locale } = useLocale();
  const v = localizeVideo(video, locale);

  return (
    <article className="group flex flex-col">
      <Link href={`/videos/${v.slug}`} className="relative mb-3 block aspect-video overflow-hidden rounded-md bg-ink">
        <Image
          src={v.thumbnailUrl}
          alt={v.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover opacity-90 transition-opacity group-hover:opacity-75"
        />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-white text-neutral-900 shadow-lg ring-1 ring-black/15 transition-transform group-hover:scale-110">
            <Play className="size-5 fill-neutral-900 stroke-none" />
          </span>
        </span>
        <span className="absolute bottom-2 right-2 rounded-sm bg-black/75 px-1.5 py-0.5 text-xs font-medium text-white">
          {formatDuration(v.durationSeconds)}
        </span>
      </Link>
      <p className="mb-1 text-[0.6875rem] font-bold tracking-wide text-accent">
        {categoryLabel(locale, video.category.slug, v.category.name)}
      </p>
      <h3 className="mb-1 font-display text-base font-semibold leading-snug">
        <Link href={`/videos/${v.slug}`} className="hover:underline underline-offset-2">
          {v.title}
        </Link>
      </h3>
      <span className="text-xs text-foreground-muted">{formatRelativeTime(v.publishedAt, locale)}</span>
    </article>
  );
}
