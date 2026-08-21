# Promptfolio — Premium AI Prompt Library

A production-quality, commercially-sellable AI prompt library built with Next.js 16 (App Router),
TypeScript, Tailwind CSS v4, and Framer Motion. Dark + light themes, 11 pages, a full reusable
component system, and structured mock data designed to be swapped for a real database or CMS.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint      # ESLint
```

Fonts (Fraunces + Inter) are self-hosted via `@fontsource-variable/*` packages, so the project
builds offline with no calls to Google Fonts at build time.

## Project structure

```
src/
  app/                    Routes (App Router). One folder per page; [slug] folders are
                           dynamic routes with generateStaticParams + generateMetadata.
  components/
    ui/                   Design-system primitives: Button, Badge, Modal, CopyButton,
                           SaveButton, ThemeToggle, Pagination, ScrollReveal, etc.
    layout/                Navbar, Footer, mobile nav, newsletter form.
    prompt/                Prompt-specific: PromptCard (5 variants), PromptViewer,
                           SearchBar, FilterBar, PromptsExplorer, ShareButton.
    category/, collection/ Category and collection cards/grids.
    home/                  Hero and homepage section wrappers.
    auth/, contact/        Auth form UI and the contact form.
  data/                    All content lives here as typed arrays — swap for API/CMS calls.
    types.ts               Shared TypeScript contracts (Prompt, Category, Collection, ...).
    prompts.ts, categories.ts, collections.ts, authors.ts
  context/                 Theme, saved-prompts (localStorage), and toast providers.
  lib/                     cn() class merge helper, formatters, icon registry.
```

## Customization points

### 1. Colors — `src/app/globals.css`

Every color in the product is a CSS variable, split into a dark block (`:root, .dark`) and a
light block (`.light`) near the top of the file. Change the accent by editing `--accent`,
`--accent-strong`, `--accent-dim`, and `--accent-soft` in both blocks — every button, badge,
highlight, and glow effect reads from these tokens, so the whole site re-themes from one place.
The two themes are intentionally **not** mirror images of each other; keep that in mind if you
adjust one and forget the other.

### 2. Typography — `src/app/layout.tsx` + `globals.css`

Two font families: **Fraunces** (display/editorial, used for all headings via `.font-display` /
`font-display` utility) and **Inter** (UI/body). Both are self-hosted through
`@fontsource-variable`. To swap fonts, install a different `@fontsource-variable/*` package,
update the imports in `layout.tsx`, and update `--font-display` / `--font-sans` in
`globals.css`.

### 3. Content — `src/data/*.ts`

Nothing is hardcoded into components. `prompts.ts`, `categories.ts`, and `collections.ts` are
typed arrays matching the contracts in `types.ts`. To connect a real backend, replace the
exported functions (`getPromptBySlug`, `getFeaturedPrompts`, `sortPrompts`, etc.) with calls to
your API/CMS/database — every component already consumes data through these functions, so no
component code needs to change.

### 4. Spacing, radius, motion — `src/app/globals.css`

`--radius-sm/md/lg/xl/full` control the corner-radius scale used everywhere (cards, buttons,
inputs) — change once, apply everywhere. `--ease-premium`, `--ease-out-soft`, and the
`--dur-*` variables control the site's motion feel.

### 5. Auth — `src/components/auth/auth-form.tsx`

Login/signup forms are UI-complete but intentionally unwired — `handleSubmit` is the single
seam for plugging in real authentication (NextAuth, Clerk, Supabase Auth, a custom API route).
The dashboard and saved-prompts pages assume an authenticated user already exists.

## Notable implementation details

- **Saved prompts** persist to `localStorage` via `SavedPromptsProvider` — swap this for a
  server-backed favorites API by changing the provider's internals only.
- **Search** (`⌘K` / navbar icon) is a client-side filter over the in-memory prompt data;
  swap for a real search index (Algolia, Meilisearch, Postgres full-text) by editing
  `search-overlay.tsx` and `prompts-explorer.tsx`.
- **SEO**: every page sets `title`/`description`/canonical via the Metadata API,
  `sitemap.ts` and `robots.ts` are dynamically generated from the data files, and prompt
  detail pages emit `CreativeWork` JSON-LD plus a generated Open Graph image
  (`opengraph-image.tsx`).
- **Accessibility**: semantic landmarks, a skip-to-content link, visible focus rings,
  `aria-live` toasts, keyboard-navigable search, and `prefers-reduced-motion` support are
  built in — check `globals.css` for the reduced-motion override and focus-visible styles.

## Tech stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion ·
lucide-react · next-themes
