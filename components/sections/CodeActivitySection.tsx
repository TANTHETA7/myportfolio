"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiStar, FiBook, FiGitCommit } from "react-icons/fi";
import { Flame, Trophy, Target, Award } from "lucide-react";
import { GlassCard } from "@/components/common/GlassCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ContributionGraph } from "@/components/common/ContributionGraph";
import { LeetCodeHeatmap } from "@/components/common/LeetCodeHeatmap";
import { AnimatedCounter } from "@/components/common/AnimatedCounter";
import { offlineLogContributions, totalOfflineContributions } from "@/data/offline-log";
import { siteConfig } from "@/config/site";
import { staggerContainer, staggerItem } from "@/utils/animations";
import { cn } from "@/lib/utils";
import type { GitHubData } from "@/types/github";
import type { LeetCodeData } from "@/types/leetcode";

const DIFFICULTY_CONFIG = {
  Easy: { color: "#10b981", bar: "from-emerald-500/60 to-emerald-400/80" },
  Medium: { color: "#f59e0b", bar: "from-amber-500/60 to-amber-400/80" },
  Hard: { color: "#ef4444", bar: "from-red-500/60 to-red-400/80" },
} as const;

type IconComponent = React.ComponentType<{ className?: string; style?: React.CSSProperties }>;

function StatCard({
  icon: Icon,
  target,
  prefix = "",
  suffix = "",
  label,
  color,
  isText,
  textValue,
}: {
  icon: IconComponent;
  target?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  color: string;
  isText?: boolean;
  textValue?: string;
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
        {isText ? (
          textValue
        ) : (
          <AnimatedCounter target={target ?? 0} prefix={prefix} suffix={suffix} duration={1400} />
        )}
      </p>
      <p className="text-[10px] font-mono tracking-widest uppercase text-white/30">{label}</p>
    </GlassCard>
  );
}

