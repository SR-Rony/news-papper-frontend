export interface Author {
  id: string;
  name: string;
  slug: string;
  avatarUrl: string;
  role: string;
  bio: string;
  articleCount: number;
  socials?: {
    twitter?: string;
    facebook?: string;
    email?: string;
  };
}
