import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { contact } from "@/data/company";
import { PageHero } from "@/components/shared/page-hero";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact ICT BMC to discuss custom software, business management systems, IT consulting or technical support for your business.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact ICT BMC", url: "/contact" },
};

const channels: { label: string; value: string; href?: string; icon: LucideIcon }[] = [
  { label: "Email", value: contact.email, href: contact.email && `mailto:${contact.email}`, icon: Mail },
  { label: "Phone", value: contact.phone, href: contact.phone && `tel:${contact.phone.replace(/\s/g, "")}`, icon: Phone },
  {
    label: "WhatsApp",
    value: contact.whatsapp && `+${contact.whatsapp}`,
    href: contact.whatsapp && `https://wa.me/${contact.whatsapp}`,
    icon: MessageCircle,
  },
  { label: "Office address", value: contact.address, icon: MapPin },
  { label: "Business hours", value: contact.hours, icon: Clock },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title={
          <>
            Let&apos;s Build the Right Technology Solution{" "}
            <span className="text-gradient">for Your Business.</span>
          </>
        }
        description="Whether you need custom software, a business management system, IT consulting, or technical support, our team is ready to help."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="bg-surface py-16 sm:py-20" aria-label="Contact information and form">
        <div className="container-page grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200 sm:p-8">
              <h2 className="text-xl font-semibold text-navy-900">Get in touch</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Reach out through any of the channels below, or send us a message using the form.
              </p>
              <ul className="mt-6 divide-y divide-slate-100">
                {channels.map((c) => {
                  const Icon = c.icon;
                  return (
                    <li key={c.label} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                        <Icon className="size-[18px]" aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">{c.label}</p>
                        {c.value ? (
                          c.href ? (
                            <a
                              href={c.href}
                              className="focus-ring rounded text-sm font-medium break-words text-navy-900 hover:text-brand-700"
                              {...(c.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                            >
                              {c.value}
                            </a>
                          ) : (
                            <p className="text-sm font-medium text-navy-900">{c.value}</p>
                          )
                        ) : (
                          <p className="text-sm text-slate-400 italic">To be announced</p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {contact.mapEmbedUrl ? (
              <iframe
                src={contact.mapEmbedUrl}
                title="ICT BMC office location"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-[4/3] w-full rounded-3xl ring-1 ring-slate-200"
              />
            ) : (
              <div
                role="img"
                aria-label="Map placeholder — office location to be announced"
                className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl bg-navy-900 ring-1 ring-slate-200"
              >
                <div className="bg-grid-dark absolute inset-0" aria-hidden />
                <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full text-white/10" aria-hidden fill="none">
                  <path d="M0 210 C 80 180, 140 240, 220 200 S 340 150, 400 170" stroke="currentColor" strokeWidth="10" />
                  <path d="M120 0 C 140 80, 100 160, 160 300" stroke="currentColor" strokeWidth="6" />
                  <path d="M300 0 L 260 300" stroke="currentColor" strokeWidth="4" />
                </svg>
                <div className="relative text-center">
                  <span className="mx-auto inline-flex size-12 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg shadow-brand-600/40">
                    <MapPin className="size-5" aria-hidden />
                  </span>
                  <p className="mt-3 text-sm font-medium text-white">Map coming soon</p>
                  <p className="mt-1 text-xs text-slate-400">Office location will be shown here</p>
                </div>
              </div>
            )}
          </div>

          <Suspense fallback={<div className="min-h-[640px] animate-pulse rounded-3xl bg-white ring-1 ring-slate-200" />}>
            <ContactForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
