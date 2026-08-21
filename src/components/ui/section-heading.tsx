import { cn } from "@/lib/utils";
import { ScrollReveal } from "./scroll-reveal";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  cta,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  cta?: { label: string; href: string };
  className?: string;
}) {
  return (
    <ScrollReveal>
      <div
        className={cn(
          "flex flex-col gap-4",
          align === "center" ? "items-center text-center" : "items-start justify-between md:flex-row md:items-end",
          className
        )}
      >
        <div className={cn("max-w-xl", align === "center" && "max-w-2xl")}>
          {eyebrow && (
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-accent">{eyebrow}</p>
          )}
          <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] font-medium leading-[1.08] tracking-[-0.02em] text-text-primary text-balance">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-[15px] leading-relaxed text-text-secondary text-pretty">{description}</p>
          )}
        </div>
        {cta && (
          <Link
            href={cta.href}
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-text-primary transition-colors hover:text-accent"
          >
            {cta.label}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        )}
      </div>
    </ScrollReveal>
  );
}
