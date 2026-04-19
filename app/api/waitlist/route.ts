export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const FROM = `Arbiter Legal <${process.env.SMTP_USER}>`;
const INTERNAL = "josiramen@arbiterlegal.com";

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

  // Validate email
  if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json(
      { success: false, error: "Voer een geldig e-mailadres in." },
      { status: 400 }
    );
  }

  const cleanEmail = email.trim().toLowerCase();
  const isNL = (language ?? "nl") === "nl";
  const displayName = full_name?.trim() || cleanEmail;

  // Capture request metadata
  const user_agent = req.headers.get("user-agent") ?? null;
  const forwarded = req.headers.get("x-forwarded-for");
  const ip_address = forwarded
    ? forwarded.split(",")[0].trim()
    : (req.headers.get("x-real-ip") ?? null);

  // Insert into Supabase
  const { error: dbError } = await supabase.from("waitlist_signups").insert({
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
    // Duplicate — treat as success to avoid enumeration
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

  // Send emails — non-blocking, never fails the request
  try {
    // Confirmation to user
    await transporter.sendMail({
      from: FROM,
      to: cleanEmail,
      subject: isNL
        ? "Uw aanvraag voor vroege toegang — Arbiter Legal"
        : "Your early access request — Arbiter Legal",
      html: isNL
        ? `<div style="font-family:Inter,sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;color:#0C0F14">
            <p style="font-size:12px;color:#C9A84C;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 20px">Arbiter Legal</p>
            <h1 style="font-family:Georgia,serif;font-size:26px;font-weight:500;margin:0 0 16px;line-height:1.3">
              Aanvraag ontvangen, ${displayName}.
            </h1>
            <p style="font-size:15px;line-height:1.7;color:#6B7A8D;margin:0 0 12px">
              Wij hebben uw aanvraag voor vroege toegang ontvangen. U staat op de private beta-lijst.
            </p>
            <p style="font-size:15px;line-height:1.7;color:#6B7A8D;margin:0 0 28px">
              We nemen binnen <strong style="color:#0C0F14">24 uur</strong> contact met u op.
              Tot die tijd kunt u gewoon op deze e-mail antwoorden met vragen.
            </p>
            <hr style="border:none;border-top:1px solid #E5E4DE;margin:0 0 20px"/>
            <p style="font-size:12px;color:#9CA3AF;margin:0;font-style:italic">
              Minder administratie. Betere praktijk.
            </p>
          </div>`
        : `<div style="font-family:Inter,sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;color:#0C0F14">
            <p style="font-size:12px;color:#C9A84C;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 20px">Arbiter Legal</p>
            <h1 style="font-family:Georgia,serif;font-size:26px;font-weight:500;margin:0 0 16px;line-height:1.3">
              Request received, ${displayName}.
            </h1>
            <p style="font-size:15px;line-height:1.7;color:#6B7A8D;margin:0 0 12px">
              We've received your early access request. You're on the private beta list.
            </p>
            <p style="font-size:15px;line-height:1.7;color:#6B7A8D;margin:0 0 28px">
              We'll be in touch within <strong style="color:#0C0F14">24 hours</strong>.
              In the meantime, just reply to this email with any questions.
            </p>
            <hr style="border:none;border-top:1px solid #E5E4DE;margin:0 0 20px"/>
            <p style="font-size:12px;color:#9CA3AF;margin:0;font-style:italic">
              Less admin. Better practice.
            </p>
          </div>`,
    });

    // Internal notification
    await transporter.sendMail({
      from: FROM,
      to: INTERNAL,
      subject: `Nieuwe aanmelding — ${cleanEmail}`,
      html: `<div style="font-family:monospace;font-size:13px;padding:24px;color:#0C0F14;max-width:480px">
        <p style="font-weight:bold;margin:0 0 16px">Nieuwe Arbiter Legal waitlist aanmelding</p>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:5px 20px 5px 0;color:#6B7A8D;white-space:nowrap">E-mail</td><td>${cleanEmail}</td></tr>
          <tr><td style="padding:5px 20px 5px 0;color:#6B7A8D">Naam</td><td>${full_name ?? "—"}</td></tr>
          <tr><td style="padding:5px 20px 5px 0;color:#6B7A8D">Kantoor</td><td>${firm_name ?? "—"}</td></tr>
          <tr><td style="padding:5px 20px 5px 0;color:#6B7A8D">Rechtsgebied</td><td>${practice_area ?? "—"}</td></tr>
          <tr><td style="padding:5px 20px 5px 0;color:#6B7A8D">Kantoorgrootte</td><td>${firm_size ?? "—"}</td></tr>
          <tr><td style="padding:5px 20px 5px 0;color:#6B7A8D">Taal</td><td>${language ?? "nl"}</td></tr>
          <tr><td style="padding:5px 20px 5px 0;color:#6B7A8D">IP</td><td>${ip_address ?? "—"}</td></tr>
        </table>
      </div>`,
    });
  } catch (emailErr) {
    console.error("[waitlist] SMTP error:", emailErr);
  }

  return NextResponse.json({
    success: true,
    message: isNL
      ? "Aanvraag ontvangen. Check uw inbox voor een bevestiging."
      : "Request received. Check your inbox for a confirmation.",
  });
}
