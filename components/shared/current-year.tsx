import { cacheLife } from "next/cache";

/** Cached so it is compatible with Cache Components prerendering. */
export async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
