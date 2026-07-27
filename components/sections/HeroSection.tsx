"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, Code2 } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { siteConfig } from "@/config/site";
import { scrollToSection } from "@/hooks/useLenis";
import { staggerContainer, fadeInUp, fadeInRight } from "@/utils/animations";
import { cn } from "@/lib/utils";

const socialLinks = [
  { Icon: Mail, href: `mailto:${siteConfig.email}`, label: "Email" },
  { Icon: FiGithub, href: siteConfig.github.url, label: "GitHub" },
  { Icon: FiLinkedin, href: siteConfig.linkedin.url, label: "LinkedIn" },
];

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center overflow-hidden section-padding"
      aria-label="Hero"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 15% 20%, rgba(139,92,246,0.10) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 85% 80%, rgba(6,182,212,0.08) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          {/* Left: text content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-widest uppercase text-violet-300/80 bg-violet-500/10 border border-violet-500/15 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for internships &amp; research collaborations
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="heading-hero font-display font-bold text-white/95 leading-none mb-4"
            >
              Tanmay
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-base md:text-lg font-mono text-cyan-300/80 mb-6"
            >
              AI Engineer &amp; CS Student{" "}
              <span className="text-white/20">|</span> Embedded AI{" "}
              <span className="text-white/20">·</span> EEG/ECG Signal Processing{" "}
              <span className="text-white/20">·</span> Defence Tech
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-white/45 leading-relaxed text-[15px] md:text-base max-w-xl mb-8"
            >
              I&apos;m an aspiring Computer Science &amp; Data Science student applying machine learning, intelligent systems, and embedded AI to real-world, hardware-backed challenges — from fighter-pilot HUDs to EEG-driven target lock-in. I care about the full stack: signal processing, model architecture, and the hardware it runs on.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-3 mb-8"
            >
              <button
                type="button"
                onClick={() => scrollToSection("projects", -80)}
                data-cursor="pointer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-violet-500 to-cyan-500 text-white hover:opacity-90 transition-opacity duration-200"
              >
                View Projects
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("contact", -80)}
                data-cursor="pointer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-white/[0.05] border border-white/[0.10] text-white/70 hover:bg-white/[0.08] hover:border-white/[0.16] transition-all duration-200"
              >
                Contact Me
              </button>
              <a
                href={siteConfig.resumeUrl}
                download
                data-cursor="pointer"
                className="inline-flex items-center gap-1.5 px-4 py-3 text-sm font-medium text-white/40 hover:text-white/70 transition-colors duration-200"
              >
                <Download className="w-3.5 h-3.5" />
                Resume
              </a>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex items-center gap-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  data-cursor="pointer"
                  className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center",
                    "bg-white/[0.04] border border-white/[0.07] text-white/40",
                    "hover:text-white/80 hover:bg-white/[0.08] transition-all duration-200"
                  )}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
              <span
                aria-hidden="true"
                className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/[0.04] border border-white/[0.07] text-white/40"
              >
                <Code2 className="w-4 h-4" />
              </span>
            </motion.div>
          </motion.div>

          {/* Right: photo */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-56 h-56 md:w-72 md:h-72">
              <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-violet-500/30 to-cyan-500/30 blur-2xl opacity-60" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10">
                <Image
                  src="/images/profile.jpg"
                  alt="Tanmay"
                  width={320}
                  height={320}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute bottom-3 right-3 w-5 h-5 rounded-full bg-emerald-500 border-2 border-background" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
