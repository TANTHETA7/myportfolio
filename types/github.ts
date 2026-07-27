export interface GitHubLanguage {
  name: string;
  percentage: number;
  color: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  homepage: string | null;
  language: string | null;
  stargazersCount: number;
  forksCount: number;
  topics: string[];
  updatedAt: string;
  isPrivate: boolean;
  isPinned?: boolean;
}

export interface GitHubContribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubData {
  username: string;
  name: string;
  bio: string | null;
  avatarUrl: string;
  followers: number;
  following: number;
  publicRepos: number;
  totalStars: number;
  totalCommits: number;
  pinnedRepos: GitHubRepo[];
  topLanguages: GitHubLanguage[];
  contributions: GitHubContribution[];
  totalContributions: number;
  streak: number;
}
