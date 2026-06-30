import { NextRequest, NextResponse } from "next/server";
import type { Project } from "@/data/projects";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { projectPatchToRow, rowToProject, type ProjectRow } from "@/lib/project-row";

export const dynamic = "force-dynamic";

function isAdminRequest(request: NextRequest) {
  const expectedKey = process.env.ADMIN_WRITE_KEY?.trim();
  const providedKey = request.headers.get("x-admin-key")?.trim();

  return Boolean(expectedKey && providedKey && providedKey === expectedKey);
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json({ project: rowToProject(data as ProjectRow) });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as Partial<Project>;
  const row = projectPatchToRow(body);
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("projects")
    .update(row)
    .eq("id", params.id)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ project: rowToProject(data as ProjectRow) });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createSupabaseAdminClient();

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
