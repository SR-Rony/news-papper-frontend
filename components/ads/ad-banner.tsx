import Link from "next/link";
import Image from "next/image";
import type { Advertisement } from "@/types/advertisement";

export function AdBanner({ ad }: { ad: Advertisement }) {
  return (
    <Link
      href={ad.targetUrl}
      className="relative block overflow-hidden rounded-sm border border-border"
      aria-label={`Advertisement: ${ad.name}`}
    >
      <span className="absolute left-1.5 top-1.5 z-10 rounded-sm bg-black/60 px-1.5 py-0.5 text-[10px] font-medium uppercase text-white">
        Ad
      </span>
      <Image src={ad.imageUrl} alt={ad.name} width={728} height={90} className="h-auto w-full object-cover" />
    </Link>
  );
}
