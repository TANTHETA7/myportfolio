"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";
import { motion, useSpring } from "framer-motion";

export function ScrollProgress() {
  const progress = useScrollProgress();
  const springProgress = useSpring(progress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left"
      style={{
        scaleX: springProgress,
        background: "linear-gradient(90deg, #8b5cf6, #3b82f6, #06b6d4)",
        transformOrigin: "left",
      }}
    />
  );
}
