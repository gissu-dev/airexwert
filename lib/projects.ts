// Temporary Phase 1 project repository. Replace this file with Supabase calls later.
import {
  caseStudyStatuses,
  projectCategories,
  projectStages,
  projects as seedProjects,
  type Project,
  type ProjectCaseStudyStatus,
  type ProjectCategory,
  type ProjectStage,
  type ProjectStatus
} from "@/data/projects";

const STORAGE_KEY = "wertworks.projects.v1";
const PLACEHOLDER_TEXT = new Set([
  "",
  "Add description here.",
  "Add problem here.",
  "Add solution here.",
  "Add feature here",
  "Add tech here"
]);

type ProjectInput = Omit<Project, "id" | "createdAt" | "updatedAt"> & {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
};

export function readProjects(): Project[] {
  if (typeof window === "undefined") {
    return cloneProjects(seedProjects);
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    const seeds = cloneProjects(seedProjects);
    writeProjects(seeds);
    return seeds;
  }

  try {
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return cloneProjects(seedProjects);
    }

    const normalizedProjects = parsed.map(normalizeProject);
    const migratedProjects = migratePlaceholderProjects(normalizedProjects);

    if (migratedProjects.changed) {
      writeProjects(migratedProjects.projects);
    }

    return migratedProjects.projects;
  } catch {
    return cloneProjects(seedProjects);
  }
}

