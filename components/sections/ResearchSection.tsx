"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Code2,
  ChevronDown,
  ChevronUp,
  FileText,
  Users,
  Calendar,
} from "lucide-react";
import { GlassCard } from "@/components/common/GlassCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { researchPapers } from "@/data/research";
import { staggerContainer, staggerItem } from "@/utils/animations";
import { cn } from "@/lib/utils";
import type { Research } from "@/types/research";

const statusConfig = {
  published: { label: "Published", color: "#10b981", bg: "#10b98115" },
  "under-review": { label: "Under Review", color: "#f59e0b", bg: "#f59e0b15" },
  "in-progress": { label: "In Progress", color: "#3b82f6", bg: "#3b82f615" },
  preprint: { label: "Preprint", color: "#8b5cf6", bg: "#8b5cf615" },
};

function ResearchCard({ paper }: { paper: Research }) {
  const [expanded, setExpanded] = useState(false);
  const status = statusConfig[paper.status];

  return (
    <GlassCard
      hover
      className={cn(
        "p-6 transition-all duration-300",
        expanded && "border-violet-500/20"
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-widest uppercase font-medium"
              style={{ backgroundColor: status.bg, color: status.color, border: `1px solid ${status.color}25` }}
            >
              {status.label}
            </span>
            <span className="text-[10px] font-mono text-white/25 tracking-widest uppercase">
              {paper.domain}
            </span>
            {paper.venueShort && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono text-white/40 bg-white/[0.04] border border-white/[0.06]">
                {paper.venueShort}
              </span>
            )}
          </div>

          <h3 className="font-display font-semibold text-white/85 text-base leading-snug mb-2 tracking-tight">
            {paper.title}
          </h3>

          {/* Authors */}
          <div className="flex items-center gap-1.5 mb-3">
            <Users className="w-3 h-3 text-white/25" />
            <p className="text-xs text-white/35">
              {paper.authors.map((a, i) => (
                <span key={i}>
                  <span className={a.isMainAuthor ? "text-violet-300/80 font-medium" : ""}>
                    {a.name}
                  </span>
                  {i < paper.authors.length - 1 && ", "}
                </span>
              ))}
            </p>
          </div>

          {/* Year */}
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3 text-white/25" />
            <span className="text-xs text-white/30 font-mono">{paper.year}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-2 flex-shrink-0">
          {paper.pdfUrl && (
            <a
              href={paper.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.04] border border-white/[0.07] text-white/30 hover:text-white/70 hover:bg-white/[0.08] transition-colors duration-200"
              aria-label="View PDF"
              data-cursor="pointer"
            >
              <FileText className="w-3.5 h-3.5" />
            </a>
          )}
          {paper.codeUrl && (
            <a
              href={paper.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.04] border border-white/[0.07] text-white/30 hover:text-white/70 hover:bg-white/[0.08] transition-colors duration-200"
              aria-label="View Code"
              data-cursor="pointer"
            >
              <Code2 className="w-3.5 h-3.5" />
            </a>
          )}
          {paper.arxivId && (
            <a
              href={`https://arxiv.org/abs/${paper.arxivId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.04] border border-white/[0.07] text-white/30 hover:text-white/70 hover:bg-white/[0.08] transition-colors duration-200"
              aria-label="arXiv"
              data-cursor="pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Abstract */}
      <p className="text-sm text-white/40 leading-relaxed mb-4 line-clamp-3">
        {paper.abstract}
      </p>

      {/* Keywords */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {paper.keywords.map((kw) => (
          <span
            key={kw}
            className="px-2 py-0.5 rounded-md text-[10px] font-mono text-white/30 bg-white/[0.03] border border-white/[0.05]"
          >
            {kw}
          </span>
        ))}
      </div>

      {/* Expand toggle */}
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="flex items-center gap-1.5 text-xs text-violet-400/60 hover:text-violet-400 transition-colors duration-200 font-medium"
        data-cursor="pointer"
      >
        {expanded ? (
          <>
            <ChevronUp className="w-3.5 h-3.5" />
            Hide details
          </>
        ) : (
          <>
            <ChevronDown className="w-3.5 h-3.5" />
            Read abstract & methodology
          </>
        )}
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-6 space-y-5 border-t border-white/[0.05] pt-5">
              <div>
                <h4 className="text-xs font-mono tracking-widest uppercase text-white/25 mb-2">
                  Objectives
                </h4>
                <ul className="space-y-1">
                  {paper.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/45">
                      <span className="text-violet-400/50 mt-0.5 flex-shrink-0">→</span>
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-mono tracking-widest uppercase text-white/25 mb-2">
                  Methodology
                </h4>
                <p className="text-sm text-white/40 leading-relaxed">{paper.methodology}</p>
              </div>

              <div>
                <h4 className="text-xs font-mono tracking-widest uppercase text-white/25 mb-2">
                  Key Results
                </h4>
                <ul className="space-y-1">
                  {paper.results.map((result, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/45">
                      <span className="text-emerald-400/50 mt-0.5 flex-shrink-0">✓</span>
                      {result}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-mono tracking-widest uppercase text-white/25 mb-2">
                  Conclusion
                </h4>
                <p className="text-sm text-white/40 leading-relaxed">{paper.conclusion}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}

export function ResearchSection() {
  return (
    <section id="research" className="section-padding relative" aria-label="Research">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 30% 50%, rgba(236,72,153,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="container-wide relative z-10">
        <SectionHeader
          eyebrow="Research"
          title="Published "
          highlight="work"
          description="Independent and collaborative research in AI, robotics, and IoT. Writing about what I discover at the frontier."
          className="mb-12"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-5"
        >
          {researchPapers.map((paper) => (
            <motion.div key={paper.id} variants={staggerItem}>
              <ResearchCard paper={paper} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
