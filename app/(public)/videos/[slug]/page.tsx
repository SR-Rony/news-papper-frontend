import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { serverFetch } from "@/lib/server-fetch";
import { VideoPlayer } from "@/components/video/video-player";
import { VideoHeader } from "@/components/video/video-header";
import { LocalizedVideoDescription } from "@/components/video/localized-video-description";
import { RelatedVideos } from "@/components/video/related-videos";
import { AdSlot } from "@/components/ads/ad-slot";
import { SidebarAd } from "@/components/ads/sidebar-ad";
import { Separator } from "@/components/ui/separator";
import { getServerLocale } from "@/lib/i18n/server-locale";
import { localizeVideo } from "@/lib/i18n/localize";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { VideoNews } from "@/types/video";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getVideo(slug: string) {
  return serverFetch<VideoNews & { related: VideoNews[] }>(`/videos/${slug}`, undefined, { revalidate: 0 });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const video = await getVideo(slug);
  if (!video) return { title: "Video not found" };

  const locale = await getServerLocale();
  const v = localizeVideo(video, locale);

  return {
    title: v.title,
    description: v.description ?? v.title,
    openGraph: {
      type: "video.other",
      title: v.title,
      description: v.description ?? v.title,
      images: [v.thumbnailUrl],
    },
    twitter: {
      card: "summary_large_image",
      title: v.title,
      description: v.description ?? v.title,
      images: [v.thumbnailUrl],
    },
    alternates: { canonical: `/videos/${v.slug}` },
  };
}

export default async function VideoPage({ params }: Props) {
  const { slug } = await params;
  const video = await getVideo(slug);
  if (!video) notFound();

  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const localized = localizeVideo(video, locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: localized.title,
    description: localized.description ?? localized.title,
    thumbnailUrl: localized.thumbnailUrl,
    uploadDate: localized.publishedAt,
    contentUrl: localized.videoUrl,
    duration: `PT${localized.durationSeconds}S`,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        <article className="min-w-0">
          <VideoHeader video={video} />
          <VideoPlayer
            videoUrl={video.videoUrl}
            thumbnailUrl={video.thumbnailUrl}
            title={localized.title}
          />
          <AdSlot position="ARTICLE_TOP" className="my-8" />
          <LocalizedVideoDescription video={video} />
          <RelatedVideos videos={video.related ?? []} />
        </article>

        <aside className="space-y-10">
          <div className="rounded-md border border-border bg-surface p-4">
            <h2 className="mb-1 font-display text-lg font-semibold">{dict.common.videoNews}</h2>
            <p className="text-sm text-foreground-muted">{dict.common.videoNewsSubtitle}</p>
          </div>
          <Separator />
          <SidebarAd />
        </aside>
      </div>
    </div>
  );
}
