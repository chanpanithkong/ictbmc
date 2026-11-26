import type { NavItem } from "@/types";

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      {
        label: "All Solutions",
        href: "/solutions",
        description: "Technology solutions for modern businesses",
      },
      {
        label: "Software Products",
        href: "/products",
        description: "Ready-to-deploy business management systems",
      },
      {
        label: "IT Consulting",
        href: "/consulting",
        description: "Strategy, assessment and expert guidance",
      },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ],
  solutions: [
    { label: "IT Consulting", href: "/consulting" },
    { label: "Software Development", href: "/services#custom-software-development" },
    { label: "Business Management Systems", href: "/services#business-management-systems" },
    { label: "IT Support", href: "/services#it-support-maintenance" },
  ],
  products: [
    { label: "Restaurant Management System", href: "/products/restaurant-management-system" },
    { label: "POS & Inventory", href: "/products/pos-inventory-management-system" },
    { label: "Accounting", href: "/products/accounting-management-system" },
    { label: "HR & Payroll", href: "/products/hr-payroll-management-system" },
    { label: "Hotel Management", href: "/products/hotel-management-system" },
  ],
} satisfies Record<string, NavItem[]>;
