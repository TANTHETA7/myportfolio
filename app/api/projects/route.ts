/**
 * Projects API
 *
 * Returns projects merged from live GitHub repos + local overrides.
 * When you push a new repo, it appears here automatically after ISR revalidation.
 */

import { NextResponse } from "next/server";
import { fetchAllRepos } from "@/services/github";
import { buildProjectsFromRepos } from "@/lib/projects-engine";

export const revalidate = 1800;

export async function GET() {
  try {
    const repos = await fetchAllRepos();

    // Convert repos to GitHubRepo type
    const githubRepos = repos.map((r) => ({
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
      fork: r.fork,
    }));

    const projects = buildProjectsFromRepos(githubRepos as Parameters<typeof buildProjectsFromRepos>[0]);

    return NextResponse.json(projects, {
      headers: {
        "Cache-Control": "s-maxage=1800, stale-while-revalidate=900",
      },
    });
  } catch (err) {
    console.error("[/api/projects]", err);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
