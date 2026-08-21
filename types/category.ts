export interface Category {
  id: string;
  name: string;
  nameEn?: string;
  slug: string;
  description?: string;
  descriptionEn?: string;
  color?: string;
  articleCount: number;
  isActive: boolean;
}
