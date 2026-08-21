"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useToast } from "./toast-context";

interface SavedPromptsContextValue {
  savedIds: string[];
  isSaved: (id: string) => boolean;
  toggleSaved: (id: string, title?: string) => void;
}

const SavedPromptsContext = createContext<SavedPromptsContextValue | null>(null);
const STORAGE_KEY = "promptfolio:saved-prompts";

export function SavedPromptsProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      // One-time sync from the external localStorage system on mount.
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setSavedIds(JSON.parse(raw));
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds));
  }, [savedIds, hydrated]);

  const value = useMemo<SavedPromptsContextValue>(
    () => ({
      savedIds,
      isSaved: (id: string) => savedIds.includes(id),
      toggleSaved: (id: string, title?: string) => {
        setSavedIds((prev) => {
          const exists = prev.includes(id);
          if (exists) {
            showToast(title ? `Removed “${title}” from saved` : "Removed from saved");
            return prev.filter((x) => x !== id);
          }
          showToast(title ? `Saved “${title}”` : "Saved");
          return [...prev, id];
        });
      },
    }),
    [savedIds, showToast]
  );

  return <SavedPromptsContext.Provider value={value}>{children}</SavedPromptsContext.Provider>;
}

export function useSavedPrompts() {
  const ctx = useContext(SavedPromptsContext);
  if (!ctx) throw new Error("useSavedPrompts must be used within SavedPromptsProvider");
  return ctx;
}
