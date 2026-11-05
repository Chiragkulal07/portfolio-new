"use client";

import { motion } from "framer-motion";
import { Brain, Code2, Database, Server, Terminal, type LucideIcon } from "lucide-react";
import { skills } from "@/content/site-config";
import { SectionHeading, TiltCard } from "@/components/ui/effects";

const EASE = [0.22, 1, 0.36, 1] as const;

const icons: Record<string, LucideIcon> = {
  Languages: Terminal,
  Frontend: Code2,
  Backend: Server,
  "Data & Infrastructure": Database,
  "AI & Real-Time": Brain,
};

// Bento layout spans for a 6-column grid (falls back gracefully for extra groups).
const spans = ["lg:col-span-2", "lg:col-span-4", "lg:col-span-4", "lg:col-span-2", "lg:col-span-6"];

export function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 overflow-hidden py-28 sm:py-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading index="03" eyebrow="Capabilities" title="A toolkit tuned for" accent="speed & scale." />
      </div>

      {/* Bento grid */}
      <div className="mx-auto mt-20 grid max-w-6xl gap-4 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-6 lg:px-8">
        {skills.map((group, i) => {
          const Icon = icons[group.category] ?? Code2;
          return (
            <motion.div
              key={group.category}
              className={spans[i] ?? "lg:col-span-3"}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: EASE, delay: (i % 3) * 0.1 }}
            >
              <TiltCard tilt={6} className="gradient-border overflow-hidden rounded-3xl bg-surface/70 p-8">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl transition-all duration-700 group-hover:bg-accent-2/25" />
                <div className="relative flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-foreground/10 bg-foreground/5 transition-all duration-500 group-hover:rotate-[-8deg] group-hover:scale-110 group-hover:border-accent/50 group-hover:text-accent">
                    <Icon size={22} />
                  </span>
                  <span className="font-mono text-xs text-foreground/35">0{i + 1}</span>
                </div>
                <h3 className="relative mt-8 font-heading text-2xl font-semibold tracking-[-0.03em]">{group.category}</h3>
                <ul className="relative mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-foreground/10 bg-background/40 px-3 py-1.5 text-sm text-foreground/70 transition-colors duration-300 hover:border-accent/60 hover:text-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
