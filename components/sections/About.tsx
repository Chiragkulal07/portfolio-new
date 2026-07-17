"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { personalInfo } from "@/content/site-config";
import { usePrefersReducedMotionSafe } from "@/lib/animations";

export function About() {
  const shouldReduceMotion = usePrefersReducedMotionSafe();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 95%", "center center"]
  });

  const leftX = useTransform(scrollYProgress, [0, 1], [-100, 0]);
  const rightX = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="about" ref={sectionRef} className="scroll-mt-24 py-20 sm:py-24 overflow-hidden">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
        <motion.div 
          className="flex justify-center lg:justify-start"
          style={{ x: shouldReduceMotion ? 0 : leftX, opacity: shouldReduceMotion ? 1 : opacity }}
        >
          <div className="w-full max-w-sm overflow-hidden rounded-3xl border border-border bg-muted p-3 shadow-sm">
            <Image
              src="/images/profile.png"
              alt="Decorative portrait placeholder for Chirag"
              width={640}
              height={760}
              className="h-auto w-full rounded-[1.4rem] object-cover"
            />
          </div>
        </motion.div>

        <motion.div style={{ x: shouldReduceMotion ? 0 : rightX, opacity: shouldReduceMotion ? 1 : opacity }}>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-accent">
            About
          </p>
          <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Designing thoughtfully, building deliberately.
          </h2>
          <p className="mt-6 text-lg leading-8 text-foreground/80">
            {personalInfo.bio}
          </p>
          <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-border bg-background/70 p-6 transition hover:border-accent/50 hover:shadow-[0_8px_30px_hsl(var(--accent)/0.08)] sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-foreground/60">
                Based in
              </p>
              <p className="mt-1 text-lg font-semibold text-foreground">
                {personalInfo.location}
              </p>
            </div>
            <Link
              href={personalInfo.resumeUrl}
              className="inline-flex items-center justify-center rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent hover:shadow-[0_0_15px_hsl(var(--accent)/0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              View Resume
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
