import type { Metadata } from "next";
import { VideoNewsCard } from "@/components/news/video-news-card";
import { serverFetchPaginated } from "@/lib/server-fetch";
import { getServerLocale } from "@/lib/i18n/server-locale";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { VideoNews } from "@/types/video";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  return {
    title: dict.common.videoNews,
    description: dict.common.videoNewsSubtitle,
  };
}

export default async function VideosPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const { data: videos } = await serverFetchPaginated<VideoNews>("/videos", { limit: 24 });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
      <h1 className="mb-2 font-display text-3xl font-semibold sm:text-4xl">{dict.common.videoNews}</h1>
      <p className="mb-8 text-foreground-muted">{dict.common.videoNewsSubtitle}</p>

      {videos && videos.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <VideoNewsCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <p className="text-foreground-muted">{dict.common.noResults}</p>
      )}
    </div>
  );
}
