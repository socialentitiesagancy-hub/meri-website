export interface BlogPost {
  id: string;
  title: string;
  category: string;
  summary: string;
  coverImage: string;
  linkedinUrl: string;
  publishedDate: string;
  readTime?: string;
  author?: string;
  isPublished: boolean;
}
