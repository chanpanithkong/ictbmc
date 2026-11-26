import {
  ClipboardList,
  FlaskConical,
  LifeBuoy,
  MessagesSquare,
  PenTool,
  Rocket,
  Code2,
  Lightbulb,
  ScanSearch,
  Search,
  Settings,
  Handshake,
} from "lucide-react";
import type { ProcessStep } from "@/types";

/** "How We Work" — delivery process used across the site */
export const deliveryProcess: ProcessStep[] = [
  {
    title: "Consultation",
    description:
      "Understand the client's business, challenges, requirements, and objectives.",
    icon: MessagesSquare,
  },
  {
    title: "Planning",
    description: "Analyze requirements and develop an appropriate technology plan.",
    icon: ClipboardList,
  },
  {
    title: "Design",
    description: "Design the user interface, system architecture, and workflow.",
    icon: PenTool,
  },
  {
    title: "Development",
    description: "Develop, configure, and implement the technology solution.",
    icon: Code2,
  },
  {
    title: "Testing",
    description: "Perform testing, review, and quality assurance.",
    icon: FlaskConical,
  },
  {
    title: "Deployment",
    description: "Deploy the solution and assist with implementation.",
    icon: Rocket,
  },
  {
    title: "Support",
    description: "Provide maintenance, updates, and technical support.",
    icon: LifeBuoy,
  },
];

/** IT Consulting engagement process */
export const consultingProcess: ProcessStep[] = [
  {
    title: "Understand",
    description:
      "Understand client needs, challenges, objectives, and requirements.",
    icon: Search,
  },
  {
    title: "Analyze",
    description:
      "Evaluate existing systems, workflows, infrastructure, and technology challenges.",
    icon: ScanSearch,
  },
  {
    title: "Recommend",
    description: "Develop practical technology recommendations and solutions.",
    icon: Lightbulb,
  },
  {
    title: "Implement",
    description:
      "Implement, configure, develop, and deploy the proposed solution.",
    icon: Settings,
  },
  {
    title: "Support",
    description:
      "Provide maintenance, technical assistance, optimization, and ongoing support.",
    icon: Handshake,
  },
];