function LanguageBar({ languages }: { languages: GitHubData["topLanguages"] }) {
  return (
    <div className="space-y-2">
      <div className="flex h-2.5 rounded-full overflow-hidden gap-[2px]">
        {languages.map((lang) => (
          <motion.div
            key={lang.name}
            className="h-full rounded-sm"
            style={{ backgroundColor: lang.color }}
            initial={{ width: 0 }}
            whileInView={{ width: `${lang.percentage}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        {languages.map((lang) => (
          <div key={lang.name} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: lang.color }} />
            <span className="text-[11px] text-white/40 font-mono">
              {lang.name} <span className="text-white/20">{lang.percentage}%</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CodeActivitySection() {
  const [github, setGithub] = useState<GitHubData | null>(null);
  const [githubError, setGithubError] = useState(false);
  const [leetcode, setLeetcode] = useState<LeetCodeData | null>(null);
  const [leetcodeError, setLeetcodeError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      fetch("/api/github").then((r) => (r.ok ? r.json() : Promise.reject())),
      fetch("/api/leetcode").then((r) => (r.ok ? r.json() : Promise.reject())),
    ]).then(([gh, lc]) => {
      if (gh.status === "fulfilled") setGithub(gh.value);
      else setGithubError(true);
      if (lc.status === "fulfilled") setLeetcode(lc.value);
      else setLeetcodeError(true);
      setLoading(false);
    });
  }, []);

  return (
    <section id="activity" className="section-padding relative" aria-label="Code Activity">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 20% 60%, rgba(139,92,246,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="container-wide relative z-10">
        <SectionHeader
          eyebrow="Code Activity"
          title="Where I "
          highlight="ship & solve"
          description="Live GitHub + LeetCode data, auto-synced every hour."
          className="mb-12"
        />

        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-violet-500/30 border-t-violet-500 animate-spin" />
          </div>
        )}

        {!loading && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="space-y-6"
          >
            {/* Combined stats row */}
            {(github || leetcode) && (
              <motion.div
                variants={staggerItem}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
              >
                {github && (
                  <>
                    <StatCard icon={FiBook as IconComponent} target={github.publicRepos} label="Repos" color="#8b5cf6" />
                    <StatCard icon={FiStar as IconComponent} target={github.totalStars} label="Stars" color="#f59e0b" />
                    <StatCard icon={FiGitCommit as IconComponent} target={github.totalCommits} label="Commits" color="#10b981" />
                    <StatCard icon={Flame as IconComponent} target={github.streak} suffix="d" label="GitHub Streak" color="#ef4444" />
                  </>
                )}
                {leetcode && (
                  <>
                    <StatCard icon={Target as IconComponent} target={leetcode.totalSolved} label="Problems Solved" color="#FFA116" />
                    <StatCard icon={Trophy as IconComponent} target={Math.round(leetcode.contestRating)} label="Contest Rating" color="#8b5cf6" />
                  </>
                )}
              </motion.div>
            )}

            {/* Git log + Submission log + Offline log, side by side */}
            {github && (
              <motion.div variants={staggerItem} className="space-y-4">
                <div className="text-center">
                  <p className="text-4xl font-display font-bold text-white/90">
                    <AnimatedCounter target={github.totalContributions + totalOfflineContributions} duration={1400} />
                  </p>
                  <p className="text-[10px] font-mono tracking-widest uppercase text-white/25 mt-1">
                    Total Signals — GitHub + Offline Log
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <GlassCard className="p-5">
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
                        </span>
                        <p className="text-xs font-mono tracking-widest uppercase text-white/25">
                          Git Log // @{github.username}
                        </p>
                      </div>
                      <span className="text-sm font-bold text-red-400/80 font-mono">
                        {github.totalContributions.toLocaleString()}
                        <span className="text-[10px] font-normal text-white/25">/yr</span>
                      </span>
                    </div>
                    {github.contributions.length > 0 ? (
                      <ContributionGraph
                        contributions={github.contributions}
                        totalContributions={github.totalContributions}
                        colorScheme="red"
                      />
                    ) : (
                      <p className="text-xs text-white/20 font-mono text-center py-8">
                        No contribution calendar data available
                      </p>
                    )}
                  </GlassCard>

                  <GlassCard className="p-5">
                    <div className="flex items-center gap-2 mb-5">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-500" />
                      </span>
                      <p className="text-xs font-mono tracking-widest uppercase text-white/25">
                        Submission Log — LeetCode
                      </p>
                    </div>
                    {leetcode && leetcode.submissionDays && leetcode.submissionDays.length > 0 ? (
                      <LeetCodeHeatmap days={leetcode.submissionDays} />
                    ) : (
                      <p className="text-xs text-white/20 font-mono text-center py-8">
                        {leetcodeError ? "Could not load LeetCode data" : "No submission calendar data available"}
                      </p>
                    )}
                  </GlassCard>

                  <GlassCard className="p-5">
                    <div className="flex items-center justify-between mb-5">
                      <p className="text-xs font-mono tracking-widest uppercase text-white/25">Offline Log</p>
                      <span className="text-sm font-bold text-white/70 font-mono">
                        {totalOfflineContributions.toLocaleString()}
                        <span className="text-[10px] font-normal text-white/25">/yr</span>
                      </span>
                    </div>
                    <ContributionGraph
                      contributions={offlineLogContributions}
                      totalContributions={totalOfflineContributions}
                      colorScheme="neutral"
                      totalLabel="offline entries in the last year"
                    />
                  </GlassCard>
                </div>
              </motion.div>
            )}

            {githubError && !github && (
              <motion.div variants={staggerItem} className="text-center py-10">
                <p className="text-white/30 text-sm">
                  Could not load GitHub data.{" "}
                  <a href={siteConfig.github.url} target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 underline">
                    View on GitHub →
                  </a>
                </p>
              </motion.div>
            )}

            {/* Difficulty breakdown + Top languages, side by side */}
            {(leetcode || (github && github.topLanguages.length > 0)) && (
              <motion.div variants={staggerItem} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {leetcode && (
                  <GlassCard className="p-5 flex flex-col">
                    <p className="text-xs font-mono tracking-widest uppercase text-white/25 mb-5">By Difficulty</p>
                    <div className="space-y-4 flex-1">
                      {leetcode.difficulties.map((d) => {
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
                    <div className="mt-5 pt-4 border-t border-white/[0.06]">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-white/25">Acceptance Rate</span>
                        <span className="text-sm font-bold text-amber-400/80">{leetcode.acceptanceRate.toFixed(1)}%</span>
                      </div>
                    </div>
                  </GlassCard>
                )}

                {github && github.topLanguages.length > 0 && (
                  <GlassCard className="p-5">
                    <p className="text-xs font-mono tracking-widest uppercase text-white/25 mb-4">Top Languages</p>
                    <LanguageBar languages={github.topLanguages} />
                  </GlassCard>
                )}
              </motion.div>
            )}

            {/* Badges */}
            {leetcode && leetcode.badges.length > 0 && (
              <motion.div variants={staggerItem}>
                <GlassCard className="p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="w-3.5 h-3.5 text-amber-400/60" />
                    <p className="text-xs font-mono tracking-widest uppercase text-white/25">
                      LeetCode Badges ({leetcode.badges.length})
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {leetcode.badges.map((badge) => (
                      <div
                        key={badge.id}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]"
                        title={badge.name}
                      >
                        {badge.icon && (
                          <Image src={badge.icon} alt={badge.name} width={20} height={20} className="object-contain" unoptimized />
                        )}
                        <span className="text-[11px] text-white/50 font-mono">{badge.name}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* Recent submissions */}
            {leetcode && leetcode.recentSubmissions.length > 0 && (
              <motion.div variants={staggerItem}>
                <GlassCard className="p-5">
                  <p className="text-xs font-mono tracking-widest uppercase text-white/25 mb-4">Recent Submissions</p>
                  <div className="space-y-1">
                    {leetcode.recentSubmissions.slice(0, 8).map((sub, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
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
                          <span className="text-[10px] font-mono text-white/20 hidden sm:block">{sub.lang}</span>
                          <span
                            className={cn(
                              "text-[10px] font-mono px-1.5 py-0.5 rounded",
                              sub.statusDisplay === "Accepted" ? "text-emerald-400 bg-emerald-500/10" : "text-red-400/70 bg-red-500/10"
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

          </motion.div>
        )}
      </div>
    </section>
  );
}
