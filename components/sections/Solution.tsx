"use client";

import { useLanguage } from "../LanguageContext";
import JoyIllustration from "../illustrations/JoyIllustration";

export default function Solution() {
  const { t } = useLanguage();

  return (
    <section id="solution" className="py-20 px-5 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-3">
            {t("De oplossing", "The solution")}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#0C0F14]">
            {t("Eén plek. Voor alles.", "One place. For everything.")}
          </h2>
          <p className="mt-4 text-base text-[#6B7A8D] max-w-xl mx-auto">
            {t(
              "Arbiter Legal organiseert elke interactie automatisch in een helder, chronologisch dossier — klaar om aan te werken.",
              "Arbiter Legal organises every interaction automatically into a clear, chronological case file — ready to work from."
            )}
          </p>
        </div>

        {/* Joy illustration — the "after" state */}
        <div className="rounded-2xl overflow-hidden border border-[#E5E4DE] mb-12 max-w-3xl mx-auto shadow-sm">
          <JoyIllustration />
        </div>

        {/* Three capability columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Unified timeline */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-full bg-[#F7F6F2] rounded-xl border border-[#E5E4DE] p-4">
              <div className="space-y-2">
                {["Email · 09:15", "WhatsApp · 18:42", "Contract.pdf · maandag", "Notitie · vrijdag"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-[#E5E4DE]">
                    <div className="w-2 h-2 rounded-full bg-[#2ECC8A] flex-shrink-0" />
                    <span className="text-xs text-[#0C0F14]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-sm font-semibold text-[#0C0F14]">{t("Alles chronologisch", "Everything chronological")}</p>
          </div>

          {/* AI draft */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-full bg-[#F7F6F2] rounded-xl border border-[#E5E4DE] p-4">
              <div className="bg-white rounded-lg border-l-4 border-[#C9A84C] border border-[#E5E4DE] p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#0C0F14]">{t("Concept gereed", "Draft ready")}</span>
                  <span className="text-[10px] bg-[#2ECC8A]/10 text-[#2ECC8A] px-2 py-0.5 rounded-full font-medium">AI</span>
                </div>
                <p className="text-xs text-[#6B7A8D] leading-relaxed">
                  {t("Geachte heer Van Dijk, naar aanleiding van ons gesprek...", "Dear Mr. Van Dijk, further to our conversation...")}
                </p>
              </div>
            </div>
            <p className="text-sm font-semibold text-[#0C0F14]">{t("AI conceptvoorstellen", "AI draft proposals")}</p>
          </div>

          {/* Search */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-full bg-[#F7F6F2] rounded-xl border border-[#E5E4DE] p-4">
              <div className="bg-white rounded-lg border border-[#E5E4DE] p-3">
                <div className="flex items-center gap-2 border-b border-[#E5E4DE] pb-2 mb-2">
                  <span className="text-xs text-[#6B7A8D] flex-1">ontslag op staande voet...</span>
                  <kbd className="text-[10px] bg-[#F7F6F2] border border-[#E5E4DE] px-1.5 py-0.5 rounded">⌘K</kbd>
                </div>
                {["Van Dijk dossier", "ECLI:NL:HR:2020:1423", "Arbeidsovereenkomst.pdf"].map((r, i) => (
                  <div key={i} className="text-xs text-[#0C0F14] py-1 hover:text-[#2ECC8A] cursor-pointer">{r}</div>
                ))}
              </div>
            </div>
            <p className="text-sm font-semibold text-[#0C0F14]">{t("Zoek overal tegelijk", "Search everywhere at once")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
