import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  ClipboardCheck,
  Gamepad2,
  Globe2,
  Lightbulb,
  MapPin,
  Music,
  NotebookText,
  Plane,
  Radar,
  Wrench
} from "lucide-react";
import { RecentSpotifyLikes } from "@/components/recent-spotify-likes";
import { SectionHeader } from "@/components/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { profile } from "@/data/profile";
import { projects, type Project } from "@/data/projects";

export const metadata = {
  title: "About Airex Wert",
  description:
    "About Airex Wert and WertWorks: a practical builder from Northeastern Pennsylvania documenting websites, Discord bots, automation tools, aviation experiments, field notes, and future service ideas.",
  openGraph: {
    title: "About Airex Wert | WertWorks",
    description:
      "The background behind WertWorks: Army aviation maintenance, practical technology, useful projects, field notes, and career growth."
  }
};

const buildTracks = [
  {
    title: "Websites",
    description:
      "Personal, project, service, and small-business pages with clear structure and useful contact paths.",
    icon: Globe2
  },
  {
    title: "Discord bots",
    description:
      "Server utilities, music controls, rituals, reminders, and practical command flows.",
    icon: Bot
  },
  {
    title: "Automation tools",
    description:
      "Small helpers for repeated work, tracking, reminders, forms, and private dashboards.",
    icon: Wrench
  },
  {
    title: "Dashboards and internal tools",
    description:
      "Private systems for career tracking, project organization, and messy information that needs a home.",
    icon: ClipboardCheck
  },
  {
    title: "Aviation experiments",
    description:
      "Checklist-inspired workflows, maintenance thinking, flight ideas, and aviation-adjacent notes.",
    icon: Plane
  },
  {
    title: "Service ideas",
    description:
      "Pre-launch work like Sky Pals Dispatch, built openly while launch requirements are completed.",
    icon: Lightbulb
  }
];

const thinkingNotes = [
  {
    title: "Start with the messy version",
    description:
      "Most good ideas start scattered. I like finding the useful parts, naming the problem, and turning the rough version into something workable."
  },
  {
    title: "Make it usable",
    description:
      "A project should become something people can click, use, understand, or improve. Polish matters, but the thing still has to solve a real problem."
  },
  {
    title: "Keep improving the system",
    description:
      "I care about the second and third pass: better copy, clearer flows, fewer loose ends, and a site or tool that feels more honest over time."
  }
];

const currentFocus = [
  "Building Sky Pals Dispatch toward a responsible launch",
  "Career rebuild and finding better work",
  "Discord bots and server tools",
  "Personal automation and private dashboards",
  "Improving WertWorks as a personal brand and project archive"
];

const proudProjectHighlights = [
  {
    slug: "kith-bot",
    note: "A custom Discord server bot with utility commands, archive reactions, tarot tools, and personality."
  },
  {
    slug: "clocktower",
    note: "A small Discord voice bot that rings a clocktower bell hourly and keeps timers simple."
  },
  {
    slug: "kith-wave-bot",
    note: "A Discord music bot with queues, radio presets, Spotify imports, and playback controls."
  },
  {
    slug: "keystone-aerial-services-aerial-planning",
    note: "The flagship pre-launch business: inspection and documentation services first, with fire-service applications as a later exploration goal."
  }
];

const interests = [
  { label: "Aviation", icon: Plane },
  { label: "Drones", icon: Radar },
  { label: "Automation", icon: Wrench },
  { label: "Music", icon: Music },
  { label: "Gaming", icon: Gamepad2 },
  { label: "Storytelling", icon: NotebookText },
  { label: "Places and atmosphere", icon: MapPin }
];

type ProudProject = (typeof proudProjectHighlights)[number] & { project: Project };

