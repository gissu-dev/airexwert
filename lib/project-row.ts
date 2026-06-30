import type { Project } from "@/data/projects";

export type ProjectRow = {
  id: string;
  title: string;
  slug: string;
  category: Project["category"];
  status: Project["status"];
  stage: Project["stage"];
  featured: boolean;
  short_description: string;
  full_description: string;
  problem: string;
  solution: string;
  features: string[];
  tech_used: string[];
  next_step: string;
  case_study_status: Project["caseStudyStatus"];
  github_url: string;
  live_url: string;
  case_study_url: string;
  image_url: string;
  created_at: string;
  updated_at: string;
};

export function rowToProject(row: ProjectRow): Project {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category,
    status: row.status,
    stage: row.stage,
    featured: row.featured,
    shortDescription: row.short_description,
    fullDescription: row.full_description,
    problem: row.problem,
    solution: row.solution,
    features: row.features ?? [],
    techUsed: row.tech_used ?? [],
    nextStep: row.next_step,
    caseStudyStatus: row.case_study_status,
    githubUrl: row.github_url,
    liveUrl: row.live_url,
    caseStudyUrl: row.case_study_url,
    imageUrl: row.image_url,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function projectToRow(project: Project) {
  return {
    id: project.id || undefined,
    title: project.title,
    slug: project.slug,
    category: project.category,
    status: project.status,
    stage: project.stage,
    featured: project.featured,
    short_description: project.shortDescription,
    full_description: project.fullDescription,
    problem: project.problem,
    solution: project.solution,
    features: project.features,
    tech_used: project.techUsed,
    next_step: project.nextStep,
    case_study_status: project.caseStudyStatus,
    github_url: project.githubUrl,
    live_url: project.liveUrl,
    case_study_url: project.caseStudyUrl,
    image_url: project.imageUrl,
  };
}

export function projectPatchToRow(project: Partial<Project>) {
  const row: Record<string, unknown> = {};

  if (project.title !== undefined) row.title = project.title;
  if (project.slug !== undefined) row.slug = project.slug;
  if (project.category !== undefined) row.category = project.category;
  if (project.status !== undefined) row.status = project.status;
  if (project.stage !== undefined) row.stage = project.stage;
  if (project.featured !== undefined) row.featured = project.featured;
  if (project.shortDescription !== undefined) row.short_description = project.shortDescription;
  if (project.fullDescription !== undefined) row.full_description = project.fullDescription;
  if (project.problem !== undefined) row.problem = project.problem;
  if (project.solution !== undefined) row.solution = project.solution;
  if (project.features !== undefined) row.features = project.features;
  if (project.techUsed !== undefined) row.tech_used = project.techUsed;
  if (project.nextStep !== undefined) row.next_step = project.nextStep;
  if (project.caseStudyStatus !== undefined) row.case_study_status = project.caseStudyStatus;
  if (project.githubUrl !== undefined) row.github_url = project.githubUrl;
  if (project.liveUrl !== undefined) row.live_url = project.liveUrl;
  if (project.caseStudyUrl !== undefined) row.case_study_url = project.caseStudyUrl;
  if (project.imageUrl !== undefined) row.image_url = project.imageUrl;

  return row;
}
