import type { Metadata } from "next";
import { Copy, PenLine, Wand2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { PromptGenerator } from "@/components/create/prompt-generator";
import { ConstellationIllustration } from "@/components/illustrations";

export const metadata: Metadata = {
  title: "Create Your Own Prompt",
  description:
    "Describe what you need, generate a structured, high-quality prompt, then copy, edit, or regenerate it — free, no account required.",
  alternates: { canonical: "/create" },
};

const steps = [
  {
    icon: PenLine,
    title: "Describe your need",
    body: "Tell it what you want the AI to do, add context, pick a desired output and tone.",
  },
  {
    icon: Wand2,
    title: "Generate a prompt",
    body: "We assemble a clear, well-structured prompt from your answers — ready to use.",
  },
  {
    icon: Copy,
    title: "Copy, edit, or regenerate",
    body: "Tweak it inline, copy it straight to your clipboard, or roll a fresh version instantly.",
  },
];

export default function CreatePromptPage() {
  return (
    <div className="relative mx-auto max-w-[900px] px-5 pb-24 pt-14 sm:px-8 sm:pt-20">
      <ConstellationIllustration className="pointer-events-none absolute inset-x-0 top-0 z-0 mx-auto h-[320px] w-full max-w-[900px] opacity-30" />

      <div className="relative">
        <SectionHeading
          eyebrow="Create Your Own Prompt"
          title="Build a custom prompt in under a minute"
          description="Describe what you need in plain language and get back a structured, high-quality prompt — free, no account required, no limits."
          align="center"
          className="mb-12"
        />

        <div className="mb-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="relative rounded-[var(--radius-lg)] border border-border bg-surface p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border-strong bg-surface-2 text-accent">
                  <s.icon className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <span className="text-xs font-medium uppercase tracking-[0.1em] text-text-tertiary">
                  Step {i + 1}
                </span>
              </div>
              <h3 className="mt-4 font-display text-[15px] font-medium text-text-primary">{s.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-text-secondary">{s.body}</p>
            </div>
          ))}
        </div>

        <PromptGenerator />
      </div>
    </div>
  );
}
