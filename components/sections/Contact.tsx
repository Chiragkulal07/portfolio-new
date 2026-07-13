"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { getMotionProps, usePrefersReducedMotionSafe } from "@/lib/animations";

export function Contact() {
  const shouldReduceMotion = usePrefersReducedMotionSafe();
  const motionProps = getMotionProps(shouldReduceMotion);
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
    <section id="contact" className="scroll-mt-24 py-20 sm:py-24">
      <motion.div className="mx-auto max-w-6xl rounded-[2rem] border border-border bg-background p-8 shadow-sm sm:p-10 lg:p-14" {...motionProps}>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-accent">
            Contact
          </p>
          <h2 className="mt-4 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
            Let&apos;s discuss your next product or website.
          </h2>
          <p className="mt-5 text-lg leading-8 text-foreground/80">
            This form is ready for future submission logic, but for now it stays purely visual and accessible.
          </p>
        </div>

        <motion.form className="mt-10 grid gap-6 lg:grid-cols-2" onSubmit={handleSubmit} noValidate initial={shouldReduceMotion ? "visible" : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }} transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
          <div className="space-y-6">
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
              />
              {errors.email ? <p id="email-error" className="mt-2 text-sm text-red-500">{errors.email}</p> : null}
            </div>
          </div>

          <div className="flex flex-col">
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
              className="mt-6 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>
        </motion.form>
      </motion.div>
    </section>
  );
}
