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
      "Draft placeholder: user content needed for a note about why WertWorks exists and how the site should feel.",
    content:
      "Draft placeholder: user content needed for the process behind WertWorks and the purpose of this personal project hub.",
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
      "Draft placeholder: user content needed for notes about making the site feel more personal, useful, and clear.",
    content:
      "Draft placeholder: user content needed for website notes about improving the presentation, structure, and tone of WertWorks.",
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
      "Draft placeholder: user content needed for a build note about a Discord music bot and its interface details.",
    content:
      "Draft placeholder: user content needed for lessons, implementation notes, and decisions from a Discord music bot project.",
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
      "Draft placeholder: user content needed for a note about aviation, checklists, and systems thinking.",
    content:
      "Draft placeholder: user content needed for a personal note connecting aviation habits, checklists, and project workflows.",
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
      "Draft placeholder: user content needed for a systems note about small bots, workflows, and practical automation.",
    content:
      "Draft placeholder: user content needed for a systems note about where small bots and automation projects are useful.",
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
      "Draft placeholder: user content needed for roadmap notes before presenting any aerial services project as launched.",
    content:
      "Draft placeholder: user content needed for roadmap thinking, assumptions, and next steps before this becomes a public update.",
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
      "Draft placeholder: user content needed for career notes about presentation, direction, and next steps.",
    content:
      "Draft placeholder: user content needed for career notes about improving presentation and making the work easier to understand.",
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
      "Draft placeholder: user content needed for a general note about places, atmosphere, and observation.",
    content:
      "Draft placeholder: user content needed for general reflections on places, old infrastructure, and overlooked details.",
    tags: ["Places", "Atmosphere", "Observation"],
    readTime: "3 min",
    publishedAt: "",
    createdAt: now,
    updatedAt: now
  }
];
