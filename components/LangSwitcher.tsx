"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import i18n from "@/i18n";

import ChevronDown from "@/assets/icons/chevron-down.svg";

type LangCode = "en" | "hr";
type Language = {
  code: LangCode;
  label: string;
  flagSrc: string;
};

const LANGUAGES: Language[] = [
  { code: "hr", label: "hrvatski", flagSrc: "/flags/hr.png" },
  { code: "en", label: "english", flagSrc: "/flags/us.png" },
];

const LangSwitcher = () => {
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [lang, setLang] = useState<LangCode>(() => {
    const savedLang = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
    return (savedLang as LangCode) || "en";
  });

  useEffect(() => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  }, [lang, i18n]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLang = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];
  const restLanguage = LANGUAGES.filter((l) => l.code !== currentLang.code);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className='relative' ref={dropdownRef}>
      <div className='flex items-center cursor-pointer' onClick={() => handleOpen()}>
        <Image className='w-7 h-7' src={currentLang.flagSrc} height={32} width={32} alt={currentLang.label} />
        <ChevronDown />
      </div>

      {open && (
        <div className='absolute right-0 mt-2 bg-white rounded-md shadow z-10'>
          {restLanguage.map((l) => (
            <div
              className='w-20'
              key={l.code}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
            >
              <div
                className={`flex w-full items-center justify-between px-4 py-2 text-sm cursor-pointer hover:bg-gray-200 ${
                  l.code === lang ? "bg-gray-50" : ""
                }`}
              >
                <Image className='w-7 h-7' src={l.flagSrc} height={28} width={28} alt={l.label} />
                <span className='text-xs font-semibold text-gray-500'>{l.code.toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LangSwitcher;
