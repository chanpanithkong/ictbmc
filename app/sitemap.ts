import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { absoluteUrl } from "@/lib/utils";
import { locales, localeMeta, localizeHref } from "@/lib/i18n/config";

const pages: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/services", priority: 0.9 },
  { path: "/websites", priority: 0.9 },
  { path: "/solutions", priority: 0.9 },
  { path: "/products", priority: 0.9 },
  { path: "/consulting", priority: 0.8 },
  { path: "/projects", priority: 0.6 },
  { path: "/contact", priority: 0.8 },
  ...products.map((p) => ({ path: `/products/${p.slug}`, priority: 0.7 })),
];

/** One entry per page per language, each listing its hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ path, priority }) => {
    const languages = Object.fromEntries(
      locales.map((l) => [localeMeta[l].hreflang, absoluteUrl(localizeHref(l, path))]),
    );
    return locales.map((locale) => ({
      url: absoluteUrl(localizeHref(locale, path)),
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages },
    }));
  });
}
