"use client";

import { AlignLeft, Link2, Sparkles, BookOpen } from "lucide-react";
import { useLanguage } from "../LanguageContext";

const features = [
  {
    Icon: AlignLeft,
    nl: { title: "Elke interactie. Eén tijdlijn.", desc: "Elke e-mail, WhatsApp, document, oproep en notitie verschijnt chronologisch in dezelfde dossierweergave." },
    en: { title: "Every interaction. One timeline.", desc: "Every email, WhatsApp, document, call and note appears chronologically in the same case view." },
  },
  {
    Icon: Link2,
    nl: { title: "Werkt met wat u al heeft.", desc: "Verbind Gmail, Outlook, iCloud, Mijndomein, KPN, Drive, OneDrive. Geen migratie nodig." },
    en: { title: "Works with what you have.", desc: "Connect Gmail, Outlook, iCloud, Mijndomein, KPN, Drive, OneDrive. No migration required." },
  },
  {
    Icon: Sparkles,
    nl: { title: "Concepten voordat u vraagt.", desc: "Elke ochtend zijn antwoorden, samenvattingen en vervolgacties al geschreven. U keurt goed." },
    en: { title: "Drafts before you ask.", desc: "Every morning replies, summaries, and next actions are pre-written. You approve." },
  },
  {
    Icon: BookOpen,
    nl: { title: "Elk afgesloten dossier maakt u slimmer.", desc: "Succesvolle argumenten, herbruikbare templates en relevante Rechtspraak — automatisch bewaard en teruggevonden." },
    en: { title: "Every closed case makes you smarter.", desc: "Successful arguments, reusable templates, and relevant case law — automatically saved and surfaced." },
  },
];

export default function Features() {
  const { lang, t } = useLanguage();

  return (
    <section id="features" className="py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-3">
            {t("Wat Arbiter Legal doet", "What Arbiter Legal does")}
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-[#0C0F14]">
            {t("Vier pijlers. Geen overbodige functies.", "Four pillars. No feature bloat.")}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {features.map(({ Icon, nl, en }, i) => {
            const content = lang === "nl" ? nl : en;
            return (
              <div
                key={i}
                className="bg-white border border-[#E5E4DE] rounded-xl p-6 md:p-8 group hover:border-[#C9A84C] hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-full bg-[#2ECC8A]/10 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-[#2ECC8A]" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-[#0C0F14] mb-2">{content.title}</h3>
                <p className="text-sm text-[#6B7A8D] leading-relaxed mb-4">{content.desc}</p>
                <a href="#cta" className="text-sm font-medium text-[#2ECC8A] hover:underline">
                  {t("Leer meer →", "Learn more →")}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
