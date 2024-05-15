import { LANGUAGE } from "src/types";

interface LanguageInfo {
  key: LANGUAGE;
  languageKey: string;
  flagSrc: string;
}

export const languages: LanguageInfo[] = [
  {
    key: LANGUAGE.EN,
    languageKey: "english",
    flagSrc: "/images/en-flag.png",
  },
  {
    key: LANGUAGE.TR,
    languageKey: "turkish",
    flagSrc: "/images/tr-flag.png",
  },
];

export const getLanguageInfo = (currentLang: LANGUAGE): LanguageInfo => {
  return languages.find((lang) => lang.key === currentLang)!;
};

export const getNextLanguageInfo = (currentLang: LANGUAGE): LanguageInfo => {
  return languages.find((lang) => lang.key !== currentLang)!;
};
