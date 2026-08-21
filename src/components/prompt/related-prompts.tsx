"use client";

import { motion } from "framer-motion";
import type { Prompt } from "@/data/types";
import { PromptCard } from "./prompt-card";
import { ScrollReveal, StaggerGroup, staggerItem } from "@/components/ui/scroll-reveal";

export function RelatedPrompts({ prompts }: { prompts: Prompt[] }) {
  if (prompts.length === 0) return null;

  return (
    <ScrollReveal className="mt-20 border-t border-border pt-14">
      <h2 className="font-display text-2xl font-medium text-text-primary">Related prompts</h2>
      <StaggerGroup className="mt-8 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {prompts.map((p) => (
          <motion.div key={p.id} variants={staggerItem} className="h-full">
            <PromptCard prompt={p} />
          </motion.div>
        ))}
      </StaggerGroup>
    </ScrollReveal>
  );
}
