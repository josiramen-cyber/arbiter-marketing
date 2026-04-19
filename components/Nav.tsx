"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export default function Nav() {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.arbiterlegal.com";

  const links = [
    { label: t("Product", "Product"), href: "#features" },
    { label: t("Functies", "Features"), href: "#features" },
    { label: t("Prijzen", "Pricing"), href: "#pricing" },
    { label: t("Contact", "Contact"), href: "#contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#E5E4DE] h-16 flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
        <a href="#" className="font-serif font-bold text-xl text-[#0C0F14]">
          Arbiter
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm text-[#6B7A8D] hover:text-[#0C0F14] transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setLang(lang === "nl" ? "en" : "nl")}
            className="text-sm font-medium text-[#6B7A8D] hover:text-[#0C0F14] transition-colors"
          >
            {lang === "nl" ? "EN" : "NL"}
          </button>
          <a
            href={appUrl}
            className="text-sm font-semibold text-[#0C0F14] hover:text-[#2ECC8A] transition-colors"
          >
            {t("Inloggen", "Log in")}
          </a>
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-[#E5E4DE] px-6 py-4 flex flex-col gap-4 md:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-[#6B7A8D]" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <div className="flex items-center gap-4 pt-2 border-t border-[#E5E4DE]">
            <button onClick={() => setLang(lang === "nl" ? "en" : "nl")} className="text-sm font-medium text-[#6B7A8D]">
              {lang === "nl" ? "EN" : "NL"}
            </button>
            <a href={appUrl} className="text-sm font-semibold text-[#0C0F14]">
              {t("Inloggen", "Log in")}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
