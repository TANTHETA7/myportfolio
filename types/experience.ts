export type ExperienceType = "work" | "internship" | "research" | "volunteer" | "education";

export interface ExperienceHighlight {
  text: string;
  metric?: string;
}

export interface Experience {
  id: string;
  type: ExperienceType;
  role: string;
  organization: string;
  organizationUrl?: string;
  logo?: string;
  location: string;
  locationType: "remote" | "onsite" | "hybrid";
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  highlights: ExperienceHighlight[];
  technologies: string[];
  color: string;
}
