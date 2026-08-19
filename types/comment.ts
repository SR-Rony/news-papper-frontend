export interface Comment {
  id: string;
  articleId: string;
  author: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  content: string;
  createdAt: string;
  likeCount: number;
  isLikedByViewer?: boolean;
  parentId?: string | null;
  replies?: Comment[];
}
