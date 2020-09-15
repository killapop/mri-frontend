import { translation as en_translation } from "../locales/en/translation.js";
import { translation as es_translation } from "../locales/es/translation.js";
import { translation as fr_translation } from "../locales/fr/translation.js";

export const languages = [
  {
    code: "en",
    title: "English",
    rtl: false,
    icon: "",
  },
  {
    code: "fr",
    title: "Francais",
    rtl: false,
    icon: "",
  },
  {
    code: "es",
    title: "Español",
    rtl: false,
    icon: "",
  },
];

export const resources = {
  en: {
    translation: en_translation,
  },
  fr: {
    translation: fr_translation,
  },
  es: {
    translation: es_translation,
  },
};
