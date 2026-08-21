/**
 * ============================================================
 * DATA CONTRACTS
 * ------------------------------------------------------------
 * These types describe the shape of every content entity in the
 * product. Swap `src/data/*.ts` for calls to a real database or
 * CMS (Sanity, Contentful, Supabase, etc.) — every component in
 * this project consumes data through these types, so the UI layer
 * never needs to change.
 * ============================================================
 */

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type CategorySlug =
  | "writing"
  | "marketing"
  | "design"
  | "coding"
  | "seo"
  | "business"
  | "education"
  | "productivity"
  | "research"
  | "social-media";

export interface Author {
  id: string;
  name: string;
  role: string;
  avatarInitials: string;
}

export interface PromptVariable {
  key: string;
  label: string;
  example: string;
}

export interface Prompt {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  category: CategorySlug;
  tags: string[];
  author: Author;
  featured: boolean;
  large?: boolean;
  popularity: number; // 0-100 relative score
  usageCount: number; // total copies
  createdAt: string; // ISO date
  difficulty: Difficulty;
  variables?: PromptVariable[];
  exampleOutput?: string;
  tips?: string[];
}

export interface Category {
  id: string;
  slug: CategorySlug;
  name: string;
  description: string;
  icon: string; // lucide-react icon name
  promptCount: number;
}

export type CollectionCoverVariant = "content" | "marketing" | "seo" | "engineering" | "founders";

export interface Collection {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverLabel: string;
  coverVariant: CollectionCoverVariant;
  promptSlugs: string[];
  price?: string;
}

export type SortOption = "popular" | "newest" | "most-copied" | "trending";
