"use client";

import { collections } from "@/data/collections";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, staggerItem } from "@/components/ui/scroll-reveal";
import { CollectionCard } from "@/components/collection/collection-card";
import { motion } from "framer-motion";

export function CollectionsSection() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-24">
      <SectionHeading
        eyebrow="Featured collections"
        title="Curated kits for specific goals"
        description="Prompt sets bundled around a single outcome — built by people who use them daily."
        cta={{ label: "View all collections", href: "/collections" }}
        className="mb-10"
      />
      <StaggerGroup className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {collections.slice(0, 3).map((c) => (
          <motion.div key={c.id} variants={staggerItem} className="h-full">
            <CollectionCard collection={c} />
          </motion.div>
        ))}
      </StaggerGroup>
    </section>
  );
}
