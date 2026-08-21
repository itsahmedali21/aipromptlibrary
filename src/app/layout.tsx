import type { Metadata } from "next";
import "@fontsource-variable/fraunces/wght.css";
import "@fontsource-variable/fraunces/wght-italic.css";
import "@fontsource-variable/inter/wght.css";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-provider";
import { ToastProvider } from "@/context/toast-context";
import { SavedPromptsProvider } from "@/context/saved-prompts-context";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CursorGlow } from "@/components/ui/cursor-glow";

const siteUrl = "https://promptfolio.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Promptfolio — The Premium AI Prompt Library",
    template: "%s — Promptfolio",
  },
  description:
    "Discover, save, and ship better AI prompts. A curated library of professionally crafted prompts for writing, marketing, design, code, SEO, and more.",
  keywords: [
    "AI prompts",
    "prompt library",
    "prompt engineering",
    "ChatGPT prompts",
    "AI prompt collection",
  ],
  authors: [{ name: "Promptfolio" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Promptfolio — The Premium AI Prompt Library",
    description:
      "Discover, save, and ship better AI prompts. A curated library of professionally crafted prompts for every discipline.",
    siteName: "Promptfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Promptfolio — The Premium AI Prompt Library",
    description:
      "Discover, save, and ship better AI prompts. A curated library of professionally crafted prompts for every discipline.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="bg-bg text-text-primary antialiased">
        <ThemeProvider>
          <ToastProvider>
            <SavedPromptsProvider>
              <CursorGlow />
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-accent-text-on"
              >
                Skip to content
              </a>
              <Navbar />
              <main id="main-content">{children}</main>
              <Footer />
            </SavedPromptsProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
