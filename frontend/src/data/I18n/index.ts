/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import SampleTwo from './SampleThree';
import SampleExtraction from './SampleExtraction';
import NumberPlants from './NumberPlants';
import SampleThree from './PicturePhotos';
import PlotCoordinates from './PlotCoordinates';
import SampleOne from './SampleTwo';
import PicturePhotos from './SampleOne';
import PlantingDistance from './PlantingDistance';
import PlotIdentification from './PlotIdentification';
import home from './home';
import newProperties from './newProperties';
import plots from './plots';
import properties from './properties';
import quotation from './quotation';
import signIn from './signIn';
import signUp from './signUp';
import validators from './validators';
import weather from './weather';
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
      ...SampleTwo.pt,
      ...PlotCoordinates.pt,
      ...PlotIdentification.pt,
      ...PlantingDistance.pt,
      ...NumberPlants.pt,
      ...SampleExtraction.pt,
      ...PicturePhotos.pt,
      ...SampleOne.pt,
      ...SampleThree.pt,
      ...quotation.pt,
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
      ...SampleTwo.en,
      ...PlotCoordinates.en,
      ...PlotCoordinates.en,
      ...PlantingDistance.en,
      ...NumberPlants.en,
      ...SampleExtraction.en,
      ...PicturePhotos.en,
      ...SampleOne.en,
      ...SampleThree.en,
      ...quotation.en,
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
