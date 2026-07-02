import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { seedFieldNotes, type FieldNote } from "@/data/field-notes";
import { rowToFieldNote, type FieldNoteRow } from "@/lib/field-note-row";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

type FieldNotePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params
}: FieldNotePageProps) {
  const { slug } = await params;
  const note = await findPublicFieldNoteBySlug(slug);

  if (!note) {
    return {
      title: "Field Note Not Found | WertWorks"
    };
  }

  return {
    title: `${note.title} | Field Notes`,
    description: note.excerpt,
    openGraph: {
      title: `${note.title} | Field Notes`,
      description: note.excerpt,
      images: note.coverImage
        ? [
            {
              url: note.coverImage,
              alt: note.coverImageAlt || note.title
            }
          ]
        : undefined
    }
  };
}

export default async function FieldNotePage({
  params
}: FieldNotePageProps) {
  const { slug } = await params;
  const note = await findPublicFieldNoteBySlug(slug);

  if (!note) {
    notFound();
  }

  return (
    <article className="section-shell">
      <Button asChild variant="ghost" className="mb-8 w-fit">
        <Link href="/field-notes">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Field Notes
        </Link>
      </Button>

      <div className="max-w-4xl">
        <div className="flex flex-wrap gap-2">
          <Badge>{note.category}</Badge>
          <Badge variant={note.status === "published" ? "default" : "secondary"}>
            {note.status === "published" ? "Published" : "Draft"}
          </Badge>
          <Badge variant="outline">{note.readTime}</Badge>
          {note.publishedAt ? (
            <Badge variant="outline">{formatDate(note.publishedAt)}</Badge>
          ) : null}
        </div>

        <h1 className="mt-5 text-balance text-4xl font-semibold tracking-normal sm:text-5xl">
          {note.title}
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
          {note.excerpt}
        </p>
      </div>

      {note.coverImage ? (
        <div className="mt-10 overflow-hidden rounded-lg border border-white/10 bg-card/75">
          <img
            src={note.coverImage}
            alt={note.coverImageAlt || ""}
            className="aspect-[16/9] w-full object-cover"
          />
        </div>
      ) : null}

      {note.tags.length ? (
        <div className="mt-8 flex flex-wrap gap-2">
          {note.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      ) : null}

      <Card className="mt-10 bg-card/75">
        <CardContent className="grid gap-5 p-6 text-base leading-8 text-muted-foreground">
          {formatContent(note.content).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </CardContent>
      </Card>
    </article>
  );
}

async function findPublicFieldNoteBySlug(slug: string): Promise<FieldNote | null> {
  try {
    const supabase = createSupabaseAdminClient();

    const { data, error } = await supabase
      .from("field_notes")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (!error && data) {
      return rowToFieldNote(data as FieldNoteRow);
    }
  } catch {
    // Fall back to local seed notes if Supabase is not configured yet.
  }

  return seedFieldNotes.find((note) => note.slug === slug) ?? null;
}

function formatContent(content: string) {
  const paragraphs = content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return paragraphs.length
    ? paragraphs
    : ["Content is not available for this field note yet."];
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(date);
}
