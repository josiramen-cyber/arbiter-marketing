import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const INTERNAL_EMAIL = "josiramen@arbiterlegal.com";
const FROM_EMAIL = "Arbiter Legal <noreply@arbiterlegal.com>";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const { email, full_name, firm_name, practice_area, firm_size, language } = body as {
    email?: string;
    full_name?: string;
    firm_name?: string;
    practice_area?: string;
    firm_size?: string;
    language?: string;
  };

  // --- Validation ---
  if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ success: false, error: "Voer een geldig e-mailadres in." }, { status: 400 });
  }

  // --- Collect request metadata ---
  const user_agent = req.headers.get("user-agent") ?? null;
  const forwarded = req.headers.get("x-forwarded-for");
  const ip_address = forwarded ? forwarded.split(",")[0].trim() : (req.headers.get("x-real-ip") ?? null);

  // --- Insert into Supabase ---
  const { error: dbError } = await supabase.from("waitlist_signups").insert({
    email: email.trim().toLowerCase(),
    full_name: full_name?.trim() ?? null,
    firm_name: firm_name?.trim() ?? null,
    practice_area: practice_area?.trim() ?? null,
    firm_size: firm_size?.trim() ?? null,
    language: language ?? "nl",
    user_agent,
    ip_address,
  });

  if (dbError) {
    // Duplicate email — treat as success to avoid enumeration
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

  // --- Send emails (non-blocking — don't fail the request if Resend is misconfigured) ---
  try {
    const displayName = full_name?.trim() || email.trim();
    const isNL = (language ?? "nl") === "nl";

    // Confirmation to user
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email.trim(),
      subject: isNL
        ? "Uw aanvraag voor vroege toegang — Arbiter Legal"
        : "Your early access request — Arbiter Legal",
      html: isNL
        ? `<div style="font-family:Inter,sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;color:#0C0F14">
            <p style="font-size:13px;color:#C9A84C;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 16px">Arbiter Legal</p>
            <h1 style="font-family:Georgia,serif;font-size:24px;font-weight:500;margin:0 0 16px">Aanvraag ontvangen, ${displayName}.</h1>
            <p style="font-size:15px;line-height:1.7;color:#6B7A8D;margin:0 0 16px">
              Wij hebben uw aanvraag voor vroege toegang ontvangen. U bevindt zich op de private beta-lijst.
              We nemen binnen <strong>24 uur</strong> contact met u op.
            </p>
            <p style="font-size:15px;line-height:1.7;color:#6B7A8D;margin:0 0 32px">
              In de tussentijd: als u vragen heeft, antwoord dan gewoon op deze e-mail.
            </p>
            <hr style="border:none;border-top:1px solid #E5E4DE;margin:0 0 24px"/>
            <p style="font-size:12px;color:#9CA3AF;font-style:italic">Minder administratie. Betere praktijk.</p>
          </div>`
        : `<div style="font-family:Inter,sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;color:#0C0F14">
            <p style="font-size:13px;color:#C9A84C;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 16px">Arbiter Legal</p>
            <h1 style="font-family:Georgia,serif;font-size:24px;font-weight:500;margin:0 0 16px">Request received, ${displayName}.</h1>
            <p style="font-size:15px;line-height:1.7;color:#6B7A8D;margin:0 0 16px">
              We've received your early access request. You're on the private beta list.
              We'll be in touch within <strong>24 hours</strong>.
            </p>
            <p style="font-size:15px;line-height:1.7;color:#6B7A8D;margin:0 0 32px">
              In the meantime, if you have any questions just reply to this email.
            </p>
            <hr style="border:none;border-top:1px solid #E5E4DE;margin:0 0 24px"/>
            <p style="font-size:12px;color:#9CA3AF;font-style:italic">Less admin. Better practice.</p>
          </div>`,
    });

    // Internal notification
    await resend.emails.send({
      from: FROM_EMAIL,
      to: INTERNAL_EMAIL,
      subject: `New waitlist signup — ${email.trim()}`,
      html: `<div style="font-family:monospace;font-size:13px;padding:24px;color:#0C0F14">
        <p><strong>New Arbiter Legal waitlist signup</strong></p>
        <table style="border-collapse:collapse;margin-top:12px">
          <tr><td style="padding:4px 16px 4px 0;color:#6B7A8D">Email</td><td>${email.trim()}</td></tr>
          <tr><td style="padding:4px 16px 4px 0;color:#6B7A8D">Name</td><td>${full_name ?? "—"}</td></tr>
          <tr><td style="padding:4px 16px 4px 0;color:#6B7A8D">Firm</td><td>${firm_name ?? "—"}</td></tr>
          <tr><td style="padding:4px 16px 4px 0;color:#6B7A8D">Practice area</td><td>${practice_area ?? "—"}</td></tr>
          <tr><td style="padding:4px 16px 4px 0;color:#6B7A8D">Firm size</td><td>${firm_size ?? "—"}</td></tr>
          <tr><td style="padding:4px 16px 4px 0;color:#6B7A8D">Language</td><td>${language ?? "nl"}</td></tr>
          <tr><td style="padding:4px 16px 4px 0;color:#6B7A8D">IP</td><td>${ip_address ?? "—"}</td></tr>
        </table>
      </div>`,
    });
  } catch (emailErr) {
    // Log but don't fail — signup is already saved
    console.error("[waitlist] Resend error:", emailErr);
  }

  return NextResponse.json({
    success: true,
    message: "Aanvraag ontvangen. We nemen contact op binnen 24 uur.",
  });
}
