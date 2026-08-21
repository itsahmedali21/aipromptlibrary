import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { authors } from "@/data/authors";
import { EditorialStackIllustration } from "@/components/illustrations";

export const metadata: Metadata = {
  title: "About",
  description: "Promptfolio is a curated library of professionally engineered AI prompts, built by practitioners.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "Tested, not guessed",
    body: "Every prompt is written and used by a practitioner in that discipline before it's published — not generated in bulk.",
  },
  {
    title: "Editorial standards",
    body: "We review for clarity, structure, and output quality the way a publication reviews a piece before it runs.",
  },
  {
    title: "Built to be replaced",
    body: "Prompts are starting points, not scripture. Every one ships with tips for adapting it to your voice.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-5 pb-24 pt-14 sm:px-8 sm:pt-20">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <SectionHeading
          eyebrow="About Promptfolio"
          title="A library built by people who use it daily"
          description="We got tired of scrolling through screenshots of prompts in group chats. So we built the reference we wished existed — and kept it free."
        />
        <EditorialStackIllustration className="mx-auto hidden h-56 w-full max-w-sm sm:block" />
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {values.map((v) => (
          <div key={v.title} className="rounded-[var(--radius-lg)] border border-border bg-surface p-6">
            <h3 className="font-display text-lg font-medium text-text-primary">{v.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">{v.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 border-t border-border pt-16">
        <h2 className="font-display text-2xl font-medium text-text-primary">The editorial team</h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-text-secondary">
          A small group of writers, marketers, engineers, and researchers who each own the categories they know best.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-4">
          {authors.map((a) => (
            <div key={a.id} className="rounded-[var(--radius-lg)] border border-border bg-surface p-5 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-surface-2 text-sm font-semibold text-text-secondary">
                {a.avatarInitials}
              </span>
              <p className="mt-3 text-sm font-medium text-text-primary">{a.name}</p>
              <p className="text-xs text-text-tertiary">{a.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
