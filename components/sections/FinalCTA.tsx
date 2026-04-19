"use client";

import { useState } from "react";
import { useLanguage } from "../LanguageContext";
import SignupModal from "../SignupModal";

export default function FinalCTA() {
  const { t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <SignupModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <section id="cta" className="py-24 px-5" style={{ background: "linear-gradient(160deg, #f0fdf7 0%, #f7f6f2 60%)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-4">
            {t("Private beta", "Private beta")}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#0C0F14] mb-4">
            {t("Klaar om minder administratie te doen?", "Ready to do less admin?")}
          </h2>
          <p className="text-base text-[#6B7A8D] mb-8 max-w-lg mx-auto">
            {t(
              "Arbiter is momenteel in private beta. Vraag vroege toegang aan en krijg 3 maanden gratis.",
              "Arbiter is currently in private beta. Request early access and get 3 months free."
            )}
          </p>

          <button
            onClick={() => setModalOpen(true)}
            className="bg-[#2ECC8A] text-white text-base font-semibold px-10 py-4 rounded-xl hover:bg-[#27b87a] transition-colors shadow-sm"
          >
            {t("Toegang aanvragen", "Request access")}
          </button>

          <p className="text-xs text-[#6B7A8D] mt-5">
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
    </>
  );
}
