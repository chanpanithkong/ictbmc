import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { getI18n } from "@/lib/i18n/server";
import { format, localizeNumber } from "@/lib/i18n/format";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { ProductCard } from "@/components/products/product-card";
import { revealDelay } from "@/lib/utils";

const featured = [
  "restaurant-management-system",
  "pos-inventory-management-system",
  "hr-payroll-management-system",
];

export async function ProductsSection() {
  const { locale, dict } = await getI18n();
  const h = dict.home;
  return (
    <section className="bg-white py-24 sm:py-28" aria-labelledby="products-title">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div data-reveal>
            <SectionHeading
              eyebrow={h.productsEyebrow}
              title={<span id="products-title">{h.productsTitle}</span>}
              description={h.productsDescription}
            />
          </div>
          <ButtonLink href="/products" variant="secondary" className="self-start md:self-auto">
            {format(h.viewAllProducts, { count: localizeNumber(products.length, locale) })}
            <ArrowRight />
          </ButtonLink>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((slug, i) => (
            <div key={slug} data-reveal style={revealDelay(i)}>
              <ProductCard slug={slug} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
