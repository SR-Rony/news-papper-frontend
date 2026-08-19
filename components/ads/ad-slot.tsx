import { cn } from "@/lib/utils";
import type { AdPosition } from "@/types/advertisement";

const sizeByPosition: Record<AdPosition, string> = {
  HEADER: "h-[60px] w-full max-w-[728px]",
  TOP_BANNER: "h-[90px] w-full",
  SIDEBAR: "h-[250px] w-full max-w-[300px]",
  ARTICLE_TOP: "h-[90px] w-full",
  ARTICLE_MIDDLE: "h-[250px] w-full",
  ARTICLE_BOTTOM: "h-[90px] w-full",
  FOOTER: "h-[90px] w-full",
};

/**
 * Placeholder ad slot. In production this renders whatever creative the
 * NestJS-backed ad service returns for `position`; until then it shows a
 * clearly-labeled placeholder so layout/spacing can be reviewed.
 */
export function AdSlot({ position, className }: { position: AdPosition; className?: string }) {
  return (
    <div
      className={cn(
        "mx-auto flex items-center justify-center rounded-sm border border-dashed border-border-strong bg-muted text-xs font-medium text-foreground-muted",
        sizeByPosition[position],
        className
      )}
      role="complementary"
      aria-label="Advertisement"
    >
      Advertisement · {position.replace("_", " ").toLowerCase()}
    </div>
  );
}
