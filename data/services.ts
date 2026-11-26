import {
  ArrowLeftRight,
  Code2,
  Database,
  Globe,
  LayoutDashboard,
  Lightbulb,
  Network,
  Wrench,
} from "lucide-react";
import type { Service } from "@/types";

export const services: Service[] = [
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    description:
      "Design and develop custom applications based on client requirements and business workflows.",
    icon: Code2,
    details:
      "We translate your business processes into reliable, maintainable software. From requirements discovery to release, every application is designed around the way your team actually works.",
    capabilities: [
      "Requirements analysis & solution design",
      "Desktop, web and cross-platform applications",
      "Workflow and approval automation",
      "Integration with existing systems",
    ],
  },
  {
    slug: "it-consulting",
    title: "IT Consulting",
    description:
      "Provide professional technology advice, planning, assessment, and implementation recommendations.",
    icon: Lightbulb,
    details:
      "Independent, practical guidance to help you make confident technology decisions — from assessing what you have today to planning what you need next.",
    capabilities: [
      "IT strategy & roadmap planning",
      "Technology and software assessment",
      "System architecture review",
      "Implementation recommendations",
    ],
  },
  {
    slug: "business-management-systems",
    title: "Business Management Systems",
    description:
      "Develop integrated systems to help organizations manage operations, customers, employees, inventory, finances, and reporting.",
    icon: LayoutDashboard,
    details:
      "Integrated platforms that bring operations, customers, people, stock and finances into one place, giving management a single, accurate view of the business.",
    capabilities: [
      "Operations & inventory management",
      "Customer and sales management",
      "HR, payroll and finance modules",
      "Dashboards and management reporting",
    ],
  },
  {
    slug: "web-application-development",
    title: "Web Application Development",
    description:
      "Develop modern, responsive, scalable, and user-friendly web applications.",
    icon: Globe,
    details:
      "Fast, secure and responsive web applications and portals that work seamlessly across desktop, tablet and mobile — built with modern, proven frameworks.",
    capabilities: [
      "Business portals & dashboards",
      "Responsive corporate websites",
      "Customer self-service applications",
      "Performance & accessibility best practices",
    ],
  },
  {
    slug: "it-infrastructure-networking",
    title: "IT Infrastructure & Networking",
    description:
      "Support network infrastructure, server deployment, system installation, and technology infrastructure planning.",
    icon: Network,
    details:
      "Stable, well-planned infrastructure is the foundation of every digital system. We help design, install and maintain the networks and servers your business relies on.",
    capabilities: [
      "Network design & installation",
      "Server deployment & configuration",
      "System installation and setup",
      "Infrastructure capacity planning",
    ],
  },
  {
    slug: "database-information-management",
    title: "Database & Information Management",
    description:
      "Design information management systems, data platforms, reporting solutions, and structured database architecture.",
    icon: Database,
    details:
      "Well-structured data turns information into insight. We design databases, data platforms and reporting solutions that keep your information organized, consistent and accessible.",
    capabilities: [
      "Database design & architecture",
      "Data migration and consolidation",
      "Reporting & business intelligence",
      "Records and information management",
    ],
  },
  {
    slug: "it-support-maintenance",
    title: "IT Support & Maintenance",
    description:
      "Provide technical support, troubleshooting, system maintenance, and technology assistance.",
    icon: Wrench,
    details:
      "Responsive technical assistance that keeps your people productive and your systems running — from day-to-day troubleshooting to planned maintenance.",
    capabilities: [
      "Helpdesk & troubleshooting",
      "Preventive system maintenance",
      "Software updates & patching",
      "User assistance and training",
    ],
  },
  {
    slug: "digital-transformation",
    title: "Digital Transformation",
    description:
      "Help businesses transform manual processes into modern digital workflows.",
    icon: ArrowLeftRight,
    details:
      "We help organizations replace paperwork and spreadsheets with connected digital workflows — step by step, with minimal disruption to daily operations.",
    capabilities: [
      "Process mapping & digitization",
      "Paperless workflow design",
      "Change management support",
      "Phased adoption planning",
    ],
  },
];
