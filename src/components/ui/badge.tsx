import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type BadgeVariant = "default" | "accent" | "outline" | "dot";

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em]",
        variant === "default" && "bg-surface-2 text-text-secondary border border-border",
        variant === "accent" && "bg-accent-soft text-accent border border-border-accent",
        variant === "outline" && "border border-border-strong text-text-secondary",
        variant === "dot" && "text-text-secondary",
        className
      )}
    >
      {variant === "dot" && <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />}
      {children}
    </span>
  );
}
