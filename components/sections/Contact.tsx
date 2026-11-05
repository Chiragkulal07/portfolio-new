"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Loader2, Mail, Send } from "lucide-react";
import { personalInfo, socialLinks } from "@/content/site-config";
import { Magnetic, SectionHeading, TiltCard } from "@/components/ui/effects";

const EASE = [0.22, 1, 0.36, 1] as const;

type Field = "name" | "email" | "message";

function FloatingField({
  id,
  label,
  value,
  error,
  onChange,
  textarea,
  type = "text",
}: {
  id: Field;
  label: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  textarea?: boolean;
  type?: string;
}) {
  const shared =
    "peer w-full rounded-2xl border bg-background/40 px-5 pb-3 pt-7 text-foreground outline-none transition-all duration-300 placeholder-transparent focus:bg-background/70 " +
    (error ? "border-red-400/70" : "border-foreground/10 focus:border-accent focus:shadow-[0_0_0_4px_hsl(var(--accent)/0.15)]");
  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={id}
          name={id}
          rows={6}
          value={value}
          onChange={onChange}
          placeholder={label}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${shared} min-h-[180px] resize-y`}
          suppressHydrationWarning
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={label}
          aria-describedby={error ? `${id}-error` : undefined}
          className={shared}
          suppressHydrationWarning
        />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-5 top-2.5 text-xs font-medium text-foreground/50 transition-all duration-300 peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2.5 peer-focus:text-xs peer-focus:text-accent"
      >
        {label}
      </label>
      <AnimatePresence>
        {error ? (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-2 text-sm text-red-400"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function Contact() {
  const [formValues, setFormValues] = useState({ name: "", email: "", message: "", website: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<{ type: "idle" | "success" | "error"; message: string }>({
    type: "idle",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setStatus({ type: "idle", message: "" });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });
      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors ?? {});
        setStatus({ type: "error", message: data.message ?? "Unable to send your message." });
        return;
      }

      setFormValues({ name: "", email: "", message: "", website: "" });
      setErrors({});
      setStatus({ type: "success", message: data.message ?? "Message sent successfully." });
    } catch {
      setStatus({ type: "error", message: "Network error — please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-24 py-28 sm:py-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading index="05" eyebrow="Contact" title="Have an idea?" accent="Let's build it." />

        <div className="mt-20 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="flex flex-col justify-between gap-10"
          >
            <p className="text-lg leading-relaxed text-foreground/60">
              Have a product, interface, or real-time system in mind? Send a note and let&apos;s make the next step
              concrete. I usually reply within a day.
            </p>

            <TiltCard className="gradient-border rounded-3xl bg-surface/70 p-8">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/15 text-accent">
                <Mail size={20} />
              </span>
              <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-foreground/45">Prefer email?</p>
              <Magnetic strength={0.15}>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="group mt-2 inline-flex items-center gap-2 break-all font-heading text-xl font-semibold tracking-tight sm:text-2xl"
                >
                  <span className="link-underline">{personalInfo.email}</span>
                  <ArrowUpRight size={20} className="shrink-0 text-accent transition-transform duration-500 group-hover:rotate-45" />
                </a>
              </Magnetic>
              <div className="mt-10 flex flex-wrap gap-3 border-t border-foreground/10 pt-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1.5 rounded-full border border-foreground/10 px-4 py-2 text-sm text-foreground/70 transition-colors hover:border-accent hover:text-foreground"
                  >
                    {link.label}
                    <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:rotate-45" />
                  </a>
                ))}
              </div>
            </TiltCard>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
            className="glass relative space-y-5 overflow-hidden rounded-[2rem] p-6 sm:p-10"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent-2/20 blur-3xl" />
            <div className="relative grid gap-5 sm:grid-cols-2">
              <FloatingField id="name" label="Your name" value={formValues.name} error={errors.name} onChange={handleChange} />
              <FloatingField
                id="email"
                type="email"
                label="Email address"
                value={formValues.email}
                error={errors.email}
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <FloatingField
                id="message"
                textarea
                label="Tell me about your project…"
                value={formValues.message}
                error={errors.message}
                onChange={handleChange}
              />
            </div>
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

            <div className="relative flex flex-col-reverse items-start justify-between gap-5 pt-2 sm:flex-row sm:items-center">
              <AnimatePresence mode="wait">
                {status.message ? (
                  <motion.p
                    key={status.message}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`text-sm ${status.type === "success" ? "text-emerald-400" : "text-red-400"}`}
                  >
                    {status.message}
                  </motion.p>
                ) : (
                  <span />
                )}
              </AnimatePresence>
              <Magnetic>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-foreground py-4 pl-7 pr-4 text-sm font-semibold text-background disabled:cursor-not-allowed disabled:opacity-70"
                  suppressHydrationWarning
                >
                  <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-accent to-accent-2 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                  <span className="relative">
                    {isSubmitting ? "Sending…" : status.type === "success" ? "Sent!" : "Send message"}
                  </span>
                  <span className="relative grid h-8 w-8 place-items-center rounded-full bg-background text-foreground">
                    {isSubmitting ? (
                      <Loader2 size={15} className="animate-spin" />
                    ) : status.type === "success" ? (
                      <Check size={15} />
                    ) : (
                      <Send size={15} className="transition-transform duration-500 group-hover:-rotate-12 group-hover:translate-x-0.5" />
                    )}
                  </span>
                </button>
              </Magnetic>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
