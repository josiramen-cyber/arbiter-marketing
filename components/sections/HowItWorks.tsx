"use client";

import { useLanguage } from "../LanguageContext";

const steps = [
  {
    nl: { title: "Verbind uw bronnen", desc: "Gmail, Drive, WhatsApp, kalender. Alles wat u al gebruikt." },
    en: { title: "Connect your sources", desc: "Gmail, Drive, WhatsApp, calendar. Everything you already use." },
  },
  {
    nl: { title: "Arbiter Legal structureert uw dossiers", desc: "Automatisch. Stilletjes. Zonder dat u iets hoeft te doen." },
    en: { title: "Arbiter Legal structures your cases", desc: "Automatically. Silently. Without you having to do anything." },
  },
  {
    nl: { title: "Werk vanuit één tijdlijn", desc: "Keur concepten goed. Beantwoord vragen. Sluit zaken af." },
    en: { title: "Work from one timeline", desc: "Approve drafts. Answer questions. Close cases." },
  },
];

export default function HowItWorks() {
  const { lang, t } = useLanguage();

  return (
    <section id="how-it-works" className="py-16 md:py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-[#0C0F14]">
            {t("Drie stappen. Tien minuten.", "Three steps. Ten minutes.")}
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-0">
          {steps.map((step, i) => {
            const content = lang === "nl" ? step.nl : step.en;
            const isLast = i === steps.length - 1;
            return (
              <div key={i} className="flex md:flex-col flex-row gap-4 md:gap-3 flex-1 relative">
                {/* Step number */}
                <div className="font-serif text-5xl sm:text-6xl md:text-7xl font-medium text-[#C9A84C] leading-none w-16 md:w-auto flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-[#0C0F14] mb-1.5">{content.title}</h3>
                  <p className="text-sm text-[#6B7A8D] leading-relaxed">{content.desc}</p>
                </div>
                {/* Connector line — horizontal on desktop between cards */}
                {!isLast && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-[#E5E4DE] to-[#E5E4DE] -translate-y-1/2 z-0"
                    style={{ width: "calc(100% - 2rem)", left: "calc(100% - 0rem)" }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
