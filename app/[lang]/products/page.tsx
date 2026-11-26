import type { Metadata } from "next";
import { getI18n } from "@/lib/i18n/server";
import { localizedMetadata } from "@/lib/i18n/metadata";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { PageSlideshow } from "@/components/figures/hero-slides";
import { ProductExplorer } from "@/components/products/product-explorer";
import { CtaSection } from "@/components/shared/cta-section";
import { ButtonLink } from "@/components/ui/button";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dict } = await getI18n();
  return localizedMetadata(locale, "/products", { title: dict.meta.productsTitle, description: dict.meta.productsDescription });
}

export default async function ProductsPage() {
  const { dict } = await getI18n();
  const t = dict.products;
  return (
    <>
      <PageHero
        aside={<PageSlideshow page="products" />}
        eyebrow={t.eyebrow}
        title={
          <>
            {t.titleA} <span className="text-gradient">{t.titleHighlight}</span>
          </>
        }
        description={t.description}
        breadcrumbs={[
          { label: dict.nav.home, href: "/" },
          { label: dict.nav.solutions, href: "/solutions" },
          { label: dict.nav.products },
        ]}
        actions={
          <ButtonLink href="/contact?service=Business%20Management%20Systems" size="lg">
            {dict.common.requestADemo}
            <ArrowRight />
          </ButtonLink>
        }
      />
      <section className="bg-surface py-16 sm:py-20" aria-label={t.catalogAria}>
        <div className="container-page">
          <ProductExplorer />
        </div>
      </section>
      <CtaSection
        title={t.ctaTitle}
        description={t.ctaDescription}
        primary={{ label: dict.common.requestADemo, href: "/contact?service=Business%20Management%20Systems" }}
        secondary={{ label: dict.common.customDevelopment, href: "/services#custom-software-development" }}
      />
    </>
  );
}
