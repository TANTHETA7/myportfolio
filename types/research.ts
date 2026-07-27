export type ResearchStatus = "published" | "under-review" | "in-progress" | "preprint";

export interface ResearchAuthor {
  name: string;
  affiliation?: string;
  isMainAuthor?: boolean;
}

export interface Research {
  id: string;
  title: string;
  abstract: string;
  objectives: string[];
  methodology: string;
  results: string[];
  conclusion: string;
  authors: ResearchAuthor[];
  venue?: string;
  venueShort?: string;
  year: number;
  month?: number;
  status: ResearchStatus;
  doi?: string;
  arxivId?: string;
  pdfUrl?: string;
  codeUrl?: string;
  projectUrl?: string;
  coverImage?: string;
  keywords: string[];
  citations?: number;
  impactFactor?: number;
  domain: string;
}
