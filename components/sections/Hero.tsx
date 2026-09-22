"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { personalInfo, socialLinks } from "@/content/site-config";
import { staggerContainer, staggerItem, transitionSettings, usePrefersReducedMotionSafe } from "@/lib/animations";

export function Hero() {
  const shouldReduceMotion = usePrefersReducedMotionSafe();
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section ref={heroRef} id="hero" className="relative scroll-mt-24 border-b border-border/80 py-12 sm:py-20 lg:py-28">
      <motion.div
        className="mx-auto grid max-w-6xl gap-12 sm:gap-16 lg:grid-cols-[1.25fr_0.75fr] lg:items-end"
        initial={shouldReduceMotion ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        transition={shouldReduceMotion ? { duration: 0.01 } : { ...transitionSettings, delayChildren: 0.05, staggerChildren: 0.08 }}
      >
        <motion.div 
          className="flex flex-col justify-center" 
            initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.p className="eyebrow" variants={staggerItem}>
            Full-stack developer
          </motion.p>
          <motion.h1 className="mt-6 max-w-3xl font-heading text-5xl font-semibold leading-[0.94] tracking-[-0.055em] text-foreground sm:mt-7 sm:text-7xl lg:text-[7.5rem]" variants={staggerItem}>
            {personalInfo.name}
          </motion.h1>
          <motion.p className="mt-7 max-w-xl text-lg font-medium leading-7 text-foreground/75 sm:text-xl" variants={staggerItem}>
            {personalInfo.title}
          </motion.p>
          <motion.p className="mt-5 max-w-xl text-base leading-8 text-foreground/65 sm:text-lg" variants={staggerItem}>
            {personalInfo.tagline}
          </motion.p>
          <motion.div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap" variants={staggerItem}>
            <motion.div whileHover={shouldReduceMotion ? undefined : { y: -2 }}>
              <Link
                href="#projects"
                className="inline-flex w-full items-center justify-center gap-3 bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:w-auto"
              >
                View Projects
                <ArrowRight size={18} />
              </Link>
            </motion.div>
            <motion.div whileHover={shouldReduceMotion ? undefined : { y: -2 }}>
              <Link
                href="#contact"
                className="inline-flex w-full items-center justify-center border border-foreground/25 px-6 py-3 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:w-auto"
              >
                Let&apos;s Connect
              </Link>
            </motion.div>
          </motion.div>
          <motion.div className="mt-9 flex flex-wrap gap-x-5 gap-y-2" variants={staggerItem}>
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit ${link.label} profile`}
                className="editorial-link text-sm font-medium text-foreground/65 transition hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                whileHover={shouldReduceMotion ? undefined : { y: -1 }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div className="flex items-center justify-center lg:justify-end" variants={staggerItem}>
          <motion.div 
            className="relative aspect-square w-full max-w-[18rem] rounded-full border border-border bg-muted p-2 shadow-[12px_12px_0_hsl(var(--accent)/0.16)] sm:max-w-sm"
            initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <Image
              src="/images/profile.png"
              alt="Portrait placeholder illustration for Chirag"
              width={640}
              height={760}
              priority
              className="h-full w-full rounded-full object-cover"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
