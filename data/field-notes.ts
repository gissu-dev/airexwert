export const fieldNoteCategories = [
  "Build Logs",
  "Website Notes",
  "Bot Notes",
  "Aviation",
  "AI Experiments",
  "Systems",
  "Personal Notes",
  "Learning Notes",
  "Project Updates",
  "Ideas",
  "Places",
  "Urbex",
  "Career Notes",
  "Gear / Tools"
] as const;

export const fieldNoteStatuses = ["draft", "published", "archived"] as const;

export type FieldNoteCategory = (typeof fieldNoteCategories)[number];
export type FieldNoteStatus = (typeof fieldNoteStatuses)[number];

export type FieldNote = {
  id: string;
  title: string;
  slug: string;
  category: FieldNoteCategory;
  status: FieldNoteStatus;
  featured: boolean;
  excerpt: string;
  content: string;
  tags: string[];
  readTime: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
};

const now = "2026-07-01T00:00:00.000Z";

export const seedFieldNotes: FieldNote[] = [
  {
    id: "why-i-am-building-wertworks",
    title: "Why I am Building WertWorks",
    slug: "why-i-am-building-wertworks",
    category: "Personal Notes",
    status: "draft",
    featured: true,
    excerpt:
      "A note on building a personal site that feels useful, honest, and connected to the work I actually want to do.",
    content:
      "This first note is a placeholder for the process behind WertWorks: building a personal site that feels useful, honest, and connected to the work I actually want to do.",
    tags: ["WertWorks", "Personal site", "Process"],
    readTime: "4 min",
    publishedAt: "",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "making-my-website-feel-less-fake",
    title: "Making My Website Feel Less Fake",
    slug: "making-my-website-feel-less-fake",
    category: "Website Notes",
    status: "draft",
    featured: false,
    excerpt:
      "Notes on turning a portfolio from a generic project board into something that feels more personal, useful, and hireable.",
    content:
      "This placeholder is for notes on turning a portfolio from a generic project board into something more personal, useful, and hireable.",
    tags: ["Portfolio", "Website", "Copy"],
    readTime: "5 min",
    publishedAt: "",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "building-kithwave",
    title: "Building KithWave",
    slug: "building-kithwave",
    category: "Bot Notes",
    status: "draft",
    featured: false,
    excerpt:
      "What I learned building a Discord music bot with queues, radio presets, Spotify imports, and control buttons.",
    content:
      "This placeholder is for lessons from building a Discord music bot with queues, radio presets, Spotify imports, and control buttons.",
    tags: ["Discord", "Bots", "Music"],
    readTime: "6 min",
    publishedAt: "",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "the-checklist-mindset",
    title: "The Checklist Mindset",
    slug: "the-checklist-mindset",
    category: "Aviation",
    status: "draft",
    featured: false,
    excerpt:
      "How aviation maintenance, flight sim, and systems thinking changed how I approach projects and workflows.",
    content:
      "This placeholder is for how aviation maintenance, flight sim, and systems thinking changed how I approach projects and workflows.",
    tags: ["Aviation", "Systems", "Checklists"],
    readTime: "4 min",
    publishedAt: "",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "why-small-bots-still-matter",
    title: "Why Small Bots Still Matter",
    slug: "why-small-bots-still-matter",
    category: "Systems",
    status: "draft",
    featured: false,
    excerpt:
      "How small Discord bots and automation projects can solve real problems without needing to become huge apps.",
    content:
      "This placeholder is for why small Discord bots and automation projects can solve real problems without becoming huge apps.",
    tags: ["Automation", "Discord", "Systems"],
    readTime: "3 min",
    publishedAt: "",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "keystone-aerial-services-roadmap",
    title: "Keystone Aerial Services Roadmap",
    slug: "keystone-aerial-services-roadmap",
    category: "Project Updates",
    status: "draft",
    featured: false,
    excerpt:
      "Notes on rethinking the roadmap for a future aerial services business before presenting it as fully launched.",
    content:
      "This placeholder is for rethinking the roadmap for a future aerial services business before presenting it as fully launched.",
    tags: ["Aerial planning", "Roadmap", "Keystone"],
    readTime: "5 min",
    publishedAt: "",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "career-rebuild-notes",
    title: "Career Rebuild Notes",
    slug: "career-rebuild-notes",
    category: "Career Notes",
    status: "draft",
    featured: false,
    excerpt:
      "Thoughts on rebuilding, finding better work, improving presentation, and turning scattered skills into something people understand.",
    content:
      "This placeholder is for rebuilding, finding better work, improving presentation, and turning scattered skills into something people understand.",
    tags: ["Career", "Rebuild", "Presentation"],
    readTime: "4 min",
    publishedAt: "",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "places-atmosphere-and-curiosity",
    title: "Places, Atmosphere, and Curiosity",
    slug: "places-atmosphere-and-curiosity",
    category: "Places",
    status: "draft",
    featured: false,
    excerpt:
      "A general note on why certain places, old infrastructure, and overlooked details can be interesting without making it the whole identity of the site.",
    content:
      "This placeholder is for general reflections on places, old infrastructure, and overlooked details without making that the whole identity of the site.",
    tags: ["Places", "Atmosphere", "Observation"],
    readTime: "3 min",
    publishedAt: "",
    createdAt: now,
    updatedAt: now
  }
];
