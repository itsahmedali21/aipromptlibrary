"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SearchX } from "lucide-react";
import { prompts } from "@/data/prompts";
import { sortPrompts } from "@/data/prompts";
import type { SortOption } from "@/data/types";
import { SearchBar } from "./search-bar";
import { FilterBar } from "./filter-bar";
import { PromptCard } from "./prompt-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Pagination } from "@/components/ui/pagination";
import { StaggerGroup, staggerItem } from "@/components/ui/scroll-reveal";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 9;

export function PromptsExplorer({
  initialCategory = "all",
  initialSort = "popular",
}: {
  initialCategory?: string;
  initialSort?: SortOption;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState<SortOption>(initialSort);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = prompts;
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return sortPrompts(list, sort);
  }, [category, query, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function resetPage() {
    setPage(1);
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-5">
        <SearchBar
          value={query}
          onChange={(v) => {
            setQuery(v);
            resetPage();
          }}
        />
        <FilterBar
          activeCategory={category}
          onCategoryChange={(c) => {
            setCategory(c);
            resetPage();
          }}
          sort={sort}
          onSortChange={(s) => {
            setSort(s);
            resetPage();
          }}
        />
      </div>

      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-text-tertiary">
          {filtered.length} {filtered.length === 1 ? "prompt" : "prompts"}
        </p>
      </div>

      {pageItems.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="No prompts match those filters"
          description="Try a different search term, switch categories, or clear your filters to see everything."
          action={
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setQuery("");
                setCategory("all");
                resetPage();
              }}
            >
              Clear filters
            </Button>
          }
        />
      ) : (
        <StaggerGroup
          key={`${category}-${sort}-${query}-${page}`}
          className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {pageItems.map((p) => (
            <motion.div key={p.id} variants={staggerItem} className="h-full">
              <PromptCard prompt={p} />
            </motion.div>
          ))}
        </StaggerGroup>
      )}

      <div className="mt-12">
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>
    </div>
  );
}
