"use client";
import { useEffect, useState } from "react";
import i18n from "@/i18n";

import HrFlag from "@/assets/flags/hr.svg";
import UsFlag from "@/assets/flags/us.svg";

type LangCode = "en" | "hr";
type Language = {
  code: LangCode;
  label: string;
  Flag: React.FC<React.SVGProps<SVGSVGElement>>;
};

const LANGUAGES: Language[] = [
  { code: "hr", label: "hrvatski", Flag: HrFlag },
  { code: "en", label: "english", Flag: UsFlag },
];

const LangSwitcher = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [lang, setLang] = useState<LangCode>(() => {
    const savedLang = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
    return (savedLang as LangCode) || "en";
  });

  useEffect(() => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  }, [lang, i18n]);

  const currentLang = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className='relative'>
      <div className='cursor-pointer' onClick={() => handleOpen()}>
        <currentLang.Flag aria-hidden />
      </div>

      {open && (
        <div className='absolute right-0 mt-2 bg-white rounded-md shadow z-10'>
          {LANGUAGES.map((l) => (
            <div
              key={l.code}
              onClick={() => {
                setLang(l.code);
              }}
            >
              <div
                className={`flex w-full items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-gray-200 ${
                  l.code === lang ? "bg-gray-50" : ""
                }`}
              >
                <l.Flag aria-hidden />
                <span className='ml-auto text-xs font-semibold text-gray-500'>{l.code.toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LangSwitcher;
