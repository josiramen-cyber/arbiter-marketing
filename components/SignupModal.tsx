"use client";

import { useState } from "react";
import { X, AlertCircle } from "lucide-react";
import { useLanguage } from "./LanguageContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SignupModal({ open, onClose }: Props) {
  const { lang, t } = useLanguage();

  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [firm_name, setFirmName] = useState("");
  const [practice_area, setPracticeArea] = useState("");
  const [firm_size, setFirmSize] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, full_name, firm_name, practice_area, firm_size, language: lang }),
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

  const handleClose = () => {
    onClose();
    // Reset state after close animation
    setTimeout(() => {
      setSubmitted(false);
      setError(null);
      setFullName("");
      setEmail("");
      setFirmName("");
      setPracticeArea("");
      setFirmSize("");
    }, 300);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: "rgba(12,15,20,0.6)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="bg-white w-full sm:rounded-2xl sm:max-w-md rounded-t-2xl shadow-2xl max-h-[92vh] overflow-y-auto relative">
        {/* Header */}
        <div className="sticky top-0 bg-white px-6 pt-6 pb-4 border-b border-[#E5E4DE] flex items-start justify-between">
          <div>
            <h3 className="font-serif text-xl font-medium text-[#0C0F14]">
              {t("Vroege toegang aanvragen", "Request early access")}
            </h3>
            <p className="text-xs text-[#6B7A8D] mt-0.5">
              {t("Private beta · 3 maanden gratis", "Private beta · 3 months free")}
            </p>
          </div>
          <button onClick={handleClose} className="text-[#6B7A8D] hover:text-[#0C0F14] transition-colors p-1 -mt-1 -mr-1">
            <X size={20} />
          </button>
        </div>

        <div className="px-6 pb-6 pt-5">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 rounded-full bg-[#2ECC8A]/12 flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="#2ECC8A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h4 className="font-serif text-xl font-medium text-[#0C0F14] mb-2">
                {t("Aanvraag ontvangen", "Request received")}
              </h4>
              <p className="text-sm text-[#6B7A8D] leading-relaxed">
                {t(
                  "Check uw inbox voor een bevestiging. We nemen contact op binnen 24 uur.",
                  "Check your inbox for a confirmation. We'll be in touch within 24 hours."
                )}
              </p>
              <p className="font-serif text-[#C9A84C] font-medium mt-6 text-base">
                {t("Minder administratie. Betere praktijk.", "Less admin. Better practice.")}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Error banner */}
              {error && (
                <div className="flex items-start gap-2.5 bg-[#FEF2F2] border border-[#E05A5A]/30 rounded-lg px-4 py-3">
                  <AlertCircle size={16} className="text-[#E05A5A] flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-[#E05A5A] leading-snug">{error}</p>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#0C0F14] mb-1.5">
                    {t("Volledige naam", "Full name")} <span className="text-[#E05A5A]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={full_name}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t("Mr. A. de Vries", "Mr. A. Smith")}
                    className="w-full px-4 py-3 rounded-lg border border-[#E5E4DE] text-sm text-[#0C0F14] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2ECC8A] transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#0C0F14] mb-1.5">
                    {t("E-mailadres", "Email address")} <span className="text-[#E05A5A]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("u@uwkantoor.nl", "you@yourfirm.com")}
                    className="w-full px-4 py-3 rounded-lg border border-[#E5E4DE] text-sm text-[#0C0F14] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2ECC8A] transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#0C0F14] mb-1.5">
                    {t("Kantoor", "Firm name")}
                  </label>
                  <input
                    type="text"
                    value={firm_name}
                    onChange={(e) => setFirmName(e.target.value)}
                    placeholder={t("De Vries Advocaten", "Smith & Partners")}
                    className="w-full px-4 py-3 rounded-lg border border-[#E5E4DE] text-sm text-[#0C0F14] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2ECC8A] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0C0F14] mb-1.5">
                    {t("Rechtsgebied", "Practice area")}
                  </label>
                  <select
                    value={practice_area}
                    onChange={(e) => setPracticeArea(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-[#E5E4DE] text-sm text-[#0C0F14] focus:outline-none focus:border-[#2ECC8A] transition-colors bg-white"
                  >
                    <option value="">{t("Selecteer...", "Select...")}</option>
                    <option value="arbeidsrecht">{t("Arbeidsrecht", "Employment law")}</option>
                    <option value="familierecht">{t("Familierecht", "Family law")}</option>
                    <option value="ondernemingsrecht">{t("Ondernemingsrecht", "Corporate law")}</option>
                    <option value="strafrecht">{t("Strafrecht", "Criminal law")}</option>
                    <option value="vastgoedrecht">{t("Vastgoedrecht", "Property law")}</option>
                    <option value="bestuursrecht">{t("Bestuursrecht", "Administrative law")}</option>
                    <option value="algemeen">{t("Algemene praktijk", "General practice")}</option>
                    <option value="anders">{t("Anders", "Other")}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0C0F14] mb-1.5">
                    {t("Kantoorgrootte", "Firm size")}
                  </label>
                  <select
                    value={firm_size}
                    onChange={(e) => setFirmSize(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-[#E5E4DE] text-sm text-[#0C0F14] focus:outline-none focus:border-[#2ECC8A] transition-colors bg-white"
                  >
                    <option value="">{t("Selecteer...", "Select...")}</option>
                    <option value="solo">{t("Solo (alleen)", "Solo (just me)")}</option>
                    <option value="2-5">{t("2–5 advocaten", "2–5 lawyers")}</option>
                    <option value="6-20">{t("6–20 advocaten", "6–20 lawyers")}</option>
                    <option value="20+">{t("20+ advocaten", "20+ lawyers")}</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2ECC8A] text-white font-semibold py-3.5 rounded-lg hover:bg-[#27b87a] transition-colors disabled:opacity-60 text-sm mt-1 flex items-center justify-center gap-2"
              >
                {loading && (
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                )}
                {loading
                  ? t("Bezig met indienen...", "Submitting...")
                  : t("Toegang aanvragen", "Request access")}
              </button>

              <p className="text-xs text-[#9CA3AF] text-center">
                {t("Geen creditcard · Binnen 24 uur reactie", "No credit card · Response within 24 hours")}
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
