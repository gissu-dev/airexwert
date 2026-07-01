import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Briefcase,
  Compass,
  FileText,
  Globe2,
  Lightbulb,
  Map,
  NotebookText,
  Plane,
  Wrench
} from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { SectionHeader } from "@/components/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Field Notes",
  description:
    "Field Notes from WertWorks: build logs, website notes, bot development notes, aviation thoughts, automation ideas, career notes, project lessons, tools, and occasional place reflections.",
  openGraph: {
    title: "Field Notes | WertWorks",
    description:
      "A working archive for what Airex Wert is building, learning, testing, and thinking through."
  }
};

const categories = [
  "Build Logs",
  "Website Notes",
  "Bot Notes",
  "Aviation",
  "AI Experiments",
  "Systems",
  "Personal Notes",
  "Learning Notes",
  "Project Updates",
  "Ideas",
  "Places",
  "Urbex",
  "Career Notes",
  "Gear / Tools"
];

const notes = [
  {
    title: "Why I am Building WertWorks",
    category: "Personal Notes",
    description:
      "A note on building a personal site that feels useful, honest, and connected to the work I actually want to do.",
    readTime: "4 min",
    icon: NotebookText,
    featured: true
  },
  {
    title: "Making My Website Feel Less Fake",
    category: "Website Notes",
    description:
      "Notes on turning a portfolio from a generic project board into something that feels more personal, useful, and hireable.",
    readTime: "5 min",
    icon: Globe2
  },
  {
    title: "Building KithWave",
    category: "Bot Notes",
    description:
      "What I learned building a Discord music bot with queues, radio presets, Spotify imports, and control buttons.",
    readTime: "6 min",
    icon: Bot
  },
  {
    title: "The Checklist Mindset",
    category: "Aviation",
    description:
      "How aviation maintenance, flight sim, and systems thinking changed how I approach projects and workflows.",
    readTime: "4 min",
    icon: Plane
  },
  {
    title: "Why Small Bots Still Matter",
    category: "Systems",
    description:
      "How small Discord bots and automation projects can solve real problems without needing to become huge apps.",
    readTime: "3 min",
    icon: Wrench
  },
  {
    title: "Keystone Aerial Services Roadmap",
    category: "Project Updates",
    description:
      "Notes on rethinking the roadmap for a future aerial services business before presenting it as fully launched.",
    readTime: "5 min",
    icon: Compass
  },
  {
    title: "Career Rebuild Notes",
    category: "Career Notes",
    description:
      "Thoughts on rebuilding, finding better work, improving presentation, and turning scattered skills into something people understand.",
    readTime: "4 min",
    icon: Briefcase
  },
  {
    title: "Places, Atmosphere, and Curiosity",
    category: "Places",
    description:
      "A general note on why certain places, old infrastructure, and overlooked details can be interesting without making it the whole identity of the site.",
    readTime: "3 min",
    icon: Map
  }
];

const featuredNote = notes.find((note) => note.featured) ?? notes[0];

export default function FieldNotesPage() {
  const FeaturedIcon = featuredNote.icon;

  return (
    <>
      <PageIntro
        eyebrow="Field Notes"
        title="Field Notes"
        description="Field Notes is where I document what I am building, learning, testing, and thinking through."
      />

      <section className="section-shell pt-4">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeader
              eyebrow="Working archive"
              title="Part build log, part journal, part idea board."
              description="Some notes are build logs from websites, bots, and automation experiments. Others are project updates, aviation thoughts, career notes, ideas, tools, or observations from whatever I am learning next. This is not meant to be a polished corporate blog."
            />
            <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">
              Place and urbex-related notes stay general: atmosphere, history,
              photography, curiosity, and reflection. No exact locations, entry
              instructions, or sketchy details belong here.
            </p>
          </div>

          <Card className="bg-card/75">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <Lightbulb className="h-5 w-5 text-primary" aria-hidden="true" />
                <h2 className="text-lg font-semibold">Category filters</h2>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <span
                    key={category}
                    className="inline-flex rounded-md border border-white/10 bg-white/[0.055] px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/10 hover:text-foreground"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="section-shell">
          <SectionHeader
            eyebrow="Featured note"
            title={featuredNote.title}
            description={featuredNote.description}
          />
          <Card className="mt-8 bg-card/75">
            <CardContent className="grid gap-6 p-6 md:grid-cols-[auto_1fr_auto] md:items-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-primary">
                <FeaturedIcon className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <div className="flex flex-wrap gap-2">
                  <Badge>{featuredNote.category}</Badge>
                  <Badge variant="secondary">Draft note</Badge>
                  <Badge variant="outline">{featuredNote.readTime}</Badge>
                </div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  This placeholder will become the first real note in the
                  archive. For now, it sets the tone: honest, useful, and tied
                  to the process behind the work.
                </p>
              </div>
              <Button type="button" variant="outline" disabled>
                Full note coming soon
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="notes" className="section-shell scroll-mt-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Note grid"
            title="Initial notes and placeholders."
            description="These cards create the first structure for future posts without pretending the archive is already full."
          />
          <Button asChild variant="outline" className="w-fit">
            <Link href="/projects">
              View Projects
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {notes.map((note) => {
            const Icon = note.icon;

            return (
              <Card key={note.title} className="flex h-full flex-col bg-card/75">
                <CardContent className="flex h-full flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <Badge variant="secondary">{note.category}</Badge>
                  </div>
                  <h2 className="mt-5 text-lg font-semibold">{note.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                    {note.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Badge variant="outline">Draft</Badge>
                    <Badge variant="outline">{note.readTime}</Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="border-t border-white/10 bg-white/[0.03]">
        <div className="section-shell">
          <Card className="bg-card/75">
            <CardContent className="grid gap-6 p-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <Badge variant="secondary">Next step</Badge>
                <h2 className="mt-4 text-3xl font-semibold">
                  Want context behind a project or idea?
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                  Reach out about a role, project, website, bot, automation
                  problem, or planning conversation. Field Notes will keep
                  documenting what changes along the way.
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
        </div>
      </section>
    </>
  );
}
