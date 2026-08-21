"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { Prompt, SortOption } from "@/data/types";
import { sortPrompts } from "@/data/prompts";
import { PromptCard } from "@/components/prompt/prompt-card";
import { StaggerGroup, staggerItem } from "@/components/ui/scroll-reveal";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "popular", label: "Popular" },
  { value: "newest", label: "Newest" },
  { value: "most-copied", label: "Most Copied" },
  { value: "trending", label: "Trending" },
];

export function CategoryPromptGrid({ prompts }: { prompts: Prompt[] }) {
  const [sort, setSort] = useState<SortOption>("popular");
  const sorted = useMemo(() => sortPrompts(prompts, sort), [prompts, sort]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-text-tertiary">
          {sorted.length} {sorted.length === 1 ? "prompt" : "prompts"}
        </p>
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            aria-label="Sort prompts"
            className="h-10 appearance-none rounded-full border border-border-strong bg-surface-2 pl-4 pr-9 text-sm font-medium text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                Sort: {o.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-tertiary" />
        </div>
      </div>
      <StaggerGroup key={sort} className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p) => (
          <motion.div key={p.id} variants={staggerItem} className="h-full">
            <PromptCard prompt={p} />
          </motion.div>
        ))}
      </StaggerGroup>
    </div>
  );
}
