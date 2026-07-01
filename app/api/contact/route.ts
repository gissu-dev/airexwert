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

const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 4000;

function clean(value: unknown) {
  return String(value ?? "").trim();
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid contact request." },
        { status: 400 },
      );
    }

    const payload = body as Record<string, unknown>;
    const name = clean(payload.name);
    const email = clean(payload.email).toLowerCase();
    const reason = clean(payload.reason);
    const message = clean(payload.message);
    const website = clean(payload.website);

    if (website) {
      return NextResponse.json({ ok: true });
    }

    if (name.length < 2 || name.length > MAX_NAME_LENGTH) {
      return NextResponse.json(
        { error: "Please enter your name." },
        { status: 400 },
      );
    }

    if (!isEmail(email) || email.length > MAX_EMAIL_LENGTH) {
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

    if (message.length < 10 || message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: "Please keep your message between 10 and 4000 characters." },
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
