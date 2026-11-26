import {
  Code2,
  Database,
  LayoutDashboard,
  Server,
  Sparkles,
  Workflow,
} from "lucide-react";
import type { Solution } from "@/types";

export const solutions: Solution[] = [
  {
    slug: "business-automation",
    title: "Business Automation",
    description:
      "Automate repetitive tasks, approvals and data entry so your team can focus on work that matters.",
    icon: Workflow,
    href: "/solutions#business-automation",
    points: [
      "Automated approvals and notifications",
      "Fewer manual data-entry errors",
      "Consistent, trackable processes",
    ],
  },
  {
    slug: "business-management-systems",
    title: "Business Management Systems",
    description:
      "Unified platforms to manage sales, inventory, finance, people and reporting in one place.",
    icon: LayoutDashboard,
    href: "/products",
    points: [
      "Ready-to-deploy industry systems",
      "Configurable modules",
      "Real-time management reporting",
    ],
  },
  {
    slug: "digital-transformation",
    title: "Digital Transformation",
    description:
      "Move from paper and spreadsheets to modern, connected digital workflows at a sustainable pace.",
    icon: Sparkles,
    href: "/solutions#digital-transformation",
    points: [
      "Process assessment and redesign",
      "Phased digital adoption",
      "Staff onboarding and training",
    ],
  },
  {
    slug: "information-management",
    title: "Information Management",
    description:
      "Organize documents, records and data so the right information is available to the right people.",
    icon: Database,
    href: "/solutions#information-management",
    points: [
      "Structured databases and records",
      "Secure document management",
      "Reporting and data insights",
    ],
  },
  {
    slug: "it-infrastructure",
    title: "IT Infrastructure",
    description:
      "Reliable networks, servers and systems planned and installed to support day-to-day operations.",
    icon: Server,
    href: "/solutions#it-infrastructure",
    points: [
      "Network and server setup",
      "Infrastructure planning",
      "Ongoing maintenance and support",
    ],
  },
  {
    slug: "custom-software",
    title: "Custom Software",
    description:
      "Software designed around your exact requirements when an off-the-shelf product is not the right fit.",
    icon: Code2,
    href: "/services#custom-software-development",
    points: [
      "Built around your workflows",
      "Scalable architecture",
      "Integration with existing tools",
    ],
  },
];
