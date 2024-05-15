import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { orderModuleTranslations } from "src/modules/orders";
import { LANGUAGE } from "src/types";

type Translation = {
  [key: string]: string | Translation;
};

type ModuleTranslation = Record<Module, Translation>;
type Module = "orders";

const modules: Record<Module, any> = {
  orders: orderModuleTranslations,
};

const resources = Object.values(LANGUAGE).reduce(
  (acc, language) => ({
    ...acc,
    [language]: Object.entries(modules).reduce(
      (acc, [module, translations]) => ({
        ...acc,
        [module]: translations[language] || {},
      }),
      {}
    ),
  }),
  {} as Record<LANGUAGE, ModuleTranslation>
);

const savedLanguage = localStorage.getItem("@browserLanguage");
const browserLanguage = savedLanguage || navigator.language.split("-")[0];
localStorage.setItem("@browserLanguage", browserLanguage);

i18n.use(initReactI18next).init({
  resources,
  compatibilityJSON: "v3",
  fallbackLng: "en",
  lng: browserLanguage,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

export default i18n;
