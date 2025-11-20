import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTrans from "@/locales/en.json";
import hrTrans from "@/locales/hr.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTrans },
    hr: { translation: hrTrans },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
