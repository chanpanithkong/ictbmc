import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { ProductDetail } from "@/components/products/product-detail";
import { JsonLd } from "@/components/shared/json-ld";
import { absoluteUrl } from "@/lib/utils";
import { getI18n } from "@/lib/i18n/server";
import { getProduct } from "@/lib/i18n/content";
import { localizedMetadata } from "@/lib/i18n/metadata";
import { localeMeta, localizeHref } from "@/lib/i18n/config";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { locale, dict } = await getI18n();
  const product = getProduct(locale, slug);
  if (!product) return { title: dict.meta.productNotFound };
  return localizedMetadata(locale, `/products/${product.slug}`, {
    title: product.name,
    description: product.description,
  });
}

export default async function ProductPage({ params }: PageProps<"/[lang]/products/[slug]">) {
  const { slug } = await params;
  const { locale, dict } = await getI18n();
  const product = getProduct(locale, slug);
  if (!product) notFound();
  const url = (path: string) => absoluteUrl(localizeHref(locale, path));

  return (
    <>
      <ProductDetail product={product} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: product.name,
          inLanguage: localeMeta[locale].htmlLang,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          description: product.description,
          url: url(`/products/${product.slug}`),
          featureList: product.features,
          publisher: { "@type": "Organization", name: "ICT BMC" },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: dict.nav.home, item: url("/") },
            { "@type": "ListItem", position: 2, name: dict.nav.products, item: url("/products") },
            { "@type": "ListItem", position: 3, name: product.name, item: url(`/products/${product.slug}`) },
          ],
        }}
      />
    </>
  );
}
