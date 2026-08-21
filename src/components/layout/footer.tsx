import Link from "next/link";
import { LogoMark } from "@/components/ui/logo";
import { NewsletterForm } from "./newsletter-form";

const socialLinks = ["X", "In", "Gh"];

const columns = [
  {
    title: "Product",
    links: [
      { label: "Prompts", href: "/prompts" },
      { label: "Create Prompt", href: "/create" },
      { label: "Collections", href: "/collections" },
      { label: "Categories", href: "/categories" },
      { label: "Free Access", href: "/free" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/about" },
      { label: "Guides", href: "/about" },
      { label: "AI Resources", href: "/about" },
      { label: "Prompt Tips", href: "/prompts" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Free Access", href: "/free" },
      { label: "Sign in", href: "/login" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-bg-elevated">
      <div className="mx-auto max-w-[1400px] px-5 pb-10 pt-16 sm:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-8">
          <div>
            <Link href="/" className="mb-4 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border-strong bg-surface-2 text-accent">
                <LogoMark className="h-4 w-4" />
              </span>
              <span className="font-display text-[19px] font-medium text-text-primary">Promptfolio</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-text-secondary">
              A curated library of professionally crafted AI prompts — for writing, marketing, design,
              code, and everything in between.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((label) => (
                <a
                  key={label}
                  href="#"
                  aria-label={`Promptfolio on ${label}`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-[11px] font-semibold text-text-secondary transition-colors hover:border-accent/50 hover:text-accent"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.1em] text-text-tertiary">{col.title}</p>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-text-secondary transition-colors hover:text-text-primary">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="my-12 rounded-[var(--radius-lg)] border border-border bg-surface p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <p className="font-display text-lg font-medium text-text-primary">Get one great prompt a week</p>
              <p className="mt-1 text-sm text-text-secondary">No noise — just the sharpest addition to the library.</p>
            </div>
            <NewsletterForm />
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-text-tertiary sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Promptfolio. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/about" className="hover:text-text-secondary">
              Privacy
            </Link>
            <Link href="/about" className="hover:text-text-secondary">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-text-secondary">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
