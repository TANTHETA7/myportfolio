"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Flame, Trophy, Target, Award } from "lucide-react";
import { SiLeetcode } from "react-icons/si";
import { GlassCard } from "@/components/common/GlassCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { LeetCodeHeatmap } from "@/components/common/LeetCodeHeatmap";
import { AnimatedCounter } from "@/components/common/AnimatedCounter";
import { siteConfig } from "@/config/site";
import { staggerContainer, staggerItem } from "@/utils/animations";
import { cn } from "@/lib/utils";
import type { LeetCodeData } from "@/types/leetcode";

type IconComponent = React.ComponentType<{ className?: string; style?: React.CSSProperties }>;

const DIFFICULTY_CONFIG = {
  Easy: { color: "#10b981", bg: "#10b98112", bar: "from-emerald-500/60 to-emerald-400/80" },
  Medium: { color: "#f59e0b", bg: "#f59e0b12", bar: "from-amber-500/60 to-amber-400/80" },
  Hard: { color: "#ef4444", bg: "#ef444412", bar: "from-red-500/60 to-red-400/80" },
} as const;

function StatBadge({
  icon: Icon,
  target,
  suffix = "",
  prefix = "",
  label,
  color,
}: {
  icon: IconComponent;
  target: number;
  suffix?: string;
  prefix?: string;
  label: string;
  color: string;
}) {
  return (
    <GlassCard hover className="p-4 flex flex-col items-center text-center gap-2">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: `${color}15`, border: `1px solid ${color}25` }}
      >
        <Icon className="w-4 h-4" style={{ color }} />
      </div>
      <p className="text-xl font-display font-bold text-white/85">
        <AnimatedCounter target={target} prefix={prefix} suffix={suffix} duration={1400} />
      </p>
      <p className="text-[10px] font-mono tracking-widest uppercase text-white/30">{label}</p>
    </GlassCard>
  );
}

