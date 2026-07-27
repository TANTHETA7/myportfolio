/**
 * Projects Engine
 *
 * Automatically generates project cards by merging live GitHub repo data
 * with optional local overrides. When you push a new repo to GitHub,
 * it appears automatically on the next ISR revalidation cycle.
 *
 * Priority order for each field:
 *   1. Local override (data/project-overrides.ts)
 *   2. GitHub repo data (live API)
 *   3. Computed defaults
 */

import { siteConfig } from "@/config/site";
import { projectOverrides } from "@/data/project-overrides";
import type { Project, ProjectCategory } from "@/types/project";
import type { GitHubRepo } from "@/types/github";

// Topics → category mapping
const TOPIC_TO_CATEGORY: Record<string, ProjectCategory> = {
  "machine-learning": "ai-ml",
  "deep-learning": "ai-ml",
  "artificial-intelligence": "ai-ml",
  ai: "ai-ml",
  ml: "ai-ml",
  llm: "ai-ml",
  nlp: "ai-ml",
  "computer-vision": "computer-vision",
  "image-processing": "computer-vision",
  opencv: "computer-vision",
  yolo: "computer-vision",
  robotics: "robotics",
  ros: "robotics",
  ros2: "robotics",
  autonomous: "robotics",
  iot: "iot",
  "internet-of-things": "iot",
  esp32: "iot",
  arduino: "iot",
  "raspberry-pi": "iot",
  embedded: "embedded",
  firmware: "embedded",
  stm32: "embedded",
  microcontroller: "embedded",
  "next-js": "web",
  nextjs: "web",
  react: "web",
  web: "web",
  fullstack: "web",
  "full-stack": "web",
  research: "research",
  paper: "research",
  publication: "research",
};

function inferCategory(topics: string[], language: string | null): ProjectCategory {
  for (const topic of topics) {
    const cat = TOPIC_TO_CATEGORY[topic.toLowerCase()];
    if (cat) return cat;
  }
  if (language === "Python") return "ai-ml";
  if (language === "C++" || language === "C") return "embedded";
  if (language === "TypeScript" || language === "JavaScript") return "web";
  return "ai-ml";
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function daysAgo(dateString: string): number {
  const ms = Date.now() - new Date(dateString).getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

function scoreRepo(
  repo: GitHubRepo,
  override: (typeof projectOverrides)[number] | undefined
): number {
  let score = 0;
  // Featured repos get highest priority
  if (override?.featured) score += 10000;
  if ((siteConfig.projectsEngine.featuredRepos as readonly string[]).includes(repo.name.toLowerCase())) score += 5000;
  // Stars are a strong signal
  score += repo.stargazersCount * 10;
  // Recency
  const ageDays = daysAgo(repo.updatedAt);
  score -= Math.min(ageDays, 365); // Cap at 365 days penalty
  // Topics richness
  score += repo.topics.length * 50;
  // Has description
  if (repo.description) score += 100;
  return score;
}

export function buildProjectsFromRepos(repos: GitHubRepo[]): Project[] {
  const { excludeForks, excludePrivate, maxAutoProjects, minStars } =
    siteConfig.projectsEngine;

  // Filter repos
  const eligible = repos.filter((r) => {
    if (excludePrivate && r.isPrivate) return false;
    // @ts-expect-error – fork field exists on raw GH data
    if (excludeForks && r.fork) return false;
    if (r.stargazersCount < minStars) return false;
    // Find override — if it says hidden:true, exclude
    const override = projectOverrides.find(
      (o) => o.repoName.toLowerCase() === r.name.toLowerCase()
    );
    if (override?.hidden) return false;
    return true;
  });

  // Score and sort
  const scored = eligible
    .map((r) => {
      const override = projectOverrides.find(
        (o) => o.repoName.toLowerCase() === r.name.toLowerCase()
      );
      return { repo: r, override, score: scoreRepo(r, override) };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, maxAutoProjects);

  // Build Project objects
  return scored.map(({ repo, override }, index) => {
    const category = override?.category ?? inferCategory(repo.topics, repo.language);
    const slug = override?.slug ?? generateSlug(repo.name);

    const techStack = override?.techStack ?? [
      ...(repo.language ? [{ name: repo.language, color: "#8b5cf6" }] : []),
      ...repo.topics
        .filter((t) => !["project", "portfolio", "github"].includes(t))
        .slice(0, 5)
        .map((t) => ({ name: t, color: "#3b82f6" })),
    ];

    const project: Project = {
      id: String(repo.id),
      slug,
      title: override?.title ?? formatRepoName(repo.name),
      tagline: override?.tagline ?? repo.description ?? "A GitHub project",
      description: override?.description ?? repo.description ?? "",
      longDescription: override?.longDescription ?? repo.description ?? "",
      category,
      status: override?.status ?? "completed",
      featured: override?.featured ?? index < 4,
      coverImage: override?.coverImage ?? `/images/projects/${slug}-cover.jpg`,
      images: override?.images ?? [],
      video: override?.video,
      techStack,
      features: override?.features ?? [],
      challenges: override?.challenges ?? [],
      timeline: override?.timeline ?? [],
      metrics: override?.metrics ?? [],
      githubUrl: repo.htmlUrl,
      liveUrl: override?.liveUrl ?? repo.homepage ?? undefined,
      paperUrl: override?.paperUrl,
      problem: override?.problem ?? repo.description ?? "",
      architecture: override?.architecture ?? "",
      results: override?.results ?? "",
      futureWork: override?.futureWork ?? [],
      tags: [
        ...repo.topics,
        ...(repo.language ? [repo.language] : []),
      ].filter(Boolean),
      startDate: override?.startDate ?? "",
      endDate: override?.endDate,
      teamSize: override?.teamSize,
      role: override?.role,
      relatedProjects: override?.relatedProjects ?? [],
    };

    return project;
  });
}

function formatRepoName(name: string): string {
  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export type { Project };
