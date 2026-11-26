import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Kantumruy_Pro } from "next/font/google";
import "../globals.css";
import { contact, officeLocation, seoKeywords, socialLinks } from "@/data/company";
import { absoluteUrl } from "@/lib/utils";
import { locales, localeMeta, localizeHref } from "@/lib/i18n/config";
import { getI18n } from "@/lib/i18n/server";
import { getCompany } from "@/lib/i18n/content";
import { localizedMetadata } from "@/lib/i18n/metadata";
import { I18nProvider } from "@/components/i18n/i18n-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BackToTop } from "@/components/layout/back-to-top";
import { HashScroll } from "@/components/shared/hash-scroll";
import { JsonLd } from "@/components/shared/json-ld";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
// Khmer glyphs fall back to Kantumruy Pro (unicode-range scoped, so EN pages don't download it)
const kantumruy = Kantumruy_Pro({ variable: "--font-khmer", subsets: ["khmer"], display: "swap" });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dict } = await getI18n();
  const company = getCompany(locale);
  return {
    metadataBase: new URL(absoluteUrl("/")),
    title: { default: dict.meta.siteTitle, template: `%s | ${company.name}` },
    description: dict.meta.siteDescription,
    keywords: seoKeywords,
    applicationName: company.name,
    alternates: localizedMetadata(locale, "/", { title: dict.meta.siteTitle, description: dict.meta.siteDescription })
      .alternates,
    openGraph: {
      type: "website",
      siteName: company.name,
      title: dict.meta.siteTitle,
      description: company.tagline,
      locale: localeMeta[locale].ogLocale,
      url: localizeHref(locale, "/"),
    },
    twitter: { card: "summary_large_image", title: dict.meta.siteTitle, description: company.tagline },
  };
}

export const viewport: Viewport = { themeColor: "#0B1120" };

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const { locale, dict } = await getI18n();
  const company = getCompany(locale);

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: absoluteUrl(localizeHref(locale, "/")),
    slogan: company.tagline,
    description: company.shortDescription,
    areaServed: [
      { "@type": "AdministrativeArea", name: `${company.province} Province` },
      { "@type": "Country", name: company.country },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: officeLocation.plusCode,
      addressLocality: officeLocation.locality,
      addressRegion: company.province,
      addressCountry: company.countryCode,
    },
    location: {
      "@type": "Place",
      address: company.address,
      hasMap: officeLocation.linkUrl,
      geo: { "@type": "GeoCoordinates", latitude: officeLocation.lat, longitude: officeLocation.lng },
    },
    ...(contact.email && { email: contact.email }),
    ...(contact.phone && { telephone: contact.phone }),
    ...(socialLinks.some((s) => s.href) && { sameAs: socialLinks.filter((s) => s.href).map((s) => s.href) }),
  };

  return (
    <html
      lang={localeMeta[locale].htmlLang}
      className={`${geistSans.variable} ${geistMono.variable} ${kantumruy.variable} antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-dvh flex-col bg-white font-sans text-ink">
        <I18nProvider locale={locale} dict={dict}>
          <a
            href="#main-content"
            className="sr-only z-[60] rounded-full bg-white px-4 py-2 text-sm font-medium text-navy-900 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            {dict.nav.skipToContent}
          </a>
          <Navbar />
          <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <Footer />
          <BackToTop />
          <HashScroll />
        </I18nProvider>
        <JsonLd data={organizationLd} />
      </body>
    </html>
  );
}
