import type { Metadata } from "next";
import { locales, localeMeta, localizeHref, type Locale } from "./config";

/** Canonical + hreflang alternates + Open Graph locale for a locale-free path */
export function localizedMetadata(
  locale: Locale,
  path: string,
  { title, description, absoluteTitle = false }: { title: string; description: string; absoluteTitle?: boolean },
): Metadata {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[localeMeta[l].hreflang] = localizeHref(l, path);
  languages["x-default"] = localizeHref("en", path);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: localizeHref(locale, path), languages },
    openGraph: {
      title,
      description,
      url: localizeHref(locale, path),
      locale: localeMeta[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeMeta[l].ogLocale),
    },
  };
}
