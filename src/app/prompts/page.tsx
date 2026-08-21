import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { PromptsExplorer } from "@/components/prompt/prompts-explorer";
import type { SortOption } from "@/data/types";

export const metadata: Metadata = {
  title: "Browse AI Prompts",
  description:
    "Search and filter hundreds of professionally crafted AI prompts by category, difficulty, and popularity.",
  alternates: { canonical: "/prompts" },
};

const validSorts: SortOption[] = ["popular", "newest", "most-copied", "trending"];

export default async function PromptsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const category = params.category ?? "all";
  const sort = validSorts.includes(params.sort as SortOption) ? (params.sort as SortOption) : "popular";

  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-24 pt-14 sm:px-8 sm:pt-20">
      <SectionHeading
        eyebrow="The full library"
        title="Every prompt, one search away"
        description="Search, filter, and sort professionally crafted prompts across ten disciplines."
        className="mb-12"
      />
      <PromptsExplorer initialCategory={category} initialSort={sort} />
    </div>
  );
}
