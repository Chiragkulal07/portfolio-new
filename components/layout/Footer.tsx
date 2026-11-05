"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { personalInfo, socialLinks } from "@/content/site-config";
import { Magnetic, Marquee } from "@/components/ui/effects";
import { usePrefersReducedMotionSafe } from "@/lib/animations";

export function Footer() {
  const reduce = usePrefersReducedMotionSafe();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-foreground/10 pt-16">
      <Marquee duration={30} className="py-6">
        {["Open to work", "Let's collaborate", "Real-time systems", "AI experiences"].map((t) => (
          <span key={t} className="flex items-center gap-10 px-5 font-heading text-2xl font-medium tracking-tight text-foreground/40">
            {t}
            <span className="text-accent">●</span>
          </span>
        ))}
      </Marquee>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 border-t border-foreground/10 pt-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/45">Get in touch</p>
            <a
              href={`mailto:${personalInfo.email}`}
              className="link-underline mt-3 inline-block font-heading text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              {personalInfo.email}
            </a>
          </div>
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="link-underline text-sm text-foreground/60 transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <Magnetic>
              <Link
                href="#hero"
                aria-label="Back to top"
                className="grid h-12 w-12 place-items-center rounded-full border border-foreground/15 transition-colors hover:border-accent hover:bg-accent hover:text-background"
              >
                <ArrowUp size={18} />
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>

      <motion.p
        aria-hidden
        style={{ y: reduce ? 0 : y, opacity: reduce ? 1 : opacity }}
        className="pointer-events-none mt-10 select-none text-center font-heading text-[26vw] font-bold leading-[0.75] tracking-[-0.07em]"
      >
        <span className="bg-gradient-to-b from-foreground/20 to-transparent bg-clip-text text-transparent">
          {personalInfo.name.toUpperCase()}
        </span>
      </motion.p>

      <div className="mx-auto flex max-w-6xl justify-between px-4 pb-6 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-foreground/40 sm:px-6 lg:px-8">
        <span>© {new Date().getFullYear()} {personalInfo.name}</span>
        <span>Designed &amp; built with care</span>
      </div>
    </footer>
  );
}
