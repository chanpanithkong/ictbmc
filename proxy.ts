import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, localeCookie, type Locale } from "@/lib/i18n/config";

/**
 * Khmer by default. English is used only when the visitor picked it with the
 * language switcher (saved in the NEXT_LOCALE cookie). The browser's
 * Accept-Language is intentionally ignored.
 */
function preferredLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get(localeCookie)?.value;
  return isLocale(cookie) ? cookie : defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];
  if (isLocale(first)) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Skip Next internals, metadata files and anything with a file extension
    "/((?!_next|icon.svg|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
