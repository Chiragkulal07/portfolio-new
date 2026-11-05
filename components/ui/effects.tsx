"use client";

import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { usePrefersReducedMotionSafe } from "@/lib/animations";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Background: aurora blobs, grid, grain                               */
/* ------------------------------------------------------------------ */
export function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <div className="aurora aurora-1 -left-[10%] -top-[10%] h-[45vw] w-[45vw] bg-[hsl(var(--accent)/0.45)]" />
      <div className="aurora aurora-2 -right-[10%] top-[10%] h-[40vw] w-[40vw] bg-[hsl(var(--accent-2)/0.45)]" />
      <div className="aurora aurora-3 bottom-[-20%] left-[25%] h-[38vw] w-[38vw] bg-[hsl(var(--accent-3)/0.3)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_75%)]" />
      <div className="noise" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Scroll progress bar                                                 */
/* ------------------------------------------------------------------ */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-accent via-accent-2 to-accent-3"
    />
  );
}

/* ------------------------------------------------------------------ */
/* Custom cursor: dot + trailing ring that grows on interactive items  */
/* ------------------------------------------------------------------ */
export function CustomCursor() {
  const reduce = usePrefersReducedMotionSafe();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 220, damping: 22, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 220, damping: 22, mass: 0.5 });

  useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    const raf = requestAnimationFrame(() => setEnabled(true));
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      setHovering(Boolean(target?.closest("a, button, input, textarea, [data-cursor='hover']")));
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 rounded-full bg-accent mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[99] rounded-full border border-foreground/60 mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 64 : 34,
          height: hovering ? 64 : 34,
          backgroundColor: hovering ? "hsl(40 20% 96% / 1)" : "hsl(40 20% 96% / 0)",
          scale: pressed ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Preloader: counter + curtain wipe                                   */
/* ------------------------------------------------------------------ */
export function Preloader() {
  const reduce = usePrefersReducedMotionSafe();
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduce) {
      const id = requestAnimationFrame(() => setDone(true));
      return () => cancelAnimationFrame(id);
    }
    document.body.style.overflow = "hidden";
    let frame = 0;
    const start = performance.now();
    const duration = 1600;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 250);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduce]);

  const finished = done;

  useEffect(() => {
    if (finished) document.body.style.overflow = "";
  }, [finished]);

  return (
    <AnimatePresence>
      {!finished && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[200] flex flex-col justify-between bg-background p-6 sm:p-10"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.2em] text-foreground/50">
            <span>Chirag — Portfolio</span>
            <span>©{new Date().getFullYear()}</span>
          </div>
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="font-heading text-[clamp(2.5rem,9vw,8rem)] font-semibold leading-none tracking-[-0.05em]"
            >
              Crafting <span className="font-serif font-normal italic text-gradient">experiences</span>
            </motion.p>
          </div>
          <div className="flex items-end justify-between">
            <div className="h-px flex-1 bg-border">
              <div className="h-px bg-gradient-to-r from-accent to-accent-2" style={{ width: `${count}%` }} />
            </div>
            <span className="ml-6 font-heading text-6xl font-semibold tabular-nums tracking-tighter sm:text-8xl">
              {count}
              <span className="text-accent">%</span>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* Magnetic wrapper: pulls children toward the pointer                 */
/* ------------------------------------------------------------------ */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const reduce = usePrefersReducedMotionSafe();
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 180, damping: 14, mass: 0.4 });
  const y = useSpring(0, { stiffness: 180, damping: 14, mass: 0.4 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={reset} style={{ x, y }} className="inline-block">
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Text reveals                                                        */
/* ------------------------------------------------------------------ */

/** Each word slides up from a mask when scrolled into view. */
export function RevealText({
  text,
  className,
  delay = 0,
  as: Tag = "h2",
  wordClassName,
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  wordClassName?: string;
}) {
  const reduce = usePrefersReducedMotionSafe();
  const words = text.split(" ");
  const MotionTag = motion[Tag];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-top">
          <motion.span
            className={`inline-block ${wordClassName ?? ""}`}
            variants={{
              hidden: reduce ? { y: 0 } : { y: "110%", rotate: 6 },
              visible: { y: 0, rotate: 0, transition: { duration: 0.9, ease: EASE } },
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/** Paragraph whose words light up one by one as you scroll through it. */
export function ScrollHighlightText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <HighlightWord key={`${word}-${i}`} progress={scrollYProgress} range={[start, end]}>
            {word}
          </HighlightWord>
        );
      })}
    </p>
  );
}

