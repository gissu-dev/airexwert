import { NextRequest, NextResponse } from "next/server";
import type { Project } from "@/data/projects";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { projectToRow, rowToProject, type ProjectRow } from "@/lib/project-row";

export const dynamic = "force-dynamic";

function isAdminRequest(request: NextRequest) {
  const expectedKey = process.env.ADMIN_WRITE_KEY?.trim();
  const providedKey = request.headers.get("x-admin-key")?.trim();

  return Boolean(expectedKey && providedKey && providedKey === expectedKey);
}

export async function GET(request: NextRequest) {
  const wantsAdmin = request.nextUrl.searchParams.get("admin") === "true";
  const admin = isAdminRequest(request);

  if (wantsAdmin && !admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createSupabaseAdminClient();

  let query = supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (!admin) {
    query = query.eq("status", "published");
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    projects: ((data ?? []) as ProjectRow[]).map(rowToProject),
  });
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const project = (await request.json()) as Project;
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("projects")
    .upsert(projectToRow(project), { onConflict: "id" })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ project: rowToProject(data as ProjectRow) });
}
