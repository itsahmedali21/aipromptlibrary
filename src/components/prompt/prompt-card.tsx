"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Flame } from "lucide-react";
import type { Prompt } from "@/data/types";
import { getCategoryBySlug } from "@/data/categories";
import { cn, formatCount, timeAgo } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/ui/copy-button";
import { SaveButton } from "@/components/ui/save-button";

type Variant = "standard" | "featured" | "compact" | "large" | "horizontal";

const difficultyLabel: Record<Prompt["difficulty"], string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export function PromptCard({ prompt, variant = "standard" }: { prompt: Prompt; variant?: Variant }) {
  const category = getCategoryBySlug(prompt.category);

  const cardMotion = {
    whileHover: { y: -4 },
    transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] as const },
  };

  if (variant === "compact") {
    return (
      <motion.div {...cardMotion} className="group relative">
        <Link
          href={`/prompts/${prompt.slug}`}
          className="flex h-full items-center justify-between gap-4 rounded-[var(--radius-md)] border border-border bg-surface px-4 py-3.5 transition-colors group-hover:border-border-strong"
        >
          <div className="min-w-0">
            <div className="mb-1 flex items-center gap-2">
              {category && <Badge>{category.name}</Badge>}
            </div>
            <p className="truncate text-sm font-medium text-text-primary">{prompt.title}</p>
          </div>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-text-tertiary transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
        </Link>
      </motion.div>
    );
  }

  if (variant === "horizontal") {
    return (
      <motion.div
        {...cardMotion}
        className="group relative h-full rounded-[var(--radius-lg)] border border-border bg-surface p-5 transition-colors hover:border-border-strong sm:p-6"
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1">
            <div className="mb-2.5 flex flex-wrap items-center gap-2">
              {category && <Badge variant="accent">{category.name}</Badge>}
              <span className="text-xs text-text-tertiary">{difficultyLabel[prompt.difficulty]}</span>
            </div>
            <Link href={`/prompts/${prompt.slug}`}>
              <h3 className="font-display text-lg font-medium text-text-primary transition-colors group-hover:text-accent">
                {prompt.title}
              </h3>
            </Link>
            <p className="mt-1.5 line-clamp-2 max-w-xl text-sm leading-relaxed text-text-secondary">
              {prompt.description}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-tertiary">
              <span>By {prompt.author.name}</span>
              <span>{formatCount(prompt.usageCount)} copies</span>
              <span>{timeAgo(prompt.createdAt)}</span>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <SaveButton id={prompt.id} title={prompt.title} />
            <CopyButton text={prompt.content} size="sm" />
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === "large" || variant === "featured") {
    const large = variant === "large";
    return (
      <motion.div
        {...cardMotion}
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface transition-colors hover:border-border-accent hover:shadow-[0_0_0_1px_var(--border-accent)]",
          large ? "p-7 sm:p-9" : "p-6"
        )}
      >
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "radial-gradient(circle, var(--glow), transparent 70%)" }}
          aria-hidden
        />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-2">
            {category && <Badge variant="accent">{category.name}</Badge>}
            {prompt.popularity > 90 && (
              <Badge variant="outline">
                <Flame className="h-3 w-3 text-accent" /> Trending
              </Badge>
            )}
          </div>
          <SaveButton id={prompt.id} title={prompt.title} />
        </div>

        <Link href={`/prompts/${prompt.slug}`} className="relative mt-5 block flex-1">
          <h3
            className={cn(
              "font-display font-medium leading-[1.15] tracking-[-0.01em] text-text-primary transition-colors group-hover:text-accent text-balance",
              large ? "text-[clamp(1.5rem,2.4vw,2rem)]" : "text-xl"
            )}
          >
            {prompt.title}
          </h3>
          <p className={cn("mt-3 text-text-secondary leading-relaxed text-pretty", large ? "text-[15px]" : "text-sm line-clamp-2")}>
            {prompt.description}
          </p>
        </Link>

        {large && (
          <div className="relative mt-6 rounded-[var(--radius-md)] border border-border bg-bg-elevated p-4">
            <p className="line-clamp-3 font-mono text-[13px] leading-relaxed text-text-tertiary">{prompt.content}</p>
          </div>
        )}

        <div className="relative mt-6 flex flex-wrap gap-1.5">
          {prompt.tags.slice(0, large ? 5 : 3).map((tag) => (
            <span key={tag} className="rounded-full border border-border px-2.5 py-1 text-[11px] text-text-tertiary">
              #{tag}
            </span>
          ))}
        </div>

        <div className="relative mt-6 flex items-center justify-between border-t border-border pt-5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-2 text-[10px] font-semibold text-text-secondary">
              {prompt.author.avatarInitials}
            </span>
            <div className="leading-tight">
              <p className="text-xs font-medium text-text-primary">{prompt.author.name}</p>
              <p className="text-[11px] text-text-tertiary">{formatCount(prompt.usageCount)} copies</p>
            </div>
          </div>
          <CopyButton text={prompt.content} size="sm" label="Copy" />
        </div>
      </motion.div>
    );
  }

  // standard
  return (
    <motion.div
      {...cardMotion}
      className="group relative flex h-full flex-col rounded-[var(--radius-lg)] border border-border bg-surface p-5 transition-colors hover:border-border-strong sm:p-6"
    >
      <div className="flex items-center justify-between">
        {category && <Badge>{category.name}</Badge>}
        <SaveButton id={prompt.id} title={prompt.title} />
      </div>

      <Link href={`/prompts/${prompt.slug}`} className="mt-4 block flex-1">
        <h3 className="font-display text-lg font-medium leading-snug text-text-primary transition-colors group-hover:text-accent text-balance">
          {prompt.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-secondary">{prompt.description}</p>
      </Link>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {prompt.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded-full border border-border px-2.5 py-1 text-[11px] text-text-tertiary">
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <span className="text-[11px] text-text-tertiary">{formatCount(prompt.usageCount)} copies</span>
        <CopyButton text={prompt.content} size="sm" label="Copy" />
      </div>
    </motion.div>
  );
}
