"use client";

import { VideoNewsCard } from "@/components/news/video-news-card";
import { useLocale } from "@/providers/locale-provider";
import type { VideoNews } from "@/types/video";

export function RelatedVideos({ videos }: { videos: VideoNews[] }) {
  const { t } = useLocale();
  if (videos.length === 0) return null;

  return (
    <section className="mt-10 border-t border-border pt-8">
      <h2 className="mb-6 font-display text-xl font-semibold">{t.common.relatedVideos}</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {videos.map((video) => (
          <VideoNewsCard key={video.id} video={video} />
        ))}
      </div>
    </section>
  );
}
