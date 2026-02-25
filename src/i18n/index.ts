import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import zhTW from "./zh-tw.json";
import en from "./en.json";

i18n.use(initReactI18next).init({
  resources: {
    "zh-tw": { translation: zhTW },
    en: { translation: en },
  },
  lng: "zh-tw",
  fallbackLng: "zh-tw",
  initImmediate: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
