import { NextRequest, NextResponse } from "next/server";
import type { Project } from "@/data/projects";
import { getCurrentAdmin } from "@/lib/admin-auth";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { projectPatchToRow, rowToProject, type ProjectRow } from "@/lib/project-row";

export const dynamic = "force-dynamic";

type ProjectRouteContext = {
  params: Promise<{ id: string }>;
};

async function getAdminError() {
  try {
    const admin = await getCurrentAdmin();

    return admin
      ? null
      : NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not verify admin session.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function serverErrorResponse(error: unknown) {
  const message =
    error instanceof Error ? error.message : "Unexpected project API error.";

  return NextResponse.json({ error: message }, { status: 500 });
}

export async function GET(
  _request: NextRequest,
  { params }: ProjectRouteContext,
) {
  const adminError = await getAdminError();

  if (adminError) {
    return adminError;
  }

  try {
    const { id } = await params;
    const supabase = createSupabaseAdminClient();

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json({ project: rowToProject(data as ProjectRow) });
  } catch (error) {
    return serverErrorResponse(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: ProjectRouteContext,
) {
  const adminError = await getAdminError();

  if (adminError) {
    return adminError;
  }

  try {
    const { id } = await params;
    const body = (await request.json()) as Partial<Project>;
    const row = projectPatchToRow(body);
    const supabase = createSupabaseAdminClient();

    const { data, error } = await supabase
      .from("projects")
      .update(row)
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ project: rowToProject(data as ProjectRow) });
  } catch (error) {
    return serverErrorResponse(error);
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: ProjectRouteContext,
) {
  const adminError = await getAdminError();

  if (adminError) {
    return adminError;
  }

  try {
    const { id } = await params;
    const supabase = createSupabaseAdminClient();

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return serverErrorResponse(error);
  }
}
