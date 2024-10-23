import i18n from 'i18next'
import { initReactI18next} from "react-i18next/initReactI18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import React from "react";
import en from "./assets/translation/en.json"
import fr from "./assets/translation/fr.json"


const resources = {
  en: {
    translation:{...en}
  },
  fr: {
    translation: {...fr}
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en,',
    debug: true,
    interpolation: {
    escapeValue: false
  }
});
export default i18n;

