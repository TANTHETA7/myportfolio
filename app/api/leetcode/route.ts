import { NextResponse } from "next/server";
import { buildLeetCodeData } from "@/services/leetcode";

export const revalidate = 3600;

export async function GET() {
  try {
    const data = await buildLeetCodeData();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "s-maxage=3600, stale-while-revalidate=1800",
      },
    });
  } catch (err) {
    console.error("[/api/leetcode]", err);
    return NextResponse.json(
      { error: "Failed to fetch LeetCode data" },
      { status: 500 }
    );
  }
}
