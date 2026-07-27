"use client";

import { useRef, useCallback } from "react";

interface MagneticOptions {
  strength?: number;
  ease?: number;
}

export function useMagneticEffect<T extends HTMLElement = HTMLButtonElement>(
  options: MagneticOptions = {}
) {
  const { strength = 0.3, ease = 0.15 } = options;
  const elementRef = useRef<T>(null);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  const animate = useCallback(() => {
    const el = elementRef.current;
    if (!el) return;

    currentRef.current.x += (targetRef.current.x - currentRef.current.x) * ease;
    currentRef.current.y += (targetRef.current.y - currentRef.current.y) * ease;

    el.style.transform = `translate(${currentRef.current.x}px, ${currentRef.current.y}px)`;

    if (
      Math.abs(targetRef.current.x - currentRef.current.x) > 0.01 ||
      Math.abs(targetRef.current.y - currentRef.current.y) > 0.01
    ) {
      rafRef.current = requestAnimationFrame(animate);
    }
  }, [ease]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      const el = elementRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      targetRef.current = {
        x: (e.clientX - centerX) * strength,
        y: (e.clientY - centerY) * strength,
      };

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(animate);
    },
    [strength, animate]
  );

  const handleMouseLeave = useCallback(() => {
    targetRef.current = { x: 0, y: 0 };
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animate);
  }, [animate]);

  return { ref: elementRef, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave };
}
