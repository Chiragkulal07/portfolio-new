"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { usePrefersReducedMotionSafe } from "@/lib/animations";

function StaggerItem({ children, index, progress, shouldReduceMotion, className }: { children: React.ReactNode, index: number, progress: any, shouldReduceMotion: boolean, className?: string }) {
  const start = index * 0.15;
  const end = Math.min(start + 0.5, 1);
  const y = useTransform(progress, [start, end], [60, 0]);
  const opacity = useTransform(progress, [start, end], [0, 1]);

  return (
    <motion.div className={className} style={{ y: shouldReduceMotion ? 0 : y, opacity: shouldReduceMotion ? 1 : opacity }}>
      {children}
    </motion.div>
  );
}

export function Contact() {
  const shouldReduceMotion = usePrefersReducedMotionSafe();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 80%"]
  });

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<{ type: "idle" | "success" | "error"; message: string }>(
    { type: "idle", message: "" },
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setStatus({ type: "idle", message: "" });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formValues),
    });

    const data = await response.json();

    if (!response.ok) {
      setErrors(data.errors ?? {});
      setStatus({ type: "error", message: data.message ?? "Unable to send your message." });
      setIsSubmitting(false);
      return;
    }

    setFormValues({ name: "", email: "", message: "", website: "" });
    setErrors({});
    setStatus({ type: "success", message: data.message ?? "Message sent successfully." });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" ref={sectionRef} className="relative scroll-mt-24 py-20 sm:py-24 overflow-hidden">
      {/* Background Depth Layers */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_hsl(var(--accent)/0.12),_transparent_60%)]"></div>
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.03] dark:opacity-[0.05]"></div>
      
      <div 
        className="relative z-10 mx-auto max-w-6xl rounded-[2rem] border border-border bg-background/80 backdrop-blur p-8 shadow-sm sm:p-10 lg:p-14 transition hover:shadow-[0_8px_40px_hsl(var(--accent)/0.05)]" 
      >
        <StaggerItem index={0} progress={scrollYProgress} shouldReduceMotion={shouldReduceMotion} className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-accent">
            Contact
          </p>
          <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Let&apos;s discuss your next product or website.
          </h2>
          <p className="mt-5 text-lg leading-8 text-foreground/80">
            This form is ready for future submission logic, but for now it stays purely visual and accessible.
          </p>
        </StaggerItem>

        <form className="mt-10 grid gap-6 lg:grid-cols-2" onSubmit={handleSubmit} noValidate>
          <StaggerItem index={1} progress={scrollYProgress} shouldReduceMotion={shouldReduceMotion} className="space-y-6">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-semibold text-foreground">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formValues.name}
                onChange={handleChange}
                aria-describedby={errors.name ? "name-error" : undefined}
                className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                placeholder="Your name"
                suppressHydrationWarning
              />
              {errors.name ? <p id="name-error" className="mt-2 text-sm text-red-500">{errors.name}</p> : null}
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-foreground">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleChange}
                aria-describedby={errors.email ? "email-error" : undefined}
                className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                placeholder="you@example.com"
                suppressHydrationWarning
              />
              {errors.email ? <p id="email-error" className="mt-2 text-sm text-red-500">{errors.email}</p> : null}
            </div>
          </StaggerItem>

          <StaggerItem index={2} progress={scrollYProgress} shouldReduceMotion={shouldReduceMotion} className="flex flex-col">
            <label htmlFor="message" className="mb-2 block text-sm font-semibold text-foreground">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={8}
              value={formValues.message}
              onChange={handleChange}
              aria-describedby={errors.message ? "message-error" : undefined}
              className="h-full min-h-[220px] w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
              placeholder="Tell me about your project..."
              suppressHydrationWarning
            />
            {errors.message ? <p id="message-error" className="mt-2 text-sm text-red-500">{errors.message}</p> : null}
            <div className="sr-only" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="text"
                value={formValues.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            {status.message ? (
              <p className={`mt-4 text-sm ${status.type === "success" ? "text-green-600" : "text-red-500"}`}>
                {status.message}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent/90 hover:shadow-[0_0_20px_hsl(var(--accent)/0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
              suppressHydrationWarning
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </StaggerItem>
        </form>
      </div>
    </section>
  );
}
