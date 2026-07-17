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
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8" aria-label="Primary navigation">
        <Link href="#hero" className="font-heading text-xl font-semibold text-foreground">
          Chirag
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-border p-2 text-foreground transition hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <div className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 transition hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      {isOpen ? (
        <div id="mobile-menu" className="border-t border-border/70 bg-background/95 px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-2xl px-3 py-2 text-sm font-medium text-foreground/80 transition hover:bg-muted hover:text-accent"
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
