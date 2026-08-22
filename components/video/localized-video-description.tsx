"use client";

import { localizeVideo } from "@/lib/i18n/localize";
import { useLocale } from "@/providers/locale-provider";
import type { VideoNews } from "@/types/video";

export function LocalizedVideoDescription({ video }: { video: VideoNews }) {
  const { locale } = useLocale();
  const v = localizeVideo(video, locale);
  if (!v.description?.trim()) return null;

  return (
    <div className="prose prose-neutral max-w-none text-foreground">
      <p className="text-base leading-relaxed text-foreground-muted">{v.description}</p>
    </div>
  );
}
