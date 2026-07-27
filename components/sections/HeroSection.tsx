"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { toast } from "sonner";
import { siteConfig } from "@/config/site";
import { scrollToSection } from "@/hooks/useLenis";
import { staggerContainer, fadeInUp, fadeInRight } from "@/utils/animations";
import { cn } from "@/lib/utils";

const socialLinks = [
  { Icon: Mail, href: `mailto:${siteConfig.email}`, label: "Email", isEmail: true },
  { Icon: FiGithub, href: siteConfig.github.url, label: "GitHub" },
  { Icon: FiLinkedin, href: siteConfig.linkedin.url, label: "LinkedIn" },
  { Icon: SiLeetcode, href: siteConfig.leetcode.url, label: "LeetCode" },
];

function copyEmail() {
  navigator.clipboard?.writeText(siteConfig.email).catch(() => {});
  toast.success("Email copied to clipboard", { description: siteConfig.email });
}

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
              Problem Solver <span className="text-white/20">|</span> AI &amp; Embedded Systems{" "}
              <span className="text-white/20">|</span> Building Intelligent Hardware
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="space-y-4 text-white/45 leading-relaxed text-[15px] md:text-base max-w-xl mb-8"
            >
              <p>I build intelligent systems that connect software with the real world.</p>
              <p>
                My interests span Artificial Intelligence, Embedded Systems, Computer Vision, and Full-Stack Development. I enjoy tackling complex engineering challenges, building hardware prototypes, and transforming ideas into reliable, real-world solutions.
              </p>
              <p>I don&apos;t just write code—I design systems, solve problems, and build technology that creates impact.</p>
            </motion.div>

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
              {socialLinks.map(({ Icon, href, label, isEmail }) => (
                <a
                  key={label}
                  href={href}
                  target={isEmail ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  data-cursor="pointer"
                  onClick={isEmail ? () => copyEmail() : undefined}
                  className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center",
                    "bg-white/[0.04] border border-white/[0.07] text-white/40",
                    "hover:text-white/80 hover:bg-white/[0.08] transition-all duration-200"
                  )}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
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
