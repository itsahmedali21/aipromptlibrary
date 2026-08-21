import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-[var(--radius-lg)] border border-dashed border-border py-20 text-center">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-border bg-surface-2 text-text-tertiary">
        <Icon className="h-6 w-6" strokeWidth={1.5} />
      </span>
      <div>
        <p className="font-display text-lg font-medium text-text-primary">{title}</p>
        <p className="mx-auto mt-1.5 max-w-sm text-sm text-text-secondary">{description}</p>
      </div>
      {action}
    </div>
  );
}
