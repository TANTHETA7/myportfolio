/**
 * Platform Registry
 *
 * Central registry for all external platform integrations.
 * Add new platforms here — the architecture is designed to extend without
 * restructuring. Each platform entry describes where its data comes from,
 * whether it is live-synced or manually managed, and how it falls back.
 */

export type PlatformStatus = "live" | "manual" | "planned" | "disabled";

export interface PlatformConfig {
  id: string;
  name: string;
  url: string;
  username?: string;
  status: PlatformStatus;
  apiRoute?: string;
  revalidateSeconds?: number;
  fallbackDataFile?: string;
  description: string;
  icon: string;
  color: string;
}

export const platforms: PlatformConfig[] = [
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com/TANTHETA7",
    username: "TANTHETA7",
    status: "live",
    apiRoute: "/api/github",
    revalidateSeconds: 3600,
    description: "Repos, stars, contributions, pinned projects — auto-synced hourly",
    icon: "FiGithub",
    color: "#ffffff",
  },
  {
    id: "leetcode",
    name: "LeetCode",
    url: "https://leetcode.com/u/U1dRE5dhPW/",
    username: "U1dRE5dhPW",
    status: "live",
    apiRoute: "/api/leetcode",
    revalidateSeconds: 3600,
    description: "Problems solved, contest rating, streak, heatmap — auto-synced hourly",
    icon: "SiLeetcode",
    color: "#FFA116",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/tanmay-singh-82456a34a",
    username: "tanmay-singh-82456a34a",
    status: "manual",
    fallbackDataFile: "data/linkedin.ts",
    description: "LinkedIn profile card — managed via local data file (API restricted)",
    icon: "FiLinkedin",
    color: "#0A66C2",
  },
  {
    id: "kaggle",
    name: "Kaggle",
    url: "https://kaggle.com/tanmay",
    status: "planned",
    description: "Competition results and notebooks — planned integration",
    icon: "SiKaggle",
    color: "#20BEFF",
  },
  {
    id: "scholar",
    name: "Google Scholar",
    url: "https://scholar.google.com",
    status: "planned",
    description: "Publication citations — planned integration",
    icon: "SiGooglescholar",
    color: "#4285F4",
  },
  {
    id: "medium",
    name: "Medium",
    url: "https://medium.com/@tanmay",
    status: "planned",
    description: "Technical blog posts via RSS — planned integration",
    icon: "SiMedium",
    color: "#000000",
  },
  {
    id: "devto",
    name: "Dev.to",
    url: "https://dev.to/tanmay",
    status: "planned",
    description: "Dev blog posts via API — planned integration",
    icon: "SiDevdotto",
    color: "#0a0a0a",
  },
  {
    id: "youtube",
    name: "YouTube",
    url: "https://youtube.com/@tanmay",
    status: "planned",
    description: "Project demo videos via YouTube Data API — planned",
    icon: "FiYoutube",
    color: "#FF0000",
  },
  {
    id: "twitter",
    name: "Twitter / X",
    url: "https://twitter.com/tanmay",
    status: "planned",
    description: "Latest tweets — planned integration",
    icon: "FiTwitter",
    color: "#1DA1F2",
  },
  {
    id: "orcid",
    name: "ORCID",
    url: "https://orcid.org",
    status: "planned",
    description: "Research publications via ORCID API — planned",
    icon: "SiOrcid",
    color: "#A6CE39",
  },
  {
    id: "researchgate",
    name: "ResearchGate",
    url: "https://researchgate.net",
    status: "planned",
    description: "Research profile — planned integration",
    icon: "SiResearchgate",
    color: "#00CCBB",
  },
];

export const getLivePlatforms = () =>
  platforms.filter((p) => p.status === "live");

export const getPlatformById = (id: string): PlatformConfig | undefined =>
  platforms.find((p) => p.id === id);
