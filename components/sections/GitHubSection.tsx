"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiGithub, FiStar, FiGitBranch, FiUsers, FiBook, FiGitCommit } from "react-icons/fi";
import { ExternalLink, Flame, Lock, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/common/GlassCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ContributionGraph } from "@/components/common/ContributionGraph";
import { AnimatedCounter } from "@/components/common/AnimatedCounter";
import { offlineLogContributions, totalOfflineContributions } from "@/data/offline-log";
import { getProjectBySlug } from "@/data/projects";
import { siteConfig } from "@/config/site";
import { staggerContainer, staggerItem, fadeInUp } from "@/utils/animations";
import { cn } from "@/lib/utils";
import type { GitHubData, GitHubRepo } from "@/types/github";

// exp5/experiment5 are throwaway test repos — swap them out for the two
// flagship projects that aren't public on GitHub (privacy policy), so the
// "Pinned Repositories" strip stays representative of real work.
const SHOWCASE_SLUGS = ["neurosystem-eeg-target-acquisition", "biorythm-ecg-device"];

function buildShowcaseRepos(): GitHubRepo[] {
  return SHOWCASE_SLUGS.map((slug, i) => {
    const project = getProjectBySlug(slug);
    if (!project) return null;
    const repo: GitHubRepo = {
      id: -(i + 1),
      name: project.title,
      fullName: `TANTHETA7/${project.slug}`,
      description: project.description,
      htmlUrl: `/projects/${project.slug}`,
      homepage: null,
      language: null,
      stargazersCount: 0,
      forksCount: 0,
      topics: project.techStack.slice(0, 3).map((t) => t.name),
      updatedAt: "",
      isPrivate: true,
    };
    return repo;
  }).filter((r): r is GitHubRepo => r !== null);
}

const HIDDEN_REPO_NAMES = ["exp5", "experiment5"];

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
          <AnimatedCounter
            target={target ?? 0}
            prefix={prefix}
            suffix={suffix}
            duration={1400}
          />
        )}
      </p>
      <p className="text-[10px] font-mono tracking-widest uppercase text-white/30">{label}</p>
    </GlassCard>
  );
}

