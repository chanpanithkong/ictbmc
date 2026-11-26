import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { IntroSection } from "@/components/home/intro-section";
import { ServicesSection } from "@/components/home/services-section";
import { SolutionsSection } from "@/components/home/solutions-section";
import { ProductsSection } from "@/components/home/products-section";
import { ProcessSection } from "@/components/home/process-section";
import { IndustriesSection } from "@/components/home/industries-section";
import { CtaSection } from "@/components/shared/cta-section";

export const metadata: Metadata = {
  title: { absolute: "ICT BMC — Software Development & IT Consulting in Cambodia" },
  description:
    "ICT BMC designs, develops and delivers technology solutions — custom software, business management systems, IT consulting, infrastructure and support — that help businesses grow with confidence.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroSection />
      <ServicesSection />
      <SolutionsSection />
      <ProductsSection />
      <ProcessSection />
      <IndustriesSection />
      <CtaSection />
    </>
  );
}
