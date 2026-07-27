"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Calendar,
  Users,
  Target,
  ArrowRight,
} from "lucide-react";
import { FloatingNav } from "@/components/layout/FloatingNav";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/common/GlassCard";
import { GlassImage } from "@/components/common/GlassImage";
import { MagneticButton } from "@/components/common/MagneticButton";
import { CustomCursor } from "@/components/common/CustomCursor";
import { formatDateRange } from "@/lib/utils";
import { staggerContainer, staggerItem, fadeInUp, pageTransition } from "@/utils/animations";
import type { Project } from "@/types/project";

interface ProjectPageClientProps {
  project: Project;
}

export function ProjectPageClient({ project }: ProjectPageClientProps) {
  const catColor = "#8b5cf6";

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen"
    >
      <CustomCursor />
      <FloatingNav />

      {/* Hero */}
      <section
        className="relative min-h-[55vh] flex flex-col justify-end overflow-hidden pt-24"
        style={{
          background: `linear-gradient(135deg, ${catColor}14 0%, rgba(3,3,5,1) 70%)`,
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${catColor}10 1px, transparent 1px), linear-gradient(90deg, ${catColor}10 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        {project.coverImage && (
          <GlassImage src={project.coverImage} alt={project.title} className="opacity-60" priority />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

        <div className="container-wide relative z-10 pb-12">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors duration-200"
              data-cursor="pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            {/* Category & status */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 mb-4">
              <span
                className="px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase"
                style={{
                  backgroundColor: `${catColor}18`,
                  border: `1px solid ${catColor}30`,
                  color: catColor,
                }}
              >
                {project.category.replace("-", " ")}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 capitalize">
                {project.status.replace("-", " ")}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeInUp}
              className="heading-xl font-display text-white/95 mb-3 tracking-tight"
            >
              {project.title}
            </motion.h1>

            {/* Tagline */}
            <motion.p variants={fadeInUp} className="text-lg text-white/50 mb-6">
              {project.tagline}
            </motion.p>

            {/* Meta */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-1.5 text-sm text-white/30">
                <Calendar className="w-4 h-4" />
                {formatDateRange(project.startDate, project.endDate)}
              </div>
              {project.teamSize && (
                <div className="flex items-center gap-1.5 text-sm text-white/30">
                  <Users className="w-4 h-4" />
                  {project.teamSize === 1 ? "Solo Project" : `${project.teamSize} people`}
                </div>
              )}
              {project.role && (
                <div className="flex items-center gap-1.5 text-sm text-white/30">
                  <Target className="w-4 h-4" />
                  {project.role}
                </div>
              )}
            </motion.div>

            {/* CTA buttons */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
              {project.githubUrl && (
                <MagneticButton
                  as="a"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="md"
                >
                  <Github className="w-4 h-4" />
                  View on GitHub
                </MagneticButton>
              )}
              {project.liveUrl && (
                <MagneticButton
                  as="a"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="glass"
                  size="md"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </MagneticButton>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="container-wide py-16 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="lg:col-span-2 space-y-10"
          >
            {/* Overview */}
            <motion.div variants={staggerItem}>
              <h2 className="text-xs font-mono tracking-widest uppercase text-white/25 mb-4">
                Overview
              </h2>
              <p className="text-white/55 leading-relaxed text-[15px]">
                {project.longDescription}
              </p>
            </motion.div>

            {/* Problem */}
            <motion.div variants={staggerItem}>
              <h2 className="text-xs font-mono tracking-widest uppercase text-white/25 mb-4">
                The Problem
              </h2>
              <GlassCard className="p-5 border-l-2 border-violet-500/40">
                <p className="text-white/55 leading-relaxed text-sm">{project.problem}</p>
              </GlassCard>
            </motion.div>

            {/* Features */}
            <motion.div variants={staggerItem}>
              <h2 className="text-xs font-mono tracking-widest uppercase text-white/25 mb-4">
                Key Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feature) => (
                  <GlassCard key={feature.title} hover className="p-4">
                    <h3 className="text-sm font-semibold text-white/80 mb-1">{feature.title}</h3>
                    <p className="text-xs text-white/40 leading-relaxed">{feature.description}</p>
                  </GlassCard>
                ))}
              </div>
            </motion.div>

            {/* Architecture */}
            <motion.div variants={staggerItem}>
              <h2 className="text-xs font-mono tracking-widest uppercase text-white/25 mb-4">
                Architecture & Approach
              </h2>
              <p className="text-white/50 leading-relaxed text-sm">{project.architecture}</p>
            </motion.div>

            {/* Challenges */}
            <motion.div variants={staggerItem}>
              <h2 className="text-xs font-mono tracking-widest uppercase text-white/25 mb-4">
                Challenges & Solutions
              </h2>
              <div className="space-y-4">
                {project.challenges.map((c, i) => (
                  <GlassCard key={i} className="p-5 space-y-3">
                    <div>
                      <p className="text-[10px] font-mono text-red-400/60 tracking-widest uppercase mb-1">
                        Challenge
                      </p>
                      <p className="text-sm text-white/60">{c.challenge}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-emerald-400/60 tracking-widest uppercase mb-1">
                        Solution
                      </p>
                      <p className="text-sm text-white/50">{c.solution}</p>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </motion.div>

            {/* Results */}
            <motion.div variants={staggerItem}>
              <h2 className="text-xs font-mono tracking-widest uppercase text-white/25 mb-4">
                Results
              </h2>
              <p className="text-white/50 leading-relaxed text-sm">{project.results}</p>
            </motion.div>

            {/* Future work */}
            <motion.div variants={staggerItem}>
              <h2 className="text-xs font-mono tracking-widest uppercase text-white/25 mb-4">
                Future Improvements
              </h2>
              <div className="space-y-2">
                {project.futureWork.map((fw, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-white/40">
                    <ArrowRight className="w-3.5 h-3.5 mt-0.5 text-violet-400/40 flex-shrink-0" />
                    {fw}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div variants={staggerItem}>
              <h2 className="text-xs font-mono tracking-widest uppercase text-white/25 mb-4">
                Development Timeline
              </h2>
              <div className="space-y-3">
                {project.timeline.map((t, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="flex flex-col items-center gap-1 flex-shrink-0 pt-1">
                      <div className="w-2 h-2 rounded-full bg-violet-500/60" />
                      {i < project.timeline.length - 1 && (
                        <div className="w-px h-6 bg-white/[0.06]" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-mono text-violet-300/60">{t.date}</span>
                        <span className="text-xs font-semibold text-white/70">{t.milestone}</span>
                      </div>
                      <p className="text-xs text-white/35">{t.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-5"
          >
            {/* Metrics */}
            <motion.div variants={staggerItem}>
              <GlassCard className="p-5">
                <h3 className="text-xs font-mono tracking-widest uppercase text-white/25 mb-4">
                  Key Metrics
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {project.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="text-center p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]"
                    >
                      <p className="text-lg font-display font-bold text-gradient leading-none mb-1">
                        {m.value}
                        {m.unit && <span className="text-xs text-white/30 ml-0.5">{m.unit}</span>}
                      </p>
                      <p className="text-[10px] text-white/30 font-mono">{m.label}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Tech stack */}
            <motion.div variants={staggerItem}>
              <GlassCard className="p-5">
                <h3 className="text-xs font-mono tracking-widest uppercase text-white/25 mb-4">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech.name}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono text-white/50 bg-white/[0.04] border border-white/[0.06]"
                      style={{ borderColor: `${tech.color}25` }}
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Tags */}
            <motion.div variants={staggerItem}>
              <GlassCard className="p-5">
                <h3 className="text-xs font-mono tracking-widest uppercase text-white/25 mb-4">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono text-violet-300/60 bg-violet-500/8 border border-violet-500/15"
                    >
                      #{tag.replace(/ /g, "")}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </motion.div>
  );
}
