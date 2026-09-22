"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { studies } from "@/content/site-config";
import { usePrefersReducedMotionSafe } from "@/lib/animations";

export function Experience() {
  const shouldReduceMotion = usePrefersReducedMotionSafe();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 95%", "center center"]
  });

  const leftX = useTransform(scrollYProgress, [0, 1], [-24, 0]);
  const rightX = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="studies" ref={sectionRef} className="scroll-mt-24 overflow-hidden border-b border-border/80 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div style={{ x: shouldReduceMotion ? 0 : leftX, opacity: shouldReduceMotion ? 1 : opacity }} className="max-w-2xl">
          <p className="eyebrow">Background</p>
          <h2 className="mt-6 font-heading text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-foreground sm:text-5xl">
            Education &amp; achievements that shape my journey.
          </h2>
        </motion.div>

        <div className="mt-12 space-y-0 border-t border-border">
          {studies.map((item, index) => (
            <motion.article 
              key={`${item.role}-${item.company}`} 
              style={{ x: shouldReduceMotion ? 0 : (index % 2 === 0 ? rightX : leftX), opacity: shouldReduceMotion ? 1 : opacity }}
              className="border-b border-border bg-background/20 px-0 py-8 transition-colors duration-300 hover:bg-muted/35 sm:px-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-accent">
                    {item.duration}
                  </p>
                  <h3 className="mt-3 font-heading text-2xl font-semibold tracking-[-0.02em] text-foreground">
                    {item.role}
                  </h3>
                  <p className="mt-2 text-lg text-foreground/65">{item.company}</p>
                </div>
                <div className="font-mono text-xs uppercase tracking-[0.12em] text-foreground/45">
                  0{index + 1}
                </div>
              </div>
              <p className="mt-5 max-w-3xl text-base leading-8 text-foreground/65">
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
