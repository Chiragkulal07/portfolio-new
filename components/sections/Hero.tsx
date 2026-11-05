"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, type MouseEvent } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { personalInfo, socialLinks } from "@/content/site-config";
import { usePrefersReducedMotionSafe } from "@/lib/animations";
import { Magnetic, RotatingWords } from "@/components/ui/effects";

const EASE = [0.22, 1, 0.36, 1] as const;
// Starts after the preloader curtain lifts.
const INTRO = 2.1;

const roles = ["Full-Stack Developer", "Real-Time Systems", "AI Experiences", "Product Engineer"];

export function Hero() {
  const reduce = usePrefersReducedMotionSafe();
  const heroRef = useRef<HTMLElement>(null);
  const intro = reduce ? 0 : INTRO;

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const nameY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  // Mouse parallax
  const px = useSpring(0, { stiffness: 60, damping: 18 });
  const py = useSpring(0, { stiffness: 60, damping: 18 });
  const portraitX = useTransform(px, (v) => v * 30);
  const portraitY = useTransform(py, (v) => v * 30);
  const badgeX = useTransform(px, (v) => v * -50);
  const badgeY = useTransform(py, (v) => v * -50);

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (reduce) return;
    px.set(e.clientX / window.innerWidth - 0.5);
    py.set(e.clientY / window.innerHeight - 0.5);
  };

  const letters = personalInfo.name.split("");

  return (
    <section
      ref={heroRef}
      id="hero"
      onMouseMove={onMove}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-16 pt-32"
    >
      <motion.div style={{ opacity: reduce ? 1 : fade }} className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.35fr_0.65fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/50">
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: intro + 0.1 }}
              >
                Hello, I&apos;m
              </motion.span>
            </p>

            {/* Giant name with per-letter 3D reveal */}
            <motion.h1
              style={{ y: reduce ? 0 : nameY }}
              aria-label={personalInfo.name}
              className="mt-4 font-heading text-[clamp(4.5rem,17vw,13rem)] font-bold leading-[0.85] tracking-[-0.06em]"
            >
              <span className="flex" style={{ perspective: 800 }}>
                {letters.map((letter, i) => (
                  <motion.span
                    key={`${letter}-${i}`}
                    aria-hidden
                    className="inline-block origin-bottom"
                    initial={reduce ? false : { y: "100%", rotateX: -90, opacity: 0 }}
                    animate={{ y: 0, rotateX: 0, opacity: 1 }}
                    transition={{ duration: 1.1, ease: EASE, delay: intro + 0.15 + i * 0.07 }}
                    whileHover={reduce ? undefined : { y: -16, color: "hsl(var(--accent))", transition: { duration: 0.25 } }}
                  >
                    {letter}
                  </motion.span>
                ))}
                <motion.span
                  aria-hidden
                  className="text-accent"
                  initial={reduce ? false : { scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 12, delay: intro + 0.7 }}
                >
                  .
                </motion.span>
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: intro + 0.6 }}
              className="mt-8 flex flex-wrap items-baseline gap-x-3 font-heading text-2xl font-medium tracking-tight text-foreground/90 sm:text-4xl"
            >
              <span className="font-serif italic text-foreground/60">I build</span>
              <RotatingWords words={roles} className="text-gradient font-semibold" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: intro + 0.75 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-foreground/60 sm:text-lg"
            >
              {personalInfo.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: intro + 0.9 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Magnetic>
                <Link
                  href="#projects"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-foreground py-4 pl-7 pr-4 text-sm font-semibold text-background"
                >
                  <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-accent to-accent-2 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                  <span className="relative">Explore my work</span>
                  <span className="relative grid h-8 w-8 place-items-center rounded-full bg-background text-foreground transition-transform duration-500 group-hover:rotate-[-45deg]">
                    <ArrowDownRight size={16} />
                  </span>
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-full border border-foreground/20 px-7 py-4 text-sm font-semibold transition-colors duration-300 hover:border-foreground hover:bg-foreground/5"
                >
                  Get in touch
                  <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:rotate-45" />
                </Link>
              </Magnetic>
            </motion.div>
          </div>

          {/* Portrait */}
          <motion.div
            className="relative mx-auto w-full max-w-[20rem] lg:max-w-none"
            style={{ x: portraitX, y: portraitY, scale: reduce ? 1 : portraitScale }}
          >
          <motion.div
            className="relative"
            initial={reduce ? false : { opacity: 0, scale: 0.6, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.4, ease: EASE, delay: intro + 0.3 }}
          >
            <div className="absolute -inset-10 rounded-full bg-gradient-to-tr from-accent/40 via-accent-2/30 to-accent-3/30 blur-3xl" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] p-[2px]">
              <div className="conic-ring absolute -inset-1/2" />
              <div className="relative h-full w-full overflow-hidden rounded-[calc(2.5rem-2px)] bg-surface">
                <Image
                  src="/images/profile.png"
                  alt="Portrait of Chirag"
                  width={640}
                  height={760}
                  priority
                  className="h-full w-full object-cover grayscale-[30%] transition duration-700 hover:scale-105 hover:grayscale-0"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              style={{ x: badgeX, y: badgeY }}
              className="glass absolute -bottom-8 right-6 z-10 rounded-2xl bg-background/80 px-5 py-3 shadow-2xl backdrop-blur-md"
              animate={reduce ? undefined : { rotate: [3, -3, 3], scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="font-heading text-2xl font-bold leading-none">
                2<span className="text-accent">×</span>
              </p>
              <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-foreground/60">
                Hackathon runner-up
              </p>
            </motion.div>
          </motion.div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: intro + 1.2 }}
          className="mt-20 flex items-center justify-between border-t border-foreground/10 pt-6"
        >
          <div className="flex gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit ${link.label} profile`}
                className="link-underline text-sm text-foreground/60 transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
          <Link href="#about" className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-foreground/50">
            Scroll
            <span className="relative flex h-10 w-6 justify-center rounded-full border border-foreground/30">
              <motion.span
                className="mt-2 h-2 w-1 rounded-full bg-accent"
                animate={reduce ? undefined : { y: [0, 14, 0], opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
