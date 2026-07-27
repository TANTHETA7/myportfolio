import type { Variants, Transition } from "framer-motion";

export const transitions = {
  spring: {
    type: "spring",
    stiffness: 300,
    damping: 30,
  } satisfies Transition,
  springBounce: {
    type: "spring",
    stiffness: 400,
    damping: 20,
    mass: 0.8,
  } satisfies Transition,
  smooth: {
    duration: 0.6,
    ease: [0.16, 1, 0.3, 1],
  } satisfies Transition,
  fast: {
    duration: 0.3,
    ease: [0.16, 1, 0.3, 1],
  } satisfies Transition,
  slow: {
    duration: 1.2,
    ease: [0.16, 1, 0.3, 1],
  } satisfies Transition,
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.smooth },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transitions.smooth },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0, transition: transitions.smooth },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: transitions.smooth },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: transitions.smooth },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: transitions.springBounce },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.smooth,
  },
};

export const slideInFromBottom: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...transitions.slow, delay: 0.2 },
  },
};

export const glassCardHover = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
  },
  hover: {
    scale: 1.02,
    y: -4,
    boxShadow: "0 24px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.12)",
    transition: transitions.spring,
  },
};

export const magneticButton = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: transitions.spring },
  tap: { scale: 0.96, transition: transitions.fast },
};

export const textReveal: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { ...transitions.smooth, duration: 0.8 },
  },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)", scale: 0.96 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: transitions.smooth,
  },
};

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20, filter: "blur(8px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { ...transitions.smooth, duration: 0.7 },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: "blur(4px)",
    transition: { duration: 0.3, ease: "easeIn" },
  },
};
