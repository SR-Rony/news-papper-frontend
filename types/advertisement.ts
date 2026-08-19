export type AdPosition =
  | "HEADER"
  | "TOP_BANNER"
  | "SIDEBAR"
  | "ARTICLE_TOP"
  | "ARTICLE_MIDDLE"
  | "ARTICLE_BOTTOM"
  | "FOOTER";

export interface Advertisement {
  id: string;
  name: string;
  position: AdPosition;
  imageUrl: string;
  targetUrl: string;
  isActive: boolean;
  impressions: number;
  clicks: number;
  startDate: string;
  endDate?: string;
}
