import { NextResponse } from "next/server";
import { buildGitHubData } from "@/services/github";

export const revalidate = 3600;

export async function GET() {
  try {
    const data = await buildGitHubData();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "s-maxage=3600, stale-while-revalidate=1800",
      },
    });
  } catch (err) {
    console.error("[/api/github]", err);
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
}
