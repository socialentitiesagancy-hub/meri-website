export interface CaseStudyMetric {
  label: string;
  value: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client: string;
  clientLogo?: string;
  category: string;
  industry: string;
  summary: string;
  coverImage: string;
  metrics: CaseStudyMetric[];
  contentHtml: string;
  isPublished: boolean;
  publishedDate: string;
  author?: string;
  tags?: string[];
}
