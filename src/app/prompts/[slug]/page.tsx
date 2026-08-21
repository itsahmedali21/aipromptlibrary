import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Flame, Lightbulb, TrendingUp, Users, Calendar } from "lucide-react";
import { prompts, getPromptBySlug, getRelatedPrompts } from "@/data/prompts";
import { getCategoryBySlug } from "@/data/categories";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { PromptViewer } from "@/components/prompt/prompt-viewer";
import { SaveButton } from "@/components/ui/save-button";
import { ShareButton } from "@/components/prompt/share-button";
import { RelatedPrompts } from "@/components/prompt/related-prompts";
import { formatCount, formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return prompts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);
  if (!prompt) return { title: "Prompt not found" };

  return {
    title: prompt.title,
    description: prompt.description,
    alternates: { canonical: `/prompts/${prompt.slug}` },
    openGraph: {
      title: prompt.title,
      description: prompt.description,
      type: "article",
      publishedTime: prompt.createdAt,
    },
    twitter: {
      card: "summary_large_image",
      title: prompt.title,
      description: prompt.description,
    },
  };
}

const difficultyLabel: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export default async function PromptDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);
  if (!prompt) notFound();

  const category = getCategoryBySlug(prompt.category);
  const related = getRelatedPrompts(prompt);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: prompt.title,
    description: prompt.description,
    dateCreated: prompt.createdAt,
    author: { "@type": "Person", name: prompt.author.name },
    keywords: prompt.tags.join(", "),
  };

  return (
    <div className="mx-auto max-w-[1100px] px-5 pb-24 pt-10 sm:px-8 sm:pt-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumb
        items={[
          { label: "Prompts", href: "/prompts" },
          ...(category ? [{ label: category.name, href: `/categories/${category.slug}` }] : []),
          { label: prompt.title },
        ]}
      />

      <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            {category && <Badge variant="accent">{category.name}</Badge>}
            <Badge>{difficultyLabel[prompt.difficulty]}</Badge>
            {prompt.popularity > 90 && (
              <Badge variant="outline">
                <Flame className="h-3 w-3 text-accent" /> Trending
              </Badge>
            )}
          </div>

          <h1 className="mt-5 text-balance font-display text-[clamp(2rem,4.5vw,3rem)] font-medium leading-[1.08] tracking-[-0.02em] text-text-primary">
            {prompt.title}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-[16px] leading-relaxed text-text-secondary">
            {prompt.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {prompt.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs text-text-tertiary">
                #{tag}
              </span>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-3">
            <SaveButton id={prompt.id} title={prompt.title} variant="labeled" />
            <ShareButton title={prompt.title} />
          </div>

          <div className="mt-10">
            <PromptViewer prompt={prompt} />
          </div>

          {prompt.variables && prompt.variables.length > 0 && (
            <div className="mt-8 rounded-[var(--radius-lg)] border border-border bg-surface p-6">
              <h2 className="font-display text-lg font-medium text-text-primary">Prompt variables</h2>
              <p className="mt-1 text-sm text-text-secondary">
                Replace these highlighted placeholders before running the prompt.
              </p>
              <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {prompt.variables.map((v) => (
                  <div key={v.key} className="rounded-[var(--radius-md)] border border-border p-4">
                    <dt className="font-mono text-xs text-accent">{`{{${v.key}}}`}</dt>
                    <dd className="mt-1 text-sm text-text-primary">{v.label}</dd>
                    <dd className="mt-1 text-xs text-text-tertiary">e.g. &ldquo;{v.example}&rdquo;</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {prompt.tips && prompt.tips.length > 0 && (
            <div className="mt-8 rounded-[var(--radius-lg)] border border-border-accent bg-accent-soft p-6">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-accent" />
                <h2 className="font-display text-lg font-medium text-text-primary">Tips for best results</h2>
              </div>
              <ul className="mt-4 flex flex-col gap-2.5">
                {prompt.tips.map((tip, i) => (
                  <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-text-secondary">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {prompt.exampleOutput && (
            <div className="mt-8">
              <h2 className="font-display text-lg font-medium text-text-primary">Example output</h2>
              <div className="mt-4 rounded-[var(--radius-lg)] border border-border bg-surface p-6">
                <p className="text-sm italic leading-relaxed text-text-secondary">&ldquo;{prompt.exampleOutput}&rdquo;</p>
              </div>
            </div>
          )}
        </div>

        <aside className="flex flex-col gap-6 lg:pt-1">
          <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-6">
            <h2 className="text-xs font-medium uppercase tracking-[0.1em] text-text-tertiary">Statistics</h2>
            <dl className="mt-4 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-2 text-sm text-text-secondary">
                  <Users className="h-3.5 w-3.5" /> Copies
                </dt>
                <dd className="text-sm font-medium text-text-primary">{formatCount(prompt.usageCount)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-2 text-sm text-text-secondary">
                  <TrendingUp className="h-3.5 w-3.5" /> Popularity
                </dt>
                <dd className="text-sm font-medium text-text-primary">{prompt.popularity}/100</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-2 text-sm text-text-secondary">
                  <Calendar className="h-3.5 w-3.5" /> Published
                </dt>
                <dd className="text-sm font-medium text-text-primary">{formatDate(prompt.createdAt)}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-6">
            <h2 className="text-xs font-medium uppercase tracking-[0.1em] text-text-tertiary">Author</h2>
            <div className="mt-4 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-2 text-sm font-semibold text-text-secondary">
                {prompt.author.avatarInitials}
              </span>
              <div>
                <p className="text-sm font-medium text-text-primary">{prompt.author.name}</p>
                <p className="text-xs text-text-tertiary">{prompt.author.role}</p>
              </div>
            </div>
          </div>

          {category && (
            <Link
              href={`/categories/${category.slug}`}
              className="group rounded-[var(--radius-lg)] border border-border bg-surface p-6 transition-colors hover:border-border-accent"
            >
              <h2 className="text-xs font-medium uppercase tracking-[0.1em] text-text-tertiary">Category</h2>
              <p className="mt-3 font-display text-lg font-medium text-text-primary transition-colors group-hover:text-accent">
                {category.name}
              </p>
              <p className="mt-1 text-sm text-text-secondary">{category.promptCount} prompts</p>
            </Link>
          )}
        </aside>
      </div>

      <RelatedPrompts prompts={related} />
    </div>
  );
}
