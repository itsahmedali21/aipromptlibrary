"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Status = "idle" | "loading" | "success";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    // Placeholder submit — wire this up to your form handler / API route.
    window.setTimeout(() => setStatus("success"), 900);
  }

  return (
    <div className="relative rounded-[var(--radius-lg)] border border-border bg-surface p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-3 py-10 text-center"
          >
            <CheckCircle2 className="h-10 w-10 text-accent" strokeWidth={1.5} />
            <p className="font-display text-xl font-medium text-text-primary">Message sent</p>
            <p className="max-w-xs text-sm text-text-secondary">
              We usually reply within one business day. Thanks for reaching out.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Name" id="name" type="text" required />
              <Field label="Email" id="email" type="email" required />
            </div>
            <Field label="Subject" id="subject" type="text" required />
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-text-primary">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                className="w-full resize-none rounded-[var(--radius-md)] border border-border-strong bg-surface-2 px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                placeholder="Tell us what's on your mind…"
              />
            </div>
            <Button type="submit" size="md" disabled={status === "loading"} className="w-fit">
              {status === "loading" ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending
                </span>
              ) : (
                "Send message"
              )}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({ label, id, type, required }: { label: string; id: string; type: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-text-primary">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="w-full rounded-[var(--radius-md)] border border-border-strong bg-surface-2 px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      />
    </div>
  );
}
