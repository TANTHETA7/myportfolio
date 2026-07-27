export type SocialPlatform =
  | "github"
  | "linkedin"
  | "twitter"
  | "instagram"
  | "youtube"
  | "leetcode"
  | "kaggle"
  | "email"
  | "website"
  | "scholar"
  | "medium"
  | "devto";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  url: string;
  icon: string;
  username?: string;
  color: string;
  showInNav?: boolean;
  showInFooter?: boolean;
  showInContact?: boolean;
}
