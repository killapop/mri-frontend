import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import LanguageDetector from "i18next-browser-languagedetector";
import { resources } from "./locales/translations.js";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    preload: ["en", "de", "fr"],
    debug: true,
    ns: ["translation", "form"],
    defaultNS: "translation",
    interpolation: {
      escapeValue: false,
    },
  });
export default i18n;
