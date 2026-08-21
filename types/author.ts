export interface Author {
  id: string;
  name: string;
  nameEn?: string;
  slug: string;
  avatarUrl: string;
  role: string;
  roleEn?: string;
  bio: string;
  bioEn?: string;
  articleCount: number;
  socials?: {
    twitter?: string;
    facebook?: string;
    email?: string;
  };
}
