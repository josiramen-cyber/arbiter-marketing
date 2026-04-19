"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useLanguage } from "./LanguageContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SignupModal({ open, onClose }: Props) {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [firm, setFirm] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, firm }),
      });
    } catch {
      // fail silently
    }
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(12,15,20,0.55)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#6B7A8D] hover:text-[#0C0F14] transition-colors"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 rounded-full bg-[#2ECC8A]/15 flex items-center justify-center mx-auto mb-5">
              <span className="text-2xl">✓</span>
            </div>
            <h3 className="font-serif text-2xl font-medium text-[#0C0F14] mb-3">
              {t("Aanvraag ontvangen", "Request received")}
            </h3>
            <p className="text-sm text-[#6B7A8D] leading-relaxed">
              {t(
                "We nemen contact op binnen 24 uur. Minder administratie. Betere praktijk.",
                "We'll be in touch within 24 hours. Less admin. Better practice."
              )}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h3 className="font-serif text-2xl font-medium text-[#0C0F14] mb-1">
                {t("Vroege toegang aanvragen", "Request early access")}
              </h3>
              <p className="text-sm text-[#6B7A8D]">
                {t("Private beta · 3 maanden gratis", "Private beta · 3 months free")}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0C0F14] mb-1.5">
                  {t("Naam", "Name")}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("Mr. A. de Vries", "Mr. A. Smith")}
                  className="w-full px-4 py-3 rounded-lg border border-[#E5E4DE] text-sm text-[#0C0F14] placeholder-[#6B7A8D] focus:outline-none focus:border-[#2ECC8A] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#0C0F14] mb-1.5">
                  {t("E-mailadres", "Email address")}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("u@uwkantoor.nl", "you@yourfirm.com")}
                  className="w-full px-4 py-3 rounded-lg border border-[#E5E4DE] text-sm text-[#0C0F14] placeholder-[#6B7A8D] focus:outline-none focus:border-[#2ECC8A] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#0C0F14] mb-1.5">
                  {t("Kantoor (optioneel)", "Firm (optional)")}
                </label>
                <input
                  type="text"
                  value={firm}
                  onChange={(e) => setFirm(e.target.value)}
                  placeholder={t("De Vries Advocaten", "Smith & Partners")}
                  className="w-full px-4 py-3 rounded-lg border border-[#E5E4DE] text-sm text-[#0C0F14] placeholder-[#6B7A8D] focus:outline-none focus:border-[#2ECC8A] transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2ECC8A] text-white font-semibold py-3.5 rounded-lg hover:bg-[#27b87a] transition-colors disabled:opacity-60 text-sm mt-1"
              >
                {loading ? "..." : t("Toegang aanvragen", "Request access")}
              </button>
            </form>

            <p className="text-xs text-[#6B7A8D] text-center mt-4">
              {t("Geen creditcard · Binnen 24 uur reactie", "No credit card · Response within 24 hours")}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
