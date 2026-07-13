"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/content/site-config";
import { getMotionProps, staggerContainer, staggerItem, transitionSettings, usePrefersReducedMotionSafe } from "@/lib/animations";

export function Projects() {
  const shouldReduceMotion = usePrefersReducedMotionSafe();
  const motionProps = getMotionProps(shouldReduceMotion);

  return (
    <section id="projects" className="scroll-mt-24 py-20 sm:py-24">
      <motion.div className="mx-auto max-w-6xl" {...motionProps}>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-accent">
            Projects
          </p>
          <h2 className="mt-4 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
            Selected work across product, design, and frontend craft.
          </h2>
        </div>

        <motion.div
          className="mt-10 grid gap-8 lg:grid-cols-2"
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          transition={shouldReduceMotion ? { duration: 0.01 } : { ...transitionSettings, staggerChildren: 0.08 }}
        >
          {projects.map((project) => (
            <motion.article
              key={project.id}
              className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-sm"
              variants={staggerItem}
              whileHover={shouldReduceMotion ? undefined : { scale: 1.01, y: -4 }}
              transition={shouldReduceMotion ? { duration: 0.01 } : transitionSettings}
            >
              <div className="overflow-hidden bg-muted">
                <Image
                  src={project.imageUrl}
                  alt={`${project.title} preview`}
                  width={1200}
                  height={800}
                  className="h-56 w-full object-cover transition duration-300 hover:scale-[1.02]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-heading text-2xl font-semibold text-foreground">
                    {project.title}
                  </h3>
                  {project.featured ? (
                    <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                      Featured
                    </span>
                  ) : null}
                </div>
                <p className="mt-4 flex-1 text-base leading-7 text-foreground/80">
                  {project.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-3 py-1 text-sm text-foreground/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:text-accent/80"
                  >
                    Live Preview
                    <ArrowUpRight size={16} />
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/80 transition hover:text-foreground"
                  >
                    GitHub
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
