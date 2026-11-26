import {
  Boxes,
  ClipboardCheck,
  Compass,
  Database,
  FolderKanban,
  Gauge,
  Headset,
  Layers,
  Network,
  Server,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export const consultingServices: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "IT Strategy",
    description: "Align technology investments with your business goals through a clear, prioritized roadmap.",
    icon: Compass,
  },
  {
    title: "Technology Assessment",
    description: "Review your current systems, tools and capabilities to identify gaps and opportunities.",
    icon: Gauge,
  },
  {
    title: "Software Selection",
    description: "Define requirements and objectively evaluate software options that fit your needs.",
    icon: ClipboardCheck,
  },
  {
    title: "Digital Transformation Strategy",
    description: "Plan a realistic, phased path from manual processes to connected digital workflows.",
    icon: Layers,
  },
  {
    title: "Business Process Automation",
    description: "Identify repetitive tasks and design automated workflows that save time and reduce errors.",
    icon: Workflow,
  },
  {
    title: "Database Design",
    description: "Structure your data for accuracy, performance and reliable reporting.",
    icon: Database,
  },
  {
    title: "System Architecture",
    description: "Design scalable, maintainable architectures for new and existing systems.",
    icon: Boxes,
  },
  {
    title: "Infrastructure Planning",
    description: "Plan servers, storage and capacity to support current and future workloads.",
    icon: Server,
  },
  {
    title: "Network Consulting",
    description: "Design reliable, secure networks for offices, branches and multi-site operations.",
    icon: Network,
  },
  {
    title: "Cybersecurity Assessment",
    description: "Review security practices and configurations and recommend practical improvements.",
    icon: ShieldCheck,
  },
  {
    title: "IT Project Management",
    description: "Plan, coordinate and oversee technology projects from kickoff to go-live.",
    icon: FolderKanban,
  },
  {
    title: "Technical Support",
    description: "Ongoing expert assistance to keep systems running smoothly after implementation.",
    icon: Headset,
  },
];
