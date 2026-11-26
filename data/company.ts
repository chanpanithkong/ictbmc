/**
 * Central company configuration.
 *
 * Contact details are intentionally left empty. Fill them in when they are
 * confirmed — empty values are rendered as "coming soon" placeholders and are
 * excluded from structured data automatically.
 */
export const company = {
  name: "ICT BMC",
  legalName: "ICT BMC",
  tagline: "Your Trusted Technology Partner for Business Growth.",
  shortDescription:
    "ICT BMC is a technology solutions provider specializing in software development, business management systems, IT consulting, IT infrastructure, technical support, and digital transformation.",
  overview: [
    "ICT BMC is a technology solutions provider specializing in software development, business management systems, IT consulting, IT infrastructure, technical support, and digital transformation.",
    "We help businesses and organizations improve their operational efficiency, streamline business processes, manage information effectively, and adopt modern technology through reliable and customized solutions.",
    "Our goal is to deliver practical, scalable, user-friendly, and innovative technology solutions based on our clients' business needs.",
  ],
  country: "Cambodia",
} as const;

export interface ContactChannel {
  label: string;
  value: string;
  href?: string;
}

export const contact = {
  /** e.g. "hello@your-domain.com" */
  email: "",
  /** e.g. "+855 12 345 678" */
  phone: "",
  /** International format without "+" or spaces, e.g. "85512345678" */
  whatsapp: "",
  /** Full office address */
  address: "",
  /** Opening hours, e.g. "Mon – Fri, 8:00 – 17:00" */
  hours: "",
  /** Google Maps embed URL (https://www.google.com/maps/embed?...) */
  mapEmbedUrl: "",
};

export const socialLinks: { label: string; href: string; icon: "facebook" | "linkedin" | "telegram" | "youtube" }[] = [
  { label: "Facebook", href: "", icon: "facebook" },
  { label: "LinkedIn", href: "", icon: "linkedin" },
  { label: "Telegram", href: "", icon: "telegram" },
  { label: "YouTube", href: "", icon: "youtube" },
];

/**
 * Contact form behaviour.
 *
 * - "demo": validates in the browser and shows a success message. Nothing is sent.
 * - "endpoint": POSTs the form as JSON to `endpoint` (e.g. a form service or
 *   email provider you have approved). Leave as "demo" until one is chosen.
 */
export const contactFormConfig: { mode: "demo" | "endpoint"; endpoint: string } = {
  mode: "demo",
  endpoint: "",
};

export const contactServiceOptions = [
  "Custom Software Development",
  "IT Consulting",
  "Business Management Systems",
  "Web Development",
  "IT Infrastructure",
  "IT Support",
  "Digital Transformation",
  "Other",
] as const;

export const seoKeywords = [
  "ICT BMC",
  "Software Development Cambodia",
  "IT Consulting Cambodia",
  "IT Support Cambodia",
  "Technology Solutions Cambodia",
  "Business Management Systems",
  "Custom Software Development",
  "Digital Transformation",
  "Web Application Development",
];
