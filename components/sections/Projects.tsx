"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, Project } from "@/content/site-config";
import { usePrefersReducedMotionSafe } from "@/lib/animations";

function ProjectCard({ project, index, shouldReduceMotion }: { project: Project; index: number; shouldReduceMotion: boolean }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start 96px", "end 96px"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  const { scrollYProgress: entryProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "center center"]
  });

  const leftX = useTransform(entryProgress, [0, 1], [-100, 0]);
  const rightX = useTransform(entryProgress, [0, 1], [100, 0]);

  return (
    <div ref={wrapperRef} className="sticky top-24 h-auto" style={{ zIndex: index }}>
      <motion.article
        style={{
          scale: shouldReduceMotion ? 1 : scale,
          opacity: shouldReduceMotion ? 1 : opacity,
          transformOrigin: "top center",
        }}
        className="flex flex-col overflow-hidden rounded-[2rem] border border-border bg-background shadow-md transition-all duration-300 hover:border-accent/50 hover:shadow-[0_15px_40px_hsl(var(--accent)/0.12)] lg:h-[480px] lg:flex-row"
      >
        <motion.div 
          className="relative h-64 overflow-hidden bg-muted lg:h-full lg:w-1/2"
          style={{ x: shouldReduceMotion ? 0 : leftX }}
        >
          <Image
            src={project.imageUrl}
            alt={`${project.title} preview`}
            width={1200}
            height={800}
            className="h-full w-full object-cover transition duration-300 hover:scale-[1.02]"
          />
        </motion.div>
        <motion.div 
          className="flex flex-1 flex-col justify-center p-8 lg:w-1/2 lg:p-12"
          style={{ x: shouldReduceMotion ? 0 : rightX }}
        >
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
              {project.title}
            </h3>
            {project.featured ? (
              <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Featured
              </span>
            ) : null}
          </div>
          <p className="mt-4 text-base leading-8 text-foreground/80 lg:text-lg">
            {project.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-4 py-1.5 text-sm font-medium text-foreground/70"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:text-accent/80"
            >
              Live Preview
              <ArrowUpRight size={18} />
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/80 transition hover:text-foreground"
            >
              GitHub
              <ArrowUpRight size={18} />
            </a>
          </div>
        </motion.div>
      </motion.article>
    </div>
  );
}

export function Projects() {
  const shouldReduceMotion = usePrefersReducedMotionSafe();
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <section id="projects" ref={sectionRef} className="scroll-mt-24 py-20 sm:py-24 overflow-hidden">
      <motion.div 
        className="mx-auto max-w-6xl"
        style={{
          opacity: shouldReduceMotion ? 1 : opacity,
          scale: shouldReduceMotion ? 1 : scale,
          x: shouldReduceMotion ? 0 : x
        }}
      >
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-accent">
            Projects
          </p>
          <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Selected work across product, design, and frontend craft.
          </h2>
        </div>

        <div className="flex flex-col gap-12 lg:gap-24 relative">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              shouldReduceMotion={shouldReduceMotion} 
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
