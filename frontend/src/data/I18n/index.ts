/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import home from './home';
import newProperties from './newProperties';
import plots from './plots';
import properties from './properties';
import signIn from './signIn';
import validators from './validators';
import weather from './weather';
import signUp from './signUp';
import CreatePlotStepEight from './CreatePlotStepEight';
import CreatePlotStepOne from './CreatePlotStepOne';
import CreatePlotStepTwo from './CreatePlotStepTwo';
import CreatePlotStepThree from './CreatePlotStepThree';
import CreatePlotStepFour from './CreatePlotStepFour';
import CreatePlotStepFive from './CreatePlotStepFive';
import CreatePlotStepSix from './CreatePlotStepSix';
import CreatePlotStepSeven from './CreatePlotStepSeven';
import CreatePlotStepNine from './CreatePlotStepNine';
import quotation from './quotation';



interface LanguageProps {
  [key: string]: {
    [key: string]: {
      [key: string]: any;
    };
  };
}

export const i18nConfig = () => {
  const languages: LanguageProps = {
    'pt-BR': {
      ...signIn.pt,
      ...home.pt,
      ...weather.pt,
      ...properties.pt,
      ...plots.pt,
      ...validators.pt,
      ...newProperties.pt,
      ...signUp.pt,
      ...CreatePlotStepEight.pt,
      ...CreatePlotStepOne.pt,
      ...CreatePlotStepTwo.pt,
      ...CreatePlotStepThree.pt,
      ...CreatePlotStepFour.pt,
      ...CreatePlotStepFive.pt,
      ...CreatePlotStepSix.pt,
      ...CreatePlotStepSeven.pt,
      ...CreatePlotStepNine.pt,
      ...quotation.pt,
    },
    'en-US': {
      ...signIn.en,
      ...home.en,
      ...weather.en,
      ...properties.en,
      ...plots.en,
      ...validators.en,
      ...newProperties.en,
      ...signUp.en,
      ...CreatePlotStepEight.en,
      ...CreatePlotStepOne.en,
      ...CreatePlotStepOne.en,
      ...CreatePlotStepThree.en,
      ...CreatePlotStepFour.en,
      ...CreatePlotStepFive.en,
      ...CreatePlotStepSix.en,
      ...CreatePlotStepSeven.en,
      ...CreatePlotStepNine.en,
      ...quotation.en,
    }
  };
  i18n.translations = {
    pt: languages['pt-BR'],
    en: languages['en-US']
  };

  i18n.defaultLocale = 'pt-BR';
  i18n.locale = languages[Localization.locale] ? Localization.locale : 'pt-BR';
  i18n.fallbacks = true;
};

export const translate = (key: string): string => {
  return i18n.translate(key);
};
