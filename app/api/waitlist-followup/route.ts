export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function POST(req: NextRequest) {
  try {
    const { email, follow_up, source } = await req.json();
    if (!email || !follow_up?.trim()) {
      return NextResponse.json({ success: false }, { status: 400 });
    }
    await getSupabase().from("waitlist_feedback").insert({
      email: email.trim().toLowerCase(),
      follow_up: follow_up.trim(),
      source: source ?? null,
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
