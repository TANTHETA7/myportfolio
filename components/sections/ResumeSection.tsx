"use client";

import { motion } from "framer-motion";
import {
  Download,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Code2,
  Award,
  BookOpen,
  FileText,
} from "lucide-react";
import { GlassCard } from "@/components/common/GlassCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { resumeData } from "@/data/resume-data";
import { staggerContainer, staggerItem } from "@/utils/animations";
import { cn } from "@/lib/utils";

const TYPE_LABELS = {
  work: "Full-time",
  internship: "Internship",
  research: "Research",
  education: "Education",
} as const;

const TYPE_COLORS = {
  work: "#8b5cf6",
  internship: "#3b82f6",
  research: "#10b981",
  education: "#f59e0b",
} as const;

function Tag({ text, color }: { text: string; color?: string }) {
  return (
    <span
      className="px-2 py-0.5 rounded text-[10px] font-mono text-white/35 bg-white/[0.03] border border-white/[0.06]"
      style={color ? { borderColor: `${color}25`, color: `${color}80` } : {}}
    >
      {text}
    </span>
  );
}

export function ResumeSection() {
  const hasResumePdf = true; // set false if /public/resume.pdf not yet uploaded

  return (
    <section id="resume" className="section-padding relative" aria-label="Resume">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 35% at 30% 40%, rgba(139,92,246,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="container-wide relative z-10">
        <SectionHeader
          eyebrow="Resume"
          title="Qualifications & "
          highlight="experience"
          description="A summary of my academic journey, work experience, and technical skills."
          className="mb-12"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="space-y-6"
        >
          {/* Download / view buttons */}
          <motion.div variants={staggerItem} className="flex flex-wrap gap-3 justify-center">
            {hasResumePdf && (
              <a
                href="/resume.pdf"
                download
                data-cursor="pointer"
                className={cn(
                  "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium",
                  "bg-violet-500/15 border border-violet-500/25 text-violet-300/80",
                  "hover:bg-violet-500/25 hover:border-violet-500/40 hover:text-violet-300",
                  "transition-all duration-200"
                )}
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            )}
            <a
              href={resumeData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="pointer"
              className={cn(
                "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm",
                "text-white/40 bg-white/[0.04] border border-white/[0.07]",
                "hover:bg-white/[0.07] hover:text-white/70 hover:border-white/[0.12]",
                "transition-all duration-200"
              )}
            >
              <FileText className="w-4 h-4" />
              LinkedIn Profile
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column: Education + Skills */}
            <div className="space-y-4">
              {/* Education */}
              <motion.div variants={staggerItem}>
                <GlassCard className="p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <GraduationCap className="w-3.5 h-3.5 text-violet-400/60" />
                    <p className="text-xs font-mono tracking-widest uppercase text-white/25">
                      Education
                    </p>
                  </div>
                  <div className="space-y-4">
                    {resumeData.education.map((edu, i) => (
                      <div key={i}>
                        <p className="text-sm font-semibold text-white/80">{edu.degree}</p>
                        <p className="text-xs text-violet-300/60 mt-0.5">{edu.institution}</p>
                        <p className="text-[11px] font-mono text-white/25 mt-0.5">
                          {edu.startDate} – {edu.endDate}
                          {edu.gpa ? ` · GPA ${edu.gpa}` : ""}
                        </p>
                        {edu.achievements && edu.achievements.length > 0 && (
                          <ul className="mt-2 space-y-1">
                            {edu.achievements.map((a, j) => (
                              <li key={j} className="flex items-start gap-1.5">
                                <span className="text-violet-400/50 mt-1 text-[10px]">▸</span>
                                <span className="text-[11px] text-white/35">{a}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>

              {/* Skills */}
              <motion.div variants={staggerItem}>
                <GlassCard className="p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Code2 className="w-3.5 h-3.5 text-violet-400/60" />
                    <p className="text-xs font-mono tracking-widest uppercase text-white/25">
                      Technical Skills
                    </p>
                  </div>
                  <div className="space-y-3">
                    {(
                      [
                        { label: "Languages", items: resumeData.skills.languages },
                        { label: "Frameworks & Libraries", items: resumeData.skills.frameworks },
                        { label: "Tools & Platforms", items: resumeData.skills.tools },
                        { label: "Hardware", items: resumeData.skills.hardware },
                      ] as const
                    ).map(({ label, items }) =>
                      items.length > 0 ? (
                        <div key={label}>
                          <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-1.5">
                            {label}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {items.map((item) => (
                              <Tag key={item} text={item} />
                            ))}
                          </div>
                        </div>
                      ) : null
                    )}
                  </div>
                </GlassCard>
              </motion.div>

              {/* Awards */}
              {resumeData.awards.length > 0 && (
                <motion.div variants={staggerItem}>
                  <GlassCard className="p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="w-3.5 h-3.5 text-amber-400/60" />
                      <p className="text-xs font-mono tracking-widest uppercase text-white/25">
                        Awards
                      </p>
                    </div>
                    <div className="space-y-3">
                      {resumeData.awards.map((award, i) => (
                        <div key={i}>
                          <p className="text-sm font-medium text-white/70">{award.title}</p>
                          <p className="text-[11px] text-white/35 mt-0.5">
                            {award.organization} · {award.date}
                          </p>
                          {award.description && (
                            <p className="text-[11px] text-white/25 mt-1">{award.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              )}
            </div>

            {/* Right column (2-col span): Experience + Publications */}
            <div className="lg:col-span-2 space-y-4">
              {/* Experience */}
              <motion.div variants={staggerItem}>
                <GlassCard className="p-5">
                  <div className="flex items-center gap-2 mb-5">
                    <Briefcase className="w-3.5 h-3.5 text-violet-400/60" />
                    <p className="text-xs font-mono tracking-widest uppercase text-white/25">
                      Experience
                    </p>
                  </div>
                  <div className="space-y-6">
                    {resumeData.experience.map((exp, i) => {
                      const color = TYPE_COLORS[exp.type] ?? "#8b5cf6";
                      return (
                        <div
                          key={i}
                          className={cn(
                            "relative pl-5 border-l border-white/[0.07]",
                            i < resumeData.experience.length - 1 && "pb-6"
                          )}
                        >
                          <div
                            className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full border-2"
                            style={{ borderColor: color, backgroundColor: `${color}20` }}
                          />
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                              <p className="text-sm font-semibold text-white/80">{exp.role}</p>
                              <p className="text-xs text-white/45 mt-0.5">
                                {exp.organization} · {exp.location}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span
                                className="text-[10px] font-mono px-2 py-0.5 rounded-md"
                                style={{
                                  color: `${color}80`,
                                  backgroundColor: `${color}12`,
                                  border: `1px solid ${color}20`,
                                }}
                              >
                                {TYPE_LABELS[exp.type]}
                              </span>
                              <span className="text-[11px] font-mono text-white/25">
                                {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                              </span>
                            </div>
                          </div>

                          <ul className="mt-3 space-y-1.5">
                            {exp.highlights.map((h, j) => (
                              <li key={j} className="flex items-start gap-2">
                                <span className="text-white/20 mt-1 text-[10px] flex-shrink-0">▸</span>
                                <span className="text-xs text-white/40 leading-relaxed">{h}</span>
                              </li>
                            ))}
                          </ul>

                          {exp.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {exp.technologies.map((t) => (
                                <Tag key={t} text={t} color={color} />
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </GlassCard>
              </motion.div>

              {/* Publications */}
              {resumeData.publications.length > 0 && (
                <motion.div variants={staggerItem}>
                  <GlassCard className="p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-400/60" />
                      <p className="text-xs font-mono tracking-widest uppercase text-white/25">
                        Publications
                      </p>
                    </div>
                    <div className="space-y-4">
                      {resumeData.publications.map((pub, i) => (
                        <div key={i} className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-medium text-white/70 leading-snug">
                              {pub.title}
                            </p>
                            <p className="text-[11px] text-white/35 mt-1">
                              {pub.venue} · {pub.year}
                            </p>
                            <span
                              className={cn(
                                "inline-block mt-1 text-[10px] font-mono px-2 py-0.5 rounded",
                                pub.status === "Published"
                                  ? "text-emerald-400/70 bg-emerald-500/10"
                                  : pub.status === "Under Review"
                                  ? "text-amber-400/70 bg-amber-500/10"
                                  : "text-blue-400/70 bg-blue-500/10"
                              )}
                            >
                              {pub.status}
                            </span>
                          </div>
                          {pub.link && (
                            <a
                              href={pub.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-cursor="pointer"
                              className="text-white/20 hover:text-emerald-400/60 transition-colors duration-200 flex-shrink-0 mt-0.5"
                              aria-label="View publication"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
