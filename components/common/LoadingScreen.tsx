"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "complete">("loading");

  useEffect(() => {
    const duration = 1800;
    const interval = 20;
    const steps = duration / interval;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      const ease = 1 - Math.pow(1 - current / steps, 3);
      setProgress(Math.round(ease * 100));

      if (current >= steps) {
        clearInterval(timer);
        setPhase("complete");
        setTimeout(() => setIsLoading(false), 600);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
          style={{ backgroundColor: "#030305" }}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: "blur(12px)",
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          {/* Background subtle glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(139,92,246,0.08) 0%, transparent 70%)",
            }}
          />

          {/* Logo mark */}
          <motion.div
            className="relative mb-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative flex items-center justify-center w-20 h-20">
              {/* Outer ring */}
              <motion.div
                className="absolute inset-0 rounded-full border border-white/10"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, ease: "linear", repeat: Infinity }}
              />
              {/* Inner ring */}
              <motion.div
                className="absolute inset-2 rounded-full border border-violet-500/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 5, ease: "linear", repeat: Infinity }}
              />
              {/* Center dot */}
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-violet-400 to-blue-400 shadow-[0_0_20px_rgba(139,92,246,0.8)]" />
            </div>
          </motion.div>

          {/* Name */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-display text-2xl font-semibold tracking-tight text-white/90 mb-1">
              Tanmay
            </h1>
            <p className="text-sm text-white/30 font-mono tracking-widest uppercase">
              AI Engineer
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="w-48 h-px bg-white/5 relative overflow-hidden rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #8b5cf6, #3b82f6, #06b6d4)",
                width: `${progress}%`,
                transition: "width 0.02s linear",
              }}
            />
          </motion.div>

          {/* Progress number */}
          <motion.p
            className="mt-3 text-xs font-mono text-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {phase === "complete" ? "Ready" : `${progress}%`}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
