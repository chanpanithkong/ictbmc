import { cacheLife } from "next/cache";
import { localizeNumber } from "@/lib/i18n/format";

/** Cached so it is compatible with Cache Components prerendering. */
export async function CurrentYear({ locale }: { locale: string }) {
  "use cache";
  cacheLife("days");
  return <>{localizeNumber(new Date().getFullYear(), locale)}</>;
}
