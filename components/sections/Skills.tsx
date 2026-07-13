"use client";

import { motion } from "framer-motion";
import { skills } from "@/content/site-config";
import { getMotionProps, staggerContainer, staggerItem, transitionSettings, usePrefersReducedMotionSafe } from "@/lib/animations";

export function Skills() {
  const shouldReduceMotion = usePrefersReducedMotionSafe();
  const motionProps = getMotionProps(shouldReduceMotion);

  return (
    <section id="skills" className="scroll-mt-24 py-20 sm:py-24">
      <motion.div className="mx-auto max-w-6xl" {...motionProps}>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-accent">
            Skills
          </p>
          <h2 className="mt-4 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
            A blend of visual, technical, and product-focused capabilities.
          </h2>
        </div>

        <motion.div
          className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          transition={shouldReduceMotion ? { duration: 0.01 } : { ...transitionSettings, staggerChildren: 0.08 }}
        >
          {skills.map((group) => (
            <motion.div key={group.category} className="rounded-3xl border border-border bg-background p-6 shadow-sm" variants={staggerItem}>
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
        </motion.div>
      </motion.div>
    </section>
  );
}
