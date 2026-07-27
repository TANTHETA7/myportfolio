"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/utils/animations";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  const titleParts = highlight ? title.split(highlight) : [title];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <motion.div variants={fadeInUp} className="mb-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase text-violet-400/80 bg-violet-500/10 border border-violet-500/15">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400/60 animate-pulse" />
            {eyebrow}
          </span>
        </motion.div>
      )}

      <motion.h2
        variants={fadeInUp}
        className={cn(
          "heading-lg font-display font-bold text-white/95 mb-4",
          "tracking-tight leading-none"
        )}
      >
        {highlight ? (
          <>
            {titleParts[0]}
            <span className="text-gradient">{highlight}</span>
            {titleParts[1]}
          </>
        ) : (
          title
        )}
      </motion.h2>

      {description && (
        <motion.p
          variants={fadeInUp}
          className="text-base md:text-lg text-white/40 leading-relaxed max-w-2xl mx-auto"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
