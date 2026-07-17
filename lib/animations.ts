"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export const transitionSettings = {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export function usePrefersReducedMotionSafe() {
  const prefersReducedMotion = useReducedMotion();
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    setIsReducedMotion(prefersReducedMotion ?? false);
  }, [prefersReducedMotion]);

  return isReducedMotion;
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
