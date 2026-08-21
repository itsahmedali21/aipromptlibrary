import type { Metadata } from "next";
import { Check, Infinity as InfinityIcon, Sparkles, Users } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { LinkButton } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { OrbitRings } from "@/components/illustrations";
import { prompts } from "@/data/prompts";

export const metadata: Metadata = {
  title: "Free Access",
  description: "Promptfolio is completely free — the full library, every collection, unlimited saves. No plans, no card required.",
  alternates: { canonical: "/free" },
};

const included = [
  `The full library — ${prompts.length}+ professionally written prompts`,
  "Every category and curated collection, unlocked",
  "Unlimited saves — build your own personal library",
  "Prompt variables, usage tips, and example outputs",
  "New prompts added weekly, free for everyone",
  "No credit card, no trial countdown, no fine print",
];

const highlights = [
  {
    icon: InfinityIcon,
    title: "Unlimited, always",
    body: "No caps on saves, no locked categories, no 'upgrade to unlock' walls. What you see is what you get — all of it.",
  },
  {
    icon: Sparkles,
    title: "Full quality, zero cost",
    body: "Every prompt goes through the same editorial review whether you're a first-time visitor or a daily user.",
  },
  {
    icon: Users,
    title: "Built for everyone",
    body: "Students, freelancers, teams, hobbyists — Promptfolio doesn't gate features behind who's paying more.",
  },
];

const faqs = [
  {
    q: "Is Promptfolio really free, or is there a catch?",
    a: "Really free. Every prompt, every collection, every feature on this site is available to everyone at no cost — no trial period, no hidden tier.",
  },
  {
    q: "Do I need to create an account?",
    a: "No — you can browse, search, and copy any prompt without signing up. Creating a free account just lets your saved prompts sync and persist.",
  },
  {
    q: "Will Promptfolio introduce paid plans later?",
    a: "The core library will always stay free. If we ever add anything extra in the future, everything you rely on today stays exactly as it is.",
  },
  {
    q: "How do you keep the library updated if it's free?",
    a: "A small editorial team maintains and expands the library as a shared resource — the same way a public reference guide would be maintained.",
  },
];

export default function FreeAccessPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-5 pb-24 pt-14 sm:px-8 sm:pt-20">
      <SectionHeading
        eyebrow="No plans. No paywalls."
        title="Everything here is free"
        description="The entire library, every collection, unlimited saves — free for everyone, forever. No credit card, no trial clock."
        align="center"
        className="mb-14"
      />

      <ScrollReveal>
        <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-border-accent bg-surface px-6 py-14 text-center card-shadow-elevated sm:px-14 sm:py-16">
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-72 w-[90%] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
            style={{ background: "radial-gradient(ellipse, var(--glow), transparent 70%)" }}
            aria-hidden
          />
          <OrbitRings className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 opacity-40" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.1em] text-accent-text-on">
              Free forever
            </span>
            <div className="mt-6 flex items-end justify-center gap-2">
              <span className="font-display text-6xl font-medium text-text-primary">$0</span>
              <span className="pb-2 text-sm text-text-tertiary">/ always</span>
            </div>
            <p className="mx-auto mt-3 max-w-md text-[15px] text-text-secondary">
              One plan. Everything included. No upsells waiting behind a feature you actually need.
            </p>

            <LinkButton href="/prompts" size="lg" className="mt-8" magnetic>
              Explore the full library
            </LinkButton>

            <ul className="mx-auto mt-10 grid max-w-xl grid-cols-1 gap-x-8 gap-y-3 text-left sm:grid-cols-2">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-text-secondary">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.25} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ScrollReveal>

      <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {highlights.map((h) => (
          <ScrollReveal key={h.title}>
            <div className="h-full rounded-[var(--radius-lg)] border border-border bg-surface p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] border border-border-strong bg-surface-2 text-accent">
                <h.icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 font-display text-lg font-medium text-text-primary">{h.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{h.body}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <div className="mx-auto mt-24 max-w-2xl">
        <h2 className="text-center font-display text-2xl font-medium text-text-primary">Frequently asked</h2>
        <div className="mt-8 flex flex-col divide-y divide-border rounded-[var(--radius-lg)] border border-border">
          {faqs.map((f) => (
            <details key={f.q} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-text-primary">
                {f.q}
                <span className="ml-4 text-text-tertiary transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
