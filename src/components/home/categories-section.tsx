"use client";

import { categories } from "@/data/categories";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, staggerItem } from "@/components/ui/scroll-reveal";
import { CategoryCard } from "@/components/category/category-card";
import { motion } from "framer-motion";

export function CategoriesSection() {
  return (
    <section className="border-t border-border bg-bg-elevated">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-24">
        <SectionHeading
          eyebrow="Browse by discipline"
          title="A category for every kind of work"
          description="Ten focused disciplines, each stocked with prompts vetted for quality and real-world use."
          cta={{ label: "View all categories", href: "/categories" }}
          className="mb-10"
        />
        <StaggerGroup className="grid grid-cols-2 items-stretch gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((c) => (
            <motion.div key={c.id} variants={staggerItem} className="h-full">
              <CategoryCard category={c} />
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
