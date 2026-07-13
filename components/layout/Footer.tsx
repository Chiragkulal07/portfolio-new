import { socialLinks } from "@/content/site-config";

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-background/80 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-center text-sm text-foreground/70 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>© {new Date().getFullYear()} Chirag. All rights reserved.</p>
        <div className="flex flex-wrap justify-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
