"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/data/types";
import { DynamicIcon } from "@/lib/icon-map";

export function CategoryCard({ category }: { category: Category }) {
  const accent = category.accentColor;

  return (
    <motion.div className="h-full" whileHover={{ y: -5 }} transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}>
      <Link
        href={`/categories/${category.slug}`}
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:[border-color:color-mix(in_srgb,var(--cat-accent)_45%,var(--border))]"
        style={{ ["--cat-accent" as string]: accent }}
      >
        {/* Top accent bar — reveals on hover, colored per category */}
        <span
          className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
          style={{ background: accent }}
          aria-hidden
        />

        {/* Soft tinted glow in the category's color */}
        <span
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `radial-gradient(circle, color-mix(in srgb, ${accent} 22%, transparent), transparent 70%)` }}
          aria-hidden
        />

        <div className="relative flex items-start justify-between">
          <span
            className="inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] transition-transform duration-300 group-hover:scale-110"
            style={{
              background: `color-mix(in srgb, ${accent} 14%, var(--surface-2))`,
              color: accent,
            }}
          >
            <DynamicIcon name={category.icon} className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border-strong text-text-tertiary opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:[border-color:var(--cat-accent)] group-hover:[color:var(--cat-accent)]">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        <div className="relative mt-6">
          <h3 className="font-display text-lg font-medium text-text-primary">{category.name}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">{category.description}</p>
          <div className="mt-4 flex items-center gap-1.5 border-t border-border pt-4">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} aria-hidden />
            <span className="text-xs text-text-tertiary">{category.promptCount} prompts</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
