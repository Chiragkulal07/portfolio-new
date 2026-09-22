"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#studies", label: "Studies" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8" aria-label="Primary navigation">
        <Link href="#hero" className="font-heading text-xl font-semibold tracking-tight text-foreground transition-colors hover:text-accent">
          Chirag<span className="text-accent">.</span>
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center border border-border p-2 text-foreground transition hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="editorial-link text-xs font-semibold uppercase tracking-[0.14em] text-foreground/65 transition hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      {isOpen ? (
        <div id="mobile-menu" className="border-t border-border/80 bg-background px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border-b border-border/60 px-1 py-3 text-sm font-medium text-foreground/80 transition hover:text-accent"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
