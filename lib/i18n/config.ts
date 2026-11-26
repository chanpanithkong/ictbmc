/**
 * Locale configuration.
 *
 * URL segments are `/en` and `/kh`. The HTML `lang` / hreflang value for Khmer
 * is the ISO 639-1 code `km` ("kh" is the country code), so search engines and
 * screen readers identify the language correctly.
 */
export const locales = ["en", "kh"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const localeCookie = "NEXT_LOCALE";

export const localeMeta: Record<
  Locale,
  { label: string; short: string; htmlLang: string; hreflang: string; ogLocale: string }
> = {
  en: { label: "English", short: "EN", htmlLang: "en", hreflang: "en", ogLocale: "en_US" },
  kh: { label: "ខ្មែរ", short: "KH", htmlLang: "km", hreflang: "km", ogLocale: "km_KH" },
};

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/** Prefix an internal path with the locale: ("kh", "/services#x") -> "/kh/services#x" */
export function localizeHref(locale: Locale, href: string) {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const first = href.split(/[/?#]/)[1];
  if (isLocale(first)) return href;
  if (href === "/") return `/${locale}`;
  if (href.startsWith("/?") || href.startsWith("/#")) return `/${locale}${href.slice(1)}`;
  return `/${locale}${href}`;
}

/** Swap the locale prefix of a pathname */
export function switchLocalePath(pathname: string, to: Locale) {
  const parts = pathname.split("/");
  if (isLocale(parts[1])) parts[1] = to;
  else parts.splice(1, 0, to);
  return parts.join("/") || `/${to}`;
}
