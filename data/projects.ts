export const projectCategories = [
  "Discord Bots",
  "Automation Tools",
  "Job Search Tools",
  "Websites",
  "Aviation Systems",
  "Aerial Planning"
] as const;

export const projectStatuses = ["draft", "published", "archived"] as const;

export const projectStages = [
  "Active",
  "In progress",
  "Future planning",
  "Documenting"
] as const;

export const caseStudyStatuses = ["ready", "coming-soon"] as const;

export type ProjectCategory = (typeof projectCategories)[number];
export type ProjectStatus = (typeof projectStatuses)[number];
export type ProjectStage = (typeof projectStages)[number];
export type ProjectCaseStudyStatus = (typeof caseStudyStatuses)[number];

export type Project = {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  status: ProjectStatus;
  stage: ProjectStage;
  featured: boolean;
  shortDescription: string;
  fullDescription: string;
  problem: string;
  solution: string;
  features: string[];
  techUsed: string[];
  nextStep: string;
  caseStudyStatus: ProjectCaseStudyStatus;
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
    category: "Discord Bots",
    status: "published",
    stage: "Documenting",
    featured: true,
    shortDescription:
      "A Discord bot track for time-sensitive Kith community updates, wave reminders, and cleaner server coordination.",
    fullDescription:
      "Kith Wave Bot is the portfolio case study for a focused Discord automation idea: keep fast-moving community updates visible without forcing moderators to manually repeat the same messages. The project is framed around scheduled posts, command-based checks, and clear setup boundaries so it can grow without becoming hard to operate.",
    problem:
      "Community servers can lose important drop, reminder, and status updates inside normal chat traffic. Manual reposting works for a while, but it becomes inconsistent as timing, roles, and channels change.",
    solution:
      "Build a small bot around structured commands, scheduled reminders, role-aware messaging, and simple configuration so the next update is easy to send, audit, and adjust.",
    features: [
      "Scheduled reminder flow for launch windows, restocks, and follow-up prompts.",
      "Moderator-friendly command structure for posting updates without editing code.",
      "Config-first setup for channels, timing, and message templates.",
      "Clear status feedback so operators know whether a message was queued or sent."
    ],
    techUsed: ["Python", "discord.py", "Task scheduling", "JSON config"],
    nextStep: "Add command documentation, setup notes, and example operating flows.",
    caseStudyStatus: "ready",
    githubUrl: "",
    liveUrl: "",
    caseStudyUrl: "",
    imageUrl: "https://imgur.com/Siwa1p6",
    createdAt: "2026-06-30T00:00:00.000Z",
    updatedAt: "2026-06-30T00:00:00.000Z"
  },
  {
    id: "kith-bot",
    title: "Kith Bot",
    slug: "kith-bot",
    category: "Discord Bots",
    status: "published",
    stage: "Documenting",
    featured: true,
    shortDescription:
      "A general-purpose Discord utility bot for keeping server actions, lightweight moderation, and member support organized.",
    fullDescription:
      "Kith Bot represents the broader server-operations side of the bot portfolio. The focus is practical utility: commands that reduce repeated moderator work, clearer responses for members, and a code structure that can be extended as server needs become more specific.",
    problem:
      "Small communities often run on ad hoc moderator habits. Useful actions get handled manually, new helpers need context, and repetitive questions or server tasks interrupt normal conversation.",
    solution:
      "Create a modular Discord bot foundation with focused commands, reusable response patterns, and room for server-specific utilities without turning every change into a rewrite.",
    features: [
      "Reusable command handlers for common server support tasks.",
      "Role and channel-aware responses for safer moderation workflows.",
      "Consistent message formatting for announcements and quick replies.",
      "Expandable structure for future reminders, logs, and admin utilities."
    ],
    techUsed: ["Python", "Discord API", "Command handlers", "Server utilities"],
    nextStep: "Document command examples and identify the next server utility module.",
    caseStudyStatus: "ready",
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
    category: "Automation Tools",
    status: "published",
    stage: "Active",
    featured: true,
    shortDescription:
      "A reminder and scheduling utility concept for recurring routines, follow-ups, and time-based bot actions.",
    fullDescription:
      "Clocktower is the automation case study for keeping time-based work visible. It is positioned as a practical reminder layer for Discord or local workflows: define the event, keep the schedule readable, and make the next action hard to miss.",
    problem:
      "Recurring tasks are easy to miss when they live in memory, scattered notes, or one-off chat messages. The more routines stack up, the harder it is to know what needs attention next.",
    solution:
      "Use a small scheduled automation layer that stores repeatable reminders, runs predictable checks, and posts clear prompts when attention is needed.",
    features: [
      "Recurring reminder concepts for follow-ups, routines, and scheduled prompts.",
      "Readable schedule configuration that can be reviewed without digging through logic.",
      "Bot-ready notification flow for Discord channels or operators.",
      "Simple startup scripts for repeatable local operation during development."
    ],
    techUsed: ["Python", "Scheduling", "Discord automation", "Windows scripts"],
    nextStep: "Add reminder examples and a clearer operator setup checklist.",
    caseStudyStatus: "ready",
    githubUrl: "",
    liveUrl: "",
    caseStudyUrl: "",
    imageUrl: "",
    createdAt: "2026-06-30T00:00:00.000Z",
    updatedAt: "2026-06-30T00:00:00.000Z"
  },
  {
    id: "personal-job-search-dashboard",
    title: "Personal Job Search Dashboard",
    slug: "personal-job-search-dashboard",
    category: "Job Search Tools",
    status: "published",
    stage: "Active",
    featured: true,
    shortDescription:
      "A personal dashboard for keeping job leads, applications, interviews, follow-ups, and offers in one place.",
    fullDescription:
      "The Personal Job Search Dashboard is a private operating tool for organizing job-search activity. It treats each lead as a tracked item with status, role details, follow-up notes, dates, and next actions.",
    problem:
      "Job searches get messy when leads, resumes, contacts, follow-up dates, and application notes are spread across tabs, documents, and memory.",
    solution:
      "Use a structured dashboard that keeps application status, role context, follow-up tasks, and notes visible without turning the process into another scattered system.",
    features: [
      "Status tracking for leads, applications, interviews, offers, and rejections.",
      "Role notes for pay, location, schedule, contacts, and requirements.",
      "Follow-up dates and next actions for each opportunity.",
      "Private admin workflow for adding and editing records."
    ],
    techUsed: ["Next.js", "TypeScript", "LocalStorage", "React forms"],
    nextStep: "Connect persistence to a real backend and add reminder exports.",
    caseStudyStatus: "coming-soon",
    githubUrl: "",
    liveUrl: "/admin/jobs",
    caseStudyUrl: "",
    imageUrl: "",
    createdAt: "2026-06-30T00:00:00.000Z",
    updatedAt: "2026-06-30T00:00:00.000Z"
  },
  {
    id: "application-organizer",
    title: "Application Organizer",
    slug: "application-organizer",
    category: "Job Search Tools",
    status: "published",
    stage: "In progress",
    featured: false,
    shortDescription:
      "A job-search organizer for application links, document versions, notes, contacts, and follow-up context.",
    fullDescription:
      "Application Organizer is the job-search filing layer behind the dashboard concept. It focuses on keeping the source material for each application easy to find and update.",
    problem:
      "Application materials can split across browser bookmarks, file names, screenshots, saved postings, and notes that are hard to connect later.",
    solution:
      "Create a repeatable record for each application with the posting link, resume version, cover letter notes, contact details, and follow-up plan.",
    features: [
      "Application record structure for links, contacts, and notes.",
      "Document version notes for resume and cover letter variants.",
      "Follow-up checklist for each role.",
      "Details to be added as the workflow matures."
    ],
    techUsed: ["Next.js", "TypeScript", "Structured data", "Forms"],
    nextStep: "Define the final record fields and connect them to the job dashboard.",
    caseStudyStatus: "coming-soon",
    githubUrl: "",
    liveUrl: "",
    caseStudyUrl: "",
    imageUrl: "",
    createdAt: "2026-06-30T00:00:00.000Z",
    updatedAt: "2026-06-30T00:00:00.000Z"
  },
  {
    id: "resume-cover-letter-toolkit",
    title: "Resume / Cover Letter Toolkit",
    slug: "resume-cover-letter-toolkit",
    category: "Job Search Tools",
    status: "published",
    stage: "In progress",
    featured: true,
    shortDescription:
      "A toolkit concept for keeping resume summaries, cover letter notes, role-specific positioning, and employer-facing materials organized.",
    fullDescription:
      "The Resume / Cover Letter Toolkit is designed to reduce repeated document work during a job search. It keeps reusable summaries, role notes, and draft material close to the application tracker.",
    problem:
      "Resume and cover letter updates become repetitive when every role needs a slightly different angle but the source material is scattered.",
    solution:
      "Create a small toolkit for reusable summaries, targeted notes, and role-specific draft material that can be copied or refined as needed.",
    features: [
      "Reusable professional summary area.",
      "Role-specific notes for targeted applications.",
      "Cover letter drafting checklist.",
      "Interview prep and follow-up notes planned."
    ],
    techUsed: ["Next.js", "React state", "Document workflow", "Local tools"],
    nextStep: "Add role templates and connect the toolkit to application records.",
    caseStudyStatus: "coming-soon",
    githubUrl: "",
    liveUrl: "/resume",
    caseStudyUrl: "",
    imageUrl: "",
    createdAt: "2026-06-30T00:00:00.000Z",
    updatedAt: "2026-06-30T00:00:00.000Z"
  },
  {
    id: "website-builds",
    title: "Website Builds",
    slug: "website-builds",
    category: "Websites",
    status: "published",
    stage: "In progress",
    featured: true,
    shortDescription:
      "A website-build track for personal portfolio pages, intake flows, project hubs, and small practical sites.",
    fullDescription:
      "Website Builds is the public track for organizing site work inside WertWorks. The focus is not fake agency positioning; it is clean information architecture, readable content, contact flows, and maintainable Next.js foundations.",
    problem:
      "Small sites often start as disconnected pages instead of a useful system with clear routes, shared content, and honest calls to action.",
    solution:
      "Build around reusable sections, central data, clear navigation, and pages that explain what exists, what is in progress, and what comes next.",
    features: [
      "Next.js App Router site structure.",
      "Reusable cards, page intros, forms, and project components.",
      "Shared profile, navigation, and project data.",
      "Contact and resume routes connected to the same public identity."
    ],
    techUsed: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
    nextStep: "Add more concrete screenshots and document finished site examples.",
    caseStudyStatus: "coming-soon",
    githubUrl: "",
    liveUrl: "/",
    caseStudyUrl: "",
    imageUrl: "",
    createdAt: "2026-06-30T00:00:00.000Z",
    updatedAt: "2026-06-30T00:00:00.000Z"
  },
  {
    id: "aviation-checklist-automation",
    title: "Aviation Checklist Automation",
    slug: "aviation-checklist-automation",
    category: "Aviation Systems",
    status: "published",
    stage: "Future planning",
    featured: false,
    shortDescription:
      "An aviation-inspired workflow concept for turning checklist discipline into practical software routines.",
    fullDescription:
      "Aviation Checklist Automation connects Airex's maintenance and aviation background to software thinking. It explores how checklists, handoffs, safety gates, and routine verification can shape useful tools.",
    problem:
      "Recurring workflows can fail when steps live in memory and there is no visible handoff, status, or verification process.",
    solution:
      "Translate checklist discipline into software patterns: clear steps, responsible status, review points, and documented next actions.",
    features: [
      "Checklist-first workflow planning.",
      "Status and handoff concepts inspired by aviation maintenance habits.",
      "Use-case notes for job tools, bots, aerial planning, and site operations.",
      "Details to be added as concrete prototypes are built."
    ],
    techUsed: ["Workflow design", "Checklist systems", "Automation planning"],
    nextStep: "Prototype one checklist flow inside an automation or job-tools page.",
    caseStudyStatus: "coming-soon",
    githubUrl: "",
    liveUrl: "",
    caseStudyUrl: "",
    imageUrl: "",
    createdAt: "2026-06-30T00:00:00.000Z",
    updatedAt: "2026-06-30T00:00:00.000Z"
  },
  {
    id: "keystone-aerial-services-aerial-planning",
    title: "Keystone Aerial Services / Aerial Planning",
    slug: "keystone-aerial-services-aerial-planning",
    category: "Aerial Planning",
    status: "published",
    stage: "Future planning",
    featured: true,
    shortDescription:
      "A future aerial-services planning track for launch requirements, use cases, equipment, safety, and intake workflows.",
    fullDescription:
      "Keystone Aerial Services / Aerial Planning is explicitly a planning track, not an active service offer. It organizes future possibilities, launch requirements, licensing boundaries, equipment planning, and responsible operating process.",
    problem:
      "Future aerial work needs clear boundaries before it is presented publicly: licensing, equipment, safety, insurance, operating area, intake, and legal requirements all matter.",
    solution:
      "Keep aerial planning in a dedicated roadmap that states what is being researched, what is required before launch, and what conversations are appropriate today.",
    features: [
      "Launch-status language that avoids claiming active commercial service.",
      "Possible future service categories and operating boundaries.",
      "Part 107, insurance, safety, equipment, and intake planning.",
      "Roadmap structure for deciding when the concept is ready to launch."
    ],
    techUsed: ["Launch planning", "Aviation workflow", "Intake design", "Research"],
    nextStep: "Define equipment requirements, licensing timeline, and intake checklist.",
    caseStudyStatus: "coming-soon",
    githubUrl: "",
    liveUrl: "/aerial-planning",
    caseStudyUrl: "",
    imageUrl: "",
    createdAt: "2026-06-30T00:00:00.000Z",
    updatedAt: "2026-06-30T00:00:00.000Z"
  }
];
