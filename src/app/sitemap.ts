import type { MetadataRoute } from "next";
import { prompts } from "@/data/prompts";
import { categories } from "@/data/categories";
import { collections } from "@/data/collections";

const siteUrl = "https://promptfolio.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/prompts",
    "/categories",
    "/collections",
    "/create",
    "/free",
    "/about",
    "/contact",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const promptRoutes: MetadataRoute.Sitemap = prompts.map((p) => ({
    url: `${siteUrl}/prompts/${p.slug}`,
    lastModified: new Date(p.createdAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${siteUrl}/categories/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const collectionRoutes: MetadataRoute.Sitemap = collections.map((c) => ({
    url: `${siteUrl}/collections/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...promptRoutes, ...categoryRoutes, ...collectionRoutes];
}
