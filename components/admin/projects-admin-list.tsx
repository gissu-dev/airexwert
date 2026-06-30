"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Archive, Edit, Plus, Trash2 } from "lucide-react";
import type { Project } from "@/data/projects";
import {
  archiveProject,
  deleteProject,
  getPublishedProjects,
  readProjects
} from "@/lib/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function ProjectsAdminList() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects(readProjects());
  }, []);

  const stats = useMemo(() => {
    return {
      total: projects.length,
      published: getPublishedProjects(projects).length,
      draft: projects.filter((project) => project.status === "draft").length,
      archived: projects.filter((project) => project.status === "archived").length
    };
  }, [projects]);

  function refreshProjects() {
    setProjects(readProjects());
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Projects</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage local Phase 1 project records. Published records appear publicly.
          </p>
        </div>
        <Button asChild className="w-fit">
          <Link href="/admin/projects/new">
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add project
          </Link>
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        <Stat label="Total" value={stats.total} />
        <Stat label="Published" value={stats.published} />
        <Stat label="Draft" value={stats.draft} />
        <Stat label="Archived" value={stats.archived} />
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="bg-card/75">
            <CardContent className="grid gap-4 p-5 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <Badge variant={project.status === "published" ? "default" : "secondary"}>
                    {project.status}
                  </Badge>
                  <Badge variant={project.stage === "Future planning" ? "amber" : "outline"}>
                    {project.stage}
                  </Badge>
                  <Badge
                    variant={
                      project.caseStudyStatus === "ready" ? "default" : "secondary"
                    }
                  >
                    {project.caseStudyStatus}
                  </Badge>
                  {project.featured ? <Badge variant="amber">Featured</Badge> : null}
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {project.shortDescription || "Description pending."}
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span>{project.category}</span>
                  <span>/projects/{project.slug}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row lg:justify-end">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/admin/projects/${project.id}/edit`}>
                    <Edit className="h-4 w-4" aria-hidden="true" />
                    Edit
                  </Link>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    archiveProject(project.id);
                    refreshProjects();
                  }}
                  disabled={project.status === "archived"}
                >
                  <Archive className="h-4 w-4" aria-hidden="true" />
                  Archive
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (window.confirm(`Delete ${project.title}?`)) {
                      deleteProject(project.id);
                      refreshProjects();
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {!projects.length ? (
        <Card className="bg-card/75">
          <CardContent className="p-6 text-sm text-muted-foreground">
            No projects yet. Add the first local project record.
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <Card className="bg-card/75">
      <CardContent className="p-4">
        <div className="text-2xl font-semibold">{value}</div>
        <div className="mt-1 text-xs uppercase text-muted-foreground">{label}</div>
      </CardContent>
    </Card>
  );
}
