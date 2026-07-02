"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import {
  caseStudyStatuses,
  projectCategories,
  projectStages,
  projectStatuses,
  type Project,
} from "@/data/projects";
import {
  createEmptyProject,
  findProjectById,
  formatListInput,
  parseListInput,
  saveProject,
  slugify,
} from "@/lib/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type ProjectFormProps = {
  projectId?: string;
};

export function ProjectForm({ projectId }: ProjectFormProps) {
  const router = useRouter();
  const [project, setProject] = useState<Project>(() => createEmptyProject());
  const [featuresText, setFeaturesText] = useState("");
  const [techText, setTechText] = useState("");
  const [caseStudyImagesText, setCaseStudyImagesText] = useState("");
  const [loaded, setLoaded] = useState(!projectId);
  const [notFound, setNotFound] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const mode = projectId ? "edit" : "new";

 useEffect(() => {
  if (!projectId) {
    return;
  }

  const currentProjectId = projectId;

  async function loadProject() {
    try {
      const existing = await findProjectById(currentProjectId);

        if (!existing) {
          setNotFound(true);
          return;
        }

        setProject(existing);
        setFeaturesText(formatListInput(existing.features));
        setTechText(formatListInput(existing.techUsed));
        setCaseStudyImagesText(formatListInput(existing.caseStudyImages));
      } catch {
        setError("Could not load this project. Make sure your admin session is active.");
      } finally {
        setLoaded(true);
      }
    }

    loadProject();
  }, [projectId]);

  const timestampLabel = useMemo(() => {
    if (mode === "new") {
      return "Timestamps will be created on save.";
    }

    return `Created ${formatTimestamp(project.createdAt)}. Updated ${formatTimestamp(
      project.updatedAt,
    )}.`;
  }, [mode, project.createdAt, project.updatedAt]);

  if (!loaded) {
    return <p className="text-sm text-muted-foreground">Loading project...</p>;
  }

  if (notFound) {
    return (
      <Card className="bg-card/75">
        <CardContent className="grid gap-4 p-6">
          <h2 className="text-2xl font-semibold">Project not found</h2>
          <p className="text-sm text-muted-foreground">
            This project does not exist in Supabase, or your admin session expired.
          </p>
          <Button asChild variant="outline">
            <Link href="/admin/projects">Back to projects</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <form
      className="grid gap-6"
      onSubmit={async (event) => {
        event.preventDefault();
        setError("");
        setSaving(true);

        try {
          const saved = await saveProject({
            ...project,
            slug: project.slug || slugify(project.title),
            features: parseListInput(featuresText),
            techUsed: parseListInput(techText),
            caseStudyImages: parseListInput(caseStudyImagesText),
          });

          setProject(saved);
          setFeaturesText(formatListInput(saved.features));
          setTechText(formatListInput(saved.techUsed));
          setCaseStudyImagesText(formatListInput(saved.caseStudyImages));
          router.push(`/admin/projects/${saved.id}/edit`);
          router.refresh();
        } catch {
          setError("Could not save project. Make sure your admin session is active.");
        } finally {
          setSaving(false);
        }
      }}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            <Badge>{project.status}</Badge>
            <Badge variant="outline">{project.stage}</Badge>
          </div>

          <h2 className="text-2xl font-semibold">
            {mode === "new" ? "New project" : "Edit project"}
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Project data is saved to Supabase. Published records appear on the public projects page.
          </p>

          {error ? <p className="mt-3 text-sm text-amber-300">{error}</p> : null}
        </div>
      </div>

      <Card className="bg-card/75">
        <CardHeader>
          <CardTitle>Project basics</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-5">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Title" htmlFor="title">
              <Input
                id="title"
                value={project.title}
                placeholder="Project title"
                onChange={(event) => {
                  const title = event.target.value;

                  setProject((current) => ({
                    ...current,
                    title,
                    slug: current.slug || slugify(title),
                  }));
                }}
              />
            </Field>

            <Field label="Slug" htmlFor="slug">
              <Input
                id="slug"
                value={project.slug}
                placeholder="project-slug"
                onChange={(event) =>
                  setProject((current) => ({
                    ...current,
                    slug: slugify(event.target.value),
                  }))
                }
              />
            </Field>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            <Field label="Category" htmlFor="category">
              <Select
                id="category"
                value={project.category}
                onChange={(event) =>
                  setProject((current) => ({
                    ...current,
                    category: event.target.value as Project["category"],
                  }))
                }
              >
                {projectCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
            </Field>

            <Field label="Status" htmlFor="status">
              <Select
                id="status"
                value={project.status}
                onChange={(event) =>
                  setProject((current) => ({
                    ...current,
                    status: event.target.value as Project["status"],
                  }))
                }
              >
                {projectStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </Select>
            </Field>

            <Field label="Stage" htmlFor="stage">
              <Select
                id="stage"
                value={project.stage}
                onChange={(event) =>
                  setProject((current) => ({
                    ...current,
                    stage: event.target.value as Project["stage"],
                  }))
                }
              >
                {projectStages.map((stage) => (
                  <option key={stage} value={stage}>
                    {stage}
                  </option>
                ))}
              </Select>
            </Field>

            <Field label="Case study" htmlFor="caseStudyStatus">
              <Select
                id="caseStudyStatus"
                value={project.caseStudyStatus}
                onChange={(event) =>
                  setProject((current) => ({
                    ...current,
                    caseStudyStatus: event.target.value as Project["caseStudyStatus"],
                  }))
                }
              >
                {caseStudyStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </Select>
            </Field>
          </div>

          <label className="flex items-center gap-3 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={project.featured}
              onChange={(event) =>
                setProject((current) => ({
                  ...current,
                  featured: event.target.checked,
                }))
              }
            />
            Featured project
          </label>

          <Field label="Short description" htmlFor="shortDescription">
            <Textarea
              id="shortDescription"
              value={project.shortDescription}
              placeholder="Short card description."
              onChange={(event) =>
                setProject((current) => ({
                  ...current,
                  shortDescription: event.target.value,
                }))
              }
            />
          </Field>

          <Field label="Full description" htmlFor="fullDescription">
            <Textarea
              id="fullDescription"
              value={project.fullDescription}
              placeholder="Add description here."
              onChange={(event) =>
                setProject((current) => ({
                  ...current,
                  fullDescription: event.target.value,
                }))
              }
            />
          </Field>
        </CardContent>
      </Card>

      <Card className="bg-card/75">
        <CardHeader>
          <CardTitle>Case study content</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-5">
          <Field label="Problem" htmlFor="problem">
            <Textarea
              id="problem"
              value={project.problem}
              placeholder="Add problem here."
              onChange={(event) =>
                setProject((current) => ({
                  ...current,
                  problem: event.target.value,
                }))
              }
            />
          </Field>

          <Field label="Solution" htmlFor="solution">
            <Textarea
              id="solution"
              value={project.solution}
              placeholder="Add solution here."
              onChange={(event) =>
                setProject((current) => ({
                  ...current,
                  solution: event.target.value,
                }))
              }
            />
          </Field>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Features" htmlFor="features">
              <Textarea
                id="features"
                value={featuresText}
                placeholder={"Add feature here\nAnother feature"}
                onChange={(event) => setFeaturesText(event.target.value)}
              />
              <p className="text-xs text-muted-foreground">One feature per line.</p>
            </Field>

            <Field label="Tech used" htmlFor="techUsed">
              <Textarea
                id="techUsed"
                value={techText}
                placeholder={"Next.js\nTypeScript"}
                onChange={(event) => setTechText(event.target.value)}
              />
              <p className="text-xs text-muted-foreground">One technology per line.</p>
            </Field>
          </div>

          <Field label="Next step" htmlFor="nextStep">
            <Textarea
              id="nextStep"
              value={project.nextStep}
              placeholder="Document the next realistic improvement."
              onChange={(event) =>
                setProject((current) => ({
                  ...current,
                  nextStep: event.target.value,
                }))
              }
            />
          </Field>
        </CardContent>
      </Card>

      <Card className="bg-card/75">
        <CardHeader>
          <CardTitle>Links and media</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-5 md:grid-cols-2">
          <Field label="GitHub URL" htmlFor="githubUrl">
            <Input
              id="githubUrl"
              value={project.githubUrl}
              placeholder="https://github.com/..."
              onChange={(event) =>
                setProject((current) => ({
                  ...current,
                  githubUrl: event.target.value,
                }))
              }
            />
          </Field>

          <Field label="Live demo URL" htmlFor="liveUrl">
            <Input
              id="liveUrl"
              value={project.liveUrl}
              placeholder="https://..."
              onChange={(event) =>
                setProject((current) => ({
                  ...current,
                  liveUrl: event.target.value,
                }))
              }
            />
          </Field>

          <Field label="External case study URL" htmlFor="caseStudyUrl">
            <Input
              id="caseStudyUrl"
              value={project.caseStudyUrl}
              placeholder="Leave blank to use /projects/[slug]"
              onChange={(event) =>
                setProject((current) => ({
                  ...current,
                  caseStudyUrl: event.target.value,
                }))
              }
            />
          </Field>

          <Field label="Project card / profile image URL" htmlFor="imageUrl">
            <Input
              id="imageUrl"
              value={project.imageUrl}
              placeholder="https://..."
              onChange={(event) =>
                setProject((current) => ({
                  ...current,
                  imageUrl: event.target.value,
                }))
              }
            />
          </Field>

          <div className="md:col-span-2">
            <Field label="Case study screenshot URLs" htmlFor="caseStudyImages">
              <Textarea
                id="caseStudyImages"
                value={caseStudyImagesText}
                placeholder={"https://...\nhttps://..."}
                onChange={(event) => setCaseStudyImagesText(event.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                One screenshot per line. The first screenshot becomes the main case-study image.
              </p>
            </Field>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-muted-foreground">{timestampLabel}</p>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button asChild variant="outline">
            <Link href="/admin/projects">Cancel</Link>
          </Button>

          <Button type="submit" disabled={saving}>
            <Save className="h-4 w-4" aria-hidden="true" />
            {saving ? "Saving..." : "Save project"}
          </Button>
        </div>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}

function formatTimestamp(value: string) {
  if (!value) {
    return "unknown";
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
