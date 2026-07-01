import { NextRequest, NextResponse } from "next/server";
import type { Project } from "@/data/projects";
import { getCurrentAdmin } from "@/lib/admin-auth";
import { normalizeProject } from "@/lib/projects";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { projectToRow, rowToProject, type ProjectRow } from "@/lib/project-row";

export const dynamic = "force-dynamic";

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
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (!wantsAdmin) {
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
  const adminError = await getAdminError();

  if (adminError) {
    return adminError;
  }

  try {
    const project = normalizeProject((await request.json()) as Partial<Project>);
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
