/**
 * GitHub Service
 *
 * All GitHub API calls go through this service.
 * Uses GraphQL for rich data (pinned repos, contributions)
 * and REST for repo listing.
 */

import { siteConfig } from "@/config/site";
import type { GitHubData, GitHubRepo, GitHubContribution } from "@/types/github";

const API = "https://api.github.com";
const GRAPHQL = "https://api.github.com/graphql";
const USERNAME = siteConfig.github.username;
const TOKEN = process.env.GITHUB_TOKEN;

const LANG_COLORS: Record<string, string> = {
  Python: "#3776AB",
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  "C++": "#00599C",
  C: "#A8B9CC",
  "C#": "#239120",
  Rust: "#CE412B",
  Go: "#00ADD8",
  Java: "#007396",
  Kotlin: "#7F52FF",
  Swift: "#FA7343",
  "Jupyter Notebook": "#DA5B0B",
  HTML: "#E34F26",
  CSS: "#1572B6",
  SCSS: "#CC6699",
  Shell: "#89E051",
  Dockerfile: "#2496ED",
  Ruby: "#CC342D",
  PHP: "#777BB4",
  R: "#276DC3",
  MATLAB: "#EF7C00",
  Verilog: "#504CE8",
};

function restHeaders(): HeadersInit {
  return {
    Accept: "application/vnd.github.v3+json",
    ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
  };
}

function graphqlHeaders(): HeadersInit {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
  };
}

async function gqlQuery<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(GRAPHQL, {
    method: "POST",
    headers: graphqlHeaders(),
    body: JSON.stringify({ query, variables }),
    next: { revalidate: siteConfig.revalidate.github },
  });
  if (!res.ok) throw new Error(`GitHub GraphQL failed: ${res.status}`);
  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors[0].message);
  return json.data as T;
}

