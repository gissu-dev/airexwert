import { NextRequest, NextResponse } from "next/server";
import { seedFieldNotes, type FieldNote } from "@/data/field-notes";
import { getCurrentAdmin } from "@/lib/admin-auth";
import {
  fieldNoteToRow,
  rowToFieldNote,
  type FieldNoteRow
} from "@/lib/field-note-row";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

async function getAdminError() {
  try {
    const admin = await getCurrentAdmin();

    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return null;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not verify admin session.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function serverErrorResponse(error: unknown) {
  const message =
    error instanceof Error ? error.message : "Unexpected field notes API error.";

  return NextResponse.json({ error: message }, { status: 500 });
}

export async function GET(request: NextRequest) {
  const wantsAdmin = request.nextUrl.searchParams.get("admin") === "true";

  if (wantsAdmin) {
    const adminError = await getAdminError();

    if (adminError) {
      return adminError;
    }
  }

  try {
    const supabase = createSupabaseAdminClient();

    let query = supabase
      .from("field_notes")
      .select("*")
      .order("featured", { ascending: false })
      .order("published_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false });

    if (!wantsAdmin) {
      query = query.eq("status", "published");
    }

    const { data, error } = await query;

    if (error) {
      if (!wantsAdmin) {
        return NextResponse.json({ fieldNotes: seedFieldNotes });
      }

      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      fieldNotes: ((data ?? []) as FieldNoteRow[]).map(rowToFieldNote)
    });
  } catch (error) {
    if (!wantsAdmin) {
      return NextResponse.json({ fieldNotes: seedFieldNotes });
    }

    return serverErrorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  const adminError = await getAdminError();

  if (adminError) {
    return adminError;
  }

  try {
    const fieldNote = (await request.json()) as FieldNote;
    const supabase = createSupabaseAdminClient();

    const { data, error } = await supabase
      .from("field_notes")
      .upsert(fieldNoteToRow(fieldNote), { onConflict: "id" })
      .select("*")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      fieldNote: rowToFieldNote(data as FieldNoteRow)
    });
  } catch (error) {
    return serverErrorResponse(error);
  }
}
