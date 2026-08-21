/**
 * Abstract "stacked, reviewed documents" motif for the About page —
 * layered card outlines with a checkmark accent, echoing the editorial
 * review process described on that page.
 */
export function EditorialStackIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 320" fill="none" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
      <rect x="70" y="60" width="220" height="150" rx="14" stroke="var(--border)" strokeWidth="1.5" />
      <rect x="95" y="90" width="220" height="150" rx="14" stroke="var(--border-strong)" strokeWidth="1.5" fill="var(--surface)" />
      <line x1="125" y1="125" x2="245" y2="125" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" />
      <line x1="125" y1="150" x2="285" y2="150" stroke="var(--border-strong)" strokeWidth="2" strokeLinecap="round" />
      <line x1="125" y1="175" x2="265" y2="175" stroke="var(--border-strong)" strokeWidth="2" strokeLinecap="round" />
      <line x1="125" y1="200" x2="220" y2="200" stroke="var(--border-strong)" strokeWidth="2" strokeLinecap="round" />

      <circle cx="330" cy="95" r="30" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <path
        d="M317 95 L 327 105 L 345 84"
        stroke="var(--accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle cx="60" cy="230" r="4" fill="var(--text-tertiary)" />
      <circle cx="345" cy="220" r="3" fill="var(--text-tertiary)" />
      <circle cx="370" cy="150" r="3" fill="var(--accent)" />
    </svg>
  );
}
