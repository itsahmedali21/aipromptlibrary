"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/data/types";
import { DynamicIcon } from "@/lib/icon-map";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <motion.div className="h-full" whileHover={{ y: -4 }} transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}>
      <Link
        href={`/categories/${category.slug}`}
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface p-6 transition-colors hover:border-border-accent"
      >
        <div className="grid-pattern pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-40" aria-hidden />
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "radial-gradient(circle, var(--glow), transparent 70%)" }}
          aria-hidden
        />
        <div className="relative flex items-start justify-between">
          <span
            className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] border border-border-strong text-accent transition-transform duration-300 group-hover:scale-110"
            style={{ background: "linear-gradient(145deg, var(--surface-2), var(--accent-soft))" }}
          >
            <DynamicIcon name={category.icon} className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <ArrowUpRight className="h-4 w-4 text-text-tertiary opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent group-hover:opacity-100" />
        </div>
        <div className="relative mt-6">
          <h3 className="font-display text-lg font-medium text-text-primary">{category.name}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">{category.description}</p>
          <p className="mt-4 text-xs text-text-tertiary">{category.promptCount} prompts</p>
        </div>
      </Link>
    </motion.div>
  );
}
