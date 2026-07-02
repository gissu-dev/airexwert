"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  FolderKanban,
  Github,
} from "lucide-react";
import type { Project } from "@/data/projects";
import { findPublishedProjectBySlug } from "@/lib/projects";
import { isInternalHref, sanitizeHref } from "@/lib/url-safety";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function ProjectCaseStudy({ slug }: { slug: string }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadProject() {
      const nextProject = await findPublishedProjectBySlug(slug);
      setProject(nextProject ?? null);
      setLoaded(true);
    }

    loadProject();
  }, [slug]);

  if (!loaded) {
    return <p className="text-sm text-muted-foreground">Loading case study...</p>;
  }

  if (!project) {
    return (
      <Card className="bg-card/75">
        <CardContent className="grid gap-4 p-6">
          <h1 className="text-3xl font-semibold">Project not available</h1>
          <p className="text-sm text-muted-foreground">
            This project is either unpublished, archived, or does not exist in Supabase.
          </p>
          <Button asChild variant="outline">
            <Link href="/projects">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to projects
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const profileImageUrl = sanitizeHref(project.imageUrl);
  const caseStudyImages = (project.caseStudyImages ?? [])
    .map((image) => sanitizeHref(image))
    .filter(Boolean);
  const primaryImageUrl = caseStudyImages[0] ?? profileImageUrl;
  const galleryImageUrls = caseStudyImages.slice(1);
  const githubUrl = sanitizeHref(project.githubUrl);
  const liveUrl = sanitizeHref(project.liveUrl);
  const caseStudyUrl = sanitizeHref(project.caseStudyUrl);

  return (
    <article className="grid gap-8">
      <Button asChild variant="ghost" className="w-fit">
        <Link href="/projects">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Projects
        </Link>
      </Button>

      <div className="grid gap-4">
        <div className="flex flex-wrap gap-2">
          <Badge>{project.category}</Badge>
          <Badge variant="outline">{project.stage}</Badge>
          {project.featured ? <Badge>Featured</Badge> : null}
          {project.caseStudyStatus === "coming-soon" ? (
            <Badge variant="amber">Case study coming soon</Badge>
          ) : null}
        </div>

        <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
          {project.title}
        </h1>

        <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
          {project.shortDescription || "Project details are being documented."}
        </p>
      </div>

      {primaryImageUrl ? (
        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl shadow-black/25">
          <img
            src={primaryImageUrl}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-30 blur-2xl saturate-75"
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.12),transparent_42%),linear-gradient(180deg,rgba(6,10,18,0.2),rgba(6,10,18,0.72))]"
            aria-hidden="true"
          />
          <div className="relative flex min-h-[18rem] items-center justify-center p-3 sm:min-h-[22rem] sm:p-4 lg:min-h-[28rem]">
            <img
              src={primaryImageUrl}
              alt={
                caseStudyImages.length
                  ? `${project.title} screenshot`
                  : `${project.title} profile image`
              }
              className="max-h-[34rem] max-w-full rounded-lg border border-white/10 object-contain shadow-2xl shadow-black/40"
            />
          </div>
        </div>
      ) : (
        <div className="grid min-h-72 place-items-center rounded-xl border border-white/10 bg-white/[0.035] p-8">
          <div className="grid gap-3 text-center">
            <FolderKanban className="mx-auto h-10 w-10 text-primary" aria-hidden="true" />
            <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
              {project.category}
            </p>
            <p className="text-2xl font-semibold">Project brief</p>
            <p className="text-muted-foreground">{project.title}</p>
          </div>
        </div>
      )}

      {galleryImageUrls.length ? (
        <section className="grid gap-3">
          <h2 className="text-xl font-semibold">Screenshots</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImageUrls.map((screenshotUrl, index) => (
              <img
                key={`${screenshotUrl}-${index}`}
                src={screenshotUrl}
                alt={`${project.title} screenshot ${index + 2}`}
                className="aspect-video w-full rounded-lg border border-white/10 bg-black/[0.18] object-contain"
              />
            ))}
          </div>
        </section>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
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

          <CaseSection title="Next step">
            {project.nextStep || "The next step is being documented."}
          </CaseSection>
        </div>

        <div className="grid gap-6">
          <Card className="bg-card/75">
            <CardContent className="grid gap-4 p-6">
              <h2 className="text-xl font-semibold">Features</h2>

              <ul className="grid gap-3 text-sm text-muted-foreground">
                {(project.features.length
                  ? project.features
                  : ["Feature documentation is pending."]
                ).map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card/75">
            <CardContent className="grid gap-4 p-6">
              <h2 className="text-xl font-semibold">Tech used</h2>

              <div className="flex flex-wrap gap-2">
                {(project.techUsed.length ? project.techUsed : ["Documentation pending"]).map(
                  (tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ),
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/75">
            <CardContent className="grid gap-4 p-6">
              <h2 className="text-xl font-semibold">Links</h2>

              <div className="flex flex-col gap-2">
                {githubUrl ? (
                  <Button asChild variant="outline">
                    <a href={githubUrl} target="_blank" rel="noreferrer">
                      <Github className="h-4 w-4" aria-hidden="true" />
                      GitHub
                    </a>
                  </Button>
                ) : null}

                {liveUrl ? (
                  <Button asChild variant="outline">
                    {isInternalHref(liveUrl) ? (
                      <Link href={liveUrl}>
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        Live demo
                      </Link>
                    ) : (
                      <a href={liveUrl} target="_blank" rel="noreferrer">
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        Live demo
                      </a>
                    )}
                  </Button>
                ) : null}

                {caseStudyUrl ? (
                  <Button asChild variant="outline">
                    <a href={caseStudyUrl} target="_blank" rel="noreferrer">
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      External case study
                    </a>
                  </Button>
                ) : null}

                {!githubUrl && !liveUrl && !caseStudyUrl ? (
                  <p className="text-sm text-muted-foreground">
                    External links have not been added yet.
                  </p>
                ) : null}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </article>
  );
}

function CaseSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="bg-card/75">
      <CardContent className="grid gap-3 p-6">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="leading-7 text-muted-foreground">{children}</p>
      </CardContent>
    </Card>
  );
}
