export const projectCategories = [
  "Automation",
  "Bots",
  "Drone Planning",
  "Websites",
  "Job Search Tools",
  "Practical Tech"
] as const;

export const projectStatuses = ["draft", "published", "archived"] as const;

export type ProjectCategory = (typeof projectCategories)[number];
export type ProjectStatus = (typeof projectStatuses)[number];

export type Project = {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  status: ProjectStatus;
  featured: boolean;
  shortDescription: string;
  fullDescription: string;
  problem: string;
  solution: string;
  features: string[];
  techUsed: string[];
  githubUrl: string;
  liveUrl: string;
  caseStudyUrl: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export const projects: Project[] = [
  {
    id: "kith-wave-bot",
    title: "Kith Wave Bot",
    slug: "kith-wave-bot",
    category: "Bots",
    status: "published",
    featured: false,
    shortDescription: "Add description here.",
    fullDescription: "Add description here.",
    problem: "Add problem here.",
    solution: "Add solution here.",
    features: ["Add feature here"],
    techUsed: ["Add tech here"],
    githubUrl: "",
    liveUrl: "",
    caseStudyUrl: "",
    imageUrl: "",
    createdAt: "2026-06-30T00:00:00.000Z",
    updatedAt: "2026-06-30T00:00:00.000Z"
  },
  {
    id: "kith-bot",
    title: "Kith Bot",
    slug: "kith-bot",
    category: "Bots",
    status: "published",
    featured: false,
    shortDescription: "Add description here.",
    fullDescription: "Add description here.",
    problem: "Add problem here.",
    solution: "Add solution here.",
    features: ["Add feature here"],
    techUsed: ["Add tech here"],
    githubUrl: "",
    liveUrl: "",
    caseStudyUrl: "",
    imageUrl: "",
    createdAt: "2026-06-30T00:00:00.000Z",
    updatedAt: "2026-06-30T00:00:00.000Z"
  },
  {
    id: "clocktower",
    title: "Clocktower",
    slug: "clocktower",
    category: "Automation",
    status: "published",
    featured: false,
    shortDescription: "Add description here.",
    fullDescription: "Add description here.",
    problem: "Add problem here.",
    solution: "Add solution here.",
    features: ["Add feature here"],
    techUsed: ["Add tech here"],
    githubUrl: "",
    liveUrl: "",
    caseStudyUrl: "",
    imageUrl: "",
    createdAt: "2026-06-30T00:00:00.000Z",
    updatedAt: "2026-06-30T00:00:00.000Z"
  }
];
