import { ArrowRight } from "lucide-react";
import { getProduct } from "@/data/products";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { ProductCard } from "@/components/products/product-card";
import { revealDelay } from "@/lib/utils";

const featured = [
  "restaurant-management-system",
  "pos-inventory-management-system",
  "hr-payroll-management-system",
];

export function ProductsSection() {
  const items = featured.map(getProduct).filter((p) => p !== undefined);
  return (
    <section className="bg-white py-24 sm:py-28" aria-labelledby="products-title">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div data-reveal>
            <SectionHeading
              eyebrow="Software Products"
              title={<span id="products-title">Ready-to-Deploy Business Systems.</span>}
              description="Proven building blocks for common business needs — configured to your workflows and extended where you need more."
            />
          </div>
          <ButtonLink href="/products" variant="secondary" className="self-start md:self-auto">
            View all 12 products
            <ArrowRight />
          </ButtonLink>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <div key={p.slug} data-reveal style={revealDelay(i)}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