async function restGet<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${API}${path}`);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString(), {
    headers: restHeaders(),
    next: { revalidate: siteConfig.revalidate.github },
  });
  if (!res.ok) throw new Error(`GitHub REST failed: ${res.status} ${path}`);
  return res.json() as Promise<T>;
}

// ─── User Profile ─────────────────────────────────────────────

interface RawUser {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
}

export async function fetchGitHubUser(): Promise<RawUser> {
  return restGet<RawUser>(`/users/${USERNAME}`);
}

// ─── All Public Repos ─────────────────────────────────────────

interface RawRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
  created_at: string;
  private: boolean;
  fork: boolean;
  default_branch: string;
  size: number;
  open_issues_count: number;
  visibility: string;
}

export async function fetchAllRepos(): Promise<RawRepo[]> {
  const allRepos: RawRepo[] = [];
  let page = 1;
  while (true) {
    const batch = await restGet<RawRepo[]>(`/users/${USERNAME}/repos`, {
      sort: "updated",
      per_page: "100",
      type: "owner",
      page: String(page),
    });
    if (!batch.length) break;
    allRepos.push(...batch);
    if (batch.length < 100) break;
    page++;
  }
  return allRepos;
}

// ─── Pinned Repos + Contributions (GraphQL) ──────────────────

interface GraphQLPinnedRepo {
  id: string;
  name: string;
  nameWithOwner: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  primaryLanguage: { name: string } | null;
  stargazerCount: number;
  forkCount: number;
  repositoryTopics: { nodes: Array<{ topic: { name: string } }> };
  updatedAt: string;
  isPrivate: boolean;
  object?: { text: string };
}

interface GraphQLContribDay {
  date: string;
  contributionCount: number;
  contributionLevel: "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE";
}

interface GraphQLUser {
  pinnedItems: { nodes: GraphQLPinnedRepo[] };
  contributionsCollection: {
    contributionCalendar: {
      totalContributions: number;
      weeks: Array<{ contributionDays: GraphQLContribDay[] }>;
    };
    totalCommitContributions: number;
  };
  repositories: {
    totalCount: number;
  };
}

const LEVEL_MAP: Record<string, 0 | 1 | 2 | 3 | 4> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

export async function fetchPinnedAndContributions(): Promise<{
  pinned: GitHubRepo[];
  contributions: GitHubContribution[];
  totalContributions: number;
  totalCommits: number;
} | null> {
  if (!TOKEN) return null;

  const yearAgo = new Date();
  yearAgo.setFullYear(yearAgo.getFullYear() - 1);

  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              id
              name
              nameWithOwner
              description
              url
              homepageUrl
              primaryLanguage { name }
              stargazerCount
              forkCount
              repositoryTopics(first: 10) {
                nodes { topic { name } }
              }
              updatedAt
              isPrivate
            }
          }
        }
        contributionsCollection(from: $from, to: $to) {
          totalCommitContributions
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await gqlQuery<{ user: GraphQLUser }>(query, {
      username: USERNAME,
      from: yearAgo.toISOString(),
      to: new Date().toISOString(),
    });

    const u = data.user;

    const pinned: GitHubRepo[] = u.pinnedItems.nodes.map((r) => ({
      id: parseInt(r.id.slice(-8), 16),
      name: r.name,
      fullName: r.nameWithOwner,
      description: r.description,
      htmlUrl: r.url,
      homepage: r.homepageUrl,
      language: r.primaryLanguage?.name ?? null,
      stargazersCount: r.stargazerCount,
      forksCount: r.forkCount,
      topics: r.repositoryTopics.nodes.map((t) => t.topic.name),
      updatedAt: r.updatedAt,
      isPrivate: r.isPrivate,
      isPinned: true,
    }));

    const contributions: GitHubContribution[] = u.contributionsCollection
      .contributionCalendar.weeks.flatMap((w) =>
        w.contributionDays.map((d) => ({
          date: d.date,
          count: d.contributionCount,
          level: LEVEL_MAP[d.contributionLevel] ?? 0,
        }))
      );

    return {
      pinned,
      contributions,
      totalContributions:
        u.contributionsCollection.contributionCalendar.totalContributions,
      totalCommits: u.contributionsCollection.totalCommitContributions,
    };
  } catch {
    return null;
  }
}

// ─── Latest Commits ───────────────────────────────────────────

interface RawCommit {
  sha: string;
  commit: {
    message: string;
    author: { date: string };
  };
  html_url: string;
}

export async function fetchLatestCommits(repo: string, limit = 5): Promise<RawCommit[]> {
  try {
    return restGet<RawCommit[]>(`/repos/${USERNAME}/${repo}/commits`, {
      per_page: String(limit),
    });
  } catch {
    return [];
  }
}

// ─── Current Streak ───────────────────────────────────────────

export function calculateStreak(contributions: GitHubContribution[]): number {
  const sorted = [...contributions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  let streak = 0;
  for (const day of sorted) {
    if (day.count > 0) streak++;
    else break;
  }
  return streak;
}

// ─── Full Profile Builder ─────────────────────────────────────

export async function buildGitHubData(): Promise<GitHubData> {
  const [user, repos, richData] = await Promise.all([
    fetchGitHubUser(),
    fetchAllRepos(),
    fetchPinnedAndContributions(),
  ]);

  const publicRepos = repos.filter((r) => !r.private && !r.fork);

  // Language frequency
  const langCount: Record<string, number> = {};
  for (const r of publicRepos) {
    if (r.language) langCount[r.language] = (langCount[r.language] ?? 0) + 1;
  }
  const totalLang = Object.values(langCount).reduce((a, b) => a + b, 0);
  const topLanguages = Object.entries(langCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([name, count]) => ({
      name,
      percentage: Math.round((count / Math.max(totalLang, 1)) * 100),
      color: LANG_COLORS[name] ?? "#888888",
    }));

  const totalStars = publicRepos.reduce((acc, r) => acc + r.stargazers_count, 0);

  // Fall back to top repos by stars when no pinned repos
  const fallbackRepos: GitHubRepo[] = publicRepos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6)
    .map((r) => ({
      id: r.id,
      name: r.name,
      fullName: r.full_name,
      description: r.description,
      htmlUrl: r.html_url,
      homepage: r.homepage,
      language: r.language,
      stargazersCount: r.stargazers_count,
      forksCount: r.forks_count,
      topics: r.topics ?? [],
      updatedAt: r.updated_at,
      isPrivate: r.private,
      isPinned: false,
    }));

  const pinnedRepos = richData?.pinned.length ? richData.pinned : fallbackRepos;
  const contributions = richData?.contributions ?? [];
  const streak = calculateStreak(contributions);

  return {
    username: user.login,
    name: user.name || user.login,
    bio: user.bio,
    avatarUrl: user.avatar_url,
    followers: user.followers,
    following: user.following,
    publicRepos: publicRepos.length,
    totalStars,
    totalCommits: richData?.totalCommits ?? 0,
    pinnedRepos,
    topLanguages,
    contributions,
    totalContributions: richData?.totalContributions ?? 0,
    streak,
  };
}
