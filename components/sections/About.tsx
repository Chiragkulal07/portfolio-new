"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { personalInfo } from "@/content/site-config";
import { getMotionProps, usePrefersReducedMotionSafe } from "@/lib/animations";

export function About() {
  const shouldReduceMotion = usePrefersReducedMotionSafe();
  const motionProps = getMotionProps(shouldReduceMotion);

  return (
    <section id="about" className="scroll-mt-24 py-20 sm:py-24">
      <motion.div
        className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center"
        {...motionProps}
      >
        <div className="flex justify-center lg:justify-start">
          <div className="w-full max-w-sm overflow-hidden rounded-3xl border border-border bg-muted p-3 shadow-sm">
            <Image
              src="/images/profile-placeholder.svg"
              alt="Decorative portrait placeholder for Chirag"
              width={640}
              height={760}
              className="h-auto w-full rounded-[1.4rem] object-cover"
            />
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-accent">
            About
          </p>
          <h2 className="mt-4 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
            Designing thoughtfully, building deliberately.
          </h2>
          <p className="mt-6 text-lg leading-8 text-foreground/80">
            {personalInfo.bio}
          </p>
          <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-border bg-background/70 p-6 sm:flex-row sm:items-center sm:justify-between">
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
              className="inline-flex items-center justify-center rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              View Resume
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
