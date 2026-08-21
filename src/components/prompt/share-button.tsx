"use client";

import { Share2 } from "lucide-react";
import { useToast } from "@/context/toast-context";

export function ShareButton({ title }: { title: string }) {
  const { showToast } = useToast();

  async function handleShare() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // user cancelled or share failed — fall through to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      showToast("Link copied to clipboard");
    } catch {
      showToast("Unable to copy link");
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label="Share this prompt"
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-strong bg-surface-2 text-text-secondary transition-colors hover:border-accent/50 hover:text-accent"
    >
      <Share2 className="h-4 w-4" strokeWidth={2} />
    </button>
  );
}
