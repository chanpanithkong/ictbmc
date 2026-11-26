import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { ProductExplorer } from "@/components/products/product-explorer";
import { CtaSection } from "@/components/shared/cta-section";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Software Products",
  description:
    "Business management systems by ICT BMC: restaurant, POS & inventory, accounting, hotel, school, HR & payroll, loan, pawn shop, rental, appointment booking, document and hospital management.",
  alternates: { canonical: "/products" },
  openGraph: { title: "Business Management Software | ICT BMC", url: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Software Products"
        title={
          <>
            Business Systems, <span className="text-gradient">Ready to Deploy.</span>
          </>
        }
        description="Configurable business management systems for hospitality, retail, finance, HR, education, healthcare and operations — tailored to your workflows during implementation."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: "Products" },
        ]}
        actions={
          <ButtonLink href="/contact?service=Business%20Management%20Systems" size="lg">
            Request a Demo
            <ArrowRight />
          </ButtonLink>
        }
      />
      <section className="bg-surface py-16 sm:py-20" aria-label="Product catalog">
        <div className="container-page">
          <ProductExplorer />
        </div>
      </section>
      <CtaSection
        title="Need something more specific?"
        description="Every product can be configured and extended. If your requirements are unique, we can design and build a custom system for you."
        primary={{ label: "Request a Demo", href: "/contact?service=Business%20Management%20Systems" }}
        secondary={{ label: "Custom Development", href: "/services#custom-software-development" }}
      />
    </>
  );
}
