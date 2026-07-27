"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

interface Options {
  smoothing?: number;
}

export function useMousePosition({ smoothing = 0 }: Options = {}): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  const updatePosition = useCallback(() => {
    if (smoothing > 0) {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * smoothing;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * smoothing;

      setPosition({
        x: currentRef.current.x,
        y: currentRef.current.y,
        normalizedX: (currentRef.current.x / window.innerWidth) * 2 - 1,
        normalizedY: -((currentRef.current.y / window.innerHeight) * 2 - 1),
      });

      rafRef.current = requestAnimationFrame(updatePosition);
    }
  }, [smoothing]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };

      if (smoothing === 0) {
        setPosition({
          x: e.clientX,
          y: e.clientY,
          normalizedX: (e.clientX / window.innerWidth) * 2 - 1,
          normalizedY: -((e.clientY / window.innerHeight) * 2 - 1),
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    if (smoothing > 0) {
      rafRef.current = requestAnimationFrame(updatePosition);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [smoothing, updatePosition]);

  return position;
}
