import {
  Bot,
  Briefcase,
  ClipboardList,
  FileText,
  Globe2,
  Plane,
  Radar
} from "lucide-react";

export type ProjectCategory =
  | "Automation"
  | "Bots"
  | "Drone Business"
  | "Aviation"
  | "Websites"
  | "Job Search Tools";

export type Project = {
  title: string;
  slug: string;
  category: ProjectCategory;
  problem: string;
  solution: string;
  tech: string[];
  status: "Planning" | "In Progress" | "MVP" | "Active Build";
  nextStep: string;
  icon: typeof Radar;
};

export const projectCategories: Array<ProjectCategory | "All"> = [
  "All",
  "Automation",
  "Bots",
  "Drone Business",
  "Aviation",
  "Websites",
  "Job Search Tools"
];

export const projects: Project[] = [
  {
    title: "Keystone Aerial Services",
    slug: "keystone-aerial-services",
    category: "Drone Business",
    problem:
      "Local property, inspection, and documentation work often needs clear aerial context without inflated promises.",
    solution:
      "A planning site and intake flow for future NEPA drone services with capability disclaimers and lead capture.",
    tech: ["Next.js", "Tailwind CSS", "Forms", "Local SEO"],
    status: "Planning",
    nextStep: "Define equipment, licensing, insurance, and service boundaries.",
    icon: Radar
  },
  {
    title: "Discord Bot Development",
    slug: "discord-bot-development",
    category: "Bots",
    problem:
      "Communities need reliable moderation, reminders, role tools, and status utilities without bloated dashboards.",
    solution:
      "Small Discord bots focused on clear commands, predictable behavior, and maintainable configuration.",
    tech: ["Python", "discord.py", "JSON", "Automation"],
    status: "Active Build",
    nextStep: "Improve command modules, logging, and deployment instructions.",
    icon: Bot
  },
  {
    title: "Personal Job-Search Dashboard",
    slug: "personal-job-search-dashboard",
    category: "Job Search Tools",
    problem:
      "Applications, follow-ups, pay notes, and links become scattered across messages and browser tabs.",
    solution:
      "A private-feeling local tracker with kanban, table view, reminders, search, and CSV export.",
    tech: ["React", "LocalStorage", "TypeScript", "CSV"],
    status: "MVP",
    nextStep: "Add optional authentication and cloud sync after the local version proves useful.",
    icon: Briefcase
  },
  {
    title: "Aviation Checklist Automation",
    slug: "aviation-checklist-automation",
    category: "Aviation",
    problem:
      "Training and maintenance workflows depend on clear, repeatable checklist habits.",
    solution:
      "Prototype structured checklist flows for study, sim practice, and task readiness without claiming operational use.",
    tech: ["TypeScript", "Structured Data", "UX", "Checklists"],
    status: "Planning",
    nextStep: "Build a non-operational study checklist MVP for flight training prep.",
    icon: Plane
  },
  {
    title: "Resume and Cover-Letter Toolkit",
    slug: "resume-cover-letter-toolkit",
    category: "Automation",
    problem:
      "Career documents need consistent summaries, targeted phrasing, and fast iteration without exaggeration.",
    solution:
      "A structured resume data model and repeatable tooling for employer-specific summaries and letters.",
    tech: ["TypeScript", "Templates", "Markdown", "Forms"],
    status: "In Progress",
    nextStep: "Connect structured resume data to downloadable PDF generation.",
    icon: FileText
  },
  {
    title: "Website Builds",
    slug: "website-builds",
    category: "Websites",
    problem:
      "Small projects and local businesses need credible web presence without unnecessary platform weight.",
    solution:
      "Fast Next.js sites with clean messaging, contact flows, responsive design, and deploy-ready structure.",
    tech: ["Next.js", "Tailwind CSS", "shadcn/ui", "Vercel"],
    status: "In Progress",
    nextStep: "Document reusable page sections and launch workflow.",
    icon: Globe2
  },
  {
    title: "Application Organizer",
    slug: "application-organizer",
    category: "Automation",
    problem:
      "Job applications require reminders, notes, contacts, and next steps across multiple opportunities.",
    solution:
      "A simple organizer that prioritizes follow-ups and keeps the current pipeline visible.",
    tech: ["React", "Forms", "LocalStorage", "CSV Export"],
    status: "MVP",
    nextStep: "Add calendar export and reminder notifications.",
    icon: ClipboardList
  }
];
