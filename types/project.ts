export type ProjectCategory =
  | "ai-ml"
  | "computer-vision"
  | "robotics"
  | "iot"
  | "web"
  | "research"
  | "embedded";

export type ProjectStatus = "completed" | "in-progress" | "archived";

export interface ProjectTechItem {
  name: string;
  icon?: string;
  color?: string;
}

export interface ProjectFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface ProjectChallenge {
  challenge: string;
  solution: string;
}

export interface ProjectTimelineItem {
  date: string;
  milestone: string;
  description: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  unit?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: ProjectCategory;
  status: ProjectStatus;
  featured: boolean;
  coverImage: string;
  images: string[];
  video?: string;
  techStack: ProjectTechItem[];
  features: ProjectFeature[];
  challenges: ProjectChallenge[];
  timeline: ProjectTimelineItem[];
  metrics: ProjectMetric[];
  githubUrl?: string;
  liveUrl?: string;
  paperUrl?: string;
  problem: string;
  architecture: string;
  results: string;
  futureWork: string[];
  tags: string[];
  startDate: string;
  endDate?: string;
  teamSize?: number;
  role?: string;
  relatedProjects: string[];
}
