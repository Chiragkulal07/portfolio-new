"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { skills } from "@/content/site-config";
import { staggerContainer, staggerItem, transitionSettings, usePrefersReducedMotionSafe } from "@/lib/animations";

export function Skills() {
  const shouldReduceMotion = usePrefersReducedMotionSafe();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 95%", "center center"]
  });

  const leftX = useTransform(scrollYProgress, [0, 1], [-100, 0]);
  const rightX = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="skills" ref={sectionRef} className="scroll-mt-24 py-20 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <motion.div style={{ x: shouldReduceMotion ? 0 : leftX, opacity: shouldReduceMotion ? 1 : opacity }} className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-accent">
            Skills
          </p>
          <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            A blend of visual, technical, and product-focused capabilities.
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {skills.map((group, index) => (
            <motion.div 
              key={group.category} 
              style={{ x: shouldReduceMotion ? 0 : (index % 2 === 0 ? rightX : leftX), opacity: shouldReduceMotion ? 1 : opacity }} 
              className="rounded-3xl border border-border bg-background p-6 shadow-sm transition duration-300 hover:border-accent/50 hover:shadow-[0_8px_30px_hsl(var(--accent)/0.08)]"
            >
              <h3 className="font-heading text-xl font-semibold text-foreground">
                {group.category}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border bg-muted px-3 py-2 text-sm text-foreground/80"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
