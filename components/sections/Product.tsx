"use client";

import { useLanguage } from "../LanguageContext";

export default function Product() {
  const { t } = useLanguage();

  return (
    <section id="product" className="py-16 md:py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-4 text-center md:text-left">
          {t("Het product", "The product")}
        </p>

        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-[#0C0F14] leading-snug mb-8 text-center md:text-left max-w-3xl">
          {t(
            "Een AI-native juridisch besturingssysteem voor advocaten.",
            "An AI-native legal operating system for lawyers."
          )}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-14">
          <div className="space-y-4 text-[15px] text-[#6B7A8D] leading-relaxed">
            <p>
              {t(
                "Terwijl andere juridische software begint wanneer u een dossier opent, begint Arbiter Legal bij het eerste WhatsApp-bericht. Elke inkomende interactie — e-mail, WhatsApp, telefoongesprek, document — wordt automatisch gestructureerd in één dossier met een chronologische tijdlijn.",
                "While other legal software begins when you open a case, Arbiter Legal begins at the first WhatsApp message. Every inbound interaction — email, WhatsApp, phone call, document — is automatically structured into one case file with a chronological timeline."
              )}
            </p>
            <p>
              {t(
                "De AI schrijft antwoorden voordat u erom vraagt, doorzoekt uw praktijkgeschiedenis samen met Rechtspraak.nl, en wordt slimmer bij elk afgesloten dossier.",
                "The AI drafts replies before you ask, searches your practice history alongside Rechtspraak.nl, and gets smarter with every case you close."
              )}
            </p>
          </div>

          <div className="space-y-4 text-[15px] text-[#6B7A8D] leading-relaxed">
            <div className="border-l-2 border-[#C9A84C] pl-5">
              <p className="font-serif text-2xl sm:text-3xl font-medium text-[#0C0F14] mb-1">
                {t("2–3 uur per dag", "2–3 hours a day")}
              </p>
              <p className="text-sm">
                {t(
                  "Dat verliezen advocaten met het opnieuw opbouwen van context. E-mails in Gmail. WhatsApp-berichten op de telefoon. Documenten in Drive. Notities op papier.",
                  "That's how much lawyers lose rebuilding context. Emails in Gmail. WhatsApp messages on their phone. Documents in Drive. Notes on paper."
                )}
              </p>
            </div>
            <p>
              {t(
                "Voordat u juridisch werk kunt doen, moet u eerst uitzoeken wat er is gebeurd. Arbiter Legal tilt die administratieve last op door al uw communicatiekanalen te verenigen in één systeem dat met u meedenkt.",
                "Before you can do legal work you first have to figure out what happened. Arbiter Legal lifts that administrative burden by unifying all your communication channels into one system that thinks with you."
              )}
            </p>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-[#E5E4DE] text-center">
          <p className="font-serif text-lg sm:text-xl text-[#C9A84C] font-medium">
            {t("Minder administratie. Betere praktijk.", "Less admin. Better practice.")}
          </p>
        </div>
      </div>
    </section>
  );
}
