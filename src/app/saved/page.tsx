"use client";

import { Bookmark } from "lucide-react";
import { useSavedPrompts } from "@/context/saved-prompts-context";
import { prompts } from "@/data/prompts";
import { PromptCard } from "@/components/prompt/prompt-card";
import { EmptyState } from "@/components/ui/empty-state";
import { LinkButton } from "@/components/ui/button";
import { StaggerGroup, staggerItem } from "@/components/ui/scroll-reveal";
import { motion } from "framer-motion";

export default function SavedPromptsPage() {
  const { savedIds } = useSavedPrompts();
  const savedPrompts = prompts.filter((p) => savedIds.includes(p.id));

  return (
    <div className="mx-auto max-w-[1200px] px-5 pb-24 pt-14 sm:px-8 sm:pt-20">
      <div className="border-b border-border pb-10">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">Your library</p>
        <h1 className="mt-2 font-display text-3xl font-medium tracking-[-0.02em] text-text-primary">
          Saved prompts
        </h1>
        <p className="mt-2 text-sm text-text-secondary">
          {savedPrompts.length} {savedPrompts.length === 1 ? "prompt" : "prompts"} saved on this device.
        </p>
      </div>

      <div className="mt-10">
        {savedPrompts.length === 0 ? (
          <EmptyState
            icon={Bookmark}
            title="Nothing saved yet"
            description="Tap the bookmark icon on any prompt to keep it here for quick access."
            action={<LinkButton href="/prompts">Browse prompts</LinkButton>}
          />
        ) : (
          <StaggerGroup className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {savedPrompts.map((p) => (
              <motion.div key={p.id} variants={staggerItem} className="h-full">
                <PromptCard prompt={p} />
              </motion.div>
            ))}
          </StaggerGroup>
        )}
      </div>
    </div>
  );
}
