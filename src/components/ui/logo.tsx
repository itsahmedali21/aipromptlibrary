import { cn } from "@/lib/utils";

/**
 * Custom Promptfolio logomark — a monoline "P" with a spark accent, drawn as
 * original artwork (not a stock icon) so it stays legible and on-brand at
 * any size. Uses currentColor / the accent token so it adapts automatically
 * between the light and dark themes without any extra logic.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("h-4 w-4", className)}
      aria-hidden="true"
    >
      <path
        d="M8 5V19"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M8 5H12.4C14.9188 5 17 6.88 17 9.3C17 11.72 14.9188 13.4 12.4 13.4H8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="17.5" cy="5.5" r="1.4" fill="currentColor" />
    </svg>
  );
}

/**
 * Full lockup — badge + icon + wordmark. Used anywhere the brand mark and
 * name appear together; pass `wordmark={false}` for icon-only contexts.
 */
export function Logo({
  className,
  badgeClassName,
  markClassName,
  wordmark = true,
}: {
  className?: string;
  badgeClassName?: string;
  markClassName?: string;
  wordmark?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <span
        className={cn(
          "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border-strong bg-surface-2 text-accent transition-colors",
          badgeClassName
        )}
      >
        <LogoMark className={cn("h-4 w-4", markClassName)} />
      </span>
      {wordmark && (
        <span className="font-display text-[19px] font-medium tracking-[-0.01em] text-text-primary">
          Promptfolio
        </span>
      )}
    </span>
  );
}
