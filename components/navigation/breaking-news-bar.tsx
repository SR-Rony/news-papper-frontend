"use client";

import * as React from "react";
import Link from "next/link";
import type { ArticleListItem } from "@/types/article";
import { localizeArticleListItem } from "@/lib/i18n/localize";
import { useLocale } from "@/providers/locale-provider";

function TickerContent({ items }: { items: ArticleListItem[] }) {
  const { locale } = useLocale();

  return (
    <>
      {items.map((item, i) => {
        const a = localizeArticleListItem(item, locale);
        return (
          <Link
            key={`${item.id}-${i}`}
            href={`/news/${a.slug}`}
            className="shrink-0 whitespace-nowrap text-sm font-medium hover:underline underline-offset-4"
          >
            <span className="mx-4 text-white/50">●</span>
            {a.title}
          </Link>
        );
      })}
    </>
  );
}

export function BreakingNewsBar({ items }: { items: ArticleListItem[] }) {
  const { t } = useLocale();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const measureRef = React.useRef<HTMLDivElement>(null);
  const rafRef = React.useRef<number>(0);
  const posRef = React.useRef(0);
  const pausedRef = React.useRef(false);
  const lastTimeRef = React.useRef(0);
  const speed = 70;

  React.useEffect(() => {
    if (!trackRef.current || !measureRef.current || !containerRef.current) return;
    const singleWidth = measureRef.current.offsetWidth;
    posRef.current = 0;

    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (!pausedRef.current) {
        posRef.current -= speed * delta;
        if (posRef.current <= -singleWidth) {
          posRef.current += singleWidth;
        }
        trackRef.current!.style.transform = `translateX(${posRef.current}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [items]);

  if (items.length === 0) return null;

  return (
    <div
      className="border-y border-border-strong bg-signal text-white"
      role="region"
      aria-label={t.common.breakingNews}
    >
      <div className="flex items-stretch">
        <div className="z-10 flex shrink-0 items-center gap-1.5 bg-black/15 px-3 py-2 sm:px-4">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-white" />
          </span>
          <span className="text-xs font-extrabold tracking-wider">{t.common.breaking}</span>
        </div>

        <div
          ref={containerRef}
          className="relative flex-1 overflow-hidden"
          onMouseEnter={() => {
            pausedRef.current = true;
          }}
          onMouseLeave={() => {
            pausedRef.current = false;
            lastTimeRef.current = 0;
          }}
        >
          <div ref={trackRef} className="inline-flex w-max py-2 will-change-transform">
            <div ref={measureRef} className="inline-flex shrink-0">
              <TickerContent items={items} />
            </div>
            <div className="inline-flex shrink-0" aria-hidden>
              <TickerContent items={items} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
