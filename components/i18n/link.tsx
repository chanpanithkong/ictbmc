"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { localizeHref } from "@/lib/i18n/config";
import { useI18n } from "./i18n-provider";

/**
 * Drop-in replacement for next/link that prefixes internal paths with the
 * current locale ("/services" -> "/kh/services"). External URLs and paths that
 * already include a locale are left unchanged.
 */
export default function Link({ href, ...props }: ComponentProps<typeof NextLink>) {
  const { locale } = useI18n();
  const localized = typeof href === "string" ? localizeHref(locale, href) : href;
  return <NextLink href={localized} {...props} />;
}
