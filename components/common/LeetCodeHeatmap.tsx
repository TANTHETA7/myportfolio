"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import type { LeetCodeSubmissionDay } from "@/types/leetcode";

interface LeetCodeHeatmapProps {
  days: LeetCodeSubmissionDay[];
  className?: string;
}

const LEVEL_COLORS: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "rgba(255,255,255,0.04)",
  1: "rgba(255,161,22,0.25)",
  2: "rgba(255,161,22,0.45)",
  3: "rgba(255,161,22,0.70)",
  4: "rgba(255,161,22,0.95)",
};

const MONTH_LABELS = [
  "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",
];

function buildCalendar(days: LeetCodeSubmissionDay[]): Array<{
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}[]> {
  const map: Record<string, { count: number; level: 0 | 1 | 2 | 3 | 4 }> = {};
  for (const d of days) map[d.date] = { count: d.count, level: d.level };

  // Generate last 52 weeks
  const weeks: Array<typeof days> = [];
  const now = new Date();
  // Go back to the last Sunday
  const end = new Date(now);
  end.setDate(end.getDate() - end.getDay());

  for (let w = 51; w >= 0; w--) {
    const week: typeof days = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(end);
      date.setDate(date.getDate() - w * 7 - (6 - d));
      const dateStr = date.toISOString().slice(0, 10);
      const entry = map[dateStr];
      week.push({
        date: dateStr,
        count: entry?.count ?? 0,
        level: entry?.level ?? 0,
      });
    }
    weeks.push(week);
  }

  return weeks;
}

function getMonthLabels(weeks: ReturnType<typeof buildCalendar>) {
  const positions: Array<{ label: string; col: number }> = [];
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    const month = new Date(week[0].date).getMonth();
    if (month !== lastMonth) {
      positions.push({ label: MONTH_LABELS[month], col: wi });
      lastMonth = month;
    }
  });
  return positions;
}

export function LeetCodeHeatmap({ days, className }: LeetCodeHeatmapProps) {
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);
  const weeks = useMemo(() => buildCalendar(days), [days]);
  const monthLabels = useMemo(() => getMonthLabels(weeks), [weeks]);

  const totalSubmissions = days.reduce((acc, d) => acc + d.count, 0);
  const activeDays = days.filter((d) => d.count > 0).length;

  return (
    <div className={cn("relative", className)}>
      {/* Month labels */}
      <div className="relative mb-1 ml-6">
        {monthLabels.map((m, i) => (
          <span
            key={i}
            className="absolute text-[10px] text-white/25 font-mono"
            style={{ left: `${m.col * 14}px` }}
          >
            {m.label}
          </span>
        ))}
      </div>

      <div className="flex gap-0.5 mt-5">
        {/* Day labels */}
        <div className="flex flex-col gap-[3px] mr-1">
          {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
            <div key={i} className="h-[11px] flex items-center">
              <span className="text-[9px] text-white/20 font-mono w-5 text-right leading-none">
                {d}
              </span>
            </div>
          ))}
        </div>

        {/* Grid */}
        <div
          className="flex gap-[3px] overflow-x-auto pb-1"
          style={{ scrollbarWidth: "none" }}
        >
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((day, di) => (
                <div
                  key={di}
                  className="w-[11px] h-[11px] rounded-[2px] cursor-pointer transition-transform hover:scale-125"
                  style={{ backgroundColor: LEVEL_COLORS[day.level] }}
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const dateStr = new Date(day.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                    setTooltip({
                      text: day.count
                        ? `${day.count} submission${day.count !== 1 ? "s" : ""} on ${dateStr}`
                        : `No submissions on ${dateStr}`,
                      x: rect.left + rect.width / 2,
                      y: rect.top - 8,
                    });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-1.5 mt-2 justify-end">
        <span className="text-[10px] text-white/20 mr-1">Less</span>
        {([0, 1, 2, 3, 4] as const).map((l) => (
          <div
            key={l}
            className="w-[11px] h-[11px] rounded-[2px]"
            style={{ backgroundColor: LEVEL_COLORS[l] }}
          />
        ))}
        <span className="text-[10px] text-white/20 ml-1">More</span>
      </div>

      <p className="text-xs text-white/30 font-mono mt-1">
        <span className="text-amber-300/80 font-semibold">{totalSubmissions.toLocaleString()}</span>{" "}
        submissions across{" "}
        <span className="text-amber-300/80 font-semibold">{activeDays}</span>{" "}
        active days
      </p>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 px-2.5 py-1.5 rounded-lg text-xs text-white/90 bg-black/80 backdrop-blur-xl border border-white/10 pointer-events-none whitespace-nowrap"
          style={{ left: tooltip.x, top: tooltip.y, transform: "translate(-50%, -100%)" }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}
