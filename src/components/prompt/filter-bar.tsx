"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { categories } from "@/data/categories";
import type { SortOption } from "@/data/types";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "popular", label: "Popular" },
  { value: "newest", label: "Newest" },
  { value: "most-copied", label: "Most Copied" },
  { value: "trending", label: "Trending" },
];

export function FilterBar({
  activeCategory,
  onCategoryChange,
  sort,
  onSortChange,
}: {
  activeCategory: string;
  onCategoryChange: (slug: string) => void;
  sort: SortOption;
  onSortChange: (s: SortOption) => void;
}) {
  const filters = [{ slug: "all", name: "All" }, ...categories];

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div
        className="scrollbar-none -mx-1 flex min-w-0 flex-1 gap-2 overflow-x-auto px-1 pb-1"
        style={{ maskImage: "linear-gradient(to right, black calc(100% - 24px), transparent)" }}
      >
        {filters.map((f) => {
          const active = activeCategory === f.slug;
          return (
            <button
              key={f.slug}
              onClick={() => onCategoryChange(f.slug)}
              className={cn(
                "relative shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
                active ? "text-accent-text-on" : "text-text-secondary hover:text-text-primary"
              )}
            >
              {active && (
                <motion.span
                  layoutId="filter-active-pill"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{f.name}</span>
            </button>
          );
        })}
      </div>

      <div className="relative shrink-0 self-start lg:self-auto">
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
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
  );
}
