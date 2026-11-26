import type { Locale } from "../config";
import en, { type Dictionary } from "./en";
import kh from "./kh";

const dictionaries: Record<Locale, Dictionary> = { en, kh };

export function getDictionaryFor(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
