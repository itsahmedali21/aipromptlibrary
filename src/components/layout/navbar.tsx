"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search as SearchIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { LinkButton } from "@/components/ui/button";
import { SearchOverlay } from "@/components/ui/search-overlay";
import { LogoMark } from "@/components/ui/logo";

const navLinks = [
  { label: "Prompts", href: "/prompts" },
  { label: "Categories", href: "/categories" },
  { label: "Collections", href: "/collections" },
  { label: "Create Prompt", href: "/create" },
  { label: "Free Access", href: "/free" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Syncing to the router's external pathname state — close the mobile
    // menu whenever navigation happens.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled ? "glass border-b border-border" : "border-b border-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-5 sm:px-8">
          <Link href="/" className="group flex shrink-0 items-center gap-2" aria-label="Promptfolio home">
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-border-strong bg-surface-2 text-accent transition-colors group-hover:border-accent/50">
              <LogoMark className="h-4 w-4" />
            </span>
            <span className="font-display text-[19px] font-medium tracking-[-0.01em] text-text-primary">
              Promptfolio
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
            {navLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors",
                    active ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-px h-px bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search prompts"
              className="inline-flex h-9 items-center gap-2 rounded-full border border-border-strong bg-surface-2 px-3.5 text-text-secondary transition-colors hover:border-accent/50 hover:text-accent sm:pr-2"
            >
              <SearchIcon className="h-4 w-4" strokeWidth={2} />
              <span className="hidden text-xs text-text-tertiary sm:inline">⌘K</span>
            </button>
            <LinkButton href="/prompts" size="sm" className="hidden sm:inline-flex" magnetic>
              Explore Prompts
            </LinkButton>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-strong text-text-primary xl:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[95] bg-bg xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex h-16 items-center justify-between px-5">
              <span className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border-strong bg-surface-2 text-accent">
                  <LogoMark className="h-4 w-4" />
                </span>
                <span className="font-display text-[19px] font-medium text-text-primary">Promptfolio</span>
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-strong text-text-primary"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <motion.nav
              className="flex flex-col gap-1 px-5 pt-6"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
            >
              {navLinks.map((link) => (
                <motion.div
                  key={link.href}
                  variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                >
                  <Link
                    href={link.href}
                    className="block border-b border-border py-4 font-display text-2xl font-medium text-text-primary"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-6 flex items-center gap-3">
                <LinkButton href="/prompts" size="md" className="flex-1 justify-center">
                  Explore Prompts
                </LinkButton>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
