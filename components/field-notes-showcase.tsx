"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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
  Wrench,
  type LucideIcon
} from "lucide-react";
import {
  seedFieldNotes,
  type FieldNote,
  type FieldNoteCategory
} from "@/data/field-notes";
import {
  readPublicFieldNotes,
  getFieldNoteCategories,
  type FieldNoteFilter
} from "@/lib/field-notes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/section-header";
import { cn } from "@/lib/utils";

export function FieldNotesShowcase() {
  const [notes, setNotes] = useState<FieldNote[]>(
    seedFieldNotes.filter((note) => note.status === "published")
  );
  const [loaded, setLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState<FieldNoteFilter>("All");

  useEffect(() => {
    async function loadFieldNotes() {
      const publicNotes = await readPublicFieldNotes();
      setNotes(
        publicNotes.length
          ? publicNotes
          : seedFieldNotes.filter((note) => note.status === "published")
      );
      setLoaded(true);
    }

    loadFieldNotes();
  }, []);

  const filters = useMemo(
    () => getFieldNoteCategories(notes) as FieldNoteFilter[],
    [notes]
  );

  const visibleNotes = useMemo(() => {
    if (activeCategory === "All") {
      return notes;
    }

    return notes.filter((note) => note.category === activeCategory);
  }, [activeCategory, notes]);

  const featuredNote = useMemo(
    () => notes.find((note) => note.featured) ?? notes[0],
    [notes]
  );

  return (
    <>
      <section className="section-shell pt-4">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeader
              eyebrow="Working archive"
              title="Build logs, learning notes, and working thoughts."
              description="Field Notes is a personal working archive for projects, decisions, lessons, and observations that are useful to keep close to the work."
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
                {filters.map((category) => (
                  <Button
                    key={category}
                    type="button"
                    variant={activeCategory === category ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "h-auto min-h-9 whitespace-normal py-2 text-left",
                      activeCategory === category && "shadow-radar"
                    )}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {featuredNote ? <FeaturedNote note={featuredNote} /> : null}

      <section id="notes" className="section-shell scroll-mt-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Note grid"
            title="Published field notes."
            description="Build logs, project notes, career notes, aviation planning, and smaller observations from the WertWorks archive."
          />
          <Button asChild variant="outline" className="w-fit">
            <Link href="/projects">
              View Projects
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        {!loaded ? (
          <p className="mt-6 text-sm text-muted-foreground">Loading field notes...</p>
        ) : null}

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleNotes.map((note) => (
            <FieldNoteCard key={note.id} note={note} />
          ))}
        </div>

        {!visibleNotes.length ? (
          <Card className="mt-8 bg-card/75">
            <CardContent className="p-6 text-sm text-muted-foreground">
              No published notes match this filter yet.
            </CardContent>
          </Card>
        ) : null}
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
                  problem, or planning conversation. Field Notes keeps the
                  working context close to the public project hub.
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

function FeaturedNote({ note }: { note: FieldNote }) {
  const Icon = getNoteIcon(note.category);

  return (
    <section className="border-y border-white/10 bg-white/[0.03]">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Featured note"
          title={note.title}
          description={note.excerpt}
        />
        <Card className="mt-8 bg-card/75">
          <CardContent className="grid gap-6 p-6 md:grid-cols-[auto_1fr_auto] md:items-center">
            {note.coverImage ? (
              <img
                src={note.coverImage}
                alt={note.coverImageAlt || ""}
                className="aspect-video w-full rounded-md border border-white/10 object-cover md:h-28 md:w-44"
              />
            ) : (
              <span className="flex h-12 w-12 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-primary">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
            )}
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge>{note.category}</Badge>
                <Badge variant={note.status === "published" ? "default" : "secondary"}>
                  {formatStatus(note.status)}
                </Badge>
                <Badge variant="outline">{note.readTime}</Badge>
                {note.publishedAt ? (
                  <Badge variant="outline">{formatDate(note.publishedAt)}</Badge>
                ) : null}
              </div>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Open the full note for the complete writeup.
              </p>
              {note.tags.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {note.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </div>
            <Button asChild variant="outline">
              <Link href={`/field-notes/${note.slug}`}>
                Open note
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function FieldNoteCard({ note }: { note: FieldNote }) {
  const Icon = getNoteIcon(note.category);

  return (
    <Link href={`/field-notes/${note.slug}`} className="focus-ring rounded-lg">
      <Card className="flex h-full flex-col overflow-hidden bg-card/75 hover:border-primary/25">
        {note.coverImage ? (
          <img
            src={note.coverImage}
            alt={note.coverImageAlt || ""}
            className="aspect-[16/9] w-full border-b border-white/10 object-cover"
          />
        ) : null}
        <CardContent className="flex h-full flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-primary">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <Badge variant="secondary">{note.category}</Badge>
          </div>
          <h2 className="mt-5 text-lg font-semibold">{note.title}</h2>
          <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
            {note.excerpt}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Badge variant={note.status === "published" ? "default" : "outline"}>
              {formatStatus(note.status)}
            </Badge>
            <Badge variant="outline">{note.readTime}</Badge>
            {note.publishedAt ? (
              <Badge variant="outline">{formatDate(note.publishedAt)}</Badge>
            ) : null}
            {note.featured ? <Badge variant="amber">Featured</Badge> : null}
          </div>
          {note.tags.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {note.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          ) : null}
        </CardContent>
      </Card>
    </Link>
  );
}

function formatStatus(status: FieldNote["status"]) {
  if (status === "draft") {
    return "Draft";
  }

  return status;
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

function getNoteIcon(category: FieldNoteCategory): LucideIcon {
  switch (category) {
    case "Projects":
      return Compass;
    case "Case Notes":
      return FileText;
    case "Website Notes":
      return Globe2;
    case "Bot Notes":
      return Bot;
    case "Aviation":
      return Plane;
    case "Systems":
    case "Build Logs":
    case "Gear / Tools":
      return Wrench;
    case "Project Updates":
      return Compass;
    case "Career":
    case "Career Notes":
      return Briefcase;
    case "Places":
    case "Urbex":
      return Map;
    case "Ideas":
    case "AI Experiments":
      return Lightbulb;
    case "Learning Notes":
      return FileText;
    case "Personal Notes":
    default:
      return NotebookText;
  }
}
