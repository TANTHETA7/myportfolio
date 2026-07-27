/**
 * Offline Log
 *
 * Tracks coding/work that never touches GitHub (local experiments, hardware
 * work on Samridh/BioRythm/NeuroSystem, notebooks, etc.) so it can still show
 * up as "signal" next to the live GitHub graph.
 *
 * This file currently ships with a generated placeholder dataset so the UI
 * has something real to render. Replace `rawEntries` below with your actual
 * dates (format: "YYYY-MM-DD") whenever you want the Offline Log to reflect
 * real activity instead of the placeholder.
 */

import type { GitHubContribution } from "@/types/github";

// ─── Replace with real dates once you're tracking offline work ───
// Example: { date: "2026-03-14", count: 2 }
const rawEntries: Array<{ date: string; count: number }> = [];

function mulberry32(seed: number) {
  let s = seed;
  return function random() {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generatePlaceholder(): Array<{ date: string; count: number }> {
  const rand = mulberry32(20260101);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const totalDays = 371;
  const days: Array<{ date: string; count: number }> = [];

  for (let i = totalDays - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    const skip = rand() < (isWeekend ? 0.35 : 0.55);
    const count = skip ? 0 : Math.round(rand() * (isWeekend ? 6 : 4));
    days.push({ date: d.toISOString().slice(0, 10), count });
  }

  return days;
}

const entries = rawEntries.length > 0 ? rawEntries : generatePlaceholder();
const maxCount = Math.max(...entries.map((e) => e.count), 1);

export const offlineLogContributions: GitHubContribution[] = entries.map((e) => {
  let level: 0 | 1 | 2 | 3 | 4 = 0;
  if (e.count > 0) {
    const ratio = e.count / maxCount;
    level = ratio > 0.75 ? 4 : ratio > 0.5 ? 3 : ratio > 0.25 ? 2 : 1;
  }
  return { date: e.date, count: e.count, level };
});

export const totalOfflineContributions = entries.reduce((sum, e) => sum + e.count, 0);

export const isOfflineLogPlaceholder = rawEntries.length === 0;
