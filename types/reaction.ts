export type ReactionType = "LIKE" | "LOVE" | "INSIGHTFUL" | "ANGRY" | "SAD";

export interface ReactionSummary {
  articleId: string;
  counts: Record<ReactionType, number>;
  viewerReaction?: ReactionType | null;
}
