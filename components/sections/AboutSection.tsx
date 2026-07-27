"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Brain, Cpu, Globe, Rocket, GraduationCap, MapPin, Github, Linkedin, Mail, Download, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/common/GlassCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { siteConfig } from "@/config/site";
import { staggerContainer, fadeInLeft, fadeInRight } from "@/utils/animations";
import { scrollToSection } from "@/hooks/useLenis";

const interests = [
  { icon: Brain, label: "Artificial Intelligence", color: "#8b5cf6" },
  { icon: Cpu, label: "Embedded Systems", color: "#3b82f6" },
  { icon: Globe, label: "Signal Processing", color: "#06b6d4" },
  { icon: Rocket, label: "Defence Tech", color: "#f59e0b" },
];

export function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["30px", "-30px"]);

  return (
    <section
      ref={containerRef}
      id="about"
      className="section-padding relative overflow-hidden"
      aria-label="About"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 20% 50%, rgba(139,92,246,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="container-wide relative z-10">
        <SectionHeader
          eyebrow="About Me"
          title="Curiosity at the edge of "
          highlight="intelligence"
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6"
          >
            <motion.div variants={fadeInLeft} className="space-y-4">
              <p className="text-white/60 leading-relaxed text-[15px]">
                I&apos;m an aspiring Computer Science & Data Science student applying{" "}
                <span className="text-violet-300 font-medium">machine learning</span>,{" "}
                <span className="text-blue-300 font-medium">intelligent systems</span>, and{" "}
                <span className="text-cyan-300 font-medium">embedded AI</span> to real-world, hardware-backed challenges.
              </p>
              <p className="text-white/40 leading-relaxed text-[15px]">
                What drives me is the challenge of making AI work outside the lab — on a helmet worn by a fighter pilot, reading intent straight from an EEG signal, or analyzing a heartbeat in real time. I care about the full stack: from signal processing to model architecture to the hardware it runs on.
              </p>
              <p className="text-white/40 leading-relaxed text-[15px]">
                That approach has led to 3 flagship projects (Samridh, BioRythm, NeuroSystem), multiple national hackathon finals, and several authored research papers and filed patents.
              </p>
            </motion.div>

            {/* Education card */}
            <motion.div variants={fadeInLeft}>
              <GlassCard className="p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white/80 mb-0.5">
                    {siteConfig.degree}
                  </p>
                  <p className="text-xs text-white/35">{siteConfig.university}</p>
                  <p className="text-xs text-violet-400/70 font-mono mt-1">
                    2024 — {siteConfig.graduationYear} · CGPA: 8.0/10
                  </p>
                </div>
              </GlassCard>
            </motion.div>

            {/* Interests */}
            <motion.div variants={fadeInLeft}>
              <p className="text-xs font-mono tracking-widest uppercase text-white/25 mb-3">
                Interests
              </p>
              <div className="grid grid-cols-2 gap-2">
                {interests.map(({ icon: Icon, label, color }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05] group hover:bg-white/[0.05] transition-colors duration-200"
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${color}15`, border: `1px solid ${color}25` }}
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color }} />
                    </div>
                    <span className="text-xs text-white/50 group-hover:text-white/70 transition-colors duration-200">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Profile card */}
          <motion.div className="relative" style={{ y }}>
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <GlassCard
                variant="elevated"
                className="p-6"
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border border-violet-500/20">
                      <Image
                        src="/images/profile.jpg"
                        alt="Tanmay"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-background" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold text-white/90 text-lg leading-tight">
                      Tanmay
                    </h3>
                    <p className="text-sm text-white/40 mt-0.5">{siteConfig.title}</p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <MapPin className="w-3 h-3 text-white/25" />
                      <span className="text-xs text-white/25">{siteConfig.location}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 flex-shrink-0">
                    <a
                      href={siteConfig.github.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      data-cursor="pointer"
                      className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/[0.04] border border-white/[0.07] text-white/40 hover:text-white/80 hover:bg-white/[0.08] transition-all duration-200"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={siteConfig.linkedin.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      data-cursor="pointer"
                      className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/[0.04] border border-white/[0.07] text-white/40 hover:text-[#0A66C2] hover:bg-white/[0.08] transition-all duration-200"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      aria-label="Email"
                      data-cursor="pointer"
                      className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/[0.04] border border-white/[0.07] text-white/40 hover:text-white/80 hover:bg-white/[0.08] transition-all duration-200"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="flex gap-2 mb-5">
                  <button
                    type="button"
                    onClick={() => scrollToSection("projects", -80)}
                    data-cursor="pointer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-gradient-to-r from-violet-500 to-blue-500 text-white hover:opacity-90 transition-opacity duration-200"
                  >
                    View My Work
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <a
                    href={siteConfig.resumeUrl}
                    download
                    data-cursor="pointer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-white/[0.05] border border-white/[0.08] text-white/60 hover:bg-white/[0.08] hover:text-white/85 transition-all duration-200"
                  >
                    <Download className="w-3 h-3" />
                    Resume
                  </a>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { n: "4", l: "Flagship Projects" },
                    { n: "3", l: "Awards & Wins" },
                    { n: "7", l: "Papers & Patents" },
                  ].map((s) => (
                    <div
                      key={s.l}
                      className="text-center p-2 rounded-xl bg-white/[0.03] border border-white/[0.05]"
                    >
                      <p className="text-base font-display font-bold text-gradient leading-none mb-0.5">
                        {s.n}
                      </p>
                      <p className="text-[10px] text-white/30">{s.l}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
