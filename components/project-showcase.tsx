"use client";

import { useEffect, useMemo, useState } from "react";
import type { Project, ProjectCategory } from "@/data/projects";
import { projects as seedProjects } from "@/data/projects";
import {
  getPublicProjectCategories,
  getPublishedProjects,
  readPublicProjects,
} from "@/lib/projects";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import { cn } from "@/lib/utils";

type ProjectFilter = ProjectCategory | "All";

export function ProjectShowcase() {
  const [category, setCategory] = useState<ProjectFilter>("All");
  const [projects, setProjects] = useState<Project[]>(seedProjects);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadProjects() {
      const nextProjects = await readPublicProjects();
      setProjects(nextProjects.length ? nextProjects : seedProjects);
      setLoaded(true);
    }

    loadProjects();
  }, []);

  const categories = useMemo(
    () => getPublicProjectCategories(projects) as ProjectFilter[],
    [projects],
  );

  const visibleProjects = useMemo(() => {
    const published = getPublishedProjects(projects);

    if (category === "All") {
      return published;
    }

    return published.filter((project) => project.category === category);
  }, [category, projects]);

  return (
    <div className="grid gap-8">
      <div className="flex flex-wrap gap-2">
        {categories.map((item) => (
          <Button
            key={item}
            type="button"
            variant={category === item ? "default" : "outline"}
            size="sm"
            className={cn(category === item && "shadow-radar")}
            onClick={() => setCategory(item)}
          >
            {item}
          </Button>
        ))}
      </div>

      {!loaded ? (
        <p className="text-sm text-muted-foreground">Loading projects...</p>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {!visibleProjects.length && loaded ? (
        <div className="rounded-lg border border-white/10 bg-white/[0.035] p-6">
          <h3 className="text-xl font-semibold">No published projects in this filter.</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Draft and archived projects are hidden from the public projects page.
          </p>
        </div>
      ) : null}
    </div>
  );
}
