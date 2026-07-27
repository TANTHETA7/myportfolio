"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { siteConfig, gmailComposeUrl } from "@/config/site";
import { cn } from "@/lib/utils";
import { scrollToSection } from "@/hooks/useLenis";
import { staggerContainer, fadeInUp } from "@/utils/animations";

const footerLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const socialIcons = [
  { Icon: FiGithub, href: siteConfig.github.url, label: "GitHub" },
  { Icon: FiLinkedin, href: siteConfig.linkedin.url, label: "LinkedIn" },
  { Icon: SiLeetcode, href: siteConfig.leetcode.url, label: "LeetCode" },
  { Icon: FiMail, href: gmailComposeUrl(), label: "Email" },
];

export function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/[0.05] overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(139,92,246,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="container-wide py-16 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12"
        >
          {/* Brand */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500/30 to-blue-500/30 border border-white/10 flex items-center justify-center">
                <span className="text-xs font-bold font-mono text-white/80">T</span>
              </div>
              <span className="font-display font-semibold text-white/90 tracking-tight">
                Tanmay
              </span>
            </div>
            <p className="text-sm text-white/35 leading-relaxed max-w-xs">
              Building intelligent systems where AI meets hardware. CS & Data Science student passionate about the future.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={fadeInUp}>
            <p className="text-xs font-mono tracking-widest uppercase text-white/25 mb-4">
              Navigate
            </p>
            <nav className="flex flex-col gap-2" aria-label="Footer navigation">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href.replace("#", ""), -80);
                  }}
                  className="text-sm text-white/40 hover:text-white/80 transition-colors duration-200 w-fit"
                  data-cursor="pointer"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Social */}
          <motion.div variants={fadeInUp}>
            <p className="text-xs font-mono tracking-widest uppercase text-white/25 mb-4">
              Connect
            </p>
            <div className="flex flex-wrap gap-3">
              {socialIcons.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center",
                    "bg-white/[0.05] border border-white/[0.07]",
                    "text-white/40 hover:text-white/80",
                    "hover:bg-white/[0.08] hover:border-white/[0.12]",
                    "transition-all duration-200"
                  )}
                  data-cursor="pointer"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.05]"
        >
          <p className="text-xs text-white/20 font-mono">
            © {new Date().getFullYear()} Tanmay. Built with Next.js & ♥
          </p>

          <button
            onClick={handleScrollToTop}
            aria-label="Back to top"
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-xs text-white/30",
              "bg-white/[0.03] border border-white/[0.06]",
              "hover:bg-white/[0.07] hover:text-white/60 hover:border-white/[0.10]",
              "transition-all duration-200"
            )}
            data-cursor="pointer"
          >
            <ArrowUp className="w-3 h-3" />
            Back to top
          </button>
        </motion.div>
      </div>
    </footer>
  );
}
