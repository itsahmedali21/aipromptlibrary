"use client";

import { Search, X } from "lucide-react";

export function SearchBar({
  value,
  onChange,
  placeholder = "Search prompts, categories, use cases…",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative flex items-center">
      <Search className="pointer-events-none absolute left-4 h-4.5 w-4.5 text-text-tertiary" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search prompts"
        className="h-13 w-full rounded-full border border-border-strong bg-surface py-3.5 pl-12 pr-11 text-[15px] text-text-primary placeholder:text-text-tertiary transition-colors focus:border-accent/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-4 inline-flex h-6 w-6 items-center justify-center rounded-full text-text-tertiary transition-colors hover:bg-surface-2 hover:text-text-primary"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
