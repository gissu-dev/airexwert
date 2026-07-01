import { NextRequest, NextResponse } from "next/server";

import { createSupabaseAdminClient } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

const allowedReasons = [
  "Job opportunity",
  "Automation / bot project",
  "Website project",
  "Job tool idea",
  "Aerial planning conversation",
  "General contact",
];

function clean(value: unknown) {
  return String(value ?? "").trim();
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const name = clean(body.name);
    const email = clean(body.email).toLowerCase();
    const reason = clean(body.reason);
    const message = clean(body.message);

    if (name.length < 2) {
      return NextResponse.json(
        { error: "Please enter your name." },
        { status: 400 },
      );
    }

    if (!isEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email." },
        { status: 400 },
      );
    }

    if (!allowedReasons.includes(reason)) {
      return NextResponse.json(
        { error: "Please choose a valid reason." },
        { status: 400 },
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { error: "Please add a little more context." },
        { status: 400 },
      );
    }

    const supabase = createSupabaseAdminClient();

    const { error } = await supabase.from("contact_messages").insert({
      name,
      email,
      reason,
      message,
      status: "new",
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Could not send message." },
      { status: 500 },
    );
  }
}