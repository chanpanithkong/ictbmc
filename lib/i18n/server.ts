import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { isLocale, localizeHref, type Locale } from "./config";
import { getDictionaryFor } from "./dictionaries";

/** Current locale from the `[lang]` root segment (Server Components only). */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  if (!isLocale(value)) notFound();
  return value;
}

/** Locale + dictionary + a bound href helper, for Server Components. */
export async function getI18n() {
  const locale = await getLocale();
  return {
    locale,
    dict: getDictionaryFor(locale),
    href: (path: string) => localizeHref(locale, path),
  };
}
