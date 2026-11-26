"use client";

import Link from "@/components/i18n/link";
import { ArrowRight, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { IconTile } from "@/components/ui/icon-tile";
import { ProductMockup } from "@/components/shared/product-mockup";
import { useI18n } from "@/components/i18n/i18n-provider";
import { getProduct } from "@/lib/i18n/content";
import { format } from "@/lib/i18n/format";
import { demoHref } from "@/lib/utils";

/** Takes a slug (not the product object) so it can render inside server and client trees alike. */
export function ProductCard({ slug }: { slug: string }) {
  const { locale, dict } = useI18n();
  const product = getProduct(locale, slug);
  if (!product) return null;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-900/5 hover:ring-brand-200">
      <Link
        href={`/products/${product.slug}`}
        tabIndex={-1}
        aria-hidden
        className="relative block overflow-hidden bg-gradient-to-br from-slate-50 via-brand-50/60 to-cyan-50/60 px-6 pt-6"
      >
        <div className="bg-grid-light absolute inset-0 opacity-60" />
        <ProductMockup
          product={product}
          compact
          className="relative translate-y-2 transition-transform duration-500 group-hover:translate-y-0"
        />
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <IconTile icon={product.icon} size="sm" />
          <Badge variant="neutral">{dict.products.categories[product.category]}</Badge>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-navy-900">
          <Link href={`/products/${product.slug}`} className="focus-ring rounded hover:text-brand-700">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{product.summary}</p>

        <ul className="mt-4 space-y-1.5" aria-label={dict.common.keyFeatures}>
          {product.features.slice(0, 4).map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
              <Check className="size-3.5 shrink-0 text-brand-600" strokeWidth={2.5} aria-hidden />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          <ButtonLink
            href={`/products/${product.slug}`}
            size="sm"
            aria-label={format(dict.common.viewDetailsOf, { name: product.name })}
          >
            {dict.common.viewDetails}
            <ArrowRight />
          </ButtonLink>
          <ButtonLink
            href={demoHref(product.slug)}
            size="sm"
            variant="secondary"
            aria-label={format(dict.common.requestDemoOf, { name: product.name })}
          >
            {dict.common.requestDemo}
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
