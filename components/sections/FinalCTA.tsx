"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { useLanguage } from "../LanguageContext";

export default function FinalCTA() {
  const { lang, t } = useLanguage();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, language: lang }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error ?? t("Er is een fout opgetreden. Probeer het opnieuw.", "Something went wrong. Please try again."));
        setLoading(false);
        return;
      }

      setSubmitted(true);
    } catch {
      setError(t("Geen verbinding. Controleer uw internet en probeer opnieuw.", "No connection. Check your internet and try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="cta" className="py-20 md:py-24 px-4 sm:px-6" style={{ background: "linear-gradient(160deg, #f0fdf7 0%, #f7f6f2 60%)" }}>
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-4">
          {t("Private beta", "Private beta")}
        </p>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-[#0C0F14] mb-4">
          {t("Klaar om minder administratie te doen?", "Ready to do less admin?")}
        </h2>
        <p className="text-sm sm:text-base text-[#6B7A8D] mb-8 max-w-lg mx-auto leading-relaxed">
          {t(
            "Arbiter Legal is momenteel in private beta. Vraag vroege toegang aan en krijg 3 maanden gratis.",
            "Arbiter Legal is currently in private beta. Request early access and get 3 months free."
          )}
        </p>

        {submitted ? (
          <div className="inline-flex flex-col items-center gap-3 bg-white border border-[#2ECC8A]/30 rounded-2xl px-8 py-6 shadow-sm">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="#2ECC8A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-sm font-semibold text-[#0C0F14]">
              {t("Aanvraag ontvangen. Check uw inbox.", "Request received. Check your inbox.")}
            </p>
            <p className="text-xs text-[#6B7A8D]">
              {t("We nemen contact op binnen 24 uur.", "We'll be in touch within 24 hours.")}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3 w-full">
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("uw@kantoor.nl", "your@firm.com")}
                className="flex-1 px-4 py-3.5 rounded-lg border border-[#E5E4DE] bg-white text-sm text-[#0C0F14] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2ECC8A] transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="sm:flex-shrink-0 bg-[#2ECC8A] text-white text-sm font-semibold px-8 py-3.5 rounded-lg hover:bg-[#27b87a] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading && (
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                )}
                {loading ? "..." : t("Aanvragen", "Request")}
              </button>
            </div>

            {error && (
              <div className="flex items-start gap-2 bg-[#FEF2F2] border border-[#E05A5A]/30 rounded-lg px-4 py-3 w-full max-w-md text-left">
                <AlertCircle size={15} className="text-[#E05A5A] flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-[#E05A5A]">{error}</p>
                  <button
                    type="button"
                    onClick={() => setError(null)}
                    className="text-xs font-semibold text-[#E05A5A] underline mt-1"
                  >
                    {t("Opnieuw proberen", "Try again")}
                  </button>
                </div>
              </div>
            )}
          </form>
        )}

        <p className="text-xs text-[#9CA3AF] mt-5">
          {t(
            "Geen creditcard · Binnen 24 uur reactie · Nederlandse support",
            "No credit card · Response within 24 hours · Dutch support"
          )}
        </p>

        <p className="font-serif text-[#C9A84C] font-medium mt-10 text-lg">
          {t("Minder administratie. Betere praktijk.", "Less admin. Better practice.")}
        </p>
      </div>
    </section>
  );
}
