import {
  fieldNoteCategories,
  fieldNoteStatuses,
  seedFieldNotes,
  type FieldNote,
  type FieldNoteCategory,
  type FieldNoteStatus
} from "@/data/field-notes";
import { slugify } from "@/lib/projects";

type FieldNoteInput = Omit<FieldNote, "id" | "createdAt" | "updatedAt"> & {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type FieldNoteFilter = FieldNoteCategory | "All";

export async function readFieldNotes(): Promise<FieldNote[]> {
  const response = await fetch("/api/field-notes?admin=true", {
    cache: "no-store"
  });

  if (!response.ok) {
    throw await createFieldNotesError(response, "Could not load field notes.");
  }

  const data = await response.json();
  return data.fieldNotes ?? [];
}

export async function readPublicFieldNotes(): Promise<FieldNote[]> {
  try {
    const response = await fetch("/api/field-notes", {
      cache: "no-store"
    });

    if (!response.ok) {
      return cloneFieldNotes(seedFieldNotes).filter(
        (note) => note.status === "published"
      );
    }

    const data = await response.json();
    return (data.fieldNotes ?? []).filter(
      (note: FieldNote) => note.id !== "keystone-aerial-services-roadmap"
    );
  } catch {
    return cloneFieldNotes(seedFieldNotes).filter(
      (note) => note.status === "published"
    );
  }
}

export async function saveFieldNote(input: FieldNoteInput): Promise<FieldNote> {
  const now = new Date().toISOString();
  const normalized = normalizeFieldNote({
    ...input,
    id: input.id || createFieldNoteId(),
    slug: input.slug || slugify(input.title),
    createdAt: input.createdAt ?? now,
    updatedAt: now
  });

  const response = await fetch("/api/field-notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(normalized)
  });

  if (!response.ok) {
    throw await createFieldNotesError(response, "Could not save field note.");
  }

  const data = await response.json();
  return data.fieldNote;
}

export async function findFieldNoteById(id: string) {
  const response = await fetch(`/api/field-notes/${id}`, {
    cache: "no-store"
  });

  if (!response.ok) {
    return undefined;
  }

  const data = await response.json();
  return data.fieldNote as FieldNote;
}

export async function archiveFieldNote(id: string) {
  await updateFieldNoteStatus(id, "archived");
}

export async function updateFieldNoteStatus(id: string, status: FieldNoteStatus) {
  const response = await fetch(`/api/field-notes/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ status })
  });

  if (!response.ok) {
    throw await createFieldNotesError(response, "Could not update field note.");
  }
}

export async function deleteFieldNote(id: string) {
  const response = await fetch(`/api/field-notes/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw await createFieldNotesError(response, "Could not delete field note.");
  }
}

export function createEmptyFieldNote(): FieldNote {
  const now = new Date().toISOString();

  return {
    id: "",
    title: "",
    slug: "",
    category: "Build Logs",
    status: "draft",
    featured: false,
    excerpt: "",
    content: "",
    tags: [],
    readTime: "4 min",
    publishedAt: "",
    coverImage: "",
    coverImageAlt: "",
    createdAt: now,
    updatedAt: now
  };
}

export function getPublishedFieldNotes(notes: FieldNote[]) {
  return notes.filter((note) => note.status === "published");
}

export function getFieldNoteCategories(notes: FieldNote[]) {
  const categories = new Set(notes.map((note) => note.category));

  return ["All", ...fieldNoteCategories.filter((category) => categories.has(category))];
}

export function parseListInput(value: string) {
  return value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function formatListInput(value: string[]) {
  return value.join("\n");
}

export function normalizeFieldNote(note: Partial<FieldNote>): FieldNote {
  const now = new Date().toISOString();
  const title = String(note.title ?? "");
  const category = normalizeFieldNoteCategory(note.category);
  const status = fieldNoteStatuses.includes(note.status as FieldNoteStatus)
    ? (note.status as FieldNoteStatus)
    : "draft";

  return {
    id: String(note.id || createFieldNoteId()),
    title,
    slug: String(note.slug || slugify(title) || note.id || createFieldNoteId()),
    category,
    status,
    featured: Boolean(note.featured),
    excerpt: String(note.excerpt ?? ""),
    content: String(note.content ?? ""),
    tags: Array.isArray(note.tags) ? note.tags.map(String) : [],
    readTime: String(note.readTime ?? "4 min"),
    publishedAt: String(note.publishedAt ?? ""),
    coverImage: String(note.coverImage ?? ""),
    coverImageAlt: String(note.coverImageAlt ?? ""),
    createdAt: String(note.createdAt ?? now),
    updatedAt: String(note.updatedAt ?? now)
  };
}

function normalizeFieldNoteCategory(category: unknown): FieldNoteCategory {
  if (fieldNoteCategories.includes(category as FieldNoteCategory)) {
    return category as FieldNoteCategory;
  }

  return "Build Logs";
}

function createFieldNoteId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `field-note-${Date.now()}`;
}

async function createFieldNotesError(response: Response, fallback: string) {
  if (response.status === 401) {
    return new Error("Admin login required. Log in again and retry.");
  }

  try {
    const data = await response.json();
    const detail = typeof data.error === "string" ? data.error : "";

    if (detail) {
      return new Error(`${fallback} ${detail}`);
    }
  } catch {
    // Fall through to generic message.
  }

  return new Error(fallback);
}

function cloneFieldNotes(notes: FieldNote[]) {
  return notes.map((note) => ({
    ...note,
    tags: [...note.tags],
    coverImage: note.coverImage ?? "",
    coverImageAlt: note.coverImageAlt ?? ""
  }));
}
