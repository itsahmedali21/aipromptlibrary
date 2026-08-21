"use client";

import { motion } from "framer-motion";
import { ArrowRight, Grid3x3, Sparkles } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { ConstellationIllustration } from "@/components/illustrations";
import { formatCount } from "@/lib/utils";
import { prompts } from "@/data/prompts";
import { categories } from "@/data/categories";

const floatingCards = [
  {
    title: "Positioning Statement Generator",
    meta: "Marketing · 15.2k copies",
    className: "left-[2%] top-[8%] hidden lg:block",
    float: { y: [0, -14, 0] },
    duration: 7,
  },
  {
    title: "Code Review Companion",
    meta: "Coding · 24.3k copies",
    className: "right-[0%] top-[20%] hidden lg:block",
    float: { y: [0, 16, 0] },
    duration: 8.5,
  },
  {
    title: "Hook Variation Generator",
    meta: "Social · 13.7k copies",
    className: "left-[8%] bottom-[6%] hidden xl:block",
    float: { y: [0, -10, 0] },
    duration: 6.5,
  },
];

const totalUsageCount = prompts.reduce((sum, p) => sum + p.usageCount, 0);

const stats = [
  { value: prompts.length, suffix: "+", label: "Curated prompts" },
  { value: categories.length, suffix: "", label: "Disciplines covered" },
  { value: totalUsageCount, suffix: "", label: "Prompts copied" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        className="pointer-events-none absolute inset-x-0 top-[-10%] z-0 h-[600px] opacity-80"
        style={{
          background:
            "radial-gradient(closest-side, var(--glow), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="grid-pattern radial-fade pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <ConstellationIllustration className="pointer-events-none absolute inset-x-0 top-0 z-0 mx-auto h-[420px] w-full max-w-[1100px] opacity-40 sm:h-[520px] sm:opacity-60" />

      <div className="relative mx-auto max-w-[1400px] px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
        <div className="relative flex flex-col items-center text-center">
          {floatingCards.map((card, i) => (
            <motion.div
              key={card.title}
              className={`glass card-shadow-elevated pointer-events-none absolute z-0 w-56 rounded-[var(--radius-md)] border border-border-strong p-4 ${card.className}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1, ...card.float }}
              transition={{
                opacity: { duration: 0.8, delay: 0.4 + i * 0.15 },
                scale: { duration: 0.8, delay: 0.4 + i * 0.15 },
                y: { duration: card.duration, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <div className="mb-2 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="text-[10px] uppercase tracking-[0.08em] text-text-tertiary">Prompt</span>
              </div>
              <p className="font-display text-sm font-medium leading-snug text-text-primary">{card.title}</p>
              <p className="mt-1.5 text-[11px] text-text-tertiary">{card.meta}</p>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mb-6 inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface-2 px-4 py-1.5"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-text-secondary">
              The AI Prompt Library
            </span>
            <span className="h-3 w-px bg-border-strong" />
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-accent">100% Free</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-w-3xl text-balance font-display text-[clamp(2.5rem,6.5vw,4.75rem)] font-medium leading-[1.03] tracking-[-0.03em] text-text-primary"
          >
            Find the right prompt.
            <br />
            Create better with <span className="accent-gradient-text">AI</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mt-6 max-w-xl text-pretty text-[17px] leading-relaxed text-text-secondary"
          >
            A curated library of professionally engineered prompts — organized, tested, and ready to copy.
            Stop guessing at phrasing and start shipping better work with AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mt-9 flex flex-col items-center gap-3 sm:flex-row"
          >
            <LinkButton href="/prompts" size="lg" magnetic icon={<ArrowRight className="h-4 w-4" />}>
              Explore Prompts
            </LinkButton>
            <LinkButton
              href="/categories"
              size="lg"
              variant="secondary"
              magnetic
              icon={<Grid3x3 className="h-4 w-4" />}
              iconPosition="left"
            >
              Browse Categories
            </LinkButton>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative z-10 mt-4 text-xs text-text-tertiary"
          >
            No credit card · No trial countdown · Free forever
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative z-10 mt-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 border-t border-border pt-10"
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-2xl font-medium text-text-primary sm:text-3xl">
                  {formatCount(s.value)}
                  {s.suffix}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.08em] text-text-tertiary">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
