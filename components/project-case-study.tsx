"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, ExternalLink, Github } from "lucide-react";
import type { Project } from "@/data/projects";
import { findPublishedProjectBySlug } from "@/lib/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function ProjectCaseStudy({ slug }: { slug: string }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setProject(findPublishedProjectBySlug(slug) ?? null);
    setLoaded(true);
  }, [slug]);

  if (!loaded) {
    return (
      <section className="section-shell">
        <Card className="bg-card/75">
          <CardContent className="p-6 text-sm text-muted-foreground">
            Loading case study...
          </CardContent>
        </Card>
      </section>
    );
  }

  if (!project) {
    return (
      <section className="section-shell">
        <Card className="bg-card/75">
          <CardContent className="grid gap-4 p-6">
            <h1 className="text-2xl font-semibold">Project not available</h1>
            <p className="text-sm leading-6 text-muted-foreground">
              This project is either unpublished, archived, or does not exist in
              the current local project store.
            </p>
            <Button asChild variant="outline" className="w-fit">
              <Link href="/projects">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to projects
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <>
      <section className="section-shell pb-8">
        <Button asChild variant="ghost" className="mb-6 w-fit">
          <Link href="/projects">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Projects
          </Link>
        </Button>

        <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-start">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge>{project.category}</Badge>
              {project.featured ? <Badge variant="amber">Featured</Badge> : null}
            </div>
            <h1 className="mt-5 text-4xl font-semibold text-white sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
              {project.shortDescription || "Add description here."}
            </p>
          </div>

          {project.imageUrl ? (
            <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.035]">
              <img
                src={project.imageUrl}
                alt={`${project.title} preview`}
                className="aspect-video w-full object-cover"
              />
            </div>
          ) : null}
        </div>
      </section>

      <section className="border-t border-white/10 bg-white/[0.025]">
        <div className="section-shell grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-start">
          <div className="grid gap-6">
            <CaseSection title="Overview">
              {project.fullDescription || "Add description here."}
            </CaseSection>
            <CaseSection title="Problem">
              {project.problem || "Add problem here."}
            </CaseSection>
            <CaseSection title="Solution">
              {project.solution || "Add solution here."}
            </CaseSection>
          </div>

          <div className="grid gap-6">
            <Card className="bg-card/75">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold">Features</h2>
                <ul className="mt-4 grid gap-2 text-sm leading-6 text-muted-foreground">
                  {(project.features.length
                    ? project.features
                    : ["Add feature here"]
                  ).map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card/75">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold">Tech used</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(project.techUsed.length ? project.techUsed : ["Add tech here"]).map(
                    (tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    )
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/75">
              <CardContent className="grid gap-3 p-6">
                <h2 className="text-lg font-semibold">Links</h2>
                {project.githubUrl ? (
                  <Button asChild variant="outline">
                    <a href={project.githubUrl} target="_blank" rel="noreferrer">
                      <Github className="h-4 w-4" aria-hidden="true" />
                      GitHub
                    </a>
                  </Button>
                ) : null}
                {project.liveUrl ? (
                  <Button asChild variant="outline">
                    <a href={project.liveUrl} target="_blank" rel="noreferrer">
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      Live demo
                    </a>
                  </Button>
                ) : null}
                {project.caseStudyUrl ? (
                  <Button asChild variant="outline">
                    <a href={project.caseStudyUrl} target="_blank" rel="noreferrer">
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      External case study
                    </a>
                  </Button>
                ) : null}
                {!project.githubUrl && !project.liveUrl && !project.caseStudyUrl ? (
                  <p className="text-sm text-muted-foreground">
                    Add links in the admin project editor.
                  </p>
                ) : null}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}

function CaseSection({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="bg-card/75">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">{children}</p>
      </CardContent>
    </Card>
  );
}
