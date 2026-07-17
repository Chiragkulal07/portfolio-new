"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { studies } from "@/content/site-config";
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

export function Experience() {
  const shouldReduceMotion = usePrefersReducedMotionSafe();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 80%"]
  });

  return (
    <section id="studies" ref={sectionRef} className="scroll-mt-24 py-20 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <StaggerItem index={0} progress={scrollYProgress} shouldReduceMotion={shouldReduceMotion} className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-accent">
            My Studies
          </p>
          <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Education &amp; achievements that shape my journey.
          </h2>
        </StaggerItem>

        <div className="mt-10 space-y-6">
          {studies.map((item, i) => (
            <StaggerItem key={`${item.role}-${item.company}`} index={i + 1} progress={scrollYProgress} shouldReduceMotion={shouldReduceMotion} className="rounded-3xl border border-border bg-background p-6 shadow-sm transition duration-300 hover:border-accent/50 hover:shadow-[0_8px_30px_hsl(var(--accent)/0.08)]">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">
                    {item.duration}
                  </p>
                  <h3 className="mt-2 font-heading text-2xl font-semibold text-foreground">
                    {item.role}
                  </h3>
                  <p className="mt-2 text-lg text-foreground/80">{item.company}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground/70">
                  <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                  <span>Role {i + 1}</span>
                </div>
              </div>
              <p className="mt-5 max-w-3xl text-base leading-8 text-foreground/80">
                {item.description}
              </p>
            </StaggerItem>
          ))}
        </div>
      </div>
    </section>
  );
}
