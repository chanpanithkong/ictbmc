import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { company, contact, seoKeywords, socialLinks } from "@/data/company";
import { absoluteUrl } from "@/lib/utils";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BackToTop } from "@/components/layout/back-to-top";
import { RevealObserver } from "@/components/shared/reveal-observer";
import { JsonLd } from "@/components/shared/json-ld";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const defaultTitle = `${company.name} — Software Development & IT Consulting`;

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: { default: defaultTitle, template: `%s | ${company.name}` },
  description:
    "ICT BMC delivers custom software development, business management systems, IT consulting, IT infrastructure and technical support to help businesses in Cambodia grow with confidence.",
  keywords: seoKeywords,
  applicationName: company.name,
  openGraph: {
    type: "website",
    siteName: company.name,
    title: defaultTitle,
    description: company.tagline,
    locale: "en_US",
    url: "/",
  },
  twitter: { card: "summary_large_image", title: defaultTitle, description: company.tagline },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#0B1120" };

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  url: absoluteUrl("/"),
  slogan: company.tagline,
  description: company.shortDescription,
  areaServed: company.country,
  ...(contact.email && { email: contact.email }),
  ...(contact.phone && { telephone: contact.phone }),
  ...(contact.address && { address: contact.address }),
  ...(socialLinks.some((s) => s.href) && { sameAs: socialLinks.filter((s) => s.href).map((s) => s.href) }),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Enables scroll-reveal styles only when JS runs, so content is never hidden without it */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-dvh flex-col bg-white font-sans text-ink">
        <a
          href="#main-content"
          className="sr-only z-[60] rounded-full bg-white px-4 py-2 text-sm font-medium text-navy-900 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
        <BackToTop />
        <RevealObserver />
        <JsonLd data={organizationLd} />
      </body>
    </html>
  );
}
