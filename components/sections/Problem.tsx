"use client";

import { useLanguage } from "../LanguageContext";
import FrustrationIllustration from "../illustrations/FrustrationIllustration";

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
    <section id="problem" className="py-16 md:py-20 px-4 sm:px-6 bg-[#F7F6F2]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-3">
            {t("Het probleem", "The problem")}
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-[#0C0F14] max-w-2xl mx-auto">
            {t("Elke dag rebuilt u dezelfde context.", "Every day you rebuild the same context.")}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#6B7A8D] max-w-xl mx-auto leading-relaxed">
            {t(
              "Advocaten verliezen 2 tot 3 uur per dag met uitzoeken wat er is gebeurd. Niet met het oplossen van juridische problemen — alleen maar met het vinden van de informatie.",
              "Lawyers lose 2 to 3 hours per day figuring out what happened. Not solving legal problems — just finding the information."
            )}
          </p>
        </div>

        {/* Frustration illustration */}
        <div className="rounded-xl overflow-hidden border border-[#E5E4DE] mb-8 md:mb-10 max-w-3xl mx-auto shadow-sm">
          <FrustrationIllustration />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cards.map((card, i) => {
            const content = lang === "nl" ? card.nl : card.en;
            return (
              <div key={i} className="bg-white border border-[#E5E4DE] rounded-xl p-5 md:p-6">
                <div className="w-2 h-2 rounded-full bg-[#E05A5A] mb-3" />
                <h3 className="text-sm sm:text-base font-semibold text-[#0C0F14] mb-1.5">{content.title}</h3>
                <p className="text-sm text-[#6B7A8D] leading-relaxed">{content.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
