import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function CtaBanner() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-border bg-surface px-6 py-16 text-center sm:px-16 sm:py-24">
            <div className="grid-pattern radial-fade pointer-events-none absolute inset-0" aria-hidden />
            <div
              className="pointer-events-none absolute left-1/2 top-0 h-64 w-[80%] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
              style={{ background: "radial-gradient(ellipse, var(--glow), transparent 70%)" }}
              aria-hidden
            />
            <div className="relative">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-accent">
                Start building better prompts today
              </p>
              <h2 className="mx-auto max-w-2xl text-balance font-display text-[clamp(1.9rem,4vw,3rem)] font-medium leading-[1.08] tracking-[-0.02em] text-text-primary">
                Your best AI output starts with the right prompt.
              </h2>
              <p className="mx-auto mt-5 max-w-md text-pretty text-[15px] leading-relaxed text-text-secondary">
                Join thousands of writers, marketers, and developers using Promptfolio to skip the blank page.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <LinkButton href="/prompts" size="lg" magnetic icon={<ArrowRight className="h-4 w-4" />}>
                  Explore Prompts
                </LinkButton>
                <LinkButton href="/free" size="lg" variant="outline" magnetic>
                  See What&apos;s Free
                </LinkButton>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
