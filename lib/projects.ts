// Temporary Phase 1 project repository. Replace this file with Supabase calls later.
import {
  projectCategories,
  projects as seedProjects,
  type Project,
  type ProjectCategory,
  type ProjectStatus
} from "@/data/projects";

const STORAGE_KEY = "wertworks.projects.v1";

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

    return parsed.map(normalizeProject);
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

export function createEmptyProject(): Project {
  const now = new Date().toISOString();

  return {
    id: "",
    title: "",
    slug: "",
    category: "Automation",
    status: "draft",
    featured: false,
    shortDescription: "",
    fullDescription: "",
    problem: "",
    solution: "",
    features: [],
    techUsed: [],
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
  const category = projectCategories.includes(project.category as ProjectCategory)
    ? (project.category as ProjectCategory)
    : "Automation";
  const status = ["draft", "published", "archived"].includes(
    project.status as ProjectStatus
  )
    ? (project.status as ProjectStatus)
    : "draft";

  return {
    id: String(project.id || createProjectId()),
    title,
    slug: String(project.slug || slugify(title) || project.id || createProjectId()),
    category,
    status,
    featured: Boolean(project.featured),
    shortDescription: String(project.shortDescription ?? ""),
    fullDescription: String(project.fullDescription ?? ""),
    problem: String(project.problem ?? ""),
    solution: String(project.solution ?? ""),
    features: Array.isArray(project.features) ? project.features.map(String) : [],
    techUsed: Array.isArray(project.techUsed) ? project.techUsed.map(String) : [],
    githubUrl: String(project.githubUrl ?? ""),
    liveUrl: String(project.liveUrl ?? ""),
    caseStudyUrl: String(project.caseStudyUrl ?? ""),
    imageUrl: String(project.imageUrl ?? ""),
    createdAt: String(project.createdAt ?? now),
    updatedAt: String(project.updatedAt ?? now)
  };
}

function cloneProjects(projects: Project[]) {
  return projects.map((project) => ({
    ...project,
    features: [...project.features],
    techUsed: [...project.techUsed]
  }));
}
