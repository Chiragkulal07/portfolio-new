"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { animate, motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { personalInfo, projects, studies } from "@/content/site-config";
import { usePrefersReducedMotionSafe } from "@/lib/animations";
import { Magnetic, ScrollHighlightText, SectionHeading, TiltCard } from "@/components/ui/effects";

const stats = [
  { value: projects.length, suffix: "", label: "Live products shipped" },
  { value: studies.filter((s) => /hackathon/i.test(s.role)).length, suffix: "×", label: "Hackathon runner-up" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = usePrefersReducedMotionSafe();

  useEffect(() => {
    if (!inView || !ref.current) return;
    if (reduce) {
      ref.current.textContent = String(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return (
    <span className="font-heading text-6xl font-bold tracking-[-0.05em] sm:text-7xl">
      <span ref={ref}>0</span>
      <span className="text-gradient">{suffix}</span>
    </span>
  );
}

export function About() {
  const reduce = usePrefersReducedMotionSafe();
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const clip = useTransform(scrollYProgress, [0, 0.35], ["inset(20% 20% 20% 20% round 2rem)", "inset(0% 0% 0% 0% round 2rem)"]);

  return (
    <section id="about" className="relative scroll-mt-24 py-28 sm:py-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading index="01" eyebrow="About me" title="Engineering the" accent="real-time web." />

        <div className="mt-20 grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div ref={imgRef} className="relative">
            <motion.div style={{ clipPath: reduce ? undefined : clip }} className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-surface">
              <motion.div style={{ y: reduce ? 0 : imgY }} className="absolute -inset-[15%]">
                <Image
                  src="/images/profile.png"
                  alt="Portrait of Chirag"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium">
                  <MapPin size={14} className="text-accent" />
                  {personalInfo.location}
                </span>
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col justify-center">
            <ScrollHighlightText
              text={`${personalInfo.bio} I care about the details — the latency you never notice, the animation that feels just right, and systems that scale without drama.`}
              className="font-heading text-2xl font-medium leading-[1.35] tracking-[-0.02em] sm:text-[2.1rem]"
            />

            <div className="mt-14 flex flex-wrap items-center gap-6">
              <Magnetic>
                <Link
                  href={personalInfo.resumeUrl}
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-foreground/20 px-7 py-4 text-sm font-semibold"
                >
                  <span className="absolute inset-0 translate-y-full rounded-full bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
                  <span className="relative transition-colors duration-500 group-hover:text-background">Download résumé</span>
                  <ArrowUpRight size={16} className="relative transition-all duration-500 group-hover:rotate-45 group-hover:text-background" />
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>

        <div className="mt-24 grid gap-4 sm:grid-cols-2">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
            >
              <TiltCard className="gradient-border rounded-3xl bg-surface/60 p-8">
                <Counter value={stat.value} suffix={stat.suffix} />
                <p className="mt-4 text-sm text-foreground/55">{stat.label}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
