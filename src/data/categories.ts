import type { Category } from "./types";
import { prompts } from "./prompts";

const baseCategories: Omit<Category, "promptCount">[] = [
  {
    id: "cat-writing",
    slug: "writing",
    name: "Writing",
    description: "Long-form, editorial, and narrative prompts for polished prose.",
    icon: "PenLine",
    accentColor: "#B5651D",
  },
  {
    id: "cat-marketing",
    slug: "marketing",
    name: "Marketing",
    description: "Campaigns, positioning, and copy that moves an audience.",
    icon: "Megaphone",
    accentColor: "#B23A48",
  },
  {
    id: "cat-design",
    slug: "design",
    name: "Design",
    description: "Concepting, moodboards, and creative direction prompts.",
    icon: "Palette",
    accentColor: "#7B4B94",
  },
  {
    id: "cat-coding",
    slug: "coding",
    name: "Coding",
    description: "Architecture, refactors, reviews, and developer workflows.",
    icon: "Code2",
    accentColor: "#3A6EA5",
  },
  {
    id: "cat-seo",
    slug: "seo",
    name: "SEO",
    description: "Technical audits, keyword strategy, and search-ready content.",
    icon: "Search",
    accentColor: "#3F7D58",
  },
  {
    id: "cat-business",
    slug: "business",
    name: "Business",
    description: "Strategy, operations, and decision-support frameworks.",
    icon: "Briefcase",
    accentColor: "#8A6D3B",
  },
  {
    id: "cat-education",
    slug: "education",
    name: "Education",
    description: "Curriculum design, tutoring, and explanation prompts.",
    icon: "GraduationCap",
    accentColor: "#4A5899",
  },
  {
    id: "cat-productivity",
    slug: "productivity",
    name: "Productivity",
    description: "Systems, planning rituals, and personal operating models.",
    icon: "Zap",
    accentColor: "#C08A2E",
  },
  {
    id: "cat-research",
    slug: "research",
    name: "Research",
    description: "Synthesis, literature review, and analytical deep dives.",
    icon: "FlaskConical",
    accentColor: "#2E8C82",
  },
  {
    id: "cat-social-media",
    slug: "social-media",
    name: "Social Media",
    description: "Hooks, calendars, and platform-native content prompts.",
    icon: "Share2",
    accentColor: "#C2477A",
  },
];

// promptCount is always derived from the actual prompt library, so it can
// never drift out of sync with what search/filters/category pages show.
export const categories: Category[] = baseCategories.map((c) => ({
  ...c,
  promptCount: prompts.filter((p) => p.category === c.slug).length,
}));

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}
