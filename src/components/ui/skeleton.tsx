import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-[var(--radius-md)] bg-surface-2", className)} />;
}

export function PromptCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-[var(--radius-lg)] border border-border bg-surface p-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <Skeleton className="h-5 w-4/5" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="mt-2 flex items-center justify-between border-t border-border pt-4">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-9 w-20 rounded-full" />
      </div>
    </div>
  );
}
