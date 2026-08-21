import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategoryBySlug } from "@/data/categories";
import { getPromptsByCategory } from "@/data/prompts";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { DynamicIcon } from "@/lib/icon-map";
import { CategoryPromptGrid } from "@/components/category/category-prompt-grid";
import { EmptyState } from "@/components/ui/empty-state";
import { Inbox } from "lucide-react";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Category not found" };
  return {
    title: `${category.name} Prompts`,
    description: category.description,
    alternates: { canonical: `/categories/${category.slug}` },
  };
}

export default async function CategoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const categoryPrompts = getPromptsByCategory(category.slug);

  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-24 pt-10 sm:px-8 sm:pt-14">
      <Breadcrumb items={[{ label: "Categories", href: "/categories" }, { label: category.name }]} />

      <div className="mt-8 flex flex-col gap-6 border-b border-border pb-12 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-start gap-5">
          <span className="mt-1 inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-[var(--radius-md)] border border-border-strong bg-surface-2 text-accent">
            <DynamicIcon name={category.icon} className="h-6 w-6" strokeWidth={1.75} />
          </span>
          <div>
            <h1 className="font-display text-[clamp(2rem,4vw,2.75rem)] font-medium tracking-[-0.02em] text-text-primary">
              {category.name}
            </h1>
            <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-text-secondary">{category.description}</p>
          </div>
        </div>
        <p className="shrink-0 text-sm text-text-tertiary">{categoryPrompts.length} prompts available</p>
      </div>

      <div className="mt-12">
        {categoryPrompts.length === 0 ? (
          <EmptyState
            icon={Inbox}
            title="No prompts published yet"
            description="This category is being stocked — check back soon or explore another discipline."
          />
        ) : (
          <CategoryPromptGrid prompts={categoryPrompts} />
        )}
      </div>
    </div>
  );
}
