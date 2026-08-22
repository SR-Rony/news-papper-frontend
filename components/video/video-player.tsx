"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { useLocale } from "@/providers/locale-provider";

function youtubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}?rel=0`;
    }
    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}?rel=0`;
      if (parsed.pathname.startsWith("/embed/")) {
        return parsed.searchParams.has("rel")
          ? url
          : `${url}${url.includes("?") ? "&" : "?"}rel=0`;
      }
    }
  } catch {
    return null;
  }
  return null;
}

function vimeoEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("vimeo.com")) {
      const id = parsed.pathname.split("/").filter(Boolean).pop();
      if (id) return `https://player.vimeo.com/video/${id}`;
    }
  } catch {
    return null;
  }
  return null;
}

export function VideoPlayer({
  videoUrl,
  thumbnailUrl,
  title,
}: {
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
}) {
  const { t } = useLocale();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState(false);
  const [started, setStarted] = useState(false);

  const youtube = youtubeEmbedUrl(videoUrl);
  const vimeo = vimeoEmbedUrl(videoUrl);
  const isEmbed = Boolean(youtube || vimeo);

  const startPlayback = () => {
    setStarted(true);
    void videoRef.current?.play();
  };

  if (error) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-md border border-border bg-muted px-6 text-center">
        <p className="text-sm text-foreground-muted">{t.common.videoUnavailable}</p>
      </div>
    );
  }

  if (isEmbed) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-md bg-ink">
        <iframe
          src={youtube ?? vimeo ?? videoUrl}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-video overflow-hidden rounded-md bg-ink">
      <video
        ref={videoRef}
        src={videoUrl}
        poster={thumbnailUrl}
        controls={started}
        playsInline
        preload="metadata"
        onError={() => setError(true)}
        onPlay={() => setStarted(true)}
        className="h-full w-full bg-black object-contain"
      >
        <track kind="captions" />
      </video>
      {!started && (
        <button
          type="button"
          onClick={startPlayback}
          className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors hover:bg-black/35"
          aria-label={title}
        >
          <span className="flex size-16 items-center justify-center rounded-full bg-white text-neutral-900 shadow-lg ring-1 ring-black/15 transition-transform hover:scale-105">
            <Play className="size-7 fill-neutral-900 stroke-none pl-0.5" />
          </span>
        </button>
      )}
    </div>
  );
}
