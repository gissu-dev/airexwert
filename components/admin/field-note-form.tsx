"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Save } from "lucide-react";
import {
  fieldNoteCategories,
  fieldNoteStatuses,
  type FieldNote
} from "@/data/field-notes";
import {
  createEmptyFieldNote,
  findFieldNoteById,
  formatListInput,
  parseListInput,
  saveFieldNote
} from "@/lib/field-notes";
import { slugify } from "@/lib/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type FieldNoteFormProps = {
  fieldNoteId?: string;
};

export function FieldNoteForm({ fieldNoteId }: FieldNoteFormProps) {
  const router = useRouter();
  const [note, setNote] = useState<FieldNote>(() => createEmptyFieldNote());
  const [tagsText, setTagsText] = useState("");
  const [loaded, setLoaded] = useState(!fieldNoteId);
  const [notFound, setNotFound] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const mode = fieldNoteId ? "edit" : "new";

  const previewTags = useMemo(() => parseListInput(tagsText), [tagsText]);

  const contentPreview = useMemo(
    () => createContentPreview(note.content),
    [note.content]
  );

  useEffect(() => {
    if (!fieldNoteId) {
      return;
    }

    const currentFieldNoteId = fieldNoteId;

    async function loadFieldNote() {
      try {
        const existing = await findFieldNoteById(currentFieldNoteId);

        if (!existing) {
          setNotFound(true);
          return;
        }

        setNote(existing);
        setTagsText(formatListInput(existing.tags));
      } catch {
        setError("Could not load this field note. Log in again and retry.");
      } finally {
        setLoaded(true);
      }
    }

    loadFieldNote();
  }, [fieldNoteId]);

  const timestampLabel = useMemo(() => {
    if (mode === "new") {
      return "Timestamps will be created on save.";
    }

    return `Created ${formatTimestamp(note.createdAt)}. Updated ${formatTimestamp(
      note.updatedAt
    )}.`;
  }, [mode, note.createdAt, note.updatedAt]);

  if (!loaded) {
    return <p className="text-sm text-muted-foreground">Loading field note...</p>;
  }

  if (notFound) {
    return (
      <Card className="bg-card/75">
        <CardContent className="grid gap-4 p-6">
          <h2 className="text-2xl font-semibold">Field note not found</h2>
          <p className="text-sm text-muted-foreground">
            This field note does not exist, or your admin session expired.
          </p>
          <Button asChild variant="outline">
            <Link href="/admin/field-notes">Back to field notes</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <form
      className="grid gap-6"
      onSubmit={async (event) => {
        event.preventDefault();
        setError("");
        setSaving(true);

        try {
          const nextPublishedAt =
            note.status === "published" && !note.publishedAt
              ? new Date().toISOString()
              : note.publishedAt;

          const saved = await saveFieldNote({
            ...note,
            slug: note.slug || slugify(note.title),
            tags: parseListInput(tagsText),
            publishedAt: nextPublishedAt
          });

          setNote(saved);
          setTagsText(formatListInput(saved.tags));
          router.push(`/admin/field-notes/${saved.id}/edit`);
          router.refresh();
        } catch (saveError) {
          setError(
            saveError instanceof Error
              ? saveError.message
              : "Could not save field note."
          );
        } finally {
          setSaving(false);
        }
      }}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            <Badge>{note.status}</Badge>
            <Badge variant="outline">{note.category}</Badge>
            {note.featured ? <Badge variant="amber">Featured</Badge> : null}
          </div>

          <h2 className="text-2xl font-semibold">
            {mode === "new" ? "New field note" : "Edit field note"}
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Drafts stay private. Published notes appear on /field-notes and can
            open as individual note pages.
          </p>

          {error ? <p className="mt-3 text-sm text-amber-300">{error}</p> : null}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] xl:items-start">
        <div className="grid gap-6">
          <Card className="bg-card/75">
            <CardHeader>
              <CardTitle>Note basics</CardTitle>
            </CardHeader>

            <CardContent className="grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Title" htmlFor="title">
                  <Input
                    id="title"
                    value={note.title}
                    placeholder="Field note title"
                    required
                    onChange={(event) => {
                      const title = event.target.value;

                      setNote((current) => ({
                        ...current,
                        title,
                        slug: current.slug || slugify(title)
                      }));
                    }}
                  />
                </Field>

                <Field label="Slug" htmlFor="slug">
                  <Input
                    id="slug"
                    value={note.slug}
                    placeholder="field-note-slug"
                    onChange={(event) =>
                      setNote((current) => ({
                        ...current,
                        slug: slugify(event.target.value)
                      }))
                    }
                  />
                </Field>
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                <Field label="Category" htmlFor="category">
                  <Select
                    id="category"
                    value={note.category}
                    onChange={(event) =>
                      setNote((current) => ({
                        ...current,
                        category: event.target.value as FieldNote["category"]
                      }))
                    }
                  >
                    {fieldNoteCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </Select>
                </Field>

                <Field label="Status" htmlFor="status">
                  <Select
                    id="status"
                    value={note.status}
                    onChange={(event) =>
                      setNote((current) => ({
                        ...current,
                        status: event.target.value as FieldNote["status"]
                      }))
                    }
                  >
                    {fieldNoteStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </Select>
                </Field>

                <Field label="Read time" htmlFor="readTime">
                  <Input
                    id="readTime"
                    value={note.readTime}
                    placeholder="4 min"
                    onChange={(event) =>
                      setNote((current) => ({
                        ...current,
                        readTime: event.target.value
                      }))
                    }
                  />
                </Field>

                <Field label="Published date" htmlFor="publishedAt">
                  <Input
                    id="publishedAt"
                    type="date"
                    value={formatDateInput(note.publishedAt)}
                    onChange={(event) =>
                      setNote((current) => ({
                        ...current,
                        publishedAt: event.target.value
                          ? new Date(`${event.target.value}T12:00:00.000Z`).toISOString()
                          : ""
                      }))
                    }
                  />
                </Field>
              </div>

              <label className="flex items-center gap-3 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  checked={note.featured}
                  onChange={(event) =>
                    setNote((current) => ({
                      ...current,
                      featured: event.target.checked
                    }))
                  }
                />
                Featured field note
              </label>

              <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] md:items-end">
                <Field label="Cover image URL/path" htmlFor="coverImage">
                  <Input
                    id="coverImage"
                    value={note.coverImage}
                    placeholder="/images/field-notes/example.jpg"
                    onChange={(event) =>
                      setNote((current) => ({
                        ...current,
                        coverImage: event.target.value
                      }))
                    }
                  />
                </Field>

                <Field label="Cover image alt text" htmlFor="coverImageAlt">
                  <Input
                    id="coverImageAlt"
                    value={note.coverImageAlt}
                    placeholder="Describe the cover image"
                    onChange={(event) =>
                      setNote((current) => ({
                        ...current,
                        coverImageAlt: event.target.value
                      }))
                    }
                  />
                </Field>

                <Button
                  type="button"
                  variant="outline"
                  disabled={!note.coverImage && !note.coverImageAlt}
                  onClick={() =>
                    setNote((current) => ({
                      ...current,
                      coverImage: "",
                      coverImageAlt: ""
                    }))
                  }
                >
                  Remove cover
                </Button>
              </div>

              <Field label="Excerpt" htmlFor="excerpt">
                <Textarea
                  id="excerpt"
                  value={note.excerpt}
                  placeholder="Short card description."
                  required
                  onChange={(event) =>
                    setNote((current) => ({
                      ...current,
                      excerpt: event.target.value
                    }))
                  }
                />
              </Field>
            </CardContent>
          </Card>

          <Card className="bg-card/75">
            <CardHeader>
              <CardTitle>Note content</CardTitle>
            </CardHeader>

            <CardContent className="grid gap-5">
              <Field label="Content" htmlFor="content">
                <Textarea
                  id="content"
                  className="min-h-[320px]"
                  value={note.content}
                  placeholder="Write the note here. Separate paragraphs with a blank line."
                  required
                  onChange={(event) =>
                    setNote((current) => ({
                      ...current,
                      content: event.target.value
                    }))
                  }
                />
              </Field>

              <Field label="Tags" htmlFor="tags">
                <Textarea
                  id="tags"
                  value={tagsText}
                  placeholder={"WertWorks\nBuild log\nAutomation"}
                  onChange={(event) => setTagsText(event.target.value)}
                />
                <p className="text-xs text-muted-foreground">One tag per line.</p>
              </Field>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card/75 xl:sticky xl:top-24">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-primary" aria-hidden="true" />
              <CardTitle>Live preview</CardTitle>
            </div>
          </CardHeader>

          <CardContent>
            <div className="rounded-lg border border-white/10 bg-background/40 p-5">
              {note.coverImage ? (
                <div className="mb-5 overflow-hidden rounded-md border border-white/10 bg-white/[0.03]">
                  <img
                    src={note.coverImage}
                    alt={note.coverImageAlt || "Field note cover preview"}
                    className="aspect-[16/9] w-full object-cover"
                  />
                </div>
              ) : null}

              <div className="flex flex-wrap gap-2">
                <Badge>{note.category}</Badge>
                <Badge variant={note.status === "published" ? "default" : "secondary"}>
                  {formatStatus(note.status)}
                </Badge>
                <Badge variant="outline">{note.readTime || "Read time needed"}</Badge>
                {note.featured ? <Badge variant="amber">Featured</Badge> : null}
              </div>

              <h3 className="mt-5 text-2xl font-semibold">
                {note.title || "Untitled field note"}
              </h3>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {note.excerpt || "User content needed."}
              </p>

              {previewTags.length ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {previewTags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              ) : null}

              <div className="mt-6 rounded-md border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Content preview
                </p>
                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-muted-foreground">
                  {contentPreview}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-muted-foreground">{timestampLabel}</p>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button asChild variant="outline">
            <Link href="/admin/field-notes">Cancel</Link>
          </Button>

          <Button type="submit" disabled={saving}>
            <Save className="h-4 w-4" aria-hidden="true" />
            {saving ? "Saving..." : "Save field note"}
          </Button>
        </div>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}

function formatTimestamp(value: string) {
  if (!value) {
    return "unknown";
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

function formatDateInput(value: string) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toISOString().slice(0, 10);
}

function formatStatus(status: FieldNote["status"]) {
  if (status === "draft") {
    return "Draft";
  }

  return status;
}

function createContentPreview(content: string) {
  const trimmed = content.trim();

  if (!trimmed) {
    return "User content needed.";
  }

  return trimmed.length > 420 ? `${trimmed.slice(0, 420).trim()}...` : trimmed;
}
