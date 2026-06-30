import Link from "next/link";
import { ArrowUpRight, ExternalLink, FolderKanban, Github } from "lucide-react";
import type { Project } from "@/data/projects";
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
  const caseStudyHref = project.caseStudyUrl || `/projects/${project.slug}`;
  const hasExternalCaseStudy = Boolean(project.caseStudyUrl);

  return (
    <Card className="group flex h-full flex-col bg-card/75 shadow-black/25 hover:border-primary/25">
      <CardHeader>
        <div className="mb-4 flex items-center justify-between gap-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-primary transition-colors group-hover:border-primary/45 group-hover:bg-primary/[0.14]">
            <FolderKanban className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="flex flex-wrap justify-end gap-2">
            {project.featured ? <Badge variant="amber">Featured</Badge> : null}
            <Badge variant="secondary">{project.category}</Badge>
          </div>
        </div>
        <CardTitle>{project.title}</CardTitle>
        <p className="text-sm leading-6 text-muted-foreground">
          {project.shortDescription || "Add description here."}
        </p>
      </CardHeader>
      <CardContent className="grid flex-1 gap-4">
        <ProjectDetail label="Problem" value={project.problem || "Add problem here."} />
        <ProjectDetail
          label="Solution"
          value={project.solution || "Add solution here."}
        />
        <div>
          <div className="text-xs font-semibold uppercase text-muted-foreground">
            Tech used
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {(project.techUsed.length ? project.techUsed : ["Add tech here"]).map(
              (tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              )
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 sm:flex-row">
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
        {project.githubUrl ? (
          <Button asChild variant="outline" className="w-full sm:w-fit">
            <a href={project.githubUrl} target="_blank" rel="noreferrer" aria-label="Open GitHub">
              <Github className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        ) : null}
        {project.liveUrl ? (
          <Button asChild variant="outline" className="w-full sm:w-fit">
            <a href={project.liveUrl} target="_blank" rel="noreferrer" aria-label="Open live demo">
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
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
