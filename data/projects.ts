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
  "Pre-launch",
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
  caseStudyImages: string[];
  createdAt: string;
  updatedAt: string;
};

export const projects: Project[] = [
  {
    id: "kith-wave-bot",
    title: "KithWave Discord Music Bot",
    slug: "kith-wave-bot",
    category: "Discord Bots",
    status: "published",
    stage: "Active",
    featured: true,
    shortDescription:
      "A Discord music bot for YouTube playback, live radio presets, Spotify link imports, queue controls, and lyrics lookup.",
    fullDescription:
      "KithWave is a Discord music bot built for a real server. It supports prefix commands, YouTube search and URLs, live radio presets, Spotify metadata imports, YouTube playlist imports, shuffle controls, per-server queue state, and a now-playing panel with playback buttons.",
    problem:
      "Music bots can get messy when queue controls, radio stations, playlist imports, and playback state all live in separate commands with unclear feedback.",
    solution:
      "Build a focused Discord music bot with reliable queue state, button-based playback controls, radio preset configuration, and optional Spotify metadata support that resolves tracks into playable sources.",
    features: [
      "Plays music from YouTube search, direct URLs, and YouTube playlists.",
      "Live radio mode with preset dropdowns, station lookup, and direct stream URLs.",
      "Spotify track, album, and playlist link imports using metadata lookup.",
      "Now-playing panel with pause, skip, stop, queue, volume, shuffle, and lyrics controls."
    ],
    techUsed: ["Python", "discord.py", "yt-dlp", "ffmpeg", "Spotipy"],
    nextStep: "Add slash-command versions of core controls and small tests around query parsing and URL handling.",
    caseStudyStatus: "ready",
    githubUrl: "https://github.com/gissu-dev/KithWave",
    liveUrl: "",
    caseStudyUrl: "",
    imageUrl: "",
    caseStudyImages: [],
    createdAt: "2026-06-30T00:00:00.000Z",
    updatedAt: "2026-06-30T00:00:00.000Z"
  },
  {
    id: "kith-bot",
    title: "House of Kith Bot",
    slug: "kith-bot",
    category: "Discord Bots",
    status: "published",
    stage: "Active",
    featured: true,
    shortDescription:
      "A custom Discord server bot with utility commands, role setup helpers, archive reactions, tarot reads, and AI voice messages.",
    fullDescription:
      "House of Kith Bot is a custom Discord bot built for the House of Kith server. The core features are stable and running, with prefix commands for status, bot info, owner restart, AI voice omens, and role setup, plus slash-command tarot tools and optional Valorant account commands.",
    problem:
      "A community server needs small utilities that fit its culture: self-role setup, archive saves, status checks, voice moments, and game-related helpers without forcing moderators to run everything manually.",
    solution:
      "Use a modular Python Discord bot with command cogs, environment-based setup, OpenAI text and TTS support, reaction-based archiving, tarot slash commands, and optional Valorant API integration.",
    features: [
      "Prefix commands for diagnostics, bot info, owner restart, AI voice omens, and role setup.",
      "Reaction-based archive flow for saving messages into an archive channel.",
      "Slash-command tarot reads with single-card and spread options.",
      "Optional Valorant account linking, MMR, and last-match commands when the API key is configured."
    ],
    techUsed: ["Python", "discord.py", "OpenAI API", "TTS", "HenrikDev Valorant API"],
    nextStep: "Keep polishing the active modules and document which parked cogs are intentionally inactive.",
    caseStudyStatus: "ready",
    githubUrl: "https://github.com/gissu-dev/House-of-Kith-Bot",
    liveUrl: "",
    caseStudyUrl: "",
    imageUrl: "",
    caseStudyImages: [],
    createdAt: "2026-06-30T00:00:00.000Z",
    updatedAt: "2026-06-30T00:00:00.000Z"
  },
  {
    id: "clocktower",
    title: "Clocktower Bot",
    slug: "clocktower",
    category: "Discord Bots",
    status: "published",
    stage: "Active",
    featured: true,
    shortDescription:
      "A small Discord voice bot that rings a clocktower bell hourly and includes manual bell, timestamp, and countdown timer commands.",
    fullDescription:
      "Clocktower Bot is a focused Discord bot built for one server. It rings a bell in a configured voice channel at the top of each hour when non-bot members are present, supports manual bell triggers, includes admin controls for the hourly loop, and adds utility commands for timestamps and live countdown timers.",
    problem:
      "Server rituals and timed reminders are easy to forget when they depend on someone manually joining voice, posting timestamps, or tracking a countdown in chat.",
    solution:
      "Keep the bot intentionally small: configure one voice channel, run a predictable hourly bell loop, expose simple admin commands, and provide timestamp and timer utilities for members.",
    features: [
      "Rings a bell at the top of each hour when users are in the configured voice channel.",
      "Manual `!bell` command with public or restricted access modes.",
      "Admin `!clock on|off|status` controls for hourly ringing.",
      "Timestamp helpers and channel countdown timers with basic restart recovery."
    ],
    techUsed: ["Python", "discord.py", "ffmpeg", "Discord voice", "Windows launcher"],
    nextStep: "Keep the setup checklist tight and improve restart behavior around active timers.",
    caseStudyStatus: "ready",
    githubUrl: "https://github.com/gissu-dev/clocktower-bot",
    liveUrl: "",
    caseStudyUrl: "",
    imageUrl: "",
    caseStudyImages: [],
    createdAt: "2026-06-30T00:00:00.000Z",
    updatedAt: "2026-06-30T00:00:00.000Z"
  },
  {
    id: "spotify-liked-songs-feed",
    title: "Spotify Liked Songs Feed",
    slug: "spotify-liked-songs-feed",
    category: "Automation Tools",
    status: "published",
    stage: "In progress",
    featured: false,
    shortDescription:
      "A small website feed that pulls the latest 20 saved Spotify tracks into the About page.",
    fullDescription:
      "The Spotify Liked Songs Feed connects WertWorks to Spotify's Web API and shows a compact list of recently saved tracks on the About page. It uses server-side Spotify credentials, a refresh token, album art, track metadata, save dates, and direct Spotify links without exposing private API secrets in the browser.",
    problem:
      "Music is part of the personal context behind the site, but embedding a whole playlist can feel too static and too separate from what is actually being listened to recently.",
    solution:
      "Use the Spotify Web API to fetch the latest 20 saved tracks from the account library and render them as a compact, scrollable About-page card with album art, artists, timestamps, and links.",
    features: [
      "Server-side Spotify token refresh using private environment variables.",
      "Recent 20 liked songs with album art, artist names, save dates, and track duration.",
      "Compact About-page card with a styled internal scrollbar.",
      "Fallback preview and disconnected states for local testing and missing credentials."
    ],
    techUsed: ["Next.js", "Spotify Web API", "TypeScript", "Environment variables"],
    nextStep: "Decide whether to keep it as a live pull from Spotify or cache new likes into a small archive later.",
    caseStudyStatus: "ready",
    githubUrl: "",
    liveUrl: "/about",
    caseStudyUrl: "",
    imageUrl: "",
    caseStudyImages: [],
    createdAt: "2026-07-02T00:00:00.000Z",
    updatedAt: "2026-07-02T00:00:00.000Z"
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
    liveUrl: "",
    caseStudyUrl: "",
    imageUrl: "",
    caseStudyImages: [],
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
    caseStudyImages: [],
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
    caseStudyImages: [],
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
    caseStudyImages: [],
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
      "Use-case notes for career tools, bots, aerial planning, and site operations.",
      "Details to be added as concrete prototypes are built."
    ],
    techUsed: ["Workflow design", "Checklist systems", "Automation planning"],
    nextStep: "Prototype one checklist flow inside an automation or job-tools page.",
    caseStudyStatus: "coming-soon",
    githubUrl: "",
    liveUrl: "",
    caseStudyUrl: "",
    imageUrl: "",
    caseStudyImages: [],
    createdAt: "2026-06-30T00:00:00.000Z",
    updatedAt: "2026-06-30T00:00:00.000Z"
  },
  {
    id: "keystone-aerial-services-aerial-planning",
    title: "Sky Pals Dispatch",
    slug: "keystone-aerial-services-aerial-planning",
    category: "Aerial Planning",
    status: "published",
    stage: "Pre-launch",
    featured: true,
    shortDescription:
      "A pre-launch drone business being built around visual inspection support, clear documentation, practical aerial awareness, and disciplined operations.",
    fullDescription:
      "Sky Pals Dispatch is a pre-launch drone inspection and documentation business founded and independently developed by Airex Wert. The brand and website are live while business formation, equipment readiness, licensing, insurance, operating procedures, and service deliverables are developed for a responsible launch.",
    problem:
      "Properties, roofs, sites, and active projects can be difficult, time-consuming, or risky to document from the ground. Clients need useful aerial visuals delivered with clear scope, safe procedures, and organized records.",
    solution:
      "Launch Sky Pals Dispatch around practical visual inspection support and documentation services, then improve the workflow through real experience. After the core business is established, explore how drones may responsibly assist fire services through research, training, and agency conversations.",
    features: [
      "Visual inspection support and organized documentation are the initial service focus.",
      "The business website is live at skypalsdispatch.com.",
      "FAA Part 107 certification is complete; the temporary certificate is held while the permanent certificate is pending.",
      "August 24, 2026 is the target launch date, subject to every required readiness gate.",
      "Fire-service drone applications are a later exploration goal, dependent on training, readiness, and agency coordination."
    ],
    techUsed: ["Roof mapping", "Site documentation", "Aviation workflow", "Operating procedures"],
    nextStep: "Form the LLC, secure sustainable financing and insurance, acquire the Matrice 4T, and complete the inspection-readiness practice plan.",
    caseStudyStatus: "ready",
    githubUrl: "",
    liveUrl: "https://skypalsdispatch.com",
    caseStudyUrl: "/aerial-planning/roadmap",
    imageUrl: "",
    caseStudyImages: [],
    createdAt: "2026-06-30T00:00:00.000Z",
    updatedAt: "2026-06-30T00:00:00.000Z"
  }
];
