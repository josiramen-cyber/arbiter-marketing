"use client";

import { useLanguage } from "./LanguageContext";

export default function Footer() {
  const { lang, setLang, t } = useLanguage();

  return (
    <footer className="bg-white border-t border-[#E5E4DE] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-serif font-bold text-[#0C0F14] mb-4">{t("Product", "Product")}</h4>
            <ul className="space-y-2 text-sm text-[#6B7A8D]">
              <li><a href="#features" className="hover:text-[#0C0F14] transition-colors">{t("Functies", "Features")}</a></li>
              <li><a href="#pricing" className="hover:text-[#0C0F14] transition-colors">{t("Prijzen", "Pricing")}</a></li>
              <li><a href="#roadmap" className="hover:text-[#0C0F14] transition-colors">{t("Roadmap", "Roadmap")}</a></li>
              <li><a href="#security" className="hover:text-[#0C0F14] transition-colors">{t("Beveiliging", "Security")}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif font-bold text-[#0C0F14] mb-4">{t("Bedrijf", "Company")}</h4>
            <ul className="space-y-2 text-sm text-[#6B7A8D]">
              <li><a href="#about" className="hover:text-[#0C0F14] transition-colors">{t("Over ons", "About")}</a></li>
              <li><a href="#blog" className="hover:text-[#0C0F14] transition-colors">{t("Blog", "Blog")}</a></li>
              <li><a href="#contact" className="hover:text-[#0C0F14] transition-colors">{t("Contact", "Contact")}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif font-bold text-[#0C0F14] mb-4">{t("Juridisch", "Legal")}</h4>
            <ul className="space-y-2 text-sm text-[#6B7A8D]">
              <li><a href="#terms" className="hover:text-[#0C0F14] transition-colors">{t("Algemene voorwaarden", "Terms")}</a></li>
              <li><a href="#privacy" className="hover:text-[#0C0F14] transition-colors">{t("Privacybeleid", "Privacy")}</a></li>
              <li><a href="#wwft" className="hover:text-[#0C0F14] transition-colors">{t("Wwft-beleid", "Wwft policy")}</a></li>
              <li><a href="#gdpr" className="hover:text-[#0C0F14] transition-colors">{t("AVG/GDPR", "GDPR")}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif font-bold text-[#0C0F14] mb-4">{t("Verbinden", "Connect")}</h4>
            <ul className="space-y-2 text-sm text-[#6B7A8D]">
              <li><a href="mailto:hallo@arbiterlegal.com" className="hover:text-[#0C0F14] transition-colors">hallo@arbiterlegal.com</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#0C0F14] transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#E5E4DE] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#6B7A8D]">
          <span>© {new Date().getFullYear()} Arbiter Legal BV. {t("Alle rechten voorbehouden.", "All rights reserved.")}</span>
          <span className="font-medium text-[#C9A84C]">Less admin. Better practice.</span>
          <button onClick={() => setLang(lang === "nl" ? "en" : "nl")} className="font-medium hover:text-[#0C0F14] transition-colors">
            {lang === "nl" ? "🇬🇧 English" : "🇳🇱 Nederlands"}
          </button>
        </div>
      </div>
    </footer>
  );
}