function RepoCard({ repo }: { repo: GitHubRepo }) {
  const langColor =
    repo.language === "Python"
      ? "#3776AB"
      : repo.language === "TypeScript"
      ? "#3178C6"
      : repo.language === "JavaScript"
      ? "#F7DF1E"
      : repo.language === "C++"
      ? "#00599C"
      : "#8b5cf6";

  const isInternal = repo.htmlUrl.startsWith("/");

  return (
    <GlassCard hover className="p-4 h-full flex flex-col group">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <FiBook className="w-3.5 h-3.5 text-white/30 flex-shrink-0" />
          {isInternal ? (
            <Link
              href={repo.htmlUrl}
              className="text-sm font-semibold text-violet-300/80 hover:text-violet-300 transition-colors duration-200 truncate"
              data-cursor="pointer"
            >
              {repo.name}
            </Link>
          ) : (
            <a
              href={repo.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-violet-300/80 hover:text-violet-300 transition-colors duration-200 truncate"
              data-cursor="pointer"
            >
              {repo.name}
            </a>
          )}
        </div>
        {isInternal ? (
          <Link
            href={repo.htmlUrl}
            className="text-white/20 hover:text-white/50 transition-colors duration-200 flex-shrink-0 opacity-0 group-hover:opacity-100"
            data-cursor="pointer"
            aria-label="View case study"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        ) : (
          <a
            href={repo.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/20 hover:text-white/50 transition-colors duration-200 flex-shrink-0 opacity-0 group-hover:opacity-100"
            data-cursor="pointer"
            aria-label="Open repository"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>

      <p className="text-xs text-white/35 leading-relaxed mb-3 flex-1 line-clamp-2">
        {repo.description ?? "No description provided."}
      </p>

      {repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {repo.topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className="px-1.5 py-0.5 rounded text-[10px] font-mono text-white/30 bg-white/[0.03] border border-white/[0.05]"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 text-[11px] text-white/25 font-mono">
        {repo.isPrivate ? (
          <>
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3" />
              Private
            </span>
            <Link
              href={repo.htmlUrl}
              className="ml-auto flex items-center gap-1 text-violet-300/60 hover:text-violet-300 transition-colors duration-200"
              data-cursor="pointer"
            >
              Case Study
              <ArrowRight className="w-3 h-3" />
            </Link>
          </>
        ) : (
          <>
            {repo.language && (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: langColor }} />
                {repo.language}
              </span>
            )}
            <span className="flex items-center gap-1">
              <FiStar className="w-3 h-3" />
              {repo.stargazersCount}
            </span>
            <span className="flex items-center gap-1">
              <FiGitBranch className="w-3 h-3" />
              {repo.forksCount}
            </span>
            <span className="ml-auto text-white/15">
              {repo.updatedAt ? new Date(repo.updatedAt).toLocaleDateString("en-US", { month: "short", year: "2-digit" }) : ""}
            </span>
          </>
        )}
      </div>
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
              {lang.name}{" "}
              <span className="text-white/20">{lang.percentage}%</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function GitHubSection() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => {
        if (!r.ok) throw new Error("fetch failed");
        return r.json();
      })
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="github" className="section-padding relative" aria-label="GitHub">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 20% 60%, rgba(139,92,246,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="container-wide relative z-10">
        <SectionHeader
          eyebrow="GitHub"
          title="Code activity & "
          highlight="repositories"
          description="Live data from GitHub — auto-refreshed every hour."
          className="mb-12"
        />

        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-violet-500/30 border-t-violet-500 animate-spin" />
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="text-white/30 text-sm">
              Could not load GitHub data.{" "}
              <a
                href={siteConfig.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-400 hover:text-violet-300 underline"
              >
                View on GitHub →
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
            {/* Stats row */}
            <motion.div
              variants={staggerItem}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
            >
              <StatCard
                icon={FiBook as IconComponent}
                target={data.publicRepos}
                label="Repos"
                color="#8b5cf6"
              />
              <StatCard
                icon={FiUsers as IconComponent}
                target={data.followers}
                label="Followers"
                color="#3b82f6"
              />
              <StatCard
                icon={FiStar as IconComponent}
                target={data.totalStars}
                label="Stars"
                color="#f59e0b"
              />
              <StatCard
                icon={FiGitCommit as IconComponent}
                target={data.totalCommits}
                label="Commits"
                color="#10b981"
              />
              <StatCard
                icon={Flame as IconComponent}
                target={data.streak}
                suffix="d"
                label="Streak"
                color="#ef4444"
              />
              <StatCard
                icon={FiGithub as IconComponent}
                isText
                textValue={`@${data.username}`}
                label="GitHub"
                color="#06b6d4"
              />
            </motion.div>

            {/* Contribution heatmap — GitHub Live + Offline Log */}
            <motion.div variants={staggerItem} className="space-y-4">
              <div className="text-center">
                <p className="text-4xl font-display font-bold text-white/90">
                  <AnimatedCounter
                    target={data.totalContributions + totalOfflineContributions}
                    duration={1400}
                  />
                </p>
                <p className="text-[10px] font-mono tracking-widest uppercase text-white/25 mt-1">
                  Total Signals — GitHub + Offline Log
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <GlassCard className="p-5">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
                      </span>
                      <p className="text-xs font-mono tracking-widest uppercase text-white/25">
                        GitHub — Live // @{data.username}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-red-400/80 font-mono">
                      {data.totalContributions.toLocaleString()}
                      <span className="text-[10px] font-normal text-white/25">/yr</span>
                    </span>
                  </div>
                  {data.contributions.length > 0 ? (
                    <ContributionGraph
                      contributions={data.contributions}
                      totalContributions={data.totalContributions}
                      colorScheme="red"
                    />
                  ) : (
                    <p className="text-xs text-white/20 font-mono text-center py-8">
                      No contribution calendar data available
                    </p>
                  )}
                </GlassCard>

                <GlassCard className="p-5">
                  <div className="flex items-center justify-between mb-5">
                    <p className="text-xs font-mono tracking-widest uppercase text-white/25">
                      Offline Log
                    </p>
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

            {/* Language breakdown */}
            {data.topLanguages.length > 0 && (
              <motion.div variants={staggerItem}>
                <GlassCard className="p-5">
                  <p className="text-xs font-mono tracking-widest uppercase text-white/25 mb-4">
                    Top Languages
                  </p>
                  <LanguageBar languages={data.topLanguages} />
                </GlassCard>
              </motion.div>
            )}

            {/* Pinned / featured repos */}
            {(() => {
              const realRepos = data.pinnedRepos.filter(
                (repo) => !HIDDEN_REPO_NAMES.includes(repo.name.toLowerCase())
              );
              const displayedRepos = [...buildShowcaseRepos(), ...realRepos];

              return displayedRepos.length > 0 ? (
                <motion.div variants={staggerItem}>
                  <p className="text-xs font-mono tracking-widest uppercase text-white/25 mb-4">
                    Pinned Repositories
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {displayedRepos.map((repo) => (
                      <RepoCard key={repo.id} repo={repo} />
                    ))}
                  </div>
                </motion.div>
              ) : null;
            })()}

            {/* View all link */}
            <motion.div variants={fadeInUp} className="text-center">
              <a
                href={siteConfig.github.url}
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
                <FiGithub className="w-4 h-4" />
                View full GitHub profile
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
