"use client";

import { useLanguage } from "../LanguageContext";
import FlowBuilder from "../FlowBuilder";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="w-full px-6 pt-28 pb-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[40%_60%] gap-12 items-center">
        {/* Left column */}
        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center w-fit px-4 py-1.5 rounded-full border border-[#C9A84C] text-xs font-medium text-[#C9A84C]">
            {t("Voor Nederlandse advocaten", "For Dutch lawyers")}
          </div>

          <h1 className="font-serif text-[clamp(36px,5vw,56px)] font-medium leading-tight text-[#0C0F14]">
            {t(
              "Van eerste bericht tot afgesloten dossier — alles in één systeem.",
              "From first message to closed case — one system."
            )}
          </h1>

          <p className="text-lg text-[#6B7A8D] leading-relaxed max-w-[500px]">
            {t(
              "Arbiter vangt elke e-mail, WhatsApp, document en oproep automatisch op en structureert ze in één werkbaar dossier.",
              "Arbiter captures every email, WhatsApp, document, and call automatically and structures them into a single workable case."
            )}
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#cta"
              className="inline-flex items-center bg-[#2ECC8A] text-white text-base font-semibold px-7 py-4 rounded-md hover:bg-[#27b87a] transition-colors"
            >
              {t("Vraag vroege toegang", "Get early access")}
            </a>
            <a
              href="#features"
              className="inline-flex items-center border border-[#C9A84C] text-[#C9A84C] text-base font-semibold px-7 py-4 rounded-md hover:bg-[#C9A84C]/5 transition-colors"
            >
              {t("Zie hoe het werkt", "See how it works")}
            </a>
          </div>

          <p className="text-xs text-[#6B7A8D]">
            EU data residency&nbsp; ·&nbsp; Wwft compliant&nbsp; ·&nbsp; GDPR-native
          </p>
        </div>

        {/* Right column — flow builder */}
        <div className="flex items-center justify-center">
          <FlowBuilder />
        </div>
      </div>
    </section>
  );
}
