"use client";

import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/providers/locale-provider";
import { cn } from "@/lib/utils";

export function BreakingBadge({ className }: { className?: string }) {
  const { t } = useLocale();
  return (
    <Badge variant="destructive" className={cn(className)}>
      {t.common.breaking}
    </Badge>
  );
}
