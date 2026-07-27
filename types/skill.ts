export type SkillCategory =
  | "ai-ml"
  | "computer-vision"
  | "programming"
  | "frameworks"
  | "databases"
  | "cloud"
  | "hardware"
  | "tools"
  | "soft-skills";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: number;
  icon: string;
  color: string;
  description?: string;
  yearsOfExperience?: number;
  featured?: boolean;
}
