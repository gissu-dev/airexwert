"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Archive, Edit, Plus, Trash2 } from "lucide-react";
import type { Project } from "@/data/projects";
import {
  archiveProject,
  deleteProject,
  getPublishedProjects,
  readProjects,
  setAdminKey,
} from "@/lib/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function ProjectsAdminList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [adminKeyInput, setAdminKeyInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [workingId, setWorkingId] = useState("");
  const [error, setError] = useState("");

  async function refreshProjects() {
    try {
      setError("");
      setLoading(true);
      const nextProjects = await readProjects();
      setProjects(nextProjects);
    } catch {
      setProjects([]);
      setError("Enter your admin key, then click Unlock admin.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshProjects();
  }, []);

  const stats = useMemo(() => {
    return {
      total: projects.length,
      published: getPublishedProjects(projects).length,
      draft: projects.filter((project) => project.status === "draft").length,
      archived: projects.filter((project) => project.status === "archived").length,
    };
  }, [projects]);

  return (
    <div className="grid gap-6">
      <div className="grid gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-4">
        <p className="text-sm text-muted-foreground">
          Enter the ADMIN_WRITE_KEY from your .env.local file to load and save real Supabase records.
        </p>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            type="password"
            value={adminKeyInput}
            placeholder="Admin key"
            onChange={(event) => setAdminKeyInput(event.target.value)}
          />

          <Button
            type="button"
            onClick={() => {
              setAdminKey(adminKeyInput);
              refreshProjects();
            }}
          >
            Unlock admin
          </Button>
        </div>

        {error ? <p className="text-sm text-amber-300">{error}</p> : null}
      </div>

      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Projects</h2>
          <p className="text-sm text-muted-foreground">
            Manage Supabase project records. Published records appear publicly.
          </p>
        </div>

        <Button asChild>
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

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading projects...</p>
      ) : null}

      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="bg-card/75">
            <CardContent className="grid gap-4 p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="grid gap-2">
                  <h3 className="text-xl font-semibold">{project.title}</h3>

                  <div className="flex flex-wrap gap-2">
                    <Badge>{project.status}</Badge>
                    <Badge variant="outline">{project.stage}</Badge>
                    <Badge variant="outline">{project.caseStudyStatus}</Badge>
                    {project.featured ? <Badge>Featured</Badge> : null}
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {project.shortDescription || "Description pending."}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {project.category} /projects/{project.slug}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
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
                    disabled={project.status === "archived" || workingId === project.id}
                    onClick={async () => {
                      setWorkingId(project.id);
                      try {
                        await archiveProject(project.id);
                        await refreshProjects();
                      } finally {
                        setWorkingId("");
                      }
                    }}
                  >
                    <Archive className="h-4 w-4" aria-hidden="true" />
                    Archive
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={workingId === project.id}
                    onClick={async () => {
                      if (!window.confirm(`Delete ${project.title}?`)) {
                        return;
                      }

                      setWorkingId(project.id);

                      try {
                        await deleteProject(project.id);
                        await refreshProjects();
                      } finally {
                        setWorkingId("");
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {!projects.length && !loading ? (
          <p className="text-sm text-muted-foreground">
            No projects loaded yet. Unlock admin or add your first Supabase project record.
          </p>
        ) : null}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <Card className="bg-card/75">
      <CardContent className="p-4">
        <p className="text-2xl font-semibold">{value}</p>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </p>
      </CardContent>
    </Card>
  );
}
