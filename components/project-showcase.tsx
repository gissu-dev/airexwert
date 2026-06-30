"use client";

import { useEffect, useMemo, useState } from "react";
import type { Project, ProjectCategory } from "@/data/projects";
import { projects as seedProjects } from "@/data/projects";
import {
  getPublicProjectCategories,
  getPublishedProjects,
  readProjects
} from "@/lib/projects";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import { cn } from "@/lib/utils";

type ProjectFilter = ProjectCategory | "All";

export function ProjectShowcase() {
  const [category, setCategory] = useState<ProjectFilter>("All");
  const [projects, setProjects] = useState<Project[]>(seedProjects);

  useEffect(() => {
    setProjects(readProjects());
  }, []);

  const categories = useMemo(
    () => getPublicProjectCategories(projects) as ProjectFilter[],
    [projects]
  );

  const visibleProjects = useMemo(() => {
    const published = getPublishedProjects(projects);

    if (category === "All") {
      return published;
    }

    return published.filter((project) => project.category === category);
  }, [category, projects]);

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-3">
        {categories.map((item) => (
          <Button
            key={item}
            type="button"
            variant={category === item ? "default" : "outline"}
            size="sm"
            className={cn("shrink-0", category === item && "shadow-radar")}
            onClick={() => setCategory(item)}
          >
            {item}
          </Button>
        ))}
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visibleProjects.map((project) => (
          <div id={project.slug} key={project.id} className="scroll-mt-24">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
      {!visibleProjects.length ? (
        <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.045] p-8 text-center">
          <h3 className="text-lg font-semibold">No published projects in this filter.</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Draft and archived projects are hidden from the public projects page.
          </p>
        </div>
      ) : null}
    </div>
  );
}