export function LeetCodeSection() {
  const [data, setData] = useState<LeetCodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/leetcode")
      .then((r) => {
        if (!r.ok) throw new Error("fetch failed");
        return r.json();
      })
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="leetcode" className="section-padding relative" aria-label="LeetCode">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 80% 50%, rgba(255,161,22,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="container-wide relative z-10">
        <SectionHeader
          eyebrow="LeetCode"
          title="Algorithmic "
          highlight="mastery"
          description="Consistent problem-solving practice — live data auto-updated every hour."
          className="mb-12"
        />

        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-amber-500/30 border-t-amber-500 animate-spin" />
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="text-white/30 text-sm">
              Could not load LeetCode data.{" "}
              <a
                href={siteConfig.leetcode.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 underline"
              >
                View on LeetCode →
              </a>
            </p>
          </div>
        )}

        {data && !loading && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="space-y-6"
          >
            {/* Top stats */}
            <motion.div variants={staggerItem} className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatBadge
                icon={Target as IconComponent}
                target={data.totalSolved}
                label="Problems Solved"
                color="#FFA116"
              />
              <StatBadge
                icon={Trophy as IconComponent}
                target={data.ranking}
                prefix="#"
                label="Global Ranking"
                color="#8b5cf6"
              />
              <StatBadge
                icon={Flame as IconComponent}
                target={data.streak}
                suffix="d"
                label="Current Streak"
                color="#ef4444"
              />
              <StatBadge
                icon={SiLeetcode as IconComponent}
                target={Math.round(data.contestRating)}
                label="Contest Rating"
                color="#10b981"
              />
            </motion.div>

            {/* Difficulty breakdown + submission heatmap row */}
            <motion.div variants={staggerItem} className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              {/* Difficulty breakdown — 2 cols */}
              <GlassCard className="p-5 lg:col-span-2 flex flex-col">
                <p className="text-xs font-mono tracking-widest uppercase text-white/25 mb-5">
                  By Difficulty
                </p>
                <div className="space-y-4 flex-1">
                  {data.difficulties.map((d) => {
                    const cfg = DIFFICULTY_CONFIG[d.difficulty];
                    const pct = d.total > 0 ? Math.min((d.count / d.total) * 100, 100) : 0;
                    return (
                      <div key={d.difficulty} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold" style={{ color: cfg.color }}>
                            {d.difficulty}
                          </span>
                          <div className="flex items-baseline gap-1">
                            <span className="text-sm font-bold text-white/70">{d.count}</span>
                            <span className="text-[10px] text-white/25 font-mono">/ {d.total}</span>
                          </div>
                        </div>
                        <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                          <motion.div
                            className={cn("h-full rounded-full bg-gradient-to-r", cfg.bar)}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Acceptance rate */}
                <div className="mt-5 pt-4 border-t border-white/[0.06]">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-white/25">
                      Acceptance Rate
                    </span>
                    <span className="text-sm font-bold text-amber-400/80">
                      {data.acceptanceRate.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </GlassCard>

              {/* Submission heatmap — 3 cols */}
              <GlassCard className="p-5 lg:col-span-3">
                <div className="flex items-center gap-2 mb-5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-500" />
                  </span>
                  <p className="text-xs font-mono tracking-widest uppercase text-white/25">
                    Submission Activity — Live
                  </p>
                </div>
                {data.submissionDays && data.submissionDays.length > 0 ? (
                  <LeetCodeHeatmap days={data.submissionDays} />
                ) : (
                  <p className="text-xs text-white/20 font-mono text-center py-8">
                    No submission calendar data available
                  </p>
                )}
              </GlassCard>
            </motion.div>

            {/* Badges */}
            {data.badges.length > 0 && (
              <motion.div variants={staggerItem}>
                <GlassCard className="p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="w-3.5 h-3.5 text-amber-400/60" />
                    <p className="text-xs font-mono tracking-widest uppercase text-white/25">
                      Badges ({data.badges.length})
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {data.badges.map((badge) => (
                      <div
                        key={badge.id}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]"
                        title={badge.name}
                      >
                        {badge.icon && (
                          <Image
                            src={badge.icon}
                            alt={badge.name}
                            width={20}
                            height={20}
                            className="object-contain"
                            unoptimized
                          />
                        )}
                        <span className="text-[11px] text-white/50 font-mono">{badge.name}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* Recent submissions */}
            {data.recentSubmissions.length > 0 && (
              <motion.div variants={staggerItem}>
                <GlassCard className="p-5">
                  <p className="text-xs font-mono tracking-widest uppercase text-white/25 mb-4">
                    Recent Submissions
                  </p>
                  <div className="space-y-1">
                    {data.recentSubmissions.slice(0, 8).map((sub, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0"
                      >
                        <a
                          href={`https://leetcode.com/problems/${sub.titleSlug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-white/55 hover:text-white/90 transition-colors duration-200 truncate max-w-[55%]"
                          data-cursor="pointer"
                        >
                          {sub.title}
                        </a>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-[10px] font-mono text-white/20 hidden sm:block">
                            {sub.lang}
                          </span>
                          <span
                            className={cn(
                              "text-[10px] font-mono px-1.5 py-0.5 rounded",
                              sub.statusDisplay === "Accepted"
                                ? "text-emerald-400 bg-emerald-500/10"
                                : "text-red-400/70 bg-red-500/10"
                            )}
                          >
                            {sub.statusDisplay === "Accepted" ? "AC" : sub.statusDisplay}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* Link */}
            <motion.div variants={staggerItem} className="text-center">
              <a
                href={siteConfig.leetcode.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-2 px-6 py-3 rounded-xl",
                  "text-sm text-white/40 bg-white/[0.04] border border-white/[0.07]",
                  "hover:bg-white/[0.07] hover:text-white/70 hover:border-white/[0.12]",
                  "transition-all duration-200"
                )}
                data-cursor="pointer"
              >
                <SiLeetcode className="w-4 h-4 text-amber-400" />
                View LeetCode profile
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