export function writeProjects(projects: Project[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function saveProject(input: ProjectInput): Project {
  const projects = readProjects();
  const now = new Date().toISOString();
  const existing = input.id
    ? projects.find((project) => project.id === input.id)
    : undefined;

  const project = normalizeProject({
    ...input,
    id: existing?.id ?? input.id ?? createProjectId(),
    slug: input.slug || slugify(input.title),
    createdAt: existing?.createdAt ?? input.createdAt ?? now,
    updatedAt: now
  });

  const nextProjects = existing
    ? projects.map((current) => (current.id === project.id ? project : current))
    : [project, ...projects];

  writeProjects(nextProjects);
  return project;
}

export function archiveProject(id: string) {
  updateProjectStatus(id, "archived");
}

export function updateProjectStatus(id: string, status: ProjectStatus) {
  const projects = readProjects();
  const now = new Date().toISOString();
  writeProjects(
    projects.map((project) =>
      project.id === id ? { ...project, status, updatedAt: now } : project
    )
  );
}

export function deleteProject(id: string) {
  writeProjects(readProjects().filter((project) => project.id !== id));
}

export function findProjectById(id: string) {
  return readProjects().find((project) => project.id === id);
}

export function findPublishedProjectBySlug(slug: string) {
  return readProjects().find(
    (project) => project.slug === slug && project.status === "published"
  );
}

export function getPublishedProjects(projects: Project[]) {
  return projects.filter((project) => project.status === "published");
}

export function getPublicProjectCategories(projects: Project[]) {
  const categories = new Set(
    getPublishedProjects(projects).map((project) => project.category)
  );

  return ["All", ...projectCategories.filter((category) => categories.has(category))];
}

export function getProjectCaseStudyHref(project: Project) {
  if (project.caseStudyStatus !== "ready") {
    return "";
  }

  return project.caseStudyUrl || `/projects/${project.slug}`;
}

export function createEmptyProject(): Project {
  const now = new Date().toISOString();

  return {
    id: "",
    title: "",
    slug: "",
    category: "Automation Tools",
    status: "draft",
    stage: "In progress",
    featured: false,
    shortDescription: "",
    fullDescription: "",
    problem: "",
    solution: "",
    features: [],
    techUsed: [],
    nextStep: "",
    caseStudyStatus: "coming-soon",
    githubUrl: "",
    liveUrl: "",
    caseStudyUrl: "",
    imageUrl: "",
    createdAt: now,
    updatedAt: now
  };
}

export function parseListInput(value: string) {
  return value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function formatListInput(value: string[]) {
  return value.join("\n");
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function createProjectId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `project-${Date.now()}`;
}

function normalizeProject(project: Partial<Project>): Project {
  const now = new Date().toISOString();
  const title = String(project.title ?? "");
  const category = normalizeProjectCategory(project.category);
  const status = ["draft", "published", "archived"].includes(
    project.status as ProjectStatus
  )
    ? (project.status as ProjectStatus)
    : "draft";
  const stage = projectStages.includes(project.stage as ProjectStage)
    ? (project.stage as ProjectStage)
    : "In progress";
  const caseStudyStatus = caseStudyStatuses.includes(
    project.caseStudyStatus as ProjectCaseStudyStatus
  )
    ? (project.caseStudyStatus as ProjectCaseStudyStatus)
    : "coming-soon";

  return {
    id: String(project.id || createProjectId()),
    title,
    slug: String(project.slug || slugify(title) || project.id || createProjectId()),
    category,
    status,
    stage,
    featured: Boolean(project.featured),
    shortDescription: String(project.shortDescription ?? ""),
    fullDescription: String(project.fullDescription ?? ""),
    problem: String(project.problem ?? ""),
    solution: String(project.solution ?? ""),
    features: Array.isArray(project.features) ? project.features.map(String) : [],
    techUsed: Array.isArray(project.techUsed) ? project.techUsed.map(String) : [],
    nextStep: String(project.nextStep ?? ""),
    caseStudyStatus,
    githubUrl: String(project.githubUrl ?? ""),
    liveUrl: String(project.liveUrl ?? ""),
    caseStudyUrl: String(project.caseStudyUrl ?? ""),
    imageUrl: String(project.imageUrl ?? ""),
    createdAt: String(project.createdAt ?? now),
    updatedAt: String(project.updatedAt ?? now)
  };
}

function migratePlaceholderProjects(projects: Project[]) {
  let changed = false;

  const migratedProjects = projects.map((project) => {
    const seed = seedProjects.find(
      (seedProject) => seedProject.id === project.id || seedProject.slug === project.slug
    );

    if (!seed) {
      return project;
    }

    const shortDescription = replacePlaceholder(
      project.shortDescription,
      seed.shortDescription
    );
    const fullDescription = replacePlaceholder(
      project.fullDescription,
      seed.fullDescription
    );
    const problem = replacePlaceholder(project.problem, seed.problem);
    const solution = replacePlaceholder(project.solution, seed.solution);
    const features = replacePlaceholderList(project.features, seed.features);
    const techUsed = replacePlaceholderList(project.techUsed, seed.techUsed);
    const nextStep = replacePlaceholder(project.nextStep, seed.nextStep);
    const contentChanged =
      shortDescription !== project.shortDescription ||
      fullDescription !== project.fullDescription ||
      problem !== project.problem ||
      solution !== project.solution ||
      features !== project.features ||
      techUsed !== project.techUsed ||
      nextStep !== project.nextStep;

    const nextProject: Project = {
      ...project,
      category: seed.category,
      stage: seed.stage,
      shortDescription,
      fullDescription,
      problem,
      solution,
      features,
      techUsed,
      nextStep,
      caseStudyStatus: seed.caseStudyStatus,
      featured: contentChanged ? project.featured || seed.featured : project.featured
    };

    if (
      contentChanged ||
      nextProject.category !== project.category ||
      nextProject.stage !== project.stage ||
      nextProject.caseStudyStatus !== project.caseStudyStatus ||
      nextProject.featured !== project.featured
    ) {
      changed = true;
      return {
        ...nextProject,
        updatedAt: seed.updatedAt
      };
    }

    return project;
  });

  const projectIds = new Set(migratedProjects.map((project) => project.id));
  const projectSlugs = new Set(migratedProjects.map((project) => project.slug));
  const missingSeedProjects = seedProjects.filter(
    (seedProject) =>
      !projectIds.has(seedProject.id) && !projectSlugs.has(seedProject.slug)
  );

  if (missingSeedProjects.length) {
    changed = true;
  }

  return {
    changed,
    projects: [...migratedProjects, ...cloneProjects(missingSeedProjects)]
  };
}

function normalizeProjectCategory(category: unknown): ProjectCategory {
  if (projectCategories.includes(category as ProjectCategory)) {
    return category as ProjectCategory;
  }

  switch (category) {
    case "Bots":
      return "Discord Bots";
    case "Automation":
    case "Practical Tech":
      return "Automation Tools";
    case "Drone Planning":
      return "Aerial Planning";
    default:
      return "Automation Tools";
  }
}

function replacePlaceholder(value: string, seedValue: string) {
  return PLACEHOLDER_TEXT.has(value.trim()) ? seedValue : value;
}

function replacePlaceholderList(value: string[], seedValue: string[]) {
  if (!value.length || value.every((item) => PLACEHOLDER_TEXT.has(item.trim()))) {
    return [...seedValue];
  }

  return value;
}

function cloneProjects(projects: Project[]) {
  return projects.map((project) => ({
    ...project,
    features: [...project.features],
    techUsed: [...project.techUsed]
  }));
}
