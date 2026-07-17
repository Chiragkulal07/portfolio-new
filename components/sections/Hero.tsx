"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { personalInfo, socialLinks } from "@/content/site-config";
import { staggerContainer, staggerItem, transitionSettings, usePrefersReducedMotionSafe } from "@/lib/animations";

export function Hero() {
  const shouldReduceMotion = usePrefersReducedMotionSafe();
  const heroRef = useRef<HTMLElement>(null);

  // Removed useScroll entry animation because Hero is at the top of the page.
  // Scroll-linked entry only works if you can scroll *down* to the element.

  return (
    <section ref={heroRef} id="hero" className="relative scroll-mt-24 pt-8 pb-16 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24">
      {/* Background Depth Layers */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--accent)/0.15),_transparent_50%)]"></div>
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.03] dark:opacity-[0.05]"></div>
      <motion.div
        className="mx-auto grid max-w-6xl gap-12 rounded-3xl border border-border/70 bg-background/80 p-8 shadow-sm backdrop-blur sm:p-10 lg:grid-cols-[1.3fr_0.7fr] lg:p-14"
        initial={shouldReduceMotion ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        transition={shouldReduceMotion ? { duration: 0.01 } : { ...transitionSettings, delayChildren: 0.05, staggerChildren: 0.08 }}
      >
        <motion.div 
          className="flex flex-col justify-center" 
          initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.p className="text-sm font-semibold uppercase tracking-[0.35em] text-accent" variants={staggerItem}>
            Portfolio
          </motion.p>
          <motion.h1 className="mt-4 font-heading text-5xl font-bold tracking-tighter leading-tight text-foreground sm:text-6xl lg:text-7xl" variants={staggerItem}>
            {personalInfo.name}
          </motion.h1>
          <motion.p className="mt-4 max-w-2xl text-lg text-muted-foreground sm:text-xl" variants={staggerItem}>
            {personalInfo.title}
          </motion.p>
          <motion.p className="mt-6 max-w-2xl text-base leading-8 text-foreground/80 sm:text-lg" variants={staggerItem}>
            {personalInfo.tagline}
          </motion.p>
          <motion.div className="mt-8 flex flex-col gap-3 sm:flex-row" variants={staggerItem}>
            <motion.div whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}>
              <Link
                href="#projects"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent/90 hover:shadow-[0_0_25px_hsl(var(--accent)/0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                View Projects
                <ArrowRight size={18} />
              </Link>
            </motion.div>
            <motion.div whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent hover:shadow-[0_0_15px_hsl(var(--accent)/0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                Let&apos;s Connect
              </Link>
            </motion.div>
          </motion.div>
          <motion.div className="mt-8 flex flex-wrap gap-3" variants={staggerItem}>
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit ${link.label} profile`}
                className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground/80 transition hover:border-accent hover:text-accent hover:shadow-[0_0_15px_hsl(var(--accent)/0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div className="flex items-center justify-center" variants={staggerItem}>
          <motion.div 
            className="w-full max-w-sm overflow-hidden rounded-3xl border border-border bg-muted p-4 shadow-sm"
            initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <Image
              src="/images/profile.png"
              alt="Portrait placeholder illustration for Chirag"
              width={640}
              height={760}
              priority
              className="h-auto w-full rounded-2xl object-cover"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
