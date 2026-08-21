import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { collections } from "@/data/collections";
import { CollectionCard } from "@/components/collection/collection-card";

export const metadata: Metadata = {
  title: "Prompt Collections",
  description: "Curated prompt kits bundled around a single outcome — content, marketing, SEO, engineering, and founders.",
  alternates: { canonical: "/collections" },
};

export default function CollectionsPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-24 pt-14 sm:px-8 sm:pt-20">
      <SectionHeading
        eyebrow="Curated kits"
        title="Collections built around outcomes"
        description="Every collection bundles the prompts you'd reach for to accomplish one specific goal."
        className="mb-12"
      />
      <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((c) => (
          <CollectionCard key={c.id} collection={c} />
        ))}
      </div>
    </div>
  );
}
