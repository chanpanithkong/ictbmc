import type { Project, ProjectCategory } from "@/types";

export const projectCategories: ProjectCategory[] = [
  "Software Development",
  "Business Systems",
  "Web Applications",
  "IT Infrastructure",
  "Digital Transformation",
];

/**
 * DEMO PROJECTS
 *
 * Every entry below is an illustrative concept showing the type of work ICT Banteay Meanchey
 * can deliver. None of them represent an actual client, engagement or outcome.
 * Replace them with real case studies (and set `isDemo: false`) once client
 * approval to publish has been obtained.
 */
export const projects: Project[] = [
  {
    slug: "demo-multi-branch-restaurant-platform",
    title: "Multi-Branch Restaurant Platform",
    category: "Business Systems",
    description:
      "Concept for a centralized POS, kitchen display and inventory platform serving several restaurant branches.",
    details:
      "This demo concept illustrates how a restaurant group could run ordering, kitchen operations and ingredient-level inventory across branches from a single system, with consolidated head-office reporting.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    status: "Prototype",
    isDemo: true,
    visual: "dashboard",
  },
  {
    slug: "demo-retail-inventory-modernization",
    title: "Retail Inventory Modernization",
    category: "Digital Transformation",
    description:
      "Illustrative roadmap for moving a retailer from spreadsheet stock tracking to a real-time inventory system.",
    details:
      "A sample transformation plan covering process mapping, data cleanup, barcode adoption, staff training and phased rollout from a single store to multiple outlets.",
    stack: ["Process Mapping", "Barcode Integration", "Data Migration"],
    status: "Concept",
    isDemo: true,
    visual: "flow",
  },
  {
    slug: "demo-customer-self-service-portal",
    title: "Customer Self-Service Portal",
    category: "Web Applications",
    description:
      "Demo web portal where customers can view invoices, track requests and download documents.",
    details:
      "A responsive web application concept demonstrating secure customer accounts, request tracking, document downloads and notification preferences.",
    stack: ["React", "Next.js", "REST API", "Tailwind CSS"],
    status: "In Design",
    isDemo: true,
    visual: "web",
  },
  {
    slug: "demo-office-network-upgrade",
    title: "Office Network Upgrade Plan",
    category: "IT Infrastructure",
    description:
      "Sample network design for a multi-floor office with segmented Wi-Fi, central server room and backups.",
    details:
      "An illustrative infrastructure plan covering structured cabling, VLAN segmentation, managed Wi-Fi, server consolidation and an automated backup strategy.",
    stack: ["Network Design", "VLAN", "Windows Server", "Backup & Recovery"],
    status: "Concept",
    isDemo: true,
    visual: "network",
  },
  {
    slug: "demo-loan-origination-workflow",
    title: "Loan Origination Workflow",
    category: "Software Development",
    description:
      "Prototype of a configurable approval workflow for loan applications with automatic schedules.",
    details:
      "This demo shows a custom application that routes loan applications through configurable approval stages and generates repayment schedules automatically on approval.",
    stack: ["TypeScript", "Node.js", "PostgreSQL", "Workflow Engine"],
    status: "Prototype",
    isDemo: true,
    visual: "flow",
  },
  {
    slug: "demo-school-information-system",
    title: "School Information System",
    category: "Business Systems",
    description:
      "Concept for unified student records, attendance, grading and fee tracking for a private school.",
    details:
      "A sample system illustrating how enrollment, timetables, attendance, assessments and fee payments can be managed together, with report cards generated automatically.",
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    status: "In Design",
    isDemo: true,
    visual: "table",
  },
  {
    slug: "demo-document-digitization",
    title: "Document Digitization Program",
    category: "Digital Transformation",
    description:
      "Illustrative program to scan, index and digitally route paper records for an institution.",
    details:
      "A sample program covering scanning standards, metadata design, access permissions and digital approval routing to reduce paper handling.",
    stack: ["Document Management", "OCR", "Workflow Automation"],
    status: "Concept",
    isDemo: true,
    visual: "table",
  },
  {
    slug: "demo-management-reporting-dashboard",
    title: "Management Reporting Dashboard",
    category: "Web Applications",
    description:
      "Demo executive dashboard consolidating sales, finance and operations data into one view.",
    details:
      "A dashboard concept that pulls data from multiple business systems into a single management view with KPIs, trends and drill-down reports.",
    stack: ["Next.js", "Data Visualization", "SQL", "ETL"],
    status: "Prototype",
    isDemo: true,
    visual: "dashboard",
  },
];
