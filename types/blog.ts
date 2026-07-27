export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: number;
  published: boolean;
  featured?: boolean;
}

export interface BlogPostWithContent extends BlogPost {
  content: string;
}
