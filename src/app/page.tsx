import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { PromptSection } from "@/components/home/prompt-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { CollectionsSection } from "@/components/home/collections-section";
import { GeneratorTeaser } from "@/components/home/generator-teaser";
import { CtaBanner } from "@/components/home/cta-banner";
import { getFeaturedPrompts, sortPrompts, prompts } from "@/data/prompts";

export const metadata: Metadata = {
  title: "Promptfolio — The Premium AI Prompt Library",
  description:
    "Discover, save, and ship better AI prompts. A curated library of professionally crafted prompts for writing, marketing, design, code, SEO, and more.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const featured = getFeaturedPrompts().slice(0, 3);
  const popular = sortPrompts(prompts, "popular").slice(0, 6);
  const newest = sortPrompts(prompts, "newest").slice(0, 3);

  return (
    <>
      <Hero />

      <PromptSection
        eyebrow="Featured"
        title="Hand-picked prompts, worth the extra polish"
        description="The prompts our editors return to again and again — reliable output, minimal tweaking."
        prompts={featured}
        variant="featured"
        cta={{ label: "View all featured", href: "/prompts?sort=trending" }}
      />

      <PromptSection
        eyebrow="Popular this month"
        title="What the community is copying most"
        description="Ranked by real usage — these are the prompts people keep coming back to."
        prompts={popular}
        cta={{ label: "See popular prompts", href: "/prompts?sort=popular" }}
      />

      <CategoriesSection />

      <GeneratorTeaser />

      <PromptSection
        eyebrow="Newly added"
        title="Fresh off the editorial desk"
        description="New prompts, added weekly, reviewed for clarity and output quality before publishing."
        prompts={newest}
        columns={3}
        cta={{ label: "See what's new", href: "/prompts?sort=newest" }}
      />

      <CollectionsSection />

      <CtaBanner />
    </>
  );
}
