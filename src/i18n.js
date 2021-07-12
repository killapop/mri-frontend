import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { resources } from "./locales/translations.js";

i18n
  .use(LanguageDetector)
  // .use(Backend)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    preload: ["en", "es", "fr"],
    debug: true,
    ns: ["translation", "form"],
    defaultNS: "translation",
    interpolation: {
      escapeValue: false,
    },
  });
export default i18n;
