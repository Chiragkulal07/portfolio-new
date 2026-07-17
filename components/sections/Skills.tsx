"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { skills } from "@/content/site-config";
import { staggerContainer, staggerItem, transitionSettings, usePrefersReducedMotionSafe } from "@/lib/animations";

function StaggerItem({ children, index, progress, shouldReduceMotion, className }: { children: React.ReactNode, index: number, progress: any, shouldReduceMotion: boolean, className?: string }) {
  const start = index * 0.15;
  const end = Math.min(start + 0.5, 1);
  const y = useTransform(progress, [start, end], [60, 0]);
  const opacity = useTransform(progress, [start, end], [0, 1]);

  return (
    <motion.div className={className} style={{ y: shouldReduceMotion ? 0 : y, opacity: shouldReduceMotion ? 1 : opacity }}>
      {children}
    </motion.div>
  );
}

export function Skills() {
  const shouldReduceMotion = usePrefersReducedMotionSafe();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 80%"]
  });

  return (
    <section id="skills" ref={sectionRef} className="scroll-mt-24 py-20 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <StaggerItem index={0} progress={scrollYProgress} shouldReduceMotion={shouldReduceMotion} className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-accent">
            Skills
          </p>
          <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            A blend of visual, technical, and product-focused capabilities.
          </h2>
        </StaggerItem>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {skills.map((group, i) => (
            <StaggerItem key={group.category} index={i + 1} progress={scrollYProgress} shouldReduceMotion={shouldReduceMotion} className="rounded-3xl border border-border bg-background p-6 shadow-sm transition duration-300 hover:border-accent/50 hover:shadow-[0_8px_30px_hsl(var(--accent)/0.08)]">
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
            </StaggerItem>
          ))}
        </div>
      </div>
    </section>
  );
}
