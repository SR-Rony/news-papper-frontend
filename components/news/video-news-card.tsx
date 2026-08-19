import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";
import type { VideoNews } from "@/types/video";
import { formatRelativeTime } from "@/lib/utils";

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function VideoNewsCard({ video }: { video: VideoNews }) {
  return (
    <article className="group flex flex-col">
      <Link href={`/videos/${video.slug}`} className="relative mb-3 block aspect-video overflow-hidden rounded-md bg-ink">
        <Image src={video.thumbnailUrl} alt={video.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-90 transition-opacity group-hover:opacity-75" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-white/90 text-ink transition-transform group-hover:scale-110">
            <Play className="size-5 fill-current" />
          </span>
        </span>
        <span className="absolute bottom-2 right-2 rounded-sm bg-black/75 px-1.5 py-0.5 text-xs font-medium text-white">
          {formatDuration(video.durationSeconds)}
        </span>
      </Link>
      <p className="mb-1 text-[0.6875rem] font-bold uppercase tracking-wide text-accent">{video.category.name}</p>
      <h3 className="mb-1 font-display text-base font-semibold leading-snug">
        <Link href={`/videos/${video.slug}`} className="hover:underline underline-offset-2">{video.title}</Link>
      </h3>
      <span className="text-xs text-foreground-muted">{formatRelativeTime(video.publishedAt)}</span>
    </article>
  );
}
