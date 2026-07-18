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
import { FeaturedProjectCard } from "@/components/featured-project-card";
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
    const published = getPublishedProjects(projects).filter(
      (project) => project.id !== "keystone-aerial-services-aerial-planning",
    );

    if (category === "All") {
      return published;
    }

    return published.filter((project) => project.category === category);
  }, [category, projects]);

  const flagshipProject = useMemo(
    () =>
      getPublishedProjects(projects).find(
        (project) => project.id === "keystone-aerial-services-aerial-planning",
      ) ??
      seedProjects.find(
        (project) => project.id === "keystone-aerial-services-aerial-planning",
      ),
    [projects],
  );

  return (
    <div className="grid gap-8">
      {flagshipProject ? <FeaturedProjectCard project={flagshipProject} /> : null}

      <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Explore the project archive
          </p>
          <h2 className="mt-2 text-2xl font-semibold">More work, easier to scan.</h2>
        </div>
        <div className="flex flex-wrap gap-2 sm:justify-end">
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
      </div>

      {!loaded ? (
        <p className="text-sm text-muted-foreground">Loading projects...</p>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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
