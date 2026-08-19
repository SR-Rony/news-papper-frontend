import type { Metadata } from "next";
import { VideoNewsCard } from "@/components/news/video-news-card";
import { mockVideos } from "@/lib/mock-data/videos";

export const metadata: Metadata = {
  title: "Videos",
  description: "Watch the latest video news and highlights.",
};

export default function VideosPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
      <h1 className="mb-2 font-display text-3xl font-semibold sm:text-4xl">Video news</h1>
      <p className="mb-8 text-foreground-muted">The day&rsquo;s stories, in motion.</p>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {mockVideos.map((video) => (
          <VideoNewsCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
