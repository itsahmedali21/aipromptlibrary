"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Layers } from "lucide-react";
import type { Collection } from "@/data/types";
import { CollectionCover } from "@/components/illustrations";

export function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <motion.div className="h-full" whileHover={{ y: -5 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
      <Link
        href={`/collections/${collection.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface transition-colors hover:border-border-accent"
      >
        <div className="relative flex h-40 items-end overflow-hidden border-b border-border bg-surface-2 p-6">
          <CollectionCover
            variant={collection.coverVariant}
            className="absolute inset-0 h-full w-full scale-110 opacity-90 transition-transform duration-500 group-hover:scale-100"
          />
          <div
            className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: "radial-gradient(circle, var(--glow), transparent 70%)" }}
            aria-hidden
          />
          <span className="relative inline-flex items-center gap-2 rounded-full border border-border-strong bg-bg-elevated px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-text-secondary">
            <Layers className="h-3 w-3 text-accent" />
            {collection.coverLabel}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-xl font-medium text-text-primary text-balance">{collection.title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary text-pretty">{collection.description}</p>
          <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
            <span className="text-xs text-text-tertiary">{collection.promptSlugs.length} prompts</span>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-text-primary transition-colors group-hover:text-accent">
              View collection
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
