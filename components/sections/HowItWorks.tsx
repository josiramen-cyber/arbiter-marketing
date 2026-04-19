"use client";

import { useLanguage } from "../LanguageContext";

const steps = [
  {
    nl: { title: "Verbind uw bronnen", desc: "Gmail, Drive, WhatsApp, kalender. Alles wat u al gebruikt." },
    en: { title: "Connect your sources", desc: "Gmail, Drive, WhatsApp, calendar. Everything you already use." },
  },
  {
    nl: { title: "Arbiter structureert uw dossiers", desc: "Automatisch. Stilletjes. Zonder dat u iets hoeft te doen." },
    en: { title: "Arbiter structures your cases", desc: "Automatically. Silently. Without you having to do anything." },
  },
  {
    nl: { title: "Werk vanuit één tijdlijn", desc: "Keur concepten goed. Beantwoord vragen. Sluit zaken af." },
    en: { title: "Work from one timeline", desc: "Approve drafts. Answer questions. Close cases." },
  },
];

export default function HowItWorks() {
  const { lang, t } = useLanguage();

  return (
    <section id="how-it-works" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-medium text-[#0C0F14]">
            {t("Drie stappen. Tien minuten.", "Three steps. Ten minutes.")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-px bg-[#E5E4DE]" />

          {steps.map((step, i) => {
            const content = lang === "nl" ? step.nl : step.en;
            return (
              <div key={i} className="flex flex-col gap-4 relative">
                <div className="font-serif text-7xl font-medium text-[#C9A84C] leading-none">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-xl font-semibold text-[#0C0F14]">{content.title}</h3>
                <p className="text-sm text-[#6B7A8D] leading-relaxed">{content.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
