export type TimelineType = "education" | "work" | "achievement" | "project" | "milestone";

export interface TimelineItem {
  id: string;
  type: TimelineType;
  date: string;
  endDate?: string;
  title: string;
  organization: string;
  description: string;
  icon?: string;
  color: string;
  highlight?: boolean;
  tags?: string[];
}
