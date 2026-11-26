import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/services", priority: 0.9 },
    { path: "/solutions", priority: 0.9 },
    { path: "/products", priority: 0.9 },
    { path: "/consulting", priority: 0.8 },
    { path: "/projects", priority: 0.6 },
    { path: "/contact", priority: 0.8 },
  ];

  return [
    ...pages.map((p) => ({ url: absoluteUrl(p.path), changeFrequency: "monthly" as const, priority: p.priority })),
    ...products.map((p) => ({
      url: absoluteUrl(`/products/${p.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
