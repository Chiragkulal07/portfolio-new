"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { skills } from "@/content/site-config";
import { usePrefersReducedMotionSafe } from "@/lib/animations";

export function Skills() {
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
    <section id="skills" ref={sectionRef} className="scroll-mt-24 overflow-hidden border-b border-border/80 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div style={{ x: shouldReduceMotion ? 0 : leftX, opacity: shouldReduceMotion ? 1 : opacity }} className="max-w-2xl">
          <p className="eyebrow">Capabilities</p>
          <h2 className="mt-6 font-heading text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-foreground sm:text-5xl">
            A blend of visual, technical, and product-focused capabilities.
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-px border border-border bg-border md:grid-cols-2 xl:grid-cols-3">
          {skills.map((group, index) => (
            <motion.div 
              key={group.category} 
              style={{ x: shouldReduceMotion ? 0 : (index % 2 === 0 ? rightX : leftX), opacity: shouldReduceMotion ? 1 : opacity }} 
              className="bg-background p-7 transition-colors duration-300 hover:bg-muted/45"
            >
              <h3 className="font-heading text-2xl font-semibold tracking-[-0.02em] text-foreground">
                {group.category}
              </h3>
              <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border-b border-border pb-1 text-sm text-foreground/65"
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
