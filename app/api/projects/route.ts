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

function getAdminError(request: NextRequest) {
  const expectedKey = process.env.ADMIN_WRITE_KEY?.trim();
  const providedKey = request.headers.get("x-admin-key")?.trim();

  if (!expectedKey) {
    return NextResponse.json(
      { error: "Missing ADMIN_WRITE_KEY environment variable." },
      { status: 500 },
    );
  }

  if (!providedKey || providedKey !== expectedKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}

function serverErrorResponse(error: unknown) {
  const message =
    error instanceof Error ? error.message : "Unexpected project API error.";

  return NextResponse.json({ error: message }, { status: 500 });
}

export async function GET(request: NextRequest) {
  const wantsAdmin = request.nextUrl.searchParams.get("admin") === "true";
  const adminError = getAdminError(request);
  const admin = isAdminRequest(request);

  if (wantsAdmin && adminError) {
    return adminError;
  }

  try {
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
  } catch (error) {
    return serverErrorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  const adminError = getAdminError(request);

  if (adminError) {
    return adminError;
  }

  try {
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
  } catch (error) {
    return serverErrorResponse(error);
  }
}
