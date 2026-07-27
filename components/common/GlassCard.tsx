"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "elevated" | "subtle" | "bordered";
  hover?: boolean;
  glow?: "none" | "purple" | "blue" | "cyan";
  children: React.ReactNode;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      variant = "default",
      hover = false,
      glow = "none",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      default: "bg-white/[0.04] border border-white/[0.07] backdrop-blur-xl",
      elevated: "bg-white/[0.06] border border-white/[0.10] backdrop-blur-2xl shadow-card-lift",
      subtle: "bg-white/[0.02] border border-white/[0.04] backdrop-blur-lg",
      bordered: "bg-white/[0.03] border border-white/[0.12] backdrop-blur-xl",
    };

    const glows = {
      none: "",
      purple: "shadow-glow-sm-purple",
      blue: "shadow-glow-sm-blue",
      cyan: "shadow-[0_0_20px_rgba(6,182,212,0.25)]",
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "rounded-2xl",
          variants[variant],
          glows[glow],
          hover && "transition-all duration-300 ease-spring-smooth hover:-translate-y-1 hover:bg-white/[0.07] hover:border-white/[0.12] hover:shadow-glass-hover",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = "GlassCard";
