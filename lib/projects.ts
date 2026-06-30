import {
  caseStudyStatuses,
  projectCategories,
  projectStages,
  projects as seedProjects,
  type Project,
  type ProjectCaseStudyStatus,
  type ProjectCategory,
  type ProjectStage,
  type ProjectStatus,
} from "@/data/projects";

type ProjectInput = Omit<Project, "id" | "createdAt" | "updatedAt"> & {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
};

function getAdminKey() {
  if (typeof window === "undefined") {
    return "";
  }

  window.localStorage.removeItem("wertworks.admin.key");

  return window.sessionStorage.getItem("wertworks.admin.key")?.trim() || "";
}

function getAdminHeaders() {
  return {
    "Content-Type": "application/json",
    "x-admin-key": getAdminKey(),
  };
}

export function setAdminKey(value: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem("wertworks.admin.key");

  const adminKey = value.trim();

  if (!adminKey) {
    window.sessionStorage.removeItem("wertworks.admin.key");
    return;
  }

  window.sessionStorage.setItem("wertworks.admin.key", adminKey);
}

export function clearAdminKey() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem("wertworks.admin.key");
  window.sessionStorage.removeItem("wertworks.admin.key");
}
export async function readProjects(): Promise<Project[]> {
  const response = await fetch("/api/projects?admin=true", {
    headers: getAdminHeaders(),
    cache: "no-store",
  });

  if (!response.ok) {
    throw await createProjectsError(
      response,
      "Could not load admin projects.",
    );
  }

  const data = await response.json();
  return data.projects ?? [];
}

export async function readPublicProjects(): Promise<Project[]> {
  try {
    const response = await fetch("/api/projects", {
      cache: "no-store",
    });

    if (!response.ok) {
      return cloneProjects(seedProjects).filter(
        (project) => project.status === "published",
      );
    }

    const data = await response.json();
    return data.projects ?? [];
  } catch {
    return cloneProjects(seedProjects).filter(
      (project) => project.status === "published",
    );
  }
}

export async function saveProject(input: ProjectInput): Promise<Project> {
  const now = new Date().toISOString();

  const project = normalizeProject({
    ...input,
    id: input.id || createProjectId(),
    slug: input.slug || slugify(input.title),
    createdAt: input.createdAt ?? now,
    updatedAt: now,
  });

  const response = await fetch("/api/projects", {
    method: "POST",
    headers: getAdminHeaders(),
    body: JSON.stringify(project),
  });

  if (!response.ok) {
    throw await createProjectsError(response, "Could not save project.");
  }

  const data = await response.json();
  return data.project;
}

export async function archiveProject(id: string) {
  await updateProjectStatus(id, "archived");
}

export async function updateProjectStatus(id: string, status: ProjectStatus) {
  const response = await fetch(`/api/projects/${id}`, {
    method: "PATCH",
    headers: getAdminHeaders(),
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw await createProjectsError(
      response,
      "Could not update project status.",
    );
  }
}

export async function deleteProject(id: string) {
  const response = await fetch(`/api/projects/${id}`, {
    method: "DELETE",
    headers: getAdminHeaders(),
  });

  if (!response.ok) {
    throw await createProjectsError(response, "Could not delete project.");
  }
}

export async function findProjectById(id: string) {
  const response = await fetch(`/api/projects/${id}`, {
    headers: getAdminHeaders(),
    cache: "no-store",
  });

  if (!response.ok) {
    return undefined;
  }

  const data = await response.json();
  return data.project as Project;
}

export async function findPublishedProjectBySlug(slug: string) {
  const projects = await readPublicProjects();

  return projects.find(
    (project) => project.slug === slug && project.status === "published",
  );
}

export function getPublishedProjects(projects: Project[]) {
  return projects.filter((project) => project.status === "published");
}

export function getPublicProjectCategories(projects: Project[]) {
  const categories = new Set(
    getPublishedProjects(projects).map((project) => project.category),
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
    updatedAt: now,
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
    project.status as ProjectStatus,
  )
    ? (project.status as ProjectStatus)
    : "draft";

  const stage = projectStages.includes(project.stage as ProjectStage)
    ? (project.stage as ProjectStage)
    : "In progress";

  const caseStudyStatus = caseStudyStatuses.includes(
    project.caseStudyStatus as ProjectCaseStudyStatus,
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
    updatedAt: String(project.updatedAt ?? now),
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

async function createProjectsError(response: Response, fallback: string) {
  if (response.status === 401) {
    return new Error("Admin key rejected. Check ADMIN_WRITE_KEY and unlock again.");
  }

  try {
    const data = await response.json();
    const detail = typeof data.error === "string" ? data.error : "";

    if (detail) {
      return new Error(`${fallback} ${detail}`);
    }
  } catch {
    // Fall through to the generic message if the API returned non-JSON.
  }

  return new Error(fallback);
}

function cloneProjects(projects: Project[]) {
  return projects.map((project) => ({
    ...project,
    features: [...project.features],
    techUsed: [...project.techUsed],
  }));
}
