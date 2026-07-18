import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Bot,
  ClipboardCheck,
  Globe2,
  Plane,
  Radar,
  Workflow
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
  const featurePreview = project.features.slice(0, 2);
  const imageUrl = sanitizeHref(project.imageUrl);
  const liveUrl = sanitizeHref(project.liveUrl);
  const ProjectIcon = getProjectIcon(project.category);

  return (
    <Card className="group flex h-full flex-col overflow-hidden bg-card/75 shadow-black/25 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-black/30">
      <div className="border-b border-white/10 bg-black/[0.16]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${project.title} preview`}
            className="aspect-video w-full object-cover"
          />
        ) : (
          <div className="relative aspect-[16/7] overflow-hidden p-5">
            <div className="absolute inset-0 radar-grid opacity-25" aria-hidden="true" />
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_22%_24%,rgba(31,214,154,0.22),transparent_30%),linear-gradient(135deg,rgba(245,158,11,0.14),transparent_42%)]"
              aria-hidden="true"
            />
            <div className="relative flex h-full flex-col justify-between rounded-md border border-white/10 bg-background/70 p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-primary">
                  <ProjectIcon className="h-5 w-5" aria-hidden="true" />
                </span>
                <Badge variant="secondary">{project.category}</Badge>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/90">
                  {project.stage}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <CardHeader className="pb-4">
        <div className="mb-2 flex flex-wrap gap-2">
          <Badge variant="secondary">{project.category}</Badge>
          <Badge variant={project.stage === "Future planning" ? "amber" : "outline"}>
            {project.stage}
          </Badge>
        </div>
        <CardTitle>{project.title}</CardTitle>
        <p className="text-sm leading-6 text-muted-foreground">
          {project.shortDescription || "Project details are being documented."}
        </p>
      </CardHeader>
      <CardContent className="grid flex-1 gap-5">
        {featurePreview.length ? (
          <div>
            <div className="text-xs font-semibold uppercase text-muted-foreground">
              Highlights
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
        <div className="flex flex-wrap gap-2">
            {(project.techUsed.length ? project.techUsed.slice(0, 3) : ["Documentation pending"]).map(
              (tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              )
            )}
        </div>
        <div className="border-t border-white/10 pt-4">
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Next step</div>
          <p className="mt-2 text-sm leading-6 text-foreground/[0.86]">
            {project.nextStep || "Next step is being documented."}
          </p>
        </div>
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
        {liveUrl ? (
          <Button asChild variant="outline" className="w-full">
            {isInternalHref(liveUrl) ? (
              <Link href={liveUrl}>
                Open project
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </Link>
            ) : (
              <a href={liveUrl} target="_blank" rel="noreferrer">
                Visit live project
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}

function getProjectIcon(category: Project["category"]) {
  switch (category) {
    case "Discord Bots":
      return Bot;
    case "Automation Tools":
      return Workflow;
    case "Websites":
      return Globe2;
    case "Aviation Systems":
      return Plane;
    case "Aerial Planning":
      return Radar;
    default:
      return ClipboardCheck;
  }
}
