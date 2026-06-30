import Link from "next/link";
import {
  Briefcase,
  ClipboardList,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Search
} from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { PageIntro } from "@/components/page-intro";
import { SectionHeader } from "@/components/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { projects } from "@/data/projects";

export const metadata = {
  title: "Job Tools | WertWorks",
  description:
    "Personal and in-development WertWorks job-search tools: job dashboard, application tracker, resume toolkit, cover letter workflow, interview notes, and status tracking.",
  openGraph: {
    title: "Job Tools | WertWorks",
    description:
      "A personal job-search operating system for tracking applications, documents, interviews, and follow-ups."
  }
};

const jobToolTracks = [
  {
    title: "Job Search Dashboard",
    description:
      "A central view for leads, applications, interviews, follow-ups, offers, and rejections.",
    status: "Active personal tool",
    href: "/admin/jobs",
    icon: LayoutDashboard
  },
  {
    title: "Application Tracker",
    description:
      "Structured application records for role details, pay notes, contacts, dates, and next actions.",
    status: "In development",
    href: "/projects#application-organizer",
    icon: ClipboardList
  },
  {
    title: "Resume Toolkit",
    description:
      "Reusable summaries, skills, projects, and employer-facing material tied back to the resume page.",
    status: "In development",
    href: "/resume",
    icon: FileText
  },
  {
    title: "Cover Letter Toolkit",
    description:
      "Role-specific notes and draft structure for targeted cover letter work.",
    status: "Planned",
    href: "/projects#resume-cover-letter-toolkit",
    icon: MessageSquare
  },
  {
    title: "Interview Prep / Notes",
    description:
      "Interview details, prep notes, questions, follow-up reminders, and post-interview records.",
    status: "Planned",
    href: "/projects#personal-job-search-dashboard",
    icon: Search
  },
  {
    title: "Application Status Tracking",
    description:
      "Simple status tracking for leads, applications, interviews, follow-ups, and offers.",
    status: "Active personal tool",
    href: "/admin/jobs",
    icon: Briefcase
  }
];

export default function JobToolsPage() {
  const jobProjects = projects.filter(
    (project) =>
      project.status === "published" && project.category === "Job Search Tools"
  );

  return (
    <>
      <PageIntro
        eyebrow="Job Tools"
        title="A personal job-search operating system in development."
        description="These tools organize applications, document versions, follow-ups, interview notes, and resume work. They are personal tools and in-development systems unless a page says otherwise."
      />

      <section className="section-shell pt-4">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {jobToolTracks.map((track) => {
            const Icon = track.icon;

            return (
              <Card key={track.title} className="group bg-card/75">
                <CardContent className="flex h-full flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-primary transition-colors group-hover:border-primary/45 group-hover:bg-primary/[0.14]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <Badge variant={track.status.includes("Active") ? "default" : "secondary"}>
                      {track.status}
                    </Badge>
                  </div>
                  <h2 className="mt-5 text-lg font-semibold">{track.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                    {track.description}
                  </p>
                  <Button asChild variant="outline" className="mt-6 w-fit">
                    <Link href={track.href}>Open route</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="section-shell">
          <SectionHeader
            eyebrow="Job tool projects"
            title="Project records connected to the job-search workflow."
            description="These cards use the central project data and keep case-study links disabled until the writeups are ready."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {jobProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
