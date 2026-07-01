import { NextRequest, NextResponse } from "next/server";
import type { FieldNote } from "@/data/field-notes";
import { getCurrentAdmin } from "@/lib/admin-auth";
import {
  fieldNotePatchToRow,
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

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const adminError = await getAdminError();

  if (adminError) {
    return adminError;
  }

  try {
    const supabase = createSupabaseAdminClient();

    const { data, error } = await supabase
      .from("field_notes")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json({
      fieldNote: rowToFieldNote(data as FieldNoteRow)
    });
  } catch (error) {
    return serverErrorResponse(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const adminError = await getAdminError();

  if (adminError) {
    return adminError;
  }

  try {
    const body = (await request.json()) as Partial<FieldNote>;
    const row = fieldNotePatchToRow(body);
    const supabase = createSupabaseAdminClient();

    const { data, error } = await supabase
      .from("field_notes")
      .update(row)
      .eq("id", params.id)
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

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const adminError = await getAdminError();

  if (adminError) {
    return adminError;
  }

  try {
    const supabase = createSupabaseAdminClient();

    const { error } = await supabase
      .from("field_notes")
      .delete()
      .eq("id", params.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return serverErrorResponse(error);
  }
}
