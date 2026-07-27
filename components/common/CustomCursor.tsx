"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsMobile } from "@/hooks/useMediaQuery";

export function CustomCursor() {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMagnetic, setIsMagnetic] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const dotX = useSpring(cursorX, { ...springConfig, damping: 40, stiffness: 500 });
  const dotY = useSpring(cursorY, { ...springConfig, damping: 40, stiffness: 500 });
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  const rafRef = useRef<number | null>(null);
  const posRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (isMobile) return;

    const updatePosition = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        cursorX.set(posRef.current.x);
        cursorY.set(posRef.current.y);
      });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handlePointerDetection = () => {
      const target = document.elementFromPoint(posRef.current.x, posRef.current.y);
      if (!target) return;
      const isClickable =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[data-cursor='pointer']") ||
        window.getComputedStyle(target).cursor === "pointer";
      setIsPointer(!!isClickable);
      setIsMagnetic(!!target.closest("[data-cursor='magnetic']"));
    };

    window.addEventListener("mousemove", updatePosition, { passive: true });
    window.addEventListener("mousemove", handlePointerDetection, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mousemove", handlePointerDetection);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile, cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="pointer-events-none fixed z-[9999] mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.5 : isPointer ? 1.5 : 1,
        }}
        transition={{ duration: 0.15 }}
      >
        <div className="h-2 w-2 rounded-full bg-white" />
      </motion.div>

      {/* Ring */}
      <motion.div
        className="pointer-events-none fixed z-[9998]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.8 : isPointer ? 1.8 : isMagnetic ? 2.2 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="rounded-full border"
          style={{
            width: "40px",
            height: "40px",
            borderColor: isPointer
              ? "rgba(139, 92, 246, 0.6)"
              : "rgba(255, 255, 255, 0.3)",
            backdropFilter: isPointer ? "blur(2px)" : "none",
            background: isPointer ? "rgba(139, 92, 246, 0.08)" : "transparent",
            transition: "border-color 0.2s, background 0.2s",
          }}
        />
      </motion.div>
    </>
  );
}
