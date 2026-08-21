import Link from "next/link";
import type { ReactNode } from "react";
import { OrbitRings } from "@/components/illustrations";
import { LogoMark } from "@/components/ui/logo";

export function AuthCard({
  eyebrow,
  title,
  description,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-5 py-16">
      <div className="grid-pattern radial-fade pointer-events-none absolute inset-0" aria-hidden />
      <OrbitRings className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 opacity-30" />
      <div className="relative z-10 w-full max-w-md rounded-[var(--radius-lg)] border border-border bg-surface p-8 sm:p-10">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border-strong bg-surface-2 text-accent">
            <LogoMark className="h-4 w-4" />
          </span>
          <span className="font-display text-[19px] font-medium text-text-primary">Promptfolio</span>
        </Link>

        <p className="text-center text-xs font-medium uppercase tracking-[0.14em] text-accent">{eyebrow}</p>
        <h1 className="mt-2 text-center font-display text-2xl font-medium text-text-primary">{title}</h1>
        <p className="mt-2 text-center text-sm text-text-secondary">{description}</p>

        <div className="mt-8">{children}</div>
        <div className="mt-6 text-center text-sm text-text-secondary">{footer}</div>
      </div>
    </div>
  );
}
