"use client";

import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/useMediaQuery";

interface Star {
  x: number; // normalized 0-1
  y: number; // normalized 0-1
  radius: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  depth: number; // parallax strength, 0-1
}

const STAR_COUNT = 130;
const MAX_PARALLAX = 34; // px

function buildStars(): Star[] {
  return Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random(),
    y: Math.random(),
    radius: 0.5 + Math.random() * 1.4,
    baseOpacity: 0.25 + Math.random() * 0.55,
    twinkleSpeed: 0.4 + Math.random() * 1.2,
    twinklePhase: Math.random() * Math.PI * 2,
    depth: 0.25 + Math.random() * 0.75,
  }));
}

/**
 * A fixed, full-viewport starfield that drifts subtly with cursor movement
 * (parallax) and twinkles gently over time. Sits behind page content as an
 * ambient background layer.
 */
export function CursorStarfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const stars = buildStars();
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function handleMouseMove(e: MouseEvent) {
      target.x = (e.clientX / width - 0.5) * 2; // -1..1
      target.y = (e.clientY / height - 0.5) * 2;
    }

    let rafId: number;
    let lastTime = 0;

    function draw(time: number) {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      // Ease the parallax offset toward the target for a smooth drift.
      current.x += (target.x - current.x) * 0.05;
      current.y += (target.y - current.y) * 0.05;

      ctx!.clearRect(0, 0, width, height);

      for (const star of stars) {
        const parallaxX = prefersReducedMotion ? 0 : current.x * MAX_PARALLAX * star.depth;
        const parallaxY = prefersReducedMotion ? 0 : current.y * MAX_PARALLAX * star.depth;
        const twinkle = prefersReducedMotion
          ? star.baseOpacity
          : star.baseOpacity *
            (0.7 + 0.3 * Math.sin(star.twinklePhase + (time / 1000) * star.twinkleSpeed));

        ctx!.beginPath();
        ctx!.arc(
          star.x * width + parallaxX,
          star.y * height + parallaxY,
          star.radius,
          0,
          Math.PI * 2
        );
        ctx!.fillStyle = `rgba(255, 255, 255, ${twinkle})`;
        ctx!.fill();
      }

      rafId = requestAnimationFrame(draw);
      void dt;
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10"
    />
  );
}
