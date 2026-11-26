import { notFound } from "next/navigation";

/** Unmatched paths under a locale (e.g. /kh/unknown) render the localized 404 page. */
export default function CatchAll() {
  notFound();
}
