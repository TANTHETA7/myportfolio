import { NextResponse } from "next/server";
import { getResumeData } from "@/services/resume";

export const revalidate = 86400;

export async function GET() {
  try {
    const data = await getResumeData();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "s-maxage=86400, stale-while-revalidate=3600",
      },
    });
  } catch (err) {
    console.error("[/api/resume]", err);
    return NextResponse.json({ error: "Failed to load resume data" }, { status: 500 });
  }
}
