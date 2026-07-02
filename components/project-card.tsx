import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  FolderKanban,
  Github
} from "lucide-react";
import type { Project } from "@/data/projects";
import { getProjectCaseStudyHref } from "@/lib/projects";
import { isInternalHref, sanitizeHref } from "@/lib/url-safety";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export function ProjectCard({ project }: { project: Project }) {
  const caseStudyHref = getProjectCaseStudyHref(project);
  const hasExternalCaseStudy = Boolean(caseStudyHref && !isInternalHref(caseStudyHref));
  const hasCaseStudy = Boolean(caseStudyHref);
  const featurePreview = project.features.slice(0, 3);
  const imageUrl = sanitizeHref(project.imageUrl);
  const githubUrl = sanitizeHref(project.githubUrl);
  const liveUrl = sanitizeHref(project.liveUrl);

  return (
    <Card className="group flex h-full flex-col overflow-hidden bg-card/75 shadow-black/25 hover:border-primary/25">
      <div className="border-b border-white/10 bg-black/[0.16]">
        {imageUrl ? (
          <img
            src={imageUrl}
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
            <div className="relative flex h-full flex-col justify-between rounded-md border border-white/10 bg-background/70 p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-primary">
                  <FolderKanban className="h-5 w-5" aria-hidden="true" />
                </span>
                <Badge variant="secondary">{project.category}</Badge>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase text-primary/90">
                  Case study
                </div>
                <div className="mt-2 text-lg font-semibold text-white">
                  {project.title}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <CardHeader>
        <div className="mb-4 flex items-center justify-between gap-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-primary transition-colors group-hover:border-primary/45 group-hover:bg-primary/[0.14]">
            <FolderKanban className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="flex flex-wrap justify-end gap-2">
            {project.featured ? <Badge variant="amber">Featured</Badge> : null}
            <Badge variant="secondary">{project.category}</Badge>
            <Badge variant={project.stage === "Future planning" ? "amber" : "outline"}>
              {project.stage}
            </Badge>
          </div>
        </div>
        <CardTitle>{project.title}</CardTitle>
        <p className="text-sm leading-6 text-muted-foreground">
          {project.shortDescription || "Project details are being documented."}
        </p>
      </CardHeader>
      <CardContent className="grid flex-1 gap-4">
        <ProjectDetail
          label="Problem"
          value={project.problem || "The project problem statement is being documented."}
        />
        <ProjectDetail
          label="Solution"
          value={project.solution || "The project solution notes are being documented."}
        />
        {featurePreview.length ? (
          <div>
            <div className="text-xs font-semibold uppercase text-muted-foreground">
              Key features
            </div>
            <ul className="mt-2 grid gap-2">
              {featurePreview.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-sm leading-6 text-foreground/[0.86]"
                >
                  <CheckCircle2
                    className="mt-1 h-4 w-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <div>
          <div className="text-xs font-semibold uppercase text-muted-foreground">
            Tech used
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {(project.techUsed.length ? project.techUsed : ["Documentation pending"]).map(
              (tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              )
            )}
          </div>
        </div>
        <ProjectDetail
          label="Next step"
          value={project.nextStep || "Next step is being documented."}
        />
      </CardContent>
      <CardFooter className="flex flex-col gap-2 sm:flex-row">
        {hasCaseStudy ? (
          <Button asChild variant="outline" className="w-full">
            {hasExternalCaseStudy ? (
              <a href={caseStudyHref} target="_blank" rel="noreferrer">
                Open Case Study
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : (
              <Link href={caseStudyHref}>
                Open Case Study
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )}
          </Button>
        ) : (
          <Button type="button" variant="outline" className="w-full" disabled>
            Case study coming soon.
          </Button>
        )}
        {githubUrl ? (
          <Button asChild variant="outline" className="w-full sm:w-fit">
            <a href={githubUrl} target="_blank" rel="noreferrer" aria-label="Open GitHub">
              <Github className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        ) : null}
        {liveUrl ? (
          <Button asChild variant="outline" className="w-full sm:w-fit">
            {isInternalHref(liveUrl) ? (
              <Link href={liveUrl} aria-label="Open live demo">
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </Link>
            ) : (
              <a href={liveUrl} target="_blank" rel="noreferrer" aria-label="Open live demo">
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}

function ProjectDetail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase text-muted-foreground">
        {label}
      </div>
      <p className="mt-1 text-sm leading-6 text-foreground/[0.86]">{value}</p>
    </div>
  );
}
