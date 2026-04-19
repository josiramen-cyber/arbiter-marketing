"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import SignupModal from "../SignupModal";

const tiers = [
  {
    label: "FREE",
    nl: {
      title: "Verken het systeem",
      price: "€0",
      period: "",
      desc: "Toegang tot de intake en basislaag van Arbiter Legal.",
      features: ["Basis intake flow", "Beperkte pre-check", "Systeempreview"],
      cta: "Gratis starten",
    },
    en: {
      title: "Explore the system",
      price: "€0",
      period: "",
      desc: "Access Arbiter Legal's intake and basic evaluation layer.",
      features: ["Basic intake flow", "Limited pre-check", "System preview"],
      cta: "Start free",
    },
    highlighted: false,
    dark: false,
  },
  {
    label: "SOLO",
    nl: {
      title: "Werk onafhankelijk",
      price: "€55",
      period: "/ maand",
      desc: "Volledige toegang voor advocaten die zaken zelfstandig via Arbiter Legal afhandelen.",
      features: ["Volledige pre-check engine", "Zaakuitvoering", "Standaard workflows", "Continue zaaktracking"],
      cta: "Solo starten",
    },
    en: {
      title: "Run cases independently",
      price: "€55",
      period: "/ month",
      desc: "Full access for individual lawyers running cases through Arbiter Legal.",
      features: ["Full pre-check engine", "Case execution access", "Standard workflows", "Ongoing case tracking"],
      cta: "Start Solo",
    },
    highlighted: true,
    dark: false,
  },
  {
    label: "TEAM",
    nl: {
      title: "Werk als eenheid",
      price: "€149",
      period: "/ maand",
      desc: "Gedeelde werkruimte voor teams die zaken samen uitvoeren.",
      features: ["Multi-user toegang (max. 10)", "Gedeelde zaakpijplijnen", "Zichtbaarheid op teamniveau", "Rolgebaseerde workflows"],
      cta: "Team starten",
      constraint: "Voor teams tot 10 gebruikers",
    },
    en: {
      title: "Operate as a unit",
      price: "€149",
      period: "/ month",
      desc: "Shared workspace for teams executing cases collaboratively.",
      features: ["Multi-user access (up to 10)", "Shared case pipelines", "Team-level visibility", "Role-based workflows"],
      cta: "Start Team",
      constraint: "For teams up to 10 users",
    },
    highlighted: false,
    dark: false,
  },
  {
    label: "SCALE",
    nl: {
      title: "Hoog volume uitvoering",
      price: "100+",
      period: "gebruikers",
      desc: "Voor organisaties die Arbiter Legal op schaal inzetten.",
      features: ["Zaakverwerking op schaal", "Aangepaste workflows", "Dedicated ondersteuning", "Systeemaanpassing"],
      cta: "Neem contact op",
    },
    en: {
      title: "High-volume execution",
      price: "100+",
      period: "users",
      desc: "For organizations running Arbiter Legal at scale.",
      features: ["High-volume case handling", "Custom workflows", "Dedicated support", "System customization"],
      cta: "Talk to us",
    },
    highlighted: false,
    dark: true,
  },
];

export default function Pricing() {
  const { lang, t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <SignupModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <section id="pricing" className="py-16 md:py-20 px-4 sm:px-6" style={{ background: "#F9F9F6" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-3">
              {t("Prijzen", "Pricing")}
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-[#0C0F14]">
              {t("Kies uw systeemniveau.", "Choose your system tier.")}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#6B7A8D] max-w-lg mx-auto">
              {t(
                "Geen verborgen kosten. Geen complexe licenties. Gewoon het systeem dat bij uw praktijk past.",
                "No hidden costs. No complex licensing. Just the system that fits your practice."
              )}
            </p>
          </div>

          {/* Mobile: stacked cards. Desktop: horizontal kanban scroll */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
            {tiers.map((tier) => {
              const content = lang === "nl" ? tier.nl : tier.en;
              const isScale = tier.dark;
              const isSolo = tier.highlighted;

              return (
                <div
                  key={tier.label}
                  className={[
                    "relative flex flex-col rounded-2xl p-6 md:p-7 transition-all duration-200 cursor-pointer",
                    "hover:scale-[1.02] hover:shadow-xl",
                    isScale
                      ? "bg-[#0C0F14] border border-[#1f2937]"
                      : "bg-white border border-[#E5E7EB]",
                    isSolo ? "border-t-4 border-t-[#C9A84C]" : "",
                  ].join(" ")}
                >
                  {isSolo && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                      <span className="bg-[#C9A84C] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full whitespace-nowrap">
                        {t("Meest gekozen", "Most popular")}
                      </span>
                    </div>
                  )}

                  <span className={[
                    "text-[10px] font-bold tracking-[0.15em] uppercase mb-3 block",
                    isScale ? "text-[#C9A84C]" : "text-[#6B7A8D]",
                  ].join(" ")}>
                    {tier.label}
                  </span>

                  <h3 className={[
                    "font-serif text-lg font-medium mb-2",
                    isScale ? "text-white" : "text-[#0C0F14]",
                  ].join(" ")}>
                    {content.title}
                  </h3>

                  <div className="flex items-baseline gap-1 mb-2">
                    <span className={[
                      "font-serif text-3xl sm:text-4xl font-semibold",
                      isScale ? "text-white" : "text-[#0C0F14]",
                    ].join(" ")}>
                      {content.price}
                    </span>
                    <span className={[
                      "text-sm",
                      isScale ? "text-[#9CA3AF]" : "text-[#6B7A8D]",
                    ].join(" ")}>
                      {content.period}
                    </span>
                  </div>

                  {"constraint" in content && (
                    <div className="mb-3 text-xs font-semibold text-[#C9A84C] bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-lg px-3 py-1.5">
                      {content.constraint}
                    </div>
                  )}

                  <p className={[
                    "text-sm leading-relaxed mb-5",
                    isScale ? "text-[#9CA3AF]" : "text-[#6B7A8D]",
                  ].join(" ")}>
                    {content.desc}
                  </p>

                  <div className={["h-px mb-5", isScale ? "bg-[#1f2937]" : "bg-[#E5E7EB]"].join(" ")} />

                  <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                    {content.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check size={13} className={["mt-0.5 flex-shrink-0", isScale ? "text-[#C9A84C]" : "text-[#2ECC8A]"].join(" ")} />
                        <span className={["text-sm", isScale ? "text-[#D1D5DB]" : "text-[#6B7A8D]"].join(" ")}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setModalOpen(true)}
                    className={[
                      "w-full py-3 rounded-xl text-sm font-semibold transition-colors",
                      isScale
                        ? "bg-[#C9A84C] text-white hover:bg-[#b8963e]"
                        : isSolo
                          ? "bg-[#1F7A63] text-white hover:bg-[#195f4e]"
                          : "bg-[#F3F4F6] text-[#0C0F14] hover:bg-[#E5E7EB]",
                    ].join(" ")}
                  >
                    {content.cta}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
