"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import type { HTMLMotionProps } from "framer-motion";

interface MagneticButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  strength?: number;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "glass";
  size?: "sm" | "md" | "lg";
  glowColor?: string;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
}

export function MagneticButton({
  strength = 0.25,
  children,
  variant = "primary",
  size = "md",
  glowColor,
  className,
  as: Tag = "button",
  href,
  target,
  rel,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rafRef = useRef<number | null>(null);
  const currentRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const prefersReducedMotion = usePrefersReducedMotion();

  const animate = useCallback(() => {
    const el = buttonRef.current;
    if (!el) return;

    const ease = 0.12;
    currentRef.current.x += (targetRef.current.x - currentRef.current.x) * ease;
    currentRef.current.y += (targetRef.current.y - currentRef.current.y) * ease;

    el.style.transform = `translate(${currentRef.current.x}px, ${currentRef.current.y}px)`;

    if (
      Math.abs(targetRef.current.x - currentRef.current.x) > 0.05 ||
      Math.abs(targetRef.current.y - currentRef.current.y) > 0.05
    ) {
      rafRef.current = requestAnimationFrame(animate);
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (prefersReducedMotion) return;
      const el = buttonRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      targetRef.current = {
        x: (e.clientX - rect.left - rect.width / 2) * strength,
        y: (e.clientY - rect.top - rect.height / 2) * strength,
      };

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(animate);
    },
    [strength, animate, prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    targetRef.current = { x: 0, y: 0 };
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animate);
  }, [animate]);

  const variants = {
    primary: cn(
      "bg-gradient-to-r from-violet-600 to-blue-600",
      "text-white font-semibold",
      "border border-white/10",
      "shadow-glow-sm-purple",
      "hover:shadow-glow-purple hover:from-violet-500 hover:to-blue-500"
    ),
    secondary: cn(
      "bg-white/[0.08] text-white/90 border border-white/[0.10]",
      "hover:bg-white/[0.12] hover:border-white/20 backdrop-blur-md"
    ),
    ghost: "text-white/70 hover:text-white hover:bg-white/[0.06]",
    glass: cn(
      "bg-white/[0.05] backdrop-blur-xl",
      "border border-white/[0.08]",
      "text-white/80 hover:bg-white/[0.08] hover:border-white/[0.14]"
    ),
  };

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-xl",
    md: "px-6 py-3 text-sm rounded-xl",
    lg: "px-8 py-4 text-base rounded-2xl",
  };

  const commonClass = cn(
    "relative inline-flex items-center justify-center gap-2",
    "transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50",
    "disabled:opacity-50 disabled:pointer-events-none",
    "select-none cursor-none",
    variants[variant],
    sizes[size],
    className
  );

  if (Tag === "a") {
    return (
      <motion.a
        ref={buttonRef as unknown as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        data-cursor="magnetic"
        className={commonClass}
        onMouseMove={handleMouseMove as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        onMouseLeave={handleMouseLeave}
        whileTap={{ scale: 0.96 }}
        style={glowColor ? { boxShadow: `0 0 24px ${glowColor}` } : undefined}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      data-cursor="magnetic"
      className={commonClass}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
      style={glowColor ? { boxShadow: `0 0 24px ${glowColor}` } : undefined}
      {...props}
    >
      {children}
    </motion.button>
  );
}
