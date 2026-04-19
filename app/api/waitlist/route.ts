export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const INTERNAL = "josiramen@arbiterlegal.com";

async function sendMail(opts: {
  to: string;
  subject: string;
  html: string;
}) {
  const { default: nodemailer } = await import("nodemailer");
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  await transporter.sendMail({
    from: `Arbiter Legal <${process.env.SMTP_USER}>`,
    ...opts,
  });
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 });
  }

  const { email, full_name, firm_name, practice_area, firm_size, language, source } = body as {
    email?: string;
    full_name?: string;
    firm_name?: string;
    practice_area?: string;
    firm_size?: string;
    source?: string;
    language?: string;
  };

  if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json(
      { success: false, error: "Voer een geldig e-mailadres in." },
      { status: 400 }
    );
  }

  const cleanEmail = email.trim().toLowerCase();
  const isNL = (language ?? "nl") === "nl";
  const displayName = full_name?.trim() || cleanEmail;

  const user_agent = req.headers.get("user-agent") ?? null;
  const forwarded = req.headers.get("x-forwarded-for");
  const ip_address = forwarded
    ? forwarded.split(",")[0].trim()
    : (req.headers.get("x-real-ip") ?? null);

  const { error: dbError } = await getSupabase().from("waitlist_signups").insert({
    email: cleanEmail,
    full_name: full_name?.trim() ?? null,
    firm_name: firm_name?.trim() ?? null,
    practice_area: practice_area?.trim() ?? null,
    firm_size: firm_size?.trim() ?? null,
    language: language ?? "nl",
    source: source ?? null,
    user_agent,
    ip_address,
  });

  if (dbError) {
    if (dbError.code === "23505") {
      return NextResponse.json({
        success: true,
        message: "U staat al op de lijst. We nemen snel contact op.",
      });
    }
    console.error("[waitlist] Supabase error:", dbError);
    return NextResponse.json(
      { success: false, error: "Er is een fout opgetreden. Probeer het opnieuw." },
      { status: 400 }
    );
  }

  // Non-blocking emails — signup is already saved
  Promise.all([
    sendMail({
      to: cleanEmail,
      subject: isNL
        ? "Uw aanvraag voor vroege toegang — Arbiter Legal"
        : "Your early access request — Arbiter Legal",
      html: isNL
        ? `<div style="font-family:Inter,sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;color:#0C0F14">
            <p style="font-size:12px;color:#C9A84C;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 20px">Arbiter Legal</p>
            <h1 style="font-family:Georgia,serif;font-size:26px;font-weight:500;margin:0 0 16px;line-height:1.3">Aanvraag ontvangen, ${displayName}.</h1>
            <p style="font-size:15px;line-height:1.7;color:#6B7A8D;margin:0 0 12px">Wij hebben uw aanvraag voor vroege toegang ontvangen. U staat op de private beta-lijst.</p>
            <p style="font-size:15px;line-height:1.7;color:#6B7A8D;margin:0 0 28px">We nemen binnen <strong style="color:#0C0F14">24 uur</strong> contact met u op.</p>
            <hr style="border:none;border-top:1px solid #E5E4DE;margin:0 0 20px"/>
            <p style="font-size:12px;color:#9CA3AF;margin:0;font-style:italic">Minder administratie. Betere praktijk.</p>
          </div>`
        : `<div style="font-family:Inter,sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;color:#0C0F14">
            <p style="font-size:12px;color:#C9A84C;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 20px">Arbiter Legal</p>
            <h1 style="font-family:Georgia,serif;font-size:26px;font-weight:500;margin:0 0 16px;line-height:1.3">Request received, ${displayName}.</h1>
            <p style="font-size:15px;line-height:1.7;color:#6B7A8D;margin:0 0 12px">You're on the private beta list. We'll be in touch within <strong style="color:#0C0F14">24 hours</strong>.</p>
            <hr style="border:none;border-top:1px solid #E5E4DE;margin:0 0 20px"/>
            <p style="font-size:12px;color:#9CA3AF;margin:0;font-style:italic">Less admin. Better practice.</p>
          </div>`,
    }),
    sendMail({
      to: INTERNAL,
      subject: `Nieuwe aanmelding — ${cleanEmail}`,
      html: `<div style="font-family:monospace;font-size:13px;padding:24px;color:#0C0F14;max-width:480px">
        <p style="font-weight:bold;margin:0 0 16px">Nieuwe Arbiter Legal waitlist aanmelding</p>
        <table style="border-collapse:collapse">
          <tr><td style="padding:4px 20px 4px 0;color:#6B7A8D">Email</td><td>${cleanEmail}</td></tr>
          <tr><td style="padding:4px 20px 4px 0;color:#6B7A8D">Naam</td><td>${full_name ?? "—"}</td></tr>
          <tr><td style="padding:4px 20px 4px 0;color:#6B7A8D">Kantoor</td><td>${firm_name ?? "—"}</td></tr>
          <tr><td style="padding:4px 20px 4px 0;color:#6B7A8D">Rechtsgebied</td><td>${practice_area ?? "—"}</td></tr>
          <tr><td style="padding:4px 20px 4px 0;color:#6B7A8D">Grootte</td><td>${firm_size ?? "—"}</td></tr>
          <tr><td style="padding:4px 20px 4px 0;color:#6B7A8D">Bron</td><td>${source ?? "main-site"}</td></tr>
          <tr><td style="padding:4px 20px 4px 0;color:#6B7A8D">IP</td><td>${ip_address ?? "—"}</td></tr>
        </table>
      </div>`,
    }),
  ]).catch((err) => console.error("[waitlist] SMTP error:", err));

  return NextResponse.json({
    success: true,
    message: isNL
      ? "Aanvraag ontvangen. Check uw inbox voor een bevestiging."
      : "Request received. Check your inbox for a confirmation.",
  });
}
