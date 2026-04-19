"use client";

import { useState } from "react";
import { useLanguage } from "../LanguageContext";

export default function FinalCTA() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      // fail silently — still show success
    }
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section id="cta" className="py-24 px-6" style={{ background: "linear-gradient(135deg, #f0fdf7 0%, #f7f6f2 100%)" }}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl font-medium text-[#0C0F14] mb-4">
          {t("Klaar om minder administratie te doen?", "Ready to do less admin?")}
        </h2>
        <p className="text-lg text-[#6B7A8D] mb-10 max-w-2xl mx-auto">
          {t(
            "Arbiter is momenteel in private beta. Vraag vroege toegang aan en krijg 3 maanden gratis.",
            "Arbiter is currently in private beta. Request early access and get 3 months free."
          )}
        </p>

        {submitted ? (
          <div className="inline-flex items-center gap-2 bg-[#2ECC8A]/10 text-[#1a9e6a] font-semibold px-8 py-4 rounded-xl border border-[#2ECC8A]/30">
            ✓ {t("Bedankt. We nemen contact op binnen 24 uur.", "Thank you. We'll be in touch within 24 hours.")}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("uw@kantoor.nl", "your@firm.com")}
              className="flex-1 px-5 py-4 rounded-lg border border-[#E5E4DE] bg-white text-[#0C0F14] placeholder-[#6B7A8D] focus:outline-none focus:border-[#2ECC8A] transition-colors text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#2ECC8A] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#27b87a] transition-colors disabled:opacity-60 text-sm whitespace-nowrap"
            >
              {loading ? "..." : t("Aanvragen", "Request")}
            </button>
          </form>
        )}

        <p className="text-xs text-[#6B7A8D] mt-5">
          {t(
            "Geen creditcard  ·  Binnen 24 uur reactie  ·  Nederlandse support",
            "No credit card  ·  Response within 24 hours  ·  Dutch support"
          )}
        </p>
      </div>
    </section>
  );
}
