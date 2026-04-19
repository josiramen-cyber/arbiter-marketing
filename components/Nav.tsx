"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "./LanguageContext";
import SignupModal from "./SignupModal";

export default function Nav() {
  const { lang, setLang, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const links = [
    { label: t("Product", "Product"), href: "#product" },
    { label: t("Functies", "Features"), href: "#features" },
    { label: t("Prijzen", "Pricing"), href: "#pricing" },
    { label: t("Vertrouwen", "Trust"), href: "#trust" },
  ];

  return (
    <>
      <SignupModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E5E4DE]">
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between gap-4">

          {/* Logo lockup */}
          <a href="#" className="flex items-center gap-2.5 flex-shrink-0 group">
            <Image src="/logo.svg" alt="Arbiter Legal" width={30} height={30} />
            <div className="flex flex-col leading-none">
              <span className="font-serif font-bold text-[17px] text-[#0C0F14] tracking-tight">
                Arbiter Legal
              </span>
              <span className="text-[10px] text-[#C9A84C] font-medium tracking-wide mt-0.5">
                {t("Minder administratie. Betere praktijk.", "Less admin. Better practice.")}
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm text-[#6B7A8D] hover:text-[#0C0F14] transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => setLang(lang === "nl" ? "en" : "nl")}
              className="text-xs font-semibold text-[#6B7A8D] hover:text-[#0C0F14] transition-colors px-2 py-1 border border-[#E5E4DE] rounded"
            >
              {lang === "nl" ? "EN" : "NL"}
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-[#2ECC8A] text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-[#27b87a] transition-colors"
            >
              {t("Toegang aanvragen", "Get access")}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden p-2 -mr-1" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-[#E5E4DE] px-5 py-5 flex flex-col gap-4 shadow-lg">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-[#6B7A8D] py-1" onClick={() => setMenuOpen(false)}>
                {l.label}
              </a>
            ))}
            <div className="pt-3 border-t border-[#E5E4DE] flex items-center gap-3">
              <button
                onClick={() => setLang(lang === "nl" ? "en" : "nl")}
                className="text-xs font-semibold text-[#6B7A8D] px-2 py-1 border border-[#E5E4DE] rounded"
              >
                {lang === "nl" ? "EN" : "NL"}
              </button>
              <button
                onClick={() => { setMenuOpen(false); setModalOpen(true); }}
                className="flex-1 bg-[#2ECC8A] text-white text-sm font-semibold py-2.5 rounded-lg"
              >
                {t("Toegang aanvragen", "Get access")}
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
