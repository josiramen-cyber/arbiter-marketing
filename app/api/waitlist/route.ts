import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  // TODO: persist to Supabase or forward via Resend
  console.log("Waitlist signup:", email);
  return NextResponse.json({ ok: true });
}
