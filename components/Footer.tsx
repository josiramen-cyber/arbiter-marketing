"use client";

import Image from "next/image";
import { useLanguage } from "./LanguageContext";

export default function Footer() {
  const { lang, setLang, t } = useLanguage();

  return (
    <footer className="bg-white border-t border-[#E5E4DE] pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#0C0F14] mb-4">{t("Product", "Product")}</h4>
            <ul className="space-y-2.5 text-sm text-[#6B7A8D]">
              <li><a href="#features" className="hover:text-[#0C0F14] transition-colors">{t("Functies", "Features")}</a></li>
              <li><a href="#pricing" className="hover:text-[#0C0F14] transition-colors">{t("Prijzen", "Pricing")}</a></li>
              <li><a href="#" className="hover:text-[#0C0F14] transition-colors">{t("Roadmap", "Roadmap")}</a></li>
              <li><a href="#trust" className="hover:text-[#0C0F14] transition-colors">{t("Beveiliging", "Security")}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#0C0F14] mb-4">{t("Bedrijf", "Company")}</h4>
            <ul className="space-y-2.5 text-sm text-[#6B7A8D]">
              <li><a href="#" className="hover:text-[#0C0F14] transition-colors">{t("Over ons", "About")}</a></li>
              <li><a href="#" className="hover:text-[#0C0F14] transition-colors">{t("Blog", "Blog")}</a></li>
              <li><a href="#cta" className="hover:text-[#0C0F14] transition-colors">{t("Contact", "Contact")}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#0C0F14] mb-4">{t("Juridisch", "Legal")}</h4>
            <ul className="space-y-2.5 text-sm text-[#6B7A8D]">
              <li><a href="#" className="hover:text-[#0C0F14] transition-colors">{t("Algemene voorwaarden", "Terms")}</a></li>
              <li><a href="#" className="hover:text-[#0C0F14] transition-colors">{t("Privacybeleid", "Privacy")}</a></li>
              <li><a href="#" className="hover:text-[#0C0F14] transition-colors">{t("Wwft-beleid", "Wwft policy")}</a></li>
              <li><a href="#" className="hover:text-[#0C0F14] transition-colors">{t("AVG/GDPR", "GDPR")}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#0C0F14] mb-4">{t("Verbinden", "Connect")}</h4>
            <ul className="space-y-2.5 text-sm text-[#6B7A8D]">
              <li>
                <a href="mailto:josiramen@arbiterlegal.com" className="hover:text-[#0C0F14] transition-colors">
                  josiramen@arbiterlegal.com
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#0C0F14] transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#E5E4DE] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Image src="/logo.svg" alt="Arbiter Legal" width={20} height={20} />
            <span className="text-sm text-[#6B7A8D]">© {new Date().getFullYear()} Arbiter Legal BV.</span>
          </div>
          <span className="font-serif font-medium text-[#C9A84C] text-sm">
            {t("Minder administratie. Betere praktijk.", "Less admin. Better practice.")}
          </span>
          <button
            onClick={() => setLang(lang === "nl" ? "en" : "nl")}
            className="text-xs font-semibold border border-[#E5E4DE] px-3 py-1.5 rounded hover:border-[#C9A84C] hover:text-[#0C0F14] transition-colors text-[#6B7A8D]"
          >
            {lang === "nl" ? "🇬🇧 English" : "🇳🇱 Nederlands"}
          </button>
        </div>
      </div>
    </footer>
  );
}
