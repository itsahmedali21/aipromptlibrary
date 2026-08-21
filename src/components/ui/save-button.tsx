"use client";

import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSavedPrompts } from "@/context/saved-prompts-context";

export function SaveButton({
  id,
  title,
  variant = "icon",
  className,
}: {
  id: string;
  title?: string;
  variant?: "icon" | "labeled";
  className?: string;
}) {
  const { isSaved, toggleSaved } = useSavedPrompts();
  const saved = isSaved(id);

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? "Remove from saved prompts" : "Save prompt"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleSaved(id, title);
      }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full transition-colors duration-[var(--dur-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        variant === "icon"
          ? "h-9 w-9 border border-border-strong bg-surface-2 hover:border-accent/50 hover:text-accent"
          : "h-11 px-5 text-sm font-medium border border-border-strong hover:border-accent/50 hover:text-accent",
        saved && "border-accent/50 text-accent",
        className
      )}
    >
      <motion.span
        key={saved ? "on" : "off"}
        initial={{ scale: 0.6 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 14 }}
        className="inline-flex"
      >
        <Bookmark className="h-4 w-4" strokeWidth={2.25} fill={saved ? "currentColor" : "none"} />
      </motion.span>
      {variant === "labeled" && <span>{saved ? "Saved" : "Save"}</span>}
    </button>
  );
}
