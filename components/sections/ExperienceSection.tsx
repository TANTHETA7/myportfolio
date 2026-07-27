"use client";

import { motion } from "framer-motion";
import { MapPin, ExternalLink, CheckCircle } from "lucide-react";
import { GlassCard } from "@/components/common/GlassCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { experiences } from "@/data/experience";
import { staggerContainer, staggerItem } from "@/utils/animations";
import { formatDateRange, cn } from "@/lib/utils";
import type { Experience } from "@/types/experience";

const typeConfig = {
  work: { label: "Work", emoji: "💼" },
  internship: { label: "Internship", emoji: "🚀" },
  research: { label: "Research", emoji: "🔬" },
  volunteer: { label: "Volunteer", emoji: "🤝" },
  education: { label: "Education", emoji: "🎓" },
};

const locationConfig = {
  remote: "Remote",
  onsite: "On-site",
  hybrid: "Hybrid",
};

function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  const isEven = index % 2 === 0;
  const config = typeConfig[exp.type];

  return (
    <motion.div
      variants={staggerItem}
      className={cn(
        "relative grid grid-cols-1 md:grid-cols-[1fr_2px_1fr] gap-0",
        "md:items-start"
      )}
    >
      {/* Left side (even) or spacer (odd) */}
      <div className={cn("md:pr-10", !isEven && "hidden md:block")} />

      {/* Timeline line */}
      <div className="hidden md:flex flex-col items-center gap-0">
        <div
          className="w-4 h-4 rounded-full flex-shrink-0 border-2 border-background mt-6"
          style={{ backgroundColor: exp.color }}
        />
        <div className="flex-1 w-px bg-gradient-to-b from-white/10 to-transparent mt-1" />
      </div>

      {/* Card */}
      <div className={cn("md:pl-10 pb-10", isEven && "md:col-start-3", !isEven && "md:col-start-1 md:row-start-1 md:pr-10")}>
        <GlassCard hover className="p-6">
          {/* Header */}
          <div className="flex items-start gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
              style={{ backgroundColor: `${exp.color}18`, border: `1px solid ${exp.color}25` }}
            >
              {config.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span
                  className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: `${exp.color}15`, color: exp.color, border: `1px solid ${exp.color}25` }}
                >
                  {config.label}
                </span>
                {exp.current && (
                  <span className="text-[10px] font-mono text-emerald-400/70 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full tracking-widest uppercase">
                    Current
                  </span>
                )}
              </div>
              <h3 className="font-display font-semibold text-white/85 text-base leading-tight">
                {exp.role}
              </h3>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="text-sm font-medium" style={{ color: exp.color, opacity: 0.8 }}>
                  {exp.organizationUrl ? (
                    <a
                      href={exp.organizationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-100 transition-opacity duration-200 inline-flex items-center gap-1"
                      data-cursor="pointer"
                    >
                      {exp.organization}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    exp.organization
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center gap-1.5 text-xs text-white/30 font-mono">
              <span>
                {formatDateRange(exp.startDate, exp.endDate, exp.current)}
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-white/25">
              <MapPin className="w-3 h-3" />
              <span>{exp.location}</span>
              <span className="text-white/15">·</span>
              <span>{locationConfig[exp.locationType]}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-white/40 leading-relaxed mb-4">{exp.description}</p>

          {/* Highlights */}
          <div className="space-y-2 mb-4">
            {exp.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle
                  className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                  style={{ color: exp.color, opacity: 0.7 }}
                />
                <p className="text-xs text-white/45 leading-relaxed">
                  {h.text}
                  {h.metric && (
                    <span className="ml-1.5 font-semibold" style={{ color: exp.color }}>
                      {h.metric}
                    </span>
                  )}
                </p>
              </div>
            ))}
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1.5">
            {exp.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-md text-[10px] font-mono text-white/35 bg-white/[0.03] border border-white/[0.05]"
              >
                {tech}
              </span>
            ))}
          </div>
        </GlassCard>
      </div>
    </motion.div>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className="section-padding relative" aria-label="Experience">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 70% 30%, rgba(59,130,246,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="container-wide relative z-10">
        <SectionHeader
          eyebrow="Experience"
          title="My "
          highlight="journey"
          description="From first lines of code to research labs and internships. Every step shaped how I think about building systems."
          className="mb-16"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative"
        >
          {/* Vertical center line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />

          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
