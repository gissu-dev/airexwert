import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
  const Icon = project.icon;

  return (
    <Card className="group flex h-full flex-col bg-card/75 shadow-black/25 hover:border-primary/25">
      <CardHeader>
        <div className="mb-4 flex items-center justify-between gap-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-primary transition-colors group-hover:border-primary/45 group-hover:bg-primary/[0.14]">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <Badge variant={project.status === "MVP" ? "amber" : "secondary"}>
            {project.status}
          </Badge>
        </div>
        <CardTitle>{project.title}</CardTitle>
        <div className="text-xs font-semibold uppercase text-primary/90">
          {project.category}
        </div>
      </CardHeader>
      <CardContent className="grid flex-1 gap-4">
        <ProjectDetail label="Problem" value={project.problem} />
        <ProjectDetail label="Solution" value={project.solution} />
        <ProjectDetail label="Next step" value={project.nextStep} />
        <div>
          <div className="text-xs font-semibold uppercase text-muted-foreground">
            Tech used
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link href={`/projects#${project.slug}`}>
            View case study
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
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
