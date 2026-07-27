"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  variant?: "words" | "chars" | "lines";
  once?: boolean;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

export function AnimatedText({
  text,
  className,
  delay = 0,
  stagger = 0.04,
  variant = "words",
  once = true,
  tag: Tag = "div",
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<HTMLElement>, { once, amount: 0.3 });

  if (variant === "words") {
    const words = text.split(" ");

    return (
      <Tag
        ref={ref as React.RefObject<HTMLElement> & React.RefObject<HTMLDivElement>}
        className={cn("overflow-hidden", className)}
        aria-label={text}
      >
        <span className="sr-only">{text}</span>
        <span className="flex flex-wrap gap-x-[0.3em] gap-y-0" aria-hidden="true">
          {words.map((word, i) => (
            <span key={i} className="overflow-hidden inline-block">
              <motion.span
                className="inline-block"
                initial={{ y: "110%", opacity: 0 }}
                animate={inView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
                transition={{
                  duration: 0.7,
                  delay: delay + i * stagger,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </span>
      </Tag>
    );
  }

  if (variant === "chars") {
    const chars = text.split("");

    return (
      <Tag
        ref={ref as React.RefObject<HTMLElement> & React.RefObject<HTMLDivElement>}
        className={cn("overflow-hidden", className)}
        aria-label={text}
      >
        <span className="sr-only">{text}</span>
        <span aria-hidden="true">
          {chars.map((char, i) => (
            <span key={i} className="overflow-hidden inline-block">
              <motion.span
                className="inline-block"
                initial={{ y: "110%", opacity: 0 }}
                animate={inView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
                transition={{
                  duration: 0.5,
                  delay: delay + i * (stagger / 2),
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {char === " " ? " " : char}
              </motion.span>
            </span>
          ))}
        </span>
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement> & React.RefObject<HTMLDivElement>}
      className={cn("overflow-hidden", className)}
    >
      <motion.span
        className="block"
        initial={{ y: "100%", opacity: 0 }}
        animate={inView ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {text}
      </motion.span>
    </Tag>
  );
}