export default function AboutPage() {
  const proudProjects = proudProjectHighlights
    .map((highlight) => {
      const project = projects.find((project) => project.slug === highlight.slug);

      return project ? { ...highlight, project } : null;
    })
    .filter((item): item is ProudProject => Boolean(item));

  return (
    <>
      <section className="container pb-10 pt-14 sm:pb-12 sm:pt-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(340px,460px)] lg:items-start">
          <div>
            <Badge variant="secondary">About WertWorks</Badge>
            <h1 className="mt-5 max-w-5xl text-balance text-4xl font-semibold tracking-normal sm:text-5xl lg:text-6xl">
              I&apos;m Airex Wert, a practical builder based in Northeastern
              Pennsylvania.
            </h1>
            <div className="mt-6 grid max-w-3xl gap-4 text-lg leading-8 text-muted-foreground">
              <p>
                Through WertWorks, I build and document useful digital projects -
                websites, Discord bots, automation tools, aviation experiments, and
                field notes from whatever I&apos;m learning next.
              </p>
              <p>
                My background is a mix of military aviation, operations,
                customer-facing work, and self-taught tech. I like turning messy
                ideas into something people can actually click, use, or understand.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/projects">
                  View Projects
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Contact Me</Link>
              </Button>
            </div>
          </div>

          <RecentSpotifyLikes compact />
        </div>
      </section>

      <section className="section-shell pt-4">
        <SectionHeader
          eyebrow="What I build"
          title="Useful digital projects with enough room to experiment."
          description="WertWorks is the place where websites, bots, automation ideas, aviation experiments, service roadmaps, and notes can live together without pretending every idea is already a finished company."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {buildTracks.map((track) => {
            const Icon = track.icon;

            return (
              <Card key={track.title} className="bg-card/75">
                <CardContent className="p-5">
                  <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  <h2 className="mt-4 text-base font-semibold">{track.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {track.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="section-shell">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <SectionHeader
              eyebrow="How I think"
              title="Practical first, personal enough to feel real."
              description="I like projects where there is room to experiment, improve the rough idea, and make the final version feel like it belongs to the person or problem behind it."
            />
            <div className="grid gap-5">
              {thinkingNotes.map((note) => (
                <Card key={note.title} className="bg-card/75">
                  <CardContent className="p-5">
                    <h2 className="text-lg font-semibold">{note.title}</h2>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {note.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <Card className="bg-card/75">
            <CardContent className="p-6">
              <Briefcase className="h-8 w-8 text-primary" aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-semibold">Background</h2>
              <div className="mt-4 grid gap-4 text-sm leading-7 text-muted-foreground">
                <p>
                  I have an Army helicopter mechanic and military aviation
                  background, plus experience in operations and customer-facing
                  work. That background shows up in how I approach projects:
                  checklists, accountability, clear handoffs, and respect for
                  small details.
                </p>
                <p>
                  The tech side is self-taught and practical. I build websites,
                  Discord bots, automation ideas, project records, and planning
                  pages because they help turn scattered thoughts into something
                  visible and useful.
                </p>
                <p>
                  Sky Pals Dispatch is my flagship pre-launch business. The website
                  and service plan are taking shape now, with inspection and
                  documentation services as the launch focus. Exploring how drones
                  could help fire services is a later goal after the core business is established.
                </p>
              </div>
            </CardContent>
          </Card>

          <div>
            <SectionHeader
              eyebrow="Current focus"
              title="Rebuilding, documenting, and making the work easier to understand."
              description="This site is part portfolio, part working archive, and part effort to present real skills more clearly."
            />
            <div className="mt-8 grid gap-3">
              {currentFocus.map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-md border border-white/10 bg-white/[0.035] p-4 text-sm leading-6 text-muted-foreground"
                >
                  <ClipboardCheck
                    className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="section-shell">
          <SectionHeader
            eyebrow="Projects I am proud of"
            title="A few project tracks that show the current WertWorks direction."
            description="These are not fake client trophies. They are useful projects, experiments, and roadmaps that show how I think and what I keep improving."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {proudProjects.map(({ project, note }) => (
              <Card key={project.id} className="flex h-full flex-col bg-card/75">
                <CardContent className="flex h-full flex-col p-5">
                  <Badge variant={project.stage === "Future planning" ? "amber" : "default"}>
                    {project.stage}
                  </Badge>
                  <h2 className="mt-4 text-lg font-semibold">{project.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                    {note}
                  </p>
                  <Button asChild variant="outline" className="mt-6 w-fit">
                    <Link href={`/projects/${project.slug}`}>
                      Open project
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <SectionHeader
            eyebrow="Beyond the work"
            title="The interests around the projects matter too."
            description="Aviation, drones, automation, music, gaming, storytelling, and the atmosphere of overlooked places all feed the way I notice details. They are interests, not a costume for the whole site."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {interests.map((interest) => {
              const Icon = interest.icon;

              return (
                <div
                  key={interest.label}
                  className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.035] p-4"
                >
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  <span className="text-sm font-semibold">{interest.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <Card className="bg-card/75">
          <CardContent className="grid gap-6 p-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <Badge variant="secondary">Next step</Badge>
              <h2 className="mt-4 text-3xl font-semibold">
                Have a role, project, or practical idea worth talking through?
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                Send clear context and the best next step. I am open to better
                work, useful website projects, bot ideas, automation problems,
                and focused planning conversations.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Button asChild>
                <Link href="/contact">Contact Me</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/projects">View Projects</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
