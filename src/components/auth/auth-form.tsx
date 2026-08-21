"use client";

/**
 * UI-only auth form. There is no backend wired up yet — `handleSubmit`
 * is the single seam to connect to real authentication (NextAuth,
 * Clerk, Supabase Auth, a custom API route, etc). Swap the body of
 * handleSubmit and this component needs no other changes.
 */

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // TODO: replace with a real auth call. Redirecting to /dashboard for now
    // so the rest of the authenticated UI can be reviewed end to end.
    window.setTimeout(() => {
      router.push("/dashboard");
    }, 700);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {mode === "signup" && (
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-text-primary">
            Full name
          </label>
          <input
            id="name"
            type="text"
            required
            className="w-full rounded-[var(--radius-md)] border border-border-strong bg-surface-2 px-4 py-3 text-sm text-text-primary focus:border-accent/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          />
        </div>
      )}
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-text-primary">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          className="w-full rounded-[var(--radius-md)] border border-border-strong bg-surface-2 px-4 py-3 text-sm text-text-primary focus:border-accent/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium text-text-primary">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          minLength={8}
          className="w-full rounded-[var(--radius-md)] border border-border-strong bg-surface-2 px-4 py-3 text-sm text-text-primary focus:border-accent/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        />
      </div>
      <Button type="submit" size="md" className="mt-2 w-full justify-center" disabled={loading}>
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" /> {mode === "login" ? "Signing in" : "Creating account"}
          </span>
        ) : mode === "login" ? (
          "Sign in"
        ) : (
          "Create account"
        )}
      </Button>
    </form>
  );
}
