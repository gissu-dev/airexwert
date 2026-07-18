export const fieldNoteCategories = [
  "Build Logs",
  "Projects",
  "Case Notes",
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
  "Career",
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
  coverImage: string;
  coverImageAlt: string;
  createdAt: string;
  updatedAt: string;
};

const now = "2026-07-02T12:00:00.000Z";

export const seedFieldNotes: FieldNote[] = [
  {
    id: "why-i-am-building-wertworks",
    title: "Why I'm Building WertWorks",
    slug: "why-im-building-wertworks",
    category: "Build Logs",
    status: "published",
    featured: true,
    excerpt:
      "WertWorks is my place to organize projects, notes, experiments, and the work I want to keep improving.",
    content: `WertWorks started because I needed a better place to organize what I'm building.

A normal portfolio can show finished work, but that is only part of the picture. A lot of my work starts as experiments, rough ideas, small tools, notes, fixes, and half-built systems that slowly turn into something useful.

That is what WertWorks is meant to hold.

The site gives me a place for projects, case studies, field notes, resume work, aviation ideas, automation tools, Discord bots, and future business planning. Instead of keeping everything scattered across folders, chats, screenshots, and random notes, I want one place that shows what I'm working on and how it is developing.

Field Notes is part of that system. It gives me a place to write smaller updates without turning every thought into a full case study. Some notes will be build logs. Some will be project decisions. Some will be lessons from work, aviation, coding, automation, or business planning.

The main goal is usefulness. I want WertWorks to be easy to update, easy to understand, and flexible enough to grow with whatever I build next.`,
    tags: ["WertWorks", "Build log", "Projects", "Website", "Notes"],
    readTime: "3 min",
    publishedAt: now,
    coverImage: "",
    coverImageAlt:
      "Dark workspace or project dashboard representing WertWorks as a personal project hub",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "building-kithwave",
    title: "Building KithWave",
    slug: "building-kithwave",
    category: "Projects",
    status: "published",
    featured: false,
    excerpt:
      "A project note on KithWave, a Discord music bot built around music playback, live radio, queue controls, Spotify metadata, and server-friendly controls.",
    content: `KithWave is a Discord music bot built for my own server.

The goal was to make a bot that could handle the music features I actually wanted: playing music from YouTube search or URLs, managing a server queue, supporting live radio, importing playlist-style content, and giving people simple playback controls without needing a complicated interface.

The bot uses prefix commands and a now-playing panel with buttons for common actions like pause, skip, stop, queue, volume changes, shuffle, and lyrics. That matters because music bots are easier to use when the controls are visible instead of hidden behind command memorization.

One of the more useful parts of KithWave is the radio system. It supports a preset dropdown, quick-play radio by preset name, station lookup, and direct stream URLs. Radio presets can be managed through a JSON file, then reloaded without turning the whole idea into a giant admin panel.

KithWave also supports Spotify links, but it does not stream Spotify audio directly. Instead, Spotify metadata is resolved into playable sources. That keeps the bot focused on practical playback while still making Spotify links useful for discovery and queue building.

The stack is simple and direct: Python, discord.py, yt-dlp for extraction, ffmpeg for audio, and spotipy for Spotify metadata. It also includes optional Windows launcher files to make running it easier on a local machine.

The biggest lesson from KithWave is that a useful bot does not need to be massive. It needs to solve the right problem cleanly. In this case, that problem was giving a Discord server reliable music, radio, queue control, and simple interaction without overcomplicating the experience.

Next steps for KithWave include slash-command versions of the core controls, better tests around URL and query handling, and improved reconnect behavior after voice disconnects.`,
    tags: ["KithWave", "Discord bot", "Music bot", "Python", "Automation"],
    readTime: "4 min",
    publishedAt: now,
    coverImage: "",
    coverImageAlt:
      "Discord music bot interface or audio dashboard style image for KithWave",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "why-small-bots-still-matter",
    title: "Small Bots as Focused Tools",
    slug: "small-bots-as-focused-tools",
    category: "Case Notes",
    status: "published",
    featured: false,
    excerpt:
      "A small case note on why focused bots can be useful when they solve one clear problem for a server, workflow, or community.",
    content: `Small bots are easy to underestimate.

They do not always look impressive from the outside because they are usually built around a specific need: play music, manage a queue, organize information, trigger a workflow, post reminders, or make a server easier to use.

That focus is the point.

A good small bot does not need to be a giant platform. It needs to remove friction. If someone can do something faster, with fewer steps, or with less confusion, the bot is doing its job.

KithWave is a good example. It is not trying to be every Discord tool at once. It is focused on music playback, live radio, queue control, Spotify metadata, and simple playback buttons. That gives it a clear purpose.

This is also why small bots make good projects. They force practical decisions: what commands matter, what users actually click, what errors happen often, what setup steps are annoying, and what should be automated instead of explained every time.

For WertWorks, bots fit naturally because they show how small tools can become useful systems. They are not just code projects. They are workflow projects, interface projects, and problem-solving projects.

The lesson is simple: small tools are worth building when they solve a clear problem and make something easier to repeat.`,
    tags: ["Bots", "Discord", "Case note", "Automation", "KithWave"],
    readTime: "3 min",
    publishedAt: now,
    coverImage: "",
    coverImageAlt:
      "Small automation bot concept with command controls and server workflow elements",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "keystone-aerial-services-roadmap",
    title: "Sky Pals Dispatch Roadmap (Draft)",
    slug: "kas-business-roadmap",
    category: "Aviation",
    status: "draft",
    featured: false,
    excerpt:
      "A working roadmap for launching Sky Pals Dispatch with inspection services first and exploring fire-service applications later.",
    content: `Sky Pals Dispatch is still in the pre-launch stage.

The goal is to build it carefully before presenting it as an active drone service business. The working direction is a practical aerial services company for Northeastern Pennsylvania, focused on useful imaging, inspection support, mapping, documentation, and future thermal services.

The first phase is the legal and certification foundation. That means studying for and passing the FAA Part 107 Remote Pilot exam, setting up or updating IACRA, completing the UAG knowledge test, registering the drone once purchased, confirming Remote ID compliance, learning LAANC, understanding waiver situations, and creating basic preflight, mission risk, flight log, and maintenance log systems.

The second phase is business setup. That includes choosing the final name, checking and buying the domain, creating a professional email, deciding on the business structure, likely LLC, registering in Pennsylvania, opening a business bank account, setting up bookkeeping, tracking startup costs, mileage, and equipment purchases, researching insurance, and preparing basic service agreements, quotes, invoices, and delivery workflows.

The third phase is equipment planning. The target equipment is a DJI Matrice 4T or similar enterprise drone, supported by the essentials: batteries, charging setup, SD cards, landing pad, hard case, anti-collision light when required, high-visibility vest, cones or landing zone markers, controller/tablet setup, power bank, weather tools, maintenance kit, and backup propellers. The rule is to buy essentials first, practice, then upgrade based on actual work.

The fourth phase is service focus. Starter services include real estate aerial photos, property overview photos, construction progress photos, roof and exterior visual documentation, land and lot overview photos, business/property promotional aerial media, farm/property documentation, and event venue aerial media where legally and safely allowed. Future higher-value services include thermal roof support, solar inspection support, infrastructure inspection support, mapping/reporting, recurring construction progress, and properly coordinated emergency or agency support.

The fifth phase is practice and portfolio building. Before chasing serious clients, the business needs sample work: safe practice flights, preflight planning, clean property photos, repeatable construction-style progress shots, orbit shots, top-down shots, wide establishing shots, detail shots, low-risk inspection-style imagery, 3 to 5 sample projects, a portfolio gallery, field notes for practice missions, before/after edits, a sample client delivery folder, and a sample inspection-style report.

The sixth phase is website launch. The site should explain what the business does, where it serves, who it helps, why drone work is useful, how to request a quote, and the current pre-launch status if it is not fully active yet. Pages should include Home, Services, Portfolio, Field Notes or Build Log, About, Contact, Request a Quote, and Legal/Safety Notes.

The seventh phase is pricing. Pricing should start simple with packages like Basic Aerial Photo Package, Property Overview Package, Construction Progress Visit, Exterior/Roof Visual Documentation, Custom Inspection/Documentation Job, and Monthly Progress Documentation Plan. Pricing should consider travel distance, planning time, airspace complexity, time on site, editing, deliverables, risk level, equipment required, turnaround speed, and repeat visits. The business should not compete only on being cheap; it should compete on professionalism, reliability, safety, and clear deliverables.

The eighth phase is local outreach. Target clients include real estate agents, property managers, roofing companies, construction companies, contractors, landscapers, solar companies, local businesses, farms and landowners, and municipal or public organizations only when properly qualified and coordinated. Outreach should include a short intro message, a one-page flyer, a list of 50 local leads, 5 to 10 contacts per day, follow-up after 3 to 5 business days, starter packages, referrals, website samples, and professional social updates.

The ninth phase is the first 90 days after launch. The first 30 days focus on Part 107, name, domain, email, website, service packages, practice missions, portfolio examples, quote form, and outreach. Days 31 to 60 focus on contacting businesses, starter jobs, improving the website, testimonials, workflows, pricing, delivery folders, and tracking expenses/mileage. Days 61 to 90 focus on recurring services, construction progress work, roofing/exterior documentation partnerships, case studies, better portfolio examples, local SEO, reviewing interest, dropping confusing services, and doubling down on what works.

The tenth phase is long-term growth. Possible paths include monthly construction progress contracts, roofing partnerships, property management documentation, commercial real estate packages, thermal inspection support, properly qualified public safety or local government support, mapping/reporting, subcontracting for larger drone companies, and expanding beyond NEPA. Long-term systems include a CRM, automated quote system, follow-up system, SOPs, safety manual, maintenance schedule, insurance review, portfolio updates, case studies, and a referral program.

The main rule is simple: launch small, but launch professionally. Do not wait until everything is perfect, but do build the legal foundation, create simple services, practice the workflow, publish a clean website, and start getting local conversations.`,
    tags: ["Sky Pals Dispatch", "Drones", "Part 107", "Public safety", "Business roadmap"],
    readTime: "6 min",
    publishedAt: now,
    coverImage: "",
    coverImageAlt:
      "Business planning roadmap for Sky Pals Dispatch in Northeastern Pennsylvania",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "career-rebuild-notes",
    title: "Starting at Allied",
    slug: "starting-at-allied",
    category: "Career",
    status: "published",
    featured: false,
    excerpt:
      "A career note about starting work as a Mental Health Worker at Allied and finding meaning in work that directly supports people.",
    content: `Starting at Allied has become an important part of my rebuild.

Working as a Mental Health Worker is different from just having a job to pay bills. The work matters because it involves people, patience, structure, and showing up consistently. It is the kind of role where small things can matter more than they look from the outside.

A good shift is not always about doing something dramatic. Sometimes it is about helping keep the environment steady, treating people with respect, paying attention, listening, and being reliable when someone needs support.

That part has been rewarding.

It also gives me a stronger foundation while I keep building other parts of my life: WertWorks, projects, aviation goals, future drone planning, and better long-term career options. Having work that feels useful makes that process feel more grounded.

This note belongs in Field Notes because career progress is part of the bigger picture. WertWorks is not only about code or projects. It is also about documenting the work, lessons, and direction behind the person building it.`,
    tags: ["Career", "Allied", "Mental health", "Work", "Rebuild"],
    readTime: "3 min",
    publishedAt: now,
    coverImage: "",
    coverImageAlt:
      "Calm professional workspace representing career growth and mental health support work",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "places-atmosphere-and-curiosity",
    title: "Places, Atmosphere, and Curiosity",
    slug: "places-atmosphere-and-curiosity",
    category: "Personal Notes",
    status: "published",
    featured: false,
    excerpt:
      "A note about paying attention to places, atmosphere, and the small details that make environments interesting.",
    content: `Some places make you curious before you even know why.

It might be the lighting, the layout, the sound, the weather, the way a street looks at night, an airport terminal, a quiet building, a map, a cockpit view, or a random corner of a town that feels like it has a story attached to it.

I like that kind of atmosphere.

It connects to a lot of what I'm interested in: aviation, drones, websites, games, photography, maps, and building things that have a certain mood to them. A place does not need to be famous to be interesting. Sometimes it just needs a detail worth noticing.

That curiosity matters because it changes how I build. A website is not only text and buttons. A project is not only a feature list. A drone photo is not only an aerial image. The presentation, context, and feeling around something can make it easier to understand and more interesting to explore.

This is one of the reasons I want Field Notes to exist. Some notes are practical. Some are project updates. Some are just observations that might turn into something later.

Not every useful idea starts as a plan. Sometimes it starts by noticing something and wanting to understand it better.`,
    tags: ["Places", "Atmosphere", "Curiosity", "Design", "Observation"],
    readTime: "3 min",
    publishedAt: now,
    coverImage: "",
    coverImageAlt:
      "Moody place or atmospheric environment connected to curiosity and observation",
    createdAt: now,
    updatedAt: now
  }
];
