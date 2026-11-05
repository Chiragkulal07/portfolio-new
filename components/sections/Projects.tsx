"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight, Code2 } from "lucide-react";
import { projects as fallbackProjects, type Project } from "@/content/site-config";
import { usePrefersReducedMotionSafe } from "@/lib/animations";
import { Magnetic, SectionHeading, TiltCard } from "@/components/ui/effects";

const EASE = [0.22, 1, 0.36, 1] as const;

function ProjectCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const reduce = usePrefersReducedMotionSafe();
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "start start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.35, 1]);

  // Earlier cards shrink as later ones stack on top.
  const targetScale = 1 - (total - index - 1) * 0.05;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const num = String(index + 1).padStart(2, "0");

  return (
    <div ref={cardRef} className="relative flex h-auto items-start justify-center lg:sticky lg:top-24 lg:h-[100svh] lg:items-center">
      <motion.div
        style={{ scale: reduce ? 1 : scale, top: `calc(${index * 28}px)` }}
        data-stack
        className="relative w-full origin-top"
      >
        <TiltCard tilt={4} className="gradient-border overflow-hidden rounded-[2rem] bg-surface shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
          <div className="grid lg:h-[560px] lg:grid-cols-[1.15fr_1fr]">
            {/* Image */}
            <div className="relative h-64 overflow-hidden sm:h-80 lg:h-full">
              <motion.div style={{ scale: reduce ? 1 : imageScale }} className="absolute inset-0">
                <Image
                  src={project.imageUrl}
                  alt={`${project.title} preview`}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-tr from-background/70 via-transparent to-accent-2/20" />
              <span className="absolute left-6 top-6 font-heading text-[7rem] font-bold leading-none tracking-[-0.06em] text-outline opacity-80 lg:text-[10rem]">
                {num}
              </span>
            </div>

            {/* Copy */}
            <div className="relative flex flex-col justify-between p-8 sm:p-10 lg:p-12">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/45">
                    Project {num} / {String(total).padStart(2, "0")}
                  </span>
                  {project.featured ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-accent">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Featured
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-8 font-heading text-4xl font-semibold leading-[1] tracking-[-0.04em] sm:text-5xl">
                  {project.title}
                </h3>
                <p className="mt-6 text-base leading-relaxed text-foreground/60">{project.description}</p>
              </div>

              <div>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <motion.li
                      key={tag}
                      initial={{ opacity: 0, scale: 0.6 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, ease: EASE, delay: i * 0.04 }}
                      className="rounded-full border border-foreground/10 bg-foreground/[0.04] px-3 py-1.5 text-xs text-foreground/70"
                    >
                      {tag}
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Magnetic>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background"
                    >
                      <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-accent to-accent-2 transition-transform duration-500 group-hover/btn:scale-x-100" />
                      <span className="relative">Live preview</span>
                      <ArrowUpRight size={16} className="relative transition-transform duration-500 group-hover/btn:rotate-45" />
                    </a>
                  </Magnetic>
                  <Magnetic>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} source on GitHub`}
                      className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-5 py-3 text-sm font-semibold transition-colors hover:border-foreground hover:bg-foreground/5"
                    >
                      <Code2 size={16} /> Source
                    </a>
                  </Magnetic>
                </div>
              </div>
            </div>
          </div>
        </TiltCard>
      </motion.div>
    </div>
  );
}

export function Projects() {
  const [projectList, setProjectList] = useState<Project[]>(fallbackProjects);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  useEffect(() => {
    async function loadProjects() {
      try {
        const response = await fetch("/api/projects");
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) setProjectList(data);
        }
      } catch (err) {
        console.error("Failed to load dynamic projects list, using fallback", err);
      }
    }
    loadProjects();
  }, []);

  return (
    <section id="projects" className="relative scroll-mt-24 py-28 sm:py-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading index="02" eyebrow="Selected work" title="Things I've built" accent="with obsession." />

        <div ref={containerRef} className="relative mt-16 flex flex-col gap-10 lg:mt-8 lg:gap-0">
          {projectList.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              total={projectList.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
