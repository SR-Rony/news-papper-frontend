import { Badge } from "@/components/ui/badge";
import type { ArticleStatus } from "@/types/article";

const variantByStatus: Record<ArticleStatus, "default" | "success" | "outline" | "secondary"> = {
  PUBLISHED: "success",
  DRAFT: "outline",
  SCHEDULED: "secondary",
  ARCHIVED: "outline",
};

export function ArticleStatusBadge({ status }: { status: ArticleStatus }) {
  return <Badge variant={variantByStatus[status]}>{status.toLowerCase()}</Badge>;
}
