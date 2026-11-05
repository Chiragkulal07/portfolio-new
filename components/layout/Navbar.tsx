"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { personalInfo, socialLinks } from "@/content/site-config";
import { Magnetic } from "@/components/ui/effects";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#studies", label: "Journey" },
  { href: "#contact", label: "Contact" },
];

const EASE = [0.76, 0, 0.24, 1] as const;

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 300 && !isOpen);
    setScrolled(latest > 40);
  });

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6"
        animate={{ y: hidden ? "-120%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <nav
          aria-label="Primary navigation"
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-3 py-2 transition-all duration-500 ${
            scrolled ? "glass shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]" : "border border-transparent"
          }`}
        >
          <Link href="#hero" className="group flex items-center gap-3 pl-2" onClick={() => setIsOpen(false)}>
            <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full">
              <span className="conic-ring absolute inset-0" />
              <span className="absolute inset-[2px] rounded-full bg-background" />
              <span className="relative font-heading text-sm font-bold">C</span>
            </span>
            <span className="font-heading text-lg font-semibold tracking-tight">
              {personalInfo.name}
              <span className="text-accent">.</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={`relative z-10 block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    active === link.href ? "text-background" : "text-foreground/65 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
                {active === link.href ? (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-foreground"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Magnetic>
              <Link
                href="#contact"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-background"
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
                <span className="relative">Let&apos;s talk</span>
                <ArrowUpRight size={16} className="relative transition-transform duration-500 group-hover:rotate-45" />
              </Link>
            </Magnetic>
          </div>

          <button
            type="button"
            className="relative z-[60] grid h-11 w-11 place-items-center rounded-full bg-foreground text-background lg:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <span className="relative block h-3 w-5">
              <motion.span
                className="absolute left-0 top-0 h-[2px] w-5 rounded bg-current"
                animate={isOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              />
              <motion.span
                className="absolute bottom-0 left-0 h-[2px] w-5 rounded bg-current"
                animate={isOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              />
            </span>
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-background px-6 pb-10 pt-28 lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 3rem) 2.5rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3rem) 2.5rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3rem) 2.5rem)" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <ul className="flex flex-col gap-2">
              {links.map((link, i) => (
                <li key={link.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-baseline gap-4 font-heading text-5xl font-semibold tracking-[-0.04em]"
                    >
                      <span className="font-mono text-xs text-accent">0{i + 1}</span>
                      {link.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
            <motion.div
              className="flex gap-6 text-sm text-foreground/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              exit={{ opacity: 0 }}
            >
              {socialLinks.map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="link-underline">
                  {s.label}
                </a>
              ))}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
