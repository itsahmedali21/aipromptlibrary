// Single source of truth for the site's public URL.
// Set NEXT_PUBLIC_SITE_URL in your Vercel project settings once you have a
// custom domain — everything else (metadata, sitemap, robots.txt, OG tags)
// will pick it up automatically without any code changes.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://promptlibrary-ai.vercel.app";
