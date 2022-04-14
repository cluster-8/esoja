import i18n from "i18n-js";
import * as Localization from "expo-localization";
import signIn from "./signIn";
import home from "./home";
import weather from "./weather";
import properties from "./properties";
import plots from "./plots";
import validators from "./validators";
import newProperties from "./newProperties";

interface LanguageProps {
  [key: string]: {
    [key: string]: {
      [key: string]: any;
    };
  };
}

export const i18nConfig = () => {
  const languages: LanguageProps = {
    "pt-BR": {
      ...signIn.pt,
      ...home.pt,
      ...weather.pt,
      ...properties.pt,
      ...plots.pt,
      ...validators.pt,
      ...newProperties.pt
    },
    "en-US": {
      ...signIn.en,
      ...home.en,
      ...weather.en,
      ...properties.en,
      ...plots.en,
      ...validators.en,
      ...newProperties.en
    },
  };
  i18n.translations = {
    pt: languages["pt-BR"],
    en: languages["en-US"],
  };

  i18n.defaultLocale = "pt-BR";
  i18n.locale = languages[Localization.locale] ? Localization.locale : "pt-BR";
  i18n.fallbacks = true;
};

export const translate = (key: string): string => {
  return i18n.translate(key);
};
