"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { GraduationCap, Trophy } from "lucide-react";
import { studies } from "@/content/site-config";
import { usePrefersReducedMotionSafe } from "@/lib/animations";
import { SectionHeading, TiltCard } from "@/components/ui/effects";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Experience() {
  const reduce = usePrefersReducedMotionSafe();
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section id="studies" className="relative scroll-mt-24 overflow-x-clip py-28 sm:py-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading index="04" eyebrow="Journey" title="Education &" accent="milestones." />

        <div ref={listRef} className="relative mt-20">
          {/* Timeline rail */}
          <div className="absolute bottom-0 left-5 top-0 w-px bg-foreground/10 md:left-1/2" />
          <motion.div
            aria-hidden
            style={{ scaleY: reduce ? 1 : lineScale }}
            className="absolute bottom-0 left-5 top-0 w-px origin-top bg-gradient-to-b from-accent via-accent-2 to-accent-3 shadow-[0_0_20px_hsl(var(--accent))] md:left-1/2"
          />

          <div className="space-y-16">
            {studies.map((item, index) => {
              const left = index % 2 === 0;
              const Icon = /hackathon/i.test(item.role) ? Trophy : GraduationCap;
              return (
                <div key={`${item.role}-${item.company}`} className="relative grid md:grid-cols-2 md:gap-20">
                  {/* Node */}
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="absolute left-5 top-8 z-10 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full border border-accent/50 bg-background text-accent shadow-[0_0_30px_hsl(var(--accent)/0.5)] md:left-1/2"
                  >
                    <Icon size={16} />
                  </motion.span>

                  <motion.div
                    className={`pl-14 md:pl-0 ${left ? "md:col-start-1" : "md:col-start-2"}`}
                    initial={{ opacity: 0, x: reduce ? 0 : left ? -80 : 80, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 1, ease: EASE }}
                  >
                    <TiltCard className="gradient-border rounded-3xl bg-surface/70 p-8">
                      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{item.duration}</p>
                      <h3 className="mt-4 font-heading text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                        {item.role}
                      </h3>
                      <p className="mt-2 font-serif text-xl italic text-foreground/70">{item.company}</p>
                      <p className="mt-5 leading-relaxed text-foreground/55">{item.description}</p>
                    </TiltCard>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
