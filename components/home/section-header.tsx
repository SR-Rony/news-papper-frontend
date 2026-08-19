import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionHeader({ title, href, hrefLabel = "See all" }: { title: string; href?: string; hrefLabel?: string }) {
  return (
    <div className="mb-5 flex items-end justify-between border-b-2 border-ink pb-2">
      <h2 className="font-display text-xl font-semibold sm:text-2xl">{title}</h2>
      {href && (
        <Link href={href} className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline">
          {hrefLabel} <ArrowRight className="size-3.5" />
        </Link>
      )}
    </div>
  );
}
