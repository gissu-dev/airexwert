import type { FieldNote } from "@/data/field-notes";

export type FieldNoteRow = {
  id: string;
  title: string;
  slug: string;
  category: FieldNote["category"];
  status: FieldNote["status"];
  featured: boolean;
  excerpt: string;
  content: string;
  tags: string[];
  read_time: string;
  published_at: string | null;
  cover_image: string | null;
  cover_image_alt: string | null;
  created_at: string;
  updated_at: string;
};

export function rowToFieldNote(row: FieldNoteRow): FieldNote {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category,
    status: row.status,
    featured: row.featured,
    excerpt: row.excerpt,
    content: row.content,
    tags: row.tags ?? [],
    readTime: row.read_time,
    publishedAt: row.published_at ?? "",
    coverImage: row.cover_image ?? "",
    coverImageAlt: row.cover_image_alt ?? "",
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export function fieldNoteToRow(note: FieldNote) {
  return {
    id: note.id || undefined,
    title: note.title,
    slug: note.slug,
    category: note.category,
    status: note.status,
    featured: note.featured,
    excerpt: note.excerpt,
    content: note.content,
    tags: note.tags,
    read_time: note.readTime,
    published_at: note.publishedAt || null,
    cover_image: note.coverImage || null,
    cover_image_alt: note.coverImageAlt || null
  };
}

export function fieldNotePatchToRow(note: Partial<FieldNote>) {
  const row: Record<string, unknown> = {};

  if (note.title !== undefined) row.title = note.title;
  if (note.slug !== undefined) row.slug = note.slug;
  if (note.category !== undefined) row.category = note.category;
  if (note.status !== undefined) row.status = note.status;
  if (note.featured !== undefined) row.featured = note.featured;
  if (note.excerpt !== undefined) row.excerpt = note.excerpt;
  if (note.content !== undefined) row.content = note.content;
  if (note.tags !== undefined) row.tags = note.tags;
  if (note.readTime !== undefined) row.read_time = note.readTime;
  if (note.publishedAt !== undefined) row.published_at = note.publishedAt || null;
  if (note.coverImage !== undefined) row.cover_image = note.coverImage || null;
  if (note.coverImageAlt !== undefined) row.cover_image_alt = note.coverImageAlt || null;

  return row;
}
