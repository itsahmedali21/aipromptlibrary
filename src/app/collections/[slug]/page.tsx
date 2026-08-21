import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Layers, ArrowRight } from "lucide-react";
import { collections, getCollectionBySlug } from "@/data/collections";
import { prompts } from "@/data/prompts";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { PromptCard } from "@/components/prompt/prompt-card";
import { LinkButton } from "@/components/ui/button";
import { CollectionCover } from "@/components/illustrations";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return { title: "Collection not found" };
  return {
    title: collection.title,
    description: collection.description,
    alternates: { canonical: `/collections/${collection.slug}` },
  };
}

export default async function CollectionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();

  const collectionPrompts = collection.promptSlugs
    .map((s) => prompts.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-24 pt-10 sm:px-8 sm:pt-14">
      <Breadcrumb items={[{ label: "Collections", href: "/collections" }, { label: collection.title }]} />

      <div className="relative mt-8 overflow-hidden rounded-[var(--radius-xl)] border border-border bg-surface px-6 py-14 sm:px-12 sm:py-20">
        <CollectionCover
          variant={collection.coverVariant}
          className="pointer-events-none absolute inset-0 h-full w-full opacity-50"
        />
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-bg-elevated px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.1em] text-text-secondary">
            <Layers className="h-3 w-3 text-accent" />
            {collection.coverLabel}
          </span>
          <h1 className="mt-6 max-w-2xl text-balance font-display text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.02em] text-text-primary">
            {collection.title}
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-[16px] leading-relaxed text-text-secondary">
            {collection.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <p className="text-sm text-text-tertiary">
              {collectionPrompts.length} prompts · {collection.price}
            </p>
            <LinkButton href="/prompts" variant="secondary" size="sm" icon={<ArrowRight className="h-3.5 w-3.5" />}>
              Browse full library
            </LinkButton>
          </div>
        </div>
      </div>

      <div className="mt-14 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {collectionPrompts.map((p) => (
          <PromptCard key={p.id} prompt={p} variant="standard" />
        ))}
      </div>
    </div>
  );
}
