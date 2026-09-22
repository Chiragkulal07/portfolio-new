import { socialLinks } from "@/content/site-config";

export function Footer() {
  return (
    <footer className="border-t border-border/80 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm text-foreground/60 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em]">© {new Date().getFullYear()} Chirag</p>
        <div className="flex flex-wrap justify-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="editorial-link transition hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
