"use client";

import { useReducedMotion } from "framer-motion";

export const transitionSettings = {
  duration: 0.65,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.08,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export function usePrefersReducedMotionSafe() {
  return useReducedMotion() ?? false;
}

export function getMotionProps(isReducedMotion: boolean) {
  return {
    initial: isReducedMotion ? "visible" : "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.2 },
    variants: fadeUp,
    transition: {
      ...transitionSettings,
      duration: isReducedMotion ? 0.01 : transitionSettings.duration,
    },
  };
}
