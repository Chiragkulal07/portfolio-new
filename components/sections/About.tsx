"use client";

import Link from "next/link";
import Image from "next/image";
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
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="about" ref={sectionRef} className="scroll-mt-24 overflow-hidden border-b border-border/80 py-16 sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 sm:gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:gap-20">
        <motion.div
          className="flex justify-center lg:justify-start"
          style={{ x: shouldReduceMotion ? 0 : leftX, opacity: shouldReduceMotion ? 1 : opacity }}
        >
          <div className="aspect-square w-full max-w-[16rem] overflow-hidden rounded-full border border-border bg-muted p-2 shadow-[10px_10px_0_hsl(var(--foreground)/0.08)] sm:max-w-sm">
            <Image
              src="/images/profile.png"
              alt="Portrait of Chirag"
              width={640}
              height={760}
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        </motion.div>

        <motion.div style={{ opacity: shouldReduceMotion ? 1 : opacity }} className="max-w-3xl">
          <p className="eyebrow">About</p>
          <h2 className="mt-6 max-w-2xl font-heading text-3xl font-semibold leading-[1.08] tracking-[-0.035em] text-foreground sm:text-5xl">
            Building real-time systems and AI-powered experiences.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/70">
            {personalInfo.bio}
          </p>
          <div className="mt-10 flex flex-col gap-5 border-y border-border py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.14em] text-foreground/50">
                Based in
              </p>
              <p className="mt-1 text-base font-semibold text-foreground">
                {personalInfo.location}
              </p>
            </div>
            <Link
              href={personalInfo.resumeUrl}
              className="editorial-link inline-flex items-center justify-center py-3 text-sm font-semibold text-foreground transition hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              View Resume
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
