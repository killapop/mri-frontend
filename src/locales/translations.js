import { translation as en_translation } from "./en/translation.js";
import { form as en_form } from "./en/form.js";
import { translation as fr_translation } from "./fr/translation.js";
import { form as fr_form } from "./fr/form.js";
import { translation as de_translation } from "./de/translation.js";
import { form as de_form } from "./de/form.js";
import { translation as es_translation } from "./es/translation.js";
import { form as es_form } from "./es/form.js";

export const languages = [
  {
    code: "en",
    title: "English",
    rtl: false,
    icon: ""
  },
  {
    code: "fr",
    title: "Francais",
    rtl: false,
    icon: ""
  },
  {
    code: "de",
    title: "Deutsch",
    rtl: false,
    icon: ""
  },
  {
    code: "es",
    title: "Español",
    rtl: false,
    icon: ""
  }
];

export const resources = {
  en: {
    translation: en_translation,
    form: en_form
  },
  fr: {
    translation: fr_translation,
    form: fr_form
  },
  de: {
    translation: de_translation,
    form: de_form
  },
  es: {
    translation: es_translation,
    form: es_form
  }
};
