"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  FolderKanban,
  Github
} from "lucide-react";
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
              <Badge variant={project.stage === "Future planning" ? "amber" : "secondary"}>
                {project.stage}
              </Badge>
              {project.featured ? <Badge variant="amber">Featured</Badge> : null}
              {project.caseStudyStatus === "coming-soon" ? (
                <Badge variant="secondary">Case study coming soon</Badge>
              ) : null}
            </div>
            <h1 className="mt-5 text-4xl font-semibold text-white sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
              {project.shortDescription || "Project details are being documented."}
            </p>
          </div>

          <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.035]">
            {project.imageUrl ? (
              <img
                src={project.imageUrl}
                alt={`${project.title} preview`}
                className="aspect-video w-full object-cover"
              />
            ) : (
              <div className="relative aspect-video overflow-hidden p-5">
                <div className="absolute inset-0 radar-grid opacity-25" aria-hidden="true" />
                <div
                  className="absolute inset-0 bg-[radial-gradient(circle_at_22%_24%,rgba(31,214,154,0.22),transparent_30%),linear-gradient(135deg,rgba(245,158,11,0.14),transparent_42%)]"
                  aria-hidden="true"
                />
                <div className="relative flex h-full flex-col justify-between rounded-md border border-white/10 bg-background/70 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-primary">
                      <FolderKanban className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <Badge variant="secondary">{project.category}</Badge>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase text-primary/90">
                      Project brief
                    </div>
                    <div className="mt-2 text-2xl font-semibold text-white">
                      {project.title}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-white/[0.025]">
        <div className="section-shell grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-start">
          <div className="grid gap-6">
            <CaseSection title="Overview">
              {project.fullDescription || "The full project overview is being documented."}
            </CaseSection>
            <CaseSection title="Problem">
              {project.problem || "The project problem statement is being documented."}
            </CaseSection>
            <CaseSection title="Solution">
              {project.solution || "The project solution notes are being documented."}
            </CaseSection>
            <CaseSection title="Next Step">
              {project.nextStep || "The next step is being documented."}
            </CaseSection>
          </div>

          <div className="grid gap-6">
            <Card className="bg-card/75">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold">Features</h2>
                <ul className="mt-4 grid gap-2 text-sm leading-6 text-muted-foreground">
                  {(project.features.length
                    ? project.features
                    : ["Feature documentation is pending."]
                  ).map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle2
                        className="mt-1 h-4 w-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card/75">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold">Tech used</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(project.techUsed.length
                    ? project.techUsed
                    : ["Documentation pending"]
                  ).map(
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
                    {isInternalHref(project.liveUrl) ? (
                      <Link href={project.liveUrl}>
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        Live demo
                      </Link>
                    ) : (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer">
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        Live demo
                      </a>
                    )}
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
                    External links have not been added yet.
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

function isInternalHref(href: string) {
  return href.startsWith("/");
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
