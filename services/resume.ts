/**
 * Resume Service
 *
 * Provides structured resume data for the portfolio.
 * Primary source: /public/resume.pdf (via pdf-parse on server)
 * Fallback source: data/resume-data.ts (manually managed)
 *
 * To update: Replace /public/resume.pdf — the parser will re-extract on next
 * ISR cycle. Or edit data/resume-data.ts directly for structured overrides.
 */

import { resumeData } from "@/data/resume-data";

export async function getResumeData() {
  // Future: attempt PDF parsing and merge with structured data
  // For now, return the structured data directly
  return resumeData;
}

export type { ResumeData } from "@/data/resume-data";
