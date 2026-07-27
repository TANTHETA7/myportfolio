"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, MapPin } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { GlassCard } from "@/components/common/GlassCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { linkedinData } from "@/data/linkedin";
import { staggerContainer, staggerItem } from "@/utils/animations";
import { cn } from "@/lib/utils";

export function LinkedInSection() {
  return (
    <section id="linkedin" className="section-padding relative" aria-label="LinkedIn">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 70%, rgba(10,102,194,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="container-wide relative z-10">
        <SectionHeader
          eyebrow="LinkedIn"
          title="Professional "
          highlight="profile"
          description="Connect with me professionally. Let's build something great together."
          className="mb-12"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          <motion.div variants={staggerItem}>
            <GlassCard className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border border-[#0A66C2]/30">
                    <Image
                      src="/images/profile.jpg"
                      alt={linkedinData.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-display font-semibold text-white/90">
                    {linkedinData.name}
                  </h3>
                  <p className="text-sm text-white/50 mt-0.5 leading-relaxed">
                    {linkedinData.headline}
                  </p>
                  <span className="flex items-center gap-1.5 mt-3 text-xs text-white/30 font-mono">
                    <MapPin className="w-3.5 h-3.5" />
                    {linkedinData.location}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/[0.06]">
                <p className="text-sm text-white/45 leading-relaxed">{linkedinData.about}</p>
              </div>

              <div className="mt-6 flex justify-center">
                <a
                  href={linkedinData.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="pointer"
                  className={cn(
                    "inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium",
                    "bg-[#0A66C2]/15 border border-[#0A66C2]/25 text-[#0A66C2]/90",
                    "hover:bg-[#0A66C2]/25 hover:border-[#0A66C2]/40 hover:text-[#0A66C2]",
                    "transition-all duration-200"
                  )}
                >
                  <FaLinkedin className="w-4 h-4" />
                  View LinkedIn Profile
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
