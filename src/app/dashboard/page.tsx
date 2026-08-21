import type { Metadata } from "next";
import Link from "next/link";
import { Bookmark, Clock, Infinity as InfinityIcon, ArrowRight } from "lucide-react";
import { sortPrompts, prompts } from "@/data/prompts";
import { PromptCard } from "@/components/prompt/prompt-card";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your Promptfolio dashboard — saved prompts, recent activity, and recommendations.",
  alternates: { canonical: "/dashboard" },
  robots: { index: false, follow: false },
};

const statCards = [
  { icon: Bookmark, label: "Saved prompts", value: "12" },
  { icon: Clock, label: "Used this week", value: "27" },
  { icon: InfinityIcon, label: "Library access", value: "Full — Free" },
];

export default function DashboardPage() {
  const recommended = sortPrompts(prompts, "trending").slice(0, 3);

  return (
    <div className="mx-auto max-w-[1200px] px-5 pb-24 pt-14 sm:px-8 sm:pt-20">
      <div className="flex flex-col gap-2 border-b border-border pb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">Dashboard</p>
          <h1 className="mt-2 font-display text-3xl font-medium tracking-[-0.02em] text-text-primary">
            Welcome back, Aamir
          </h1>
        </div>
        <Link href="/saved" className="inline-flex items-center gap-1.5 text-sm font-medium text-text-primary hover:text-accent">
          View saved prompts <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {statCards.map((s) => (
          <div key={s.label} className="flex items-center gap-4 rounded-[var(--radius-lg)] border border-border bg-surface p-6">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface-2 text-accent">
              <s.icon className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <div>
              <p className="font-display text-2xl font-medium text-text-primary">{s.value}</p>
              <p className="text-xs text-text-tertiary">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="font-display text-xl font-medium text-text-primary">Recommended for you</h2>
        <p className="mt-1 text-sm text-text-secondary">Based on the categories you use most.</p>
        <div className="mt-6 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recommended.map((p) => (
            <PromptCard key={p.id} prompt={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
