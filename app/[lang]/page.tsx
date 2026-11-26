import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { IntroSection } from "@/components/home/intro-section";
import { ServicesSection } from "@/components/home/services-section";
import { SolutionsSection } from "@/components/home/solutions-section";
import { PlatformSection } from "@/components/home/platform-section";
import { ProductsSection } from "@/components/home/products-section";
import { ProcessSection } from "@/components/home/process-section";
import { IndustriesSection } from "@/components/home/industries-section";
import { CtaSection } from "@/components/shared/cta-section";
import { getI18n } from "@/lib/i18n/server";
import { localizedMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dict } = await getI18n();
  return localizedMetadata(locale, "/", {
    title: dict.meta.homeTitle,
    description: dict.meta.homeDescription,
    absoluteTitle: true,
  });
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroSection />
      <ServicesSection />
      <PlatformSection />
      <SolutionsSection />
      <ProductsSection />
      <ProcessSection />
      <IndustriesSection />
      <CtaSection />
    </>
  );
}
