"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "nl" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: (nl: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "nl",
  setLang: () => {},
  t: (nl) => nl,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("nl");

  useEffect(() => {
    const stored = localStorage.getItem("arbiter-lang") as Language | null;
    if (stored === "nl" || stored === "en") setLangState(stored);
  }, []);

  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem("arbiter-lang", l);
  };

  const t = (nl: string, en: string) => (lang === "nl" ? nl : en);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
