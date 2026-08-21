"use client";

import type { Prompt } from "@/data/types";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, staggerItem } from "@/components/ui/scroll-reveal";
import { PromptCard } from "@/components/prompt/prompt-card";
import { motion } from "framer-motion";

export function PromptSection({
  eyebrow,
  title,
  description,
  prompts,
  cta,
  variant = "standard",
  columns = 3,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  prompts: Prompt[];
  cta?: { label: string; href: string };
  variant?: "standard" | "featured";
  columns?: 2 | 3;
}) {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-24">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} cta={cta} className="mb-10" />
      <StaggerGroup
        className={`grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}
      >
        {prompts.map((p) => (
          <motion.div key={p.id} variants={staggerItem} className="h-full">
            <PromptCard prompt={p} variant={variant} />
          </motion.div>
        ))}
      </StaggerGroup>
    </section>
  );
}