function HighlightWord({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const reduce = usePrefersReducedMotionSafe();
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity: reduce ? 1 : opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}

/** Rotating words with a vertical slot-machine transition. */
export function RotatingWords({ words, className }: { words: string[]; className?: string }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2400);
    return () => clearInterval(id);
  }, [words.length]);
  return (
    <span className="relative inline-grid overflow-hidden pb-[0.1em] align-bottom">
      <span className="sr-only">{words[index]}</span>
      {words.map((word, i) => {
        const state = i === index ? "active" : i === (index - 1 + words.length) % words.length ? "exit" : "idle";
        return (
          <motion.span
            key={word}
            aria-hidden
            className={`col-start-1 row-start-1 whitespace-nowrap ${className ?? ""}`}
            initial={false}
            animate={state}
            variants={{
              active: { y: "0%", opacity: 1, filter: "blur(0px)" },
              exit: { y: "-100%", opacity: 0, filter: "blur(8px)" },
              idle: { y: "100%", opacity: 0, filter: "blur(8px)", transition: { duration: 0 } },
            }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {word}
          </motion.span>
        );
      })}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Spotlight + 3D tilt card                                            */
/* ------------------------------------------------------------------ */
export function TiltCard({
  children,
  className,
  tilt = 8,
}: {
  children: ReactNode;
  className?: string;
  tilt?: number;
}) {
  const reduce = usePrefersReducedMotionSafe();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const rx = useSpring(0, { stiffness: 150, damping: 18 });
  const ry = useSpring(0, { stiffness: 150, damping: 18 });
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${mx}% ${my}%, hsl(var(--accent) / 0.16), transparent 45%)`;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set(px * 100);
    my.set(py * 100);
    if (!reduce) {
      ry.set((px - 0.5) * tilt);
      rx.set(-(py - 0.5) * tilt);
    }
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div style={{ perspective: 1200 }} className="h-full">
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className={`group relative h-full ${className ?? ""}`}
        data-cursor="hover"
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: spotlight }}
        />
        {children}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Marquee                                                             */
/* ------------------------------------------------------------------ */
export function Marquee({
  children,
  reverse = false,
  duration = 40,
  className,
}: {
  children: ReactNode;
  reverse?: boolean;
  duration?: number;
  className?: string;
}) {
  return (
    <div
      className={`marquee-wrap relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)] ${className ?? ""}`}
    >
      <div
        className="marquee"
        data-reverse={reverse}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section heading                                                     */
/* ------------------------------------------------------------------ */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  index,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  index: string;
}) {
  return (
    <div className="relative">
      <div className="flex items-center justify-between gap-6">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {eyebrow}
        </motion.p>
        <span className="font-mono text-xs tracking-[0.2em] text-foreground/40">({index})</span>
      </div>
      <motion.div
        aria-hidden
        className="mt-6 h-px origin-left bg-gradient-to-r from-foreground/30 via-foreground/10 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE }}
      />
      <h2 className="mt-10 max-w-4xl font-heading text-[clamp(2.4rem,6vw,5rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
        <RevealText as="span" text={title} className="inline" />{" "}
        {accent ? (
          <RevealText
            as="span"
            text={accent}
            delay={0.25}
            className="inline font-serif font-normal italic tracking-[-0.02em]"
            wordClassName="text-gradient pr-[0.08em]"
          />
        ) : null}
      </h2>
    </div>
  );
}
