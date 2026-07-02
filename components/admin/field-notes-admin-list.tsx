"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Archive, Edit, Plus, Trash2 } from "lucide-react";
import type { FieldNote } from "@/data/field-notes";
import {
  archiveFieldNote,
  deleteFieldNote,
  readFieldNotes
} from "@/lib/field-notes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function FieldNotesAdminList() {
  const [notes, setNotes] = useState<FieldNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [workingId, setWorkingId] = useState("");
  const [error, setError] = useState("");

  async function refreshNotes() {
    try {
      setError("");
      setLoading(true);
      setNotes(await readFieldNotes());
    } catch (noteError) {
      setNotes([]);
      setError(
        noteError instanceof Error
          ? noteError.message
          : "Could not load field notes."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshNotes();
  }, []);

  const stats = useMemo(() => {
    return {
      total: notes.length,
      published: notes.filter((note) => note.status === "published").length,
      draft: notes.filter((note) => note.status === "draft").length,
      archived: notes.filter((note) => note.status === "archived").length
    };
  }, [notes]);

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Field Notes</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Add drafts, publish public notes, or archive old entries. Published
            notes appear on /field-notes.
          </p>
        </div>

        <Button asChild className="w-fit">
          <Link href="/admin/field-notes/new">
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add field note
          </Link>
        </Button>
      </div>

      {error ? (
        <div className="rounded-lg border border-amber-400/25 bg-amber-400/10 p-4 text-sm leading-6 text-amber-100">
          {error}
        </div>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-4">
        <Stat label="Total" value={stats.total} />
        <Stat label="Published" value={stats.published} />
        <Stat label="Draft" value={stats.draft} />
        <Stat label="Archived" value={stats.archived} />
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading field notes...</p>
      ) : null}

      <div className="grid gap-4">
        {notes.map((note) => (
          <Card key={note.id} className="bg-card/75">
            <CardContent className="grid gap-4 p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="grid gap-2">
                  <h3 className="text-xl font-semibold">{note.title}</h3>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant={note.status === "published" ? "default" : "secondary"}>
                      {note.status}
                    </Badge>
                    <Badge variant="outline">{note.category}</Badge>
                    <Badge variant="outline">{note.readTime}</Badge>
                    {note.featured ? <Badge variant="amber">Featured</Badge> : null}
                  </div>

                  <p className="text-sm leading-6 text-muted-foreground">
                    {note.excerpt || "Excerpt pending."}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    /field-notes/{note.slug}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/field-notes/${note.id}/edit`}>
                      <Edit className="h-4 w-4" aria-hidden="true" />
                      Edit
                    </Link>
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={note.status === "archived" || workingId === note.id}
                    onClick={async () => {
                      setWorkingId(note.id);
                      try {
                        setError("");
                        await archiveFieldNote(note.id);
                        await refreshNotes();
                      } catch (archiveError) {
                        setError(
                          archiveError instanceof Error
                            ? archiveError.message
                            : "Could not archive field note."
                        );
                      } finally {
                        setWorkingId("");
                      }
                    }}
                  >
                    <Archive className="h-4 w-4" aria-hidden="true" />
                    Archive
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="border-red-400/30 text-red-100 hover:border-red-400/60 hover:bg-red-400/10"
                    disabled={workingId === note.id}
                    onClick={async () => {
                      if (!window.confirm(`Delete "${note.title}"?`)) {
                        return;
                      }

                      setWorkingId(note.id);
                      try {
                        setError("");
                        await deleteFieldNote(note.id);
                        await refreshNotes();
                      } catch (deleteError) {
                        setError(
                          deleteError instanceof Error
                            ? deleteError.message
                            : "Could not delete field note."
                        );
                      } finally {
                        setWorkingId("");
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {!notes.length && !loading ? (
        <Card className="bg-card/75">
          <CardContent className="p-6 text-sm text-muted-foreground">
            No field notes yet. Add your first note, save it as draft, then
            publish when it is ready.
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <Card className="bg-card/75">
      <CardContent className="p-4">
        <p className="text-2xl font-semibold">{value}</p>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </p>
      </CardContent>
    </Card>
  );
}
