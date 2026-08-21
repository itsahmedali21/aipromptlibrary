"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Search, SearchX } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { prompts } from "@/data/prompts";
import { categories } from "@/data/categories";
import { Badge } from "./badge";

const suggestions = ["positioning statement", "code review", "SEO audit", "hook variation", "board update"];

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      // Reset transient UI state whenever the overlay (an external,
      // imperatively-opened surface) transitions to open.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery("");
      setActiveIndex(0);
      const t = window.setTimeout(() => inputRef.current?.focus(), 60);
      document.body.style.overflow = "hidden";
      return () => {
        window.clearTimeout(t);
      };
    }
    document.body.style.overflow = "";
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return prompts
      .filter((p) => {
        const category = categories.find((c) => c.slug === p.category);
        return (
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          category?.name.toLowerCase().includes(q)
        );
      })
      .slice(0, 7);
  }, [query]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter" && results[activeIndex]) {
        router.push(`/prompts/${results[activeIndex].slug}`);
        onClose();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, activeIndex, router, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div className="absolute inset-0 bg-black/65 backdrop-blur-sm" onClick={onClose} aria-hidden />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search prompts"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.99 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="card-shadow-elevated relative z-10 w-full max-w-xl overflow-hidden rounded-[var(--radius-lg)] border border-border-strong bg-surface"
          >
            <div className="flex items-center gap-3 border-b border-border px-5 py-4">
              <Search className="h-4.5 w-4.5 shrink-0 text-text-tertiary" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                placeholder="Search prompts, categories, use cases…"
                className="w-full bg-transparent text-[15px] text-text-primary placeholder:text-text-tertiary focus:outline-none"
                aria-label="Search prompts"
              />
              <kbd className="hidden shrink-0 rounded-md border border-border px-1.5 py-0.5 text-[10px] text-text-tertiary sm:inline-block">
                ESC
              </kbd>
            </div>

            <div className="max-h-[52vh] overflow-y-auto p-2">
              {query.trim() === "" && (
                <div className="p-4">
                  <p className="mb-3 px-1 text-xs font-medium uppercase tracking-[0.1em] text-text-tertiary">
                    Try searching for
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => setQuery(s)}
                        className="rounded-full border border-border bg-surface-2 px-3 py-1.5 text-[13px] text-text-secondary transition-colors hover:border-accent/40 hover:text-accent"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {query.trim() !== "" && results.length === 0 && (
                <div className="flex flex-col items-center gap-3 px-6 py-14 text-center">
                  <SearchX className="h-8 w-8 text-text-tertiary" strokeWidth={1.5} />
                  <p className="text-sm text-text-secondary">
                    No prompts found for <span className="text-text-primary">“{query}”</span>
                  </p>
                  <p className="text-xs text-text-tertiary">Try a broader term or browse by category instead.</p>
                </div>
              )}

              {results.map((r, i) => {
                const category = categories.find((c) => c.slug === r.category);
                return (
                  <Link
                    key={r.id}
                    href={`/prompts/${r.slug}`}
                    onClick={onClose}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={`flex items-center justify-between gap-4 rounded-[var(--radius-md)] px-4 py-3 transition-colors ${
                      i === activeIndex ? "bg-surface-2" : ""
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-text-primary">{r.title}</p>
                      <p className="truncate text-xs text-text-tertiary">{r.description}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      {category && <Badge className="hidden sm:inline-flex">{category.name}</Badge>}
                      <ArrowRight className="h-3.5 w-3.5 text-text-tertiary" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
