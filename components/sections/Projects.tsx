"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects as fallbackProjects, Project } from "@/content/site-config";
import { usePrefersReducedMotionSafe } from "@/lib/animations";

function ProjectCard({ project, index, shouldReduceMotion }: { project: Project; index: number; shouldReduceMotion: boolean }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start 96px", "end 96px"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.82]);

  const triggerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: entryProgress } = useScroll({
    target: triggerRef,
    offset: ["start 95%", "center center"]
  });

  const leftX = useTransform(entryProgress, [0, 1], [-28, 0]);
  const rightX = useTransform(entryProgress, [0, 1], [28, 0]);
  const entryOpacity = useTransform(entryProgress, [0, 1], [0, 1]);

  return (
    <div ref={triggerRef}>
      <div ref={wrapperRef} className="sticky top-24 h-auto" style={{ zIndex: index }}>
        <motion.article
          style={{
            scale: shouldReduceMotion ? 1 : scale,
            opacity: shouldReduceMotion ? 1 : opacity,
            transformOrigin: "top center",
          }}
          className="flex flex-col overflow-hidden border border-border bg-background/45 transition-colors duration-300 hover:border-accent lg:h-[480px] lg:flex-row"
        >
          <motion.div 
            className="relative h-64 overflow-hidden border-b border-border bg-muted lg:h-full lg:w-[48%] lg:border-b-0 lg:border-r"
            style={{ x: shouldReduceMotion ? 0 : leftX, opacity: shouldReduceMotion ? 1 : entryOpacity }}
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
            className="flex flex-1 flex-col justify-center p-8 lg:w-[52%] lg:p-12"
            style={{ x: shouldReduceMotion ? 0 : rightX, opacity: shouldReduceMotion ? 1 : entryOpacity }}
          >
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-heading text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
              {project.title}
            </h3>
            {project.featured ? (
              <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-accent">
                Featured
              </span>
            ) : null}
          </div>
          <p className="mt-5 max-w-xl text-base leading-8 text-foreground/70 lg:text-lg">
            {project.description}
          </p>
          <div className="mt-7 flex flex-wrap gap-x-4 gap-y-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="border-b border-border pb-1 text-sm font-medium text-foreground/60"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-6">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="editorial-link inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:text-accent/80"
            >
              Live Preview
              <ArrowUpRight size={18} />
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="editorial-link inline-flex items-center gap-2 text-sm font-semibold text-foreground/70 transition hover:text-foreground"
            >
              GitHub
              <ArrowUpRight size={18} />
            </a>
            </div>
          </motion.div>
        </motion.article>
      </div>
    </div>
  );
}

export function Projects() {
  const [projectList, setProjectList] = useState<Project[]>(fallbackProjects);
  const shouldReduceMotion = usePrefersReducedMotionSafe();
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    async function loadProjects() {
      try {
        const response = await fetch("/api/projects");
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setProjectList(data);
          }
        }
      } catch (err) {
        console.error("Failed to load dynamic projects list, using fallback", err);
      }
    }
    loadProjects();
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <section id="projects" ref={sectionRef} className="scroll-mt-24 overflow-hidden border-b border-border/80 py-20 sm:py-28">
      <motion.div 
        className="mx-auto max-w-6xl"
        style={{
          opacity: shouldReduceMotion ? 1 : opacity,
          scale: shouldReduceMotion ? 1 : scale,
          x: shouldReduceMotion ? 0 : x
        }}
      >
        <div className="mb-14 max-w-2xl">
          <p className="eyebrow">Selected work</p>
          <h2 className="mt-6 font-heading text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-foreground sm:text-5xl">
            Selected work across product, design, and frontend craft.
          </h2>
        </div>

        <div className="relative flex flex-col gap-12 lg:gap-20">
          {projectList.map((project, index) => (
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
