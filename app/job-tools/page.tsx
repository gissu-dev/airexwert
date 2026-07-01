import Link from "next/link";
import { FolderOpen, Lock, Mail, NotebookText, Wrench } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { SectionHeader } from "@/components/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Internal Experiments | WertWorks",
  description:
    "A hidden WertWorks page for private internal tools and experiments in development.",
  robots: {
    index: false,
    follow: false
  },
  openGraph: {
    title: "Internal Experiments | WertWorks",
    description:
      "Private internal tools and experiments are being developed behind the public WertWorks site."
  }
};

const publicRoutes = [
  {
    title: "Projects",
    description:
      "Review the public project hub for bots, websites, automation, career systems, aviation ideas, and future aerial planning.",
    href: "/projects",
    cta: "View Projects",
    icon: FolderOpen
  },
  {
    title: "Field Notes",
    description:
      "Read the working archive for build logs, website notes, bot lessons, ideas, and project updates.",
    href: "/field-notes",
    cta: "Read Field Notes",
    icon: NotebookText
  },
  {
    title: "Contact",
    description:
      "Start a focused conversation about a role, project, website, bot, automation idea, or planning question.",
    href: "/contact",
    cta: "Contact Me",
    icon: Mail
  }
];

export default function JobToolsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Internal experiments"
        title="This page is no longer part of the public navigation."
        description="Some internal dashboard and career-system experiments are still being developed privately. The public WertWorks site now routes visitors toward projects, field notes, resume, and contact."
      />

      <section className="section-shell pt-4">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Card className="bg-card/75">
            <CardContent className="p-6">
              <Lock className="h-8 w-8 text-primary" aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-semibold">Internal status</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                The private dashboard and related admin work still exist, but
                they are not being presented as a public product. This route is
                kept as a quiet placeholder while those experiments continue
                behind the scenes.
              </p>
              <Badge variant="secondary" className="mt-6">
                Hidden from main navigation
              </Badge>
            </CardContent>
          </Card>

          <div>
            <SectionHeader
              eyebrow="Public routes"
              title="Use the public WertWorks structure instead."
              description="If you landed here from an old link, these routes are the better way to understand the work and start a conversation."
            />
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {publicRoutes.map((route) => {
                const Icon = route.icon;

                return (
                  <Card key={route.title} className="flex h-full flex-col bg-card/75">
                    <CardContent className="flex h-full flex-col p-5">
                      <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                      <h2 className="mt-4 text-base font-semibold">{route.title}</h2>
                      <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                        {route.description}
                      </p>
                      <Button asChild variant="outline" className="mt-6 w-fit">
                        <Link href={route.href}>{route.cta}</Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-white/[0.03]">
        <div className="section-shell">
          <Card className="bg-card/75">
            <CardContent className="grid gap-6 p-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <Wrench className="h-7 w-7 text-primary" aria-hidden="true" />
                <h2 className="mt-4 text-2xl font-semibold">
                  Internal tools are still being developed privately.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                  Public visitors do not need the dashboard to understand
                  WertWorks. The better story is in the projects, field notes,
                  resume, and contact flow.
                </p>
              </div>
              <Button asChild>
                <Link href="/projects">Back to Projects</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
