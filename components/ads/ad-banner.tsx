import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { demoAdCopy } from "@/lib/mock-data/ads";
import type { AdPosition, Advertisement } from "@/types/advertisement";

const frameByPosition: Record<AdPosition, string> = {
  HEADER: "min-h-[60px] w-full max-w-[728px]",
  TOP_BANNER: "min-h-[100px] w-full",
  SIDEBAR: "min-h-[250px] w-full max-w-[300px]",
  ARTICLE_TOP: "min-h-[100px] w-full",
  ARTICLE_MIDDLE: "min-h-[220px] w-full",
  ARTICLE_BOTTOM: "min-h-[100px] w-full",
  FOOTER: "min-h-[100px] w-full",
};

export function AdBanner({
  ad,
  className,
}: {
  ad: Advertisement;
  className?: string;
}) {
  const copy = demoAdCopy[ad.position];

  return (
    <aside
      className={cn("mx-auto w-full", frameByPosition[ad.position], className)}
      role="complementary"
      aria-label={`Advertisement: ${ad.name}`}
    >
      <Link
        href={ad.targetUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="group relative block h-full overflow-hidden rounded-sm border border-border bg-surface shadow-sm transition-shadow hover:shadow-md"
      >
        <span className="absolute left-2 top-2 z-20 rounded-sm bg-black/55 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
          Ad
        </span>

        {/* Image layer */}
        <div className="absolute inset-0">
          <Image
            src={ad.imageUrl}
            alt=""
            fill
            sizes={
              ad.position === "SIDEBAR"
                ? "300px"
                : ad.position === "ARTICLE_MIDDLE"
                  ? "(max-width: 768px) 100vw, 720px"
                  : "100vw"
            }
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(105deg, ${copy.accent}f2 0%, ${copy.accent}cc 42%, transparent 78%)`,
            }}
          />
        </div>

        {/* Copy layer */}
        <div
          className={cn(
            "relative z-10 flex h-full flex-col justify-center gap-1.5 p-4 text-white sm:p-5",
            ad.position === "SIDEBAR" && "justify-end p-4",
            (ad.position === "HEADER" ||
              ad.position === "ARTICLE_TOP" ||
              ad.position === "ARTICLE_BOTTOM" ||
              ad.position === "FOOTER" ||
              ad.position === "TOP_BANNER") &&
              "flex-row items-center justify-between gap-4",
          )}
        >
          <div className="min-w-0 max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/80">
              {copy.brand}
            </p>
            <p
              className={cn(
                "font-display font-semibold leading-snug text-white",
                ad.position === "SIDEBAR" || ad.position === "ARTICLE_MIDDLE"
                  ? "text-lg sm:text-xl"
                  : "text-sm sm:text-base",
              )}
            >
              {copy.headline}
            </p>
          </div>
          <span
            className={cn(
              "inline-flex shrink-0 items-center rounded-sm bg-white px-3 py-1.5 text-xs font-bold",
              "text-ink transition-transform group-hover:translate-x-0.5",
            )}
            style={{ color: copy.accent }}
          >
            {copy.cta}
          </span>
        </div>
      </Link>
    </aside>
  );
}
