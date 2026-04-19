"use client";

import { Globe, Shield, Scale, Lock } from "lucide-react";
import { useLanguage } from "../LanguageContext";

const pillars = [
  {
    Icon: Globe,
    nl: { title: "EU data residency", desc: "Al uw data in Supabase EU-West. Nooit buiten de EU." },
    en: { title: "EU data residency", desc: "All your data in Supabase EU-West. Never outside the EU." },
  },
  {
    Icon: Shield,
    nl: { title: "Wwft-ondersteuning", desc: "CDD-workflow, STR-melding naar FIU-NL, privilege protection ingebouwd." },
    en: { title: "Wwft support", desc: "CDD workflow, STR reporting to FIU-NL, privilege protection built in." },
  },
  {
    Icon: Scale,
    nl: { title: "NOvA-bewust", desc: "Gebouwd met bewustzijn van geheimhoudingsplicht en NOvA gedragscode." },
    en: { title: "NOvA-aware", desc: "Built with awareness of attorney-client privilege and NOvA code of conduct." },
  },
  {
    Icon: Lock,
    nl: { title: "GDPR native", desc: "Volledige controle, recht op verwijdering, auditlog — vanaf de architectuur." },
    en: { title: "GDPR native", desc: "Full control, right to erasure, audit log — from the architecture up." },
  },
];

const integrations = [
  "Gmail", "Outlook", "iCloud Mail", "Mijndomein", "Drive", "OneDrive",
  "Dropbox", "WhatsApp Business", "Zoom", "Rechtspraak.nl", "IND.nl",
];

export default function Trust() {
  const { lang, t } = useLanguage();

  return (
    <section id="trust" className="py-16 md:py-20 px-4 sm:px-6 border-t-2 border-[#C9A84C] bg-[#F7F6F2]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-3">
            {t("Vertrouwen & compliance", "Trust & compliance")}
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-[#0C0F14]">
            {t("Gebouwd op vertrouwen.", "Built on trust.")}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-14">
          {pillars.map(({ Icon, nl, en }, i) => {
            const content = lang === "nl" ? nl : en;
            return (
              <div key={i} className="bg-white rounded-xl border border-[#E5E4DE] p-5 md:p-6">
                <div className="w-10 h-10 rounded-full bg-[#2ECC8A]/10 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-[#2ECC8A]" />
                </div>
                <h4 className="text-sm sm:text-base font-semibold text-[#0C0F14] mb-1.5">{content.title}</h4>
                <p className="text-sm text-[#6B7A8D] leading-relaxed">{content.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-xs font-semibold text-[#6B7A8D] uppercase tracking-widest mb-6">
            {t("Werkt met uw bestaande tools", "Works with your existing tools")}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {integrations.map((name) => (
              <div
                key={name}
                className="text-xs font-medium text-[#6B7A8D] bg-white border border-[#E5E4DE] rounded-lg px-3 py-2 opacity-60 hover:opacity-100 hover:text-[#0C0F14] transition-all"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
