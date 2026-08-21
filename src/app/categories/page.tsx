import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { categories } from "@/data/categories";
import { CategoryCard } from "@/components/category/category-card";

export const metadata: Metadata = {
  title: "Prompt Categories",
  description: "Browse the full library organized into ten focused disciplines, from writing to code to research.",
  alternates: { canonical: "/categories" },
};

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-24 pt-14 sm:px-8 sm:pt-20">
      <SectionHeading
        eyebrow="Explore by discipline"
        title="Every category in the library"
        description="Ten focused disciplines, each vetted for quality and depth."
        className="mb-12"
      />
      <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <CategoryCard key={c.id} category={c} />
        ))}
      </div>
    </div>
  );
}
