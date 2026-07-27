/**
 * Project Overrides
 *
 * This is the ONLY file you need to edit to customize how your GitHub repos
 * appear on your portfolio. The Projects Engine fetches all your repos
 * automatically — use this file to:
 *
 *   1. Enrich a repo with a custom description, case study, images, metrics
 *   2. Set a repo as featured (shows first)
 *   3. Override the automatically-detected category
 *   4. Hide a repo (hidden: true)
 *   5. Add your own repos that aren't on GitHub yet
 *
 * Every field is optional. If you skip a field, the value from GitHub is used.
 * repoName MUST match the GitHub repository name exactly (case-insensitive).
 */

import type { ProjectCategory, ProjectStatus } from "@/types/project";

export interface ProjectOverride {
  repoName: string;
  slug?: string;
  title?: string;
  tagline?: string;
  description?: string;
  longDescription?: string;
  category?: ProjectCategory;
  status?: ProjectStatus;
  featured?: boolean;
  hidden?: boolean;
  order?: number;
  coverImage?: string;
  images?: string[];
  video?: string;
  liveUrl?: string;
  paperUrl?: string;
  problem?: string;
  architecture?: string;
  results?: string;
  futureWork?: string[];
  techStack?: Array<{ name: string; color: string }>;
  features?: Array<{ title: string; description: string; icon?: string }>;
  challenges?: Array<{ challenge: string; solution: string }>;
  timeline?: Array<{ date: string; milestone: string; description: string }>;
  metrics?: Array<{ label: string; value: string; unit?: string }>;
  startDate?: string;
  endDate?: string;
  teamSize?: number;
  role?: string;
  relatedProjects?: string[];
}

// ─── Add your repository overrides here ───────────────────────
// The engine picks up ALL your GitHub repos automatically.
// Use this ONLY for enrichment — custom descriptions, case studies, etc.

export const projectOverrides: ProjectOverride[] = [
  // Samridh, BioRythm, and NeuroSystem are not public GitHub repos (privacy
  // policy), so they live entirely as curated entries in data/projects.ts
  // rather than as overrides here. This array only overrides *real* public
  // repos under github.com/TANTHETA7 — add entries here as those go public.

  // Test/scratch repos — hidden so they don't show up as project cards.
  { repoName: "exp5", hidden: true },
  { repoName: "experiment5", hidden: true },
  { repoName: "myportfolio", hidden: true },

  // ─── Template: copy-paste this to add a new override ──────
  // {
  //   repoName: "your-repo-name",   // Must match GitHub repo name exactly
  //   featured: true,
  //   title: "Display Title",
  //   tagline: "One-line description shown on cards",
  //   category: "ai-ml",           // ai-ml | computer-vision | robotics | iot | web | research | embedded
  //   hidden: false,
  //   description: "Short description for cards",
  //   longDescription: "Full case study description...",
  //   problem: "The problem this solves...",
  //   architecture: "How it works technically...",
  //   results: "What was achieved...",
  //   metrics: [{ label: "Accuracy", value: "95", unit: "%" }],
  //   futureWork: ["Next feature to build"],
  //   liveUrl: "https://your-demo.com",
  //   role: "Solo Developer",
  //   teamSize: 1,
  // },
];
