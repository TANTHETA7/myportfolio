"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowRight, RefreshCw } from "lucide-react";
import { GlassCard } from "@/components/common/GlassCard";
import { GlassImage } from "@/components/common/GlassImage";
import { SectionHeader } from "@/components/common/SectionHeader";
import { projectCategories, projects as staticProjects } from "@/data/projects";
import { siteConfig } from "@/config/site";
import { staggerContainer, staggerItem } from "@/utils/animations";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

const statusColors: Record<string, string> = {
  completed: "#10b981",
  "in-progress": "#f59e0b",
  archived: "#6b7280",
};

const categoryColors: Record<string, string> = {
  "ai-ml": "#8b5cf6",
  "computer-vision": "#3b82f6",
  robotics: "#10b981",
  iot: "#f59e0b",
  web: "#06b6d4",
  research: "#ec4899",
  embedded: "#ef4444",
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const catColor = categoryColors[project.category] ?? "#8b5cf6";
  const hasCaseStudy = project.featured === true;

  return (
    <motion.div
      variants={staggerItem}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group"
    >
      <GlassCard
        className={cn(
          "overflow-hidden transition-all duration-500 h-full flex flex-col",
          hovered && "border-white/15"
        )}
        style={
          hovered
            ? {
                boxShadow: `0 24px 64px rgba(0,0,0,0.6), 0 0 40px ${catColor}15, inset 0 1px 0 rgba(255,255,255,0.10)`,
              }
            : undefined
        }
      >
        {/* Cover */}
        <div
          className="relative h-44 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${catColor}18 0%, rgba(3,3,5,0.8) 100%)`,
          }}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(${catColor}20 1px, transparent 1px), linear-gradient(90deg, ${catColor}20 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />

          {project.coverImage && (
            <GlassImage
              src={project.coverImage}
              alt={project.title}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}

          {/* Category badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span
              className="px-2.5 py-1 rounded-lg text-[10px] font-mono tracking-widest uppercase"
              style={{
                backgroundColor: `${catColor}20`,
                border: `1px solid ${catColor}30`,
                color: catColor,
              }}
            >
              {project.category.replace("-", " ")}
            </span>
            {/* Auto-synced badge */}
            {!project.featured && (
              <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/[0.06] border border-white/[0.08] text-[10px] font-mono text-white/30">
                <RefreshCw className="w-2.5 h-2.5" />
                synced
              </span>
            )}
          </div>

          {/* Status */}
          <div className="absolute top-3 right-3">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: statusColors[project.status] ?? "#6b7280" }}
              />
              <span className="text-[10px] text-white/50 font-mono capitalize">
                {project.status.replace("-", " ")}
              </span>
            </div>
          </div>

          <div
            className="absolute bottom-3 right-3 text-4xl font-display font-bold opacity-10"
            style={{ color: catColor }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-display font-semibold text-white/90 text-lg mb-1 leading-tight tracking-tight">
            {project.title}
          </h3>
          <p className="text-xs text-white/35 font-medium mb-3">{project.tagline}</p>
          <p className="text-sm text-white/40 leading-relaxed mb-4 flex-1 line-clamp-3">
            {project.description}
          </p>

          {/* Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.metrics.slice(0, 2).map((metric) => (
                <div
                  key={metric.label}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06]"
                >
                  <span className="text-xs font-bold" style={{ color: catColor }}>
                    {metric.value}
                    {metric.unit && (
                      <span className="text-[10px] font-normal">{metric.unit}</span>
                    )}
                  </span>
                  <span className="text-[10px] text-white/30">{metric.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech.name}
                className="px-2 py-0.5 rounded-md text-[10px] font-mono text-white/40 bg-white/[0.04] border border-white/[0.05]"
              >
                {tech.name}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono text-white/25">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-white/[0.05]">
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub repository"
                  className="text-white/25 hover:text-white/60 transition-colors duration-200"
                  data-cursor="pointer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Live demo"
                  className="text-white/25 hover:text-white/60 transition-colors duration-200"
                  data-cursor="pointer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>

            {hasCaseStudy ? (
              <Link
                href={`/projects/${project.slug}`}
                className="flex items-center gap-1.5 text-xs font-medium text-white/40 hover:text-white/80 transition-colors duration-200 group/link"
                data-cursor="pointer"
              >
                Case Study
                <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform duration-200" />
              </Link>
            ) : project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium text-white/30 hover:text-white/60 transition-colors duration-200"
                data-cursor="pointer"
              >
                View Repo
                <ArrowRight className="w-3 h-3" />
              </a>
            ) : null}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>(staticProjects);
  const [activeCategory, setActiveCategory] = useState("all");
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: Project[] | null) => {
        if (data && Array.isArray(data) && data.length > 0) {
          // Curated flagship projects (Samridh, BioRythm, NeuroSystem) aren't
          // public repos, so they'd vanish if we replaced static data outright.
          // Keep them first, and append any real live-synced repos after.
          const staticTitles = new Set(staticProjects.map((p) => p.title.toLowerCase()));
          const liveExtras = data.filter((p) => !staticTitles.has(p.title.toLowerCase()));
          if (liveExtras.length > 0) {
            setProjects([...staticProjects, ...liveExtras]);
            setSynced(true);
          }
        }
      })
      .catch(() => {});
  }, []);

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="section-padding relative" aria-label="Projects">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(139,92,246,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="container-wide relative z-10">
        <SectionHeader
          eyebrow="Selected Projects"
          title="Systems I've "
          highlight="built"
          description="End-to-end projects from research idea to deployed system."
          className="mb-4"
        />

        {/* Auto-sync indicator */}
        {synced && (
          <p className="text-center text-[11px] font-mono text-white/20 mb-10 flex items-center justify-center gap-1.5">
            <RefreshCw className="w-3 h-3" />
            Auto-synced from GitHub — updates every 30 minutes
          </p>
        )}
        {!synced && <div className="mb-10" />}

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {projectCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border",
                activeCategory === cat.id
                  ? "bg-violet-500/15 border-violet-500/30 text-violet-300"
                  : "bg-white/[0.03] border-white/[0.06] text-white/40 hover:bg-white/[0.06] hover:text-white/60"
              )}
              data-cursor="pointer"
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View all */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href={siteConfig.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm text-white/50 bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.07] hover:text-white/70 hover:border-white/[0.12] transition-all duration-200"
            data-cursor="pointer"
          >
            <Github className="w-4 h-4" />
            See all projects on GitHub
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
