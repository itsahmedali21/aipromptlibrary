import type { FC } from "react";
import type { CollectionCoverVariant } from "@/data/types";
import { cn } from "@/lib/utils";

/**
 * Five unique abstract line-art covers, one per collection archetype.
 * Same visual family (thin structural strokes + a single accent highlight)
 * so the set reads as one system rather than five unrelated icons.
 */

type CoverVariant = CollectionCoverVariant;

const commonProps = {
  viewBox: "0 0 400 200",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
} as const;

function ContentCover({ className }: { className?: string }) {
  return (
    <svg {...commonProps} className={className} aria-hidden>
      <path
        d="M20 130 C 90 70, 150 170, 220 110 S 340 60, 380 100"
        stroke="var(--border-strong)"
        strokeWidth="1.5"
      />
      <path d="M20 160 C 90 110, 150 190, 220 150 S 340 110, 380 145" stroke="var(--border)" strokeWidth="1.5" />
      <circle cx="150" cy="150" r="4" fill="var(--accent)" />
      <circle cx="252" cy="92" r="4" fill="var(--accent)" />
      <circle cx="310" cy="130" r="3" fill="var(--text-tertiary)" />
      <circle cx="70" cy="95" r="3" fill="var(--text-tertiary)" />
    </svg>
  );
}

function MarketingCover({ className }: { className?: string }) {
  return (
    <svg {...commonProps} className={className} aria-hidden>
      <g stroke="var(--border-strong)" strokeWidth="1.5">
        <circle cx="60" cy="150" r="40" />
        <circle cx="60" cy="150" r="72" opacity="0.7" />
        <circle cx="60" cy="150" r="104" opacity="0.4" />
      </g>
      <circle cx="60" cy="150" r="10" fill="var(--accent)" />
      <circle cx="180" cy="60" r="3" fill="var(--text-tertiary)" />
      <circle cx="240" cy="110" r="4" fill="var(--accent)" />
      <circle cx="300" cy="55" r="3" fill="var(--text-tertiary)" />
      <circle cx="330" cy="130" r="3" fill="var(--text-tertiary)" />
      <circle cx="260" cy="170" r="3" fill="var(--text-tertiary)" />
    </svg>
  );
}

function SeoCover({ className }: { className?: string }) {
  return (
    <svg {...commonProps} className={className} aria-hidden>
      <g stroke="var(--border-strong)" strokeWidth="1.5">
        <line x1="40" y1="160" x2="40" y2="120" />
        <line x1="80" y1="160" x2="80" y2="90" />
        <line x1="120" y1="160" x2="120" y2="135" />
        <line x1="160" y1="160" x2="160" y2="70" />
        <line x1="200" y1="160" x2="200" y2="105" />
      </g>
      <circle cx="290" cy="90" r="42" stroke="var(--accent)" strokeWidth="2" />
      <line x1="320" y1="122" x2="360" y2="160" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 165 L 360 165" stroke="var(--border)" strokeWidth="1" />
    </svg>
  );
}

function EngineeringCover({ className }: { className?: string }) {
  return (
    <svg {...commonProps} className={className} aria-hidden>
      <path
        d="M130 55 L 75 100 L 130 145"
        stroke="var(--border-strong)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M230 55 L 285 100 L 230 145"
        stroke="var(--border-strong)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="190" y1="45" x2="168" y2="155" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="330" cy="70" r="3" fill="var(--text-tertiary)" />
      <circle cx="350" cy="120" r="3" fill="var(--text-tertiary)" />
      <circle cx="320" cy="150" r="3" fill="var(--accent)" />
      <path d="M310 150 L 340 120 L 340 70" stroke="var(--border)" strokeWidth="1" />
    </svg>
  );
}

function FoundersCover({ className }: { className?: string }) {
  return (
    <svg {...commonProps} className={className} aria-hidden>
      <path
        d="M30 165 L 110 165 L 110 125 L 190 125 L 190 90 L 270 90 L 270 50 L 340 50"
        stroke="var(--border-strong)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="110" cy="125" r="3.5" fill="var(--text-tertiary)" />
      <circle cx="190" cy="90" r="3.5" fill="var(--text-tertiary)" />
      <circle cx="270" cy="50" r="3.5" fill="var(--text-tertiary)" />
      <circle cx="340" cy="50" r="6" fill="var(--accent)" />
      <g stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round">
        <line x1="340" y1="30" x2="340" y2="18" />
        <line x1="356" y1="36" x2="365" y2="27" />
        <line x1="362" y1="50" x2="376" y2="50" />
      </g>
    </svg>
  );
}

const variantMap: Record<CoverVariant, FC<{ className?: string }>> = {
  content: ContentCover,
  marketing: MarketingCover,
  seo: SeoCover,
  engineering: EngineeringCover,
  founders: FoundersCover,
};

export function CollectionCover({ variant, className }: { variant: CoverVariant; className?: string }) {
  const Cover = variantMap[variant];
  return <Cover className={cn("h-full w-full", className)} />;
}
