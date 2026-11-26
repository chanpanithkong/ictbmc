import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { NavItem } from "@/types";

/** Paths are locale-free; the locale-aware Link adds the /en or /kh prefix. */
export function getMainNav(d: Dictionary): NavItem[] {
  return [
    { label: d.nav.home, href: "/" },
    { label: d.nav.about, href: "/about" },
    { label: d.nav.services, href: "/services" },
    {
      label: d.nav.solutions,
      href: "/solutions",
      children: [
        { label: d.nav.allSolutions, href: "/solutions", description: d.nav.allSolutionsDesc },
        { label: d.nav.products, href: "/products", description: d.nav.productsDesc },
        { label: d.nav.consulting, href: "/consulting", description: d.nav.consultingDesc },
      ],
    },
    { label: d.nav.projects, href: "/projects" },
    { label: d.nav.contact, href: "/contact" },
  ];
}

export function getFooterNav(d: Dictionary) {
  return {
    company: [
      { label: d.nav.about, href: "/about" },
      { label: d.nav.services, href: "/services" },
      { label: d.nav.projects, href: "/projects" },
      { label: d.nav.contact, href: "/contact" },
    ],
    solutions: [
      { label: d.nav.consulting, href: "/consulting" },
      { label: d.footer.softwareDevelopment, href: "/services#custom-software-development" },
      { label: d.footer.businessSystems, href: "/services#business-management-systems" },
      { label: d.footer.itSupport, href: "/services#it-support-maintenance" },
    ],
    products: [
      { label: d.footer.restaurant, href: "/products/restaurant-management-system" },
      { label: d.footer.pos, href: "/products/pos-inventory-management-system" },
      { label: d.footer.accounting, href: "/products/accounting-management-system" },
      { label: d.footer.hr, href: "/products/hr-payroll-management-system" },
      { label: d.footer.hotel, href: "/products/hotel-management-system" },
    ],
  } satisfies Record<string, NavItem[]>;
}
