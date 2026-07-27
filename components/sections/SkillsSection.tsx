"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/common/GlassCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { skillCategories, getSkillsByCategory } from "@/data/skills";
import { staggerContainer, staggerItem, fadeInUp } from "@/utils/animations";
import { cn } from "@/lib/utils";

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredSkills = getSkillsByCategory(activeCategory);

  return (
    <section id="skills" className="section-padding relative" aria-label="Skills">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 80% 50%, rgba(59,130,246,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="container-wide relative z-10">
        <SectionHeader
          eyebrow="Technical Skills"
          title="Technologies I "
          highlight="master"
          description="From neural networks to bare-metal firmware — a broad stack built from real projects."
          className="mb-12"
        />

        {/* Category filter */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {skillCategories.map((cat) => (
            <motion.button
              key={cat.id}
              variants={staggerItem}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                "border",
                activeCategory === cat.id
                  ? "bg-violet-500/15 border-violet-500/30 text-violet-300"
                  : "bg-white/[0.03] border-white/[0.06] text-white/40 hover:bg-white/[0.06] hover:text-white/60 hover:border-white/[0.10]"
              )}
              data-cursor="pointer"
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3"
          >
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.id}
                variants={staggerItem}
                onMouseEnter={() => setHoveredSkill(skill.id)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <GlassCard
                  hover
                  className={cn(
                    "p-4 flex flex-col items-center gap-3 cursor-default transition-all duration-300",
                    hoveredSkill === skill.id && "border-white/15"
                  )}
                  style={
                    hoveredSkill === skill.id
                      ? { boxShadow: `0 0 20px ${skill.color}20, 0 8px 32px rgba(0,0,0,0.4)` }
                      : undefined
                  }
                >
                  {/* Color dot / icon placeholder */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{
                      backgroundColor: `${skill.color}12`,
                      border: `1px solid ${skill.color}25`,
                      boxShadow: hoveredSkill === skill.id ? `0 0 12px ${skill.color}30` : "none",
                    }}
                  >
                    <span
                      className="text-lg font-bold font-mono"
                      style={{ color: skill.color, opacity: 0.8 }}
                    >
                      {skill.name.slice(0, 2).toUpperCase()}
                    </span>
                  </div>

                  <div className="text-center w-full">
                    <p className="text-xs font-medium text-white/70 mb-2 truncate">
                      {skill.name}
                    </p>

                    {/* Proficiency bar */}
                    <div className="w-full h-1 bg-white/[0.05] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: skill.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                    <p className="text-[10px] text-white/25 mt-1 font-mono">
                      {skill.proficiency}%
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Proficiency legend */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 flex justify-center items-center gap-6 flex-wrap"
        >
          {[
            { range: "90-100%", label: "Expert", color: "#8b5cf6" },
            { range: "75-89%", label: "Advanced", color: "#3b82f6" },
            { range: "60-74%", label: "Proficient", color: "#06b6d4" },
            { range: "< 60%", label: "Learning", color: "#f59e0b" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-2">
              <div className="w-3 h-1 rounded-full" style={{ backgroundColor: l.color }} />
              <span className="text-xs text-white/30 font-mono">
                {l.label} {l.range}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
