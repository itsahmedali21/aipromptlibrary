import type { Collection } from "./types";

export const collections: Collection[] = [
  {
    id: "col-1",
    slug: "best-prompts-for-content-creators",
    title: "Best Prompts for Content Creators",
    description:
      "A working kit for writers and creators shipping content every week — hooks, calendars, essays, and scripts in one place.",
    coverLabel: "Content",
    coverVariant: "content",
    promptSlugs: [
      "editorial-long-form-essay-builder",
      "hook-variation-generator",
      "content-calendar-architect",
      "short-form-video-script-builder",
      "linkedin-thought-leadership-post",
    ],
    price: "Free",
  },
  {
    id: "col-2",
    slug: "ai-marketing-toolkit",
    title: "AI Marketing Toolkit",
    description:
      "Positioning, outbound, launches, and brand voice — the prompts a marketing team reaches for every quarter.",
    coverLabel: "Marketing",
    coverVariant: "marketing",
    promptSlugs: [
      "positioning-statement-generator",
      "cold-email-sequence-architect",
      "product-launch-narrative",
      "customer-persona-deep-dive",
      "brand-voice-codifier",
    ],
    price: "Free",
  },
  {
    id: "col-3",
    slug: "ultimate-seo-collection",
    title: "Ultimate SEO Collection",
    description: "From keyword architecture to technical audits — everything to plan and ship search-ready content.",
    coverLabel: "SEO",
    coverVariant: "seo",
    promptSlugs: [
      "keyword-cluster-architect",
      "technical-seo-audit-checklist",
      "serp-intent-matcher",
    ],
    price: "Free",
  },
  {
    id: "col-4",
    slug: "developer-productivity-pack",
    title: "Developer Productivity Pack",
    description: "Code review, refactor planning, API design, and RFC drafting for engineering teams that move fast.",
    coverLabel: "Engineering",
    coverVariant: "engineering",
    promptSlugs: [
      "code-review-companion",
      "refactor-planning-assistant",
      "api-design-reviewer",
      "bug-triage-interrogator",
      "technical-rfc-drafting",
    ],
    price: "Free",
  },
  {
    id: "col-5",
    slug: "startup-founder-toolkit",
    title: "Startup Founder Toolkit",
    description: "Sharpen the pitch, stress-test strategy, and keep the board update tight — founder essentials.",
    coverLabel: "Founders",
    coverVariant: "founders",
    promptSlugs: [
      "startup-pitch-sharpener",
      "swot-deep-analysis",
      "pricing-strategy-advisor",
      "board-update-composer",
    ],
    price: "Free",
  },
];

export function getCollectionBySlug(slug: string) {
  return collections.find((c) => c.slug === slug);
}
