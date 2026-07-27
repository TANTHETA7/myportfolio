"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import type { GitHubContribution } from "@/types/github";

type ContributionColorScheme = "violet" | "red" | "neutral";

interface ContributionGraphProps {
  contributions: GitHubContribution[];
  totalContributions: number;
  className?: string;
  colorScheme?: ContributionColorScheme;
  totalLabel?: string;
}

const COLOR_SCHEMES: Record<ContributionColorScheme, Record<0 | 1 | 2 | 3 | 4, string>> = {
  violet: {
    0: "rgba(255,255,255,0.04)",
    1: "rgba(109,40,217,0.6)",
    2: "rgba(124,58,237,0.7)",
    3: "rgba(139,92,246,0.8)",
    4: "rgba(167,139,250,1)",
  },
  red: {
    0: "rgba(255,255,255,0.04)",
    1: "rgba(153,27,27,0.65)",
    2: "rgba(185,28,28,0.75)",
    3: "rgba(220,38,38,0.85)",
    4: "rgba(248,113,113,1)",
  },
  neutral: {
    0: "rgba(255,255,255,0.04)",
    1: "rgba(255,255,255,0.25)",
    2: "rgba(255,255,255,0.45)",
    3: "rgba(255,255,255,0.7)",
    4: "rgba(255,255,255,0.95)",
  },
};

const DAY_LABELS = ["Mon", "", "Wed", "", "Fri", "", "Sun"];
const MONTH_LABELS = [
  "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",
];

function organizeIntoWeeks(contributions: GitHubContribution[]): GitHubContribution[][] {
  const weeks: GitHubContribution[][] = [];
  let currentWeek: GitHubContribution[] = [];

  const sorted = [...contributions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  if (!sorted.length) return weeks;

  // Pad start so first week starts on Sunday
  const firstDate = new Date(sorted[0].date);
  const firstDay = firstDate.getDay(); // 0=Sun
  for (let i = 0; i < firstDay; i++) {
    currentWeek.push({ date: "", count: 0, level: 0 });
  }

  for (const day of sorted) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  if (currentWeek.length) {
    // Pad end
    while (currentWeek.length < 7) currentWeek.push({ date: "", count: 0, level: 0 });
    weeks.push(currentWeek);
  }

  return weeks;
}

function getMonthPositions(weeks: GitHubContribution[][]): Array<{ label: string; col: number }> {
  const positions: Array<{ label: string; col: number }> = [];
  let lastMonth = -1;

  weeks.forEach((week, wi) => {
    const firstReal = week.find((d) => d.date);
    if (!firstReal?.date) return;
    const month = new Date(firstReal.date).getMonth();
    if (month !== lastMonth) {
      positions.push({ label: MONTH_LABELS[month], col: wi });
      lastMonth = month;
    }
  });

  return positions;
}

export function ContributionGraph({
  contributions,
  totalContributions,
  className,
  colorScheme = "violet",
  totalLabel = "contributions in the last year",
}: ContributionGraphProps) {
  const [tooltip, setTooltip] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

  const levelColors = COLOR_SCHEMES[colorScheme];
  const weeks = useMemo(() => organizeIntoWeeks(contributions), [contributions]);
  const monthPositions = useMemo(() => getMonthPositions(weeks), [weeks]);

  if (!contributions.length) {
    return (
      <div className={cn("flex items-center justify-center h-32 text-white/20 text-sm", className)}>
        No contribution data available
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      {/* Month labels */}
      <div className="relative mb-1" style={{ paddingLeft: "24px" }}>
        <div className="flex">
          {monthPositions.map((m, i) => (
            <div
              key={i}
              className="absolute text-[10px] text-white/25 font-mono"
              style={{ left: `${24 + m.col * 13}px` }}
            >
              {m.label}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-0.5 mt-5">
        {/* Day of week labels */}
        <div className="flex flex-col gap-0.5 mr-1">
          {DAY_LABELS.map((d, i) => (
            <div key={i} className="h-[11px] flex items-center">
              <span className="text-[9px] text-white/20 font-mono w-5 text-right leading-none">
                {d}
              </span>
            </div>
          ))}
        </div>

        {/* Contribution grid */}
        <div
          className="flex gap-[3px] overflow-x-auto pb-1 scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((day, di) => (
                <div
                  key={di}
                  className="w-[11px] h-[11px] rounded-[2px] cursor-pointer transition-transform hover:scale-125 hover:z-10 relative"
                  style={{
                    backgroundColor: day.date
                      ? levelColors[day.level]
                      : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!day.date) return;
                    const rect = e.currentTarget.getBoundingClientRect();
                    const dateStr = new Date(day.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                    setTooltip({
                      text: `${day.count} contribution${day.count !== 1 ? "s" : ""} on ${dateStr}`,
                      x: rect.left + rect.width / 2,
                      y: rect.top - 8,
                    });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                  aria-label={
                    day.date
                      ? `${day.count} contributions on ${day.date}`
                      : undefined
                  }
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-1.5 mt-2 justify-end">
        <span className="text-[10px] text-white/20 mr-1">Less</span>
        {([0, 1, 2, 3, 4] as const).map((level) => (
          <div
            key={level}
            className="w-[11px] h-[11px] rounded-[2px]"
            style={{ backgroundColor: levelColors[level] }}
          />
        ))}
        <span className="text-[10px] text-white/20 ml-1">More</span>
      </div>

      {/* Total */}
      <p className="text-xs text-white/30 font-mono mt-1">
        <span
          className={cn(
            "font-semibold",
            colorScheme === "red" && "text-red-400/90",
            colorScheme === "neutral" && "text-white/70",
            colorScheme === "violet" && "text-violet-300/80"
          )}
        >
          {totalContributions.toLocaleString()}
        </span>{" "}
        {totalLabel}
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
