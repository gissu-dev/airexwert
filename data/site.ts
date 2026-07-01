import {
  Bot,
  Briefcase,
  ClipboardCheck,
  Crosshair,
  FileText,
  FolderOpen,
  Globe2,
  Mail,
  NotebookText,
  ShieldCheck,
  UserRound,
  Wrench
} from "lucide-react";
import { profile } from "@/data/profile";

export const siteConfig = {
  name: profile.brandName,
  personName: profile.name,
  location: profile.location,
  headline: profile.headline,
  tagline: profile.tagline,
  email: profile.email,
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/field-notes", label: "Field Notes" },
    { href: "/resume", label: "Resume" },
    { href: "/contact", label: "Contact" }
  ]
};

export const coreMessage =
  "WertWorks is Airex Wert's working archive for useful digital projects: websites, Discord bots, automation tools, aviation experiments, field notes, and future aerial planning.";

export const featureRoutes = [
  {
    title: "About",
    audience: "People getting to know the builder behind the work",
    description:
      "Background, operating style, NEPA roots, Army aviation maintenance, and current focus.",
    primaryHref: "/about",
    secondaryHref: "/resume",
    cta: "Read the about page",
    icon: UserRound
  },
  {
    title: "Projects",
    audience: "People reviewing practical work and case studies",
    description:
      "Websites, Discord bots, automation tools, aviation systems, and service ideas.",
    primaryHref: "/projects",
    secondaryHref: "/field-notes",
    cta: "View projects",
    icon: FolderOpen
  },
  {
    title: "Field Notes",
    audience: "People reading build logs and working notes",
    description:
      "Build logs, website notes, bot lessons, aviation thoughts, career notes, and ideas.",
    primaryHref: "/field-notes",
    secondaryHref: "/projects",
    cta: "Read field notes",
    icon: NotebookText
  },
  {
    title: "Resume",
    audience: "Employers, recruiters, and hiring managers",
    description:
      "Work background, skills, operating style, and selected technical projects.",
    primaryHref: "/resume",
    secondaryHref: "/contact",
    cta: "View resume",
    icon: Briefcase
  },
  {
    title: "Contact",
    audience: "Project, role, and collaboration conversations",
    description:
      "A direct route for roles, practical websites, bots, automation ideas, and planning questions.",
    primaryHref: "/contact",
    secondaryHref: "/about",
    cta: "Contact Airex",
    icon: Mail
  }
];

export const buildAreas = [
  {
    title: "Automation & Bots",
    description:
      "Discord bots, reminders, status updates, server utilities, and small automations.",
    href: "/automation-bots",
    icon: Bot
  },
  {
    title: "Websites & Tools",
    description:
      "Clean site structures, contact flows, project pages, forms, and useful web interfaces.",
    href: "/projects#website-builds",
    icon: Globe2
  },
  {
    title: "Career Systems",
    description:
      "Application tracking, resume organization, follow-up notes, and interview prep workflows.",
    href: "/projects#personal-job-search-dashboard",
    icon: Briefcase
  },
  {
    title: "Aviation-Inspired Workflows",
    description:
      "Checklist thinking, handoff discipline, safety gates, and structured operating routines.",
    href: "/projects#aviation-checklist-automation",
    icon: ClipboardCheck
  },
  {
    title: "Aerial Planning",
    description:
      "Future aerial services planning with launch requirements clearly separated from active offers.",
    href: "/aerial-planning",
    icon: Crosshair
  }
];

export const currentStatusGroups = [
  {
    label: "Active",
    items: [
      "Personal website",
      "Discord bot documentation",
      "Private career dashboard",
      "Automation systems"
    ]
  },
  {
    label: "In progress",
    items: [
      "Project case studies",
      "Field notes",
      "Resume page",
      "Contact system",
      "Website build documentation"
    ]
  },
  {
    label: "Future",
    items: [
      "Aerial services launch planning",
      "Part 107 and insurance readiness",
      "Equipment planning",
      "Client intake process"
    ]
  }
];

export const quickStats = [
  {
    title: "Veteran background",
    description: "U.S. Army experience with a disciplined, mission-focused approach.",
    icon: ShieldCheck
  },
  {
    title: "Automation and bots",
    description: "Building practical tools, Discord bots, and workflow helpers.",
    icon: Bot
  },
  {
    title: "Websites and tools",
    description: "Creating clean sites, forms, dashboards, and job-search systems.",
    icon: Globe2
  },
  {
    title: "Aerial planning",
    description: "Developing future aerial planning with clear launch boundaries.",
    icon: Crosshair
  },
  {
    title: "Systems mindset",
    description: "Army aviation maintenance background applied as checklist discipline.",
    icon: Wrench
  }
];

export const focusAreas = [
  {
    title: "Automation portfolio",
    description:
      "Bots, dashboards, workflow helpers, and small tools built around practical daily problems.",
    icon: Bot
  },
  {
    title: "Practical technology",
    description:
      "Useful software over novelty: websites, trackers, forms, and systems that reduce friction.",
    icon: FileText
  },
  {
    title: "Background discipline",
    description:
      "Army aviation maintenance experience shows up as checklist thinking, accountability, and systems awareness.",
    icon: Wrench
  }
];
