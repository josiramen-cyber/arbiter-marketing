"use client";

import { useLanguage } from "../LanguageContext";

const cards = [
  {
    nl: { title: "E-mails verspreid", desc: "Uw inbox, uw kantoor-inbox, uw persoonlijke inbox — dezelfde cliënt schrijft naar allemaal." },
    en: { title: "Emails scattered", desc: "Your inbox, the firm inbox, your personal inbox — the same client writes to all of them." },
  },
  {
    nl: { title: "Documenten verborgen", desc: "Drive, Mijndomein, e-mail bijlagen, papieren kopieën. De zaak is overal." },
    en: { title: "Documents buried", desc: "Drive, Mijndomein, email attachments, paper copies. The case is everywhere." },
  },
  {
    nl: { title: "Notities losgekoppeld", desc: "Notities van gisteren. Post-its van vorige week. Gesprekken die niemand heeft opgeschreven." },
    en: { title: "Notes disconnected", desc: "Yesterday's notes. Last week's post-its. Calls no one wrote down." },
  },
  {
    nl: { title: "Termijnen in gevaar", desc: "Drie zaken, vijf termijnen, nul systematische tracking. Één gemiste datum kost u alles." },
    en: { title: "Deadlines at risk", desc: "Three cases, five deadlines, zero systematic tracking. One missed date costs you everything." },
  },
];

export default function Problem() {
  const { lang, t } = useLanguage();

  return (
    <section id="problem" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-3">
            {t("Het probleem", "The problem")}
          </p>
          <h2 className="font-serif text-4xl font-medium text-[#0C0F14]">
            {t("Elke dag rebuilt u dezelfde context.", "Every day you rebuild the same context.")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <div key={i} className="bg-white border border-[#E5E4DE] rounded-xl p-8 relative">
              <div className="w-2 h-2 rounded-full bg-[#E05A5A] mb-4" />
              <h3 className="text-lg font-semibold text-[#0C0F14] mb-2">
                {lang === "nl" ? card.nl.title : card.en.title}
              </h3>
              <p className="text-sm text-[#6B7A8D] leading-relaxed">
                {lang === "nl" ? card.nl.desc : card.en.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
