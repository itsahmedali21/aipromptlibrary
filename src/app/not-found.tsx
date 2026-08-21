import { Compass } from "lucide-react";
import { LinkButton } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-5 text-center">
      <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-border-strong bg-surface-2 text-accent">
        <Compass className="h-7 w-7" strokeWidth={1.5} />
      </span>
      <p className="mt-6 font-display text-6xl font-medium tracking-[-0.02em] text-text-primary">404</p>
      <h1 className="mt-3 font-display text-2xl font-medium text-text-primary">This page wandered off</h1>
      <p className="mt-3 text-sm leading-relaxed text-text-secondary">
        The prompt or page you&apos;re looking for doesn&apos;t exist, or may have moved. Let&apos;s get you back on
        track.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <LinkButton href="/" variant="primary" magnetic>
          Back to home
        </LinkButton>
        <LinkButton href="/prompts" variant="secondary" magnetic>
          Explore prompts
        </LinkButton>
      </div>
    </div>
  );
}
