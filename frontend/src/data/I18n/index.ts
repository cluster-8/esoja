/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import CreatePlotStepEight from './CreatePlotStepEight';
import CreatePlotStepFive from './CreatePlotStepFive';
import CreatePlotStepFour from './CreatePlotStepFour';
import CreatePlotStepNine from './CreatePlotStepNine';
import CreatePlotStepOne from './CreatePlotStepOne';
import CreatePlotStepSeven from './CreatePlotStepSeven';
import CreatePlotStepSix from './CreatePlotStepSix';
import CreatePlotStepThree from './CreatePlotStepThree';
import CreatePlotStepTwo from './CreatePlotStepTwo';
import home from './home';
import newProperties from './newProperties';
import plots from './plots';
import properties from './properties';
import quotation from './quotation';
import signIn from './signIn';
import signUp from './signUp';
import validators from './validators';
import weather from './weather';
import PropertyDetail from './PropertyDetail';
import PlotDetail from './PlotDetail';
import propertyCard from './propertyCard';
import sampleCard from './sampleCard';
import statistics from './statistics';

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
      ...PropertyDetail.pt,
      ...PlotDetail.pt,
      ...propertyCard.pt,
      ...sampleCard.pt,
      ...statistics.pt
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
      ...CreatePlotStepTwo.en,
      ...CreatePlotStepThree.en,
      ...CreatePlotStepFour.en,
      ...CreatePlotStepFive.en,
      ...CreatePlotStepSix.en,
      ...CreatePlotStepSeven.en,
      ...CreatePlotStepNine.en,
      ...quotation.en,
      ...PropertyDetail.en,
      ...PlotDetail.en,
      ...propertyCard.en,
      ...sampleCard.en,
      ...statistics.en
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
