"use client";

import { useState } from "react";
import { useLanguage } from "../LanguageContext";
import FlowBuilder from "../FlowBuilder";
import SignupModal from "../SignupModal";

export default function Hero() {
  const { t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <SignupModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <section className="w-full px-4 sm:px-6 pt-12 pb-14 md:pt-24 md:pb-20">
        <div className="max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-[46%_54%] gap-8 md:gap-14 items-center">

          {/* Left */}
          <div className="flex flex-col gap-5 text-center md:text-left items-center md:items-start">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full border border-[#C9A84C]/60 bg-[#C9A84C]/6 text-[11px] font-medium text-[#C9A84C]">
              {t("AI-native juridisch besturingssysteem", "AI-native legal operating system")}
            </div>

            <h1 className="font-serif text-[clamp(28px,5vw,52px)] font-medium leading-[1.15] text-[#0C0F14]">
              {t(
                "Van eerste bericht tot afgesloten dossier — alles in één systeem.",
                "From first message to closed case — one system."
              )}
            </h1>

            <p className="text-base text-[#6B7A8D] leading-relaxed max-w-[480px]">
              {t(
                "Arbiter Legal vangt elke e-mail, WhatsApp, document en oproep automatisch op en structureert ze in één werkbaar dossier.",
                "Arbiter Legal captures every email, WhatsApp, document, and call automatically — structured into one workable case file."
              )}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                onClick={() => setModalOpen(true)}
                className="w-full sm:w-auto bg-[#2ECC8A] text-white text-sm font-semibold px-7 py-3.5 rounded-lg hover:bg-[#27b87a] transition-colors shadow-sm"
              >
                {t("Vroege toegang aanvragen", "Get early access")}
              </button>
              <a
                href="#features"
                className="w-full sm:w-auto text-center border border-[#E5E4DE] text-[#6B7A8D] text-sm font-semibold px-7 py-3.5 rounded-lg hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
              >
                {t("Zie hoe het werkt", "See how it works")}
              </a>
            </div>

            <p className="text-xs text-[#6B7A8D] text-center md:text-left">
              EU data residency&nbsp;·&nbsp;Wwft compliant&nbsp;·&nbsp;GDPR-native
            </p>
          </div>

          {/* Right */}
          <div className="w-full mt-2 md:mt-0">
            <FlowBuilder />
          </div>
        </div>
      </section>
    </>
  );
}
