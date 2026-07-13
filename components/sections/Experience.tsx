"use client";

import { motion } from "framer-motion";
import { experience } from "@/content/site-config";
import { getMotionProps, staggerContainer, staggerItem, transitionSettings, usePrefersReducedMotionSafe } from "@/lib/animations";

export function Experience() {
  const shouldReduceMotion = usePrefersReducedMotionSafe();
  const motionProps = getMotionProps(shouldReduceMotion);

  return (
    <section id="experience" className="scroll-mt-24 py-20 sm:py-24">
      <motion.div className="mx-auto max-w-6xl" {...motionProps}>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-accent">
            Experience
          </p>
          <h2 className="mt-4 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
            Building products and experiences with thoughtful collaboration.
          </h2>
        </div>

        <motion.div
          className="mt-10 space-y-6"
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          transition={shouldReduceMotion ? { duration: 0.01 } : { ...transitionSettings, staggerChildren: 0.08 }}
        >
          {experience.map((item, index) => (
            <motion.article key={`${item.role}-${item.company}`} className="rounded-3xl border border-border bg-background p-6 shadow-sm" variants={staggerItem}>
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
                  <span>Role {index + 1}</span>
                </div>
              </div>
              <p className="mt-5 max-w-3xl text-base leading-8 text-foreground/80">
                {item.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
