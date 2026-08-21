"use client";

import { Circle, PenLine, Sparkles, Wand2 } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { OrbitRings } from "@/components/illustrations";

const steps = [
  { icon: PenLine, label: "Describe your need" },
  { icon: Wand2, label: "Generate a prompt" },
  { icon: Sparkles, label: "Copy, edit, or regenerate" },
];

const previewLines = [
  "Act as an expert assistant.",
  "",
  "Task: write a follow-up email after a sales",
  "call that didn't close.",
  "",
  "Tone & style: confident, not pushy.",
];

export function GeneratorTeaser() {
  return (
    <section className="border-t border-border bg-bg-elevated">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <ScrollReveal>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-accent">
              Can&apos;t find the right prompt?
            </p>
            <h2 className="text-balance font-display text-[clamp(1.75rem,3vw,2.75rem)] font-medium leading-[1.08] tracking-[-0.02em] text-text-primary">
              Build your own in under a minute
            </h2>
            <p className="mt-4 max-w-md text-pretty text-[15px] leading-relaxed text-text-secondary">
              Describe what you need and get back a structured, ready-to-use prompt — free, no account
              required. Copy it as-is, edit it inline, or regenerate a fresh version instantly.
            </p>

            <ul className="mt-7 flex flex-col gap-3">
              {steps.map((s, i) => (
                <li key={s.label} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border-strong bg-surface-2 text-accent">
                    <s.icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </span>
                  <span className="text-sm text-text-secondary">
                    <span className="font-medium text-text-primary">{i + 1}.</span> {s.label}
                  </span>
                </li>
              ))}
            </ul>

            <LinkButton href="/create" size="lg" className="mt-8" magnetic icon={<Wand2 className="h-4 w-4" />} iconPosition="left">
              Create Your Own Prompt
            </LinkButton>
          </ScrollReveal>

          <ScrollReveal>
            <div className="relative">
              <OrbitRings className="pointer-events-none absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 opacity-30" />
              <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-border-strong bg-bg card-shadow-elevated">
                <div className="flex items-center gap-2 border-b border-border px-5 py-3.5">
                  {["#e0605a", "#e0b95a", "#5ac97a"].map((c) => (
                    <Circle key={c} className="h-2.5 w-2.5" fill={c} stroke="none" />
                  ))}
                  <span className="ml-2 text-xs font-medium text-text-tertiary">your-prompt.txt</span>
                </div>
                <pre className="whitespace-pre-wrap break-words p-6 font-mono text-[13px] leading-[1.8] text-text-secondary sm:p-8">
                  {previewLines.join("\n")}
                </pre>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
