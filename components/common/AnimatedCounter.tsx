"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  delay?: number;
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function AnimatedCounter({
  target,
  duration = 1800,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  delay = 0,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;

    const run = () => {
      const timeout = setTimeout(() => {
        started.current = true;
        const animate = (ts: number) => {
          if (!startRef.current) startRef.current = ts;
          const elapsed = ts - startRef.current;
          const progress = Math.min(elapsed / duration, 1);
          const eased = easeOutExpo(progress);
          setCount(parseFloat((eased * target).toFixed(decimals)));

          if (progress < 1) {
            rafRef.current = requestAnimationFrame(animate);
          } else {
            setCount(target);
          }
        };
        rafRef.current = requestAnimationFrame(animate);
      }, delay);

      return () => clearTimeout(timeout);
    };

    const cleanup = run();
    return () => {
      cleanup?.();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [inView, target, duration, decimals, delay]);

  const formatted =
    decimals > 0
      ? count.toFixed(decimals)
      : count >= 1000
      ? count.toLocaleString()
      : String(Math.round(count));

  return (
    <span ref={ref} className={className} aria-label={`${prefix}${target}${suffix}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
