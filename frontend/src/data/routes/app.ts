import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AppRoutesParams = {
  Home: undefined;
  Weather: undefined;
  Plots: undefined;
  PlotDetail: {
    plotId: string;
  };
  Properties: undefined;
  PropertyDetail: {
    propertyId: string;
  };
  NewProperty: undefined;
  Quotation: {
    selectedPage: string;
  };
  Statistics: undefined;
  CreatePlot: undefined;
  PlotCoordinates: undefined;
  PlotIdentification: undefined;
  PlantingDistance: {
    cultiveId: string;
  };
  NumberPlants: undefined;
  SampleExtraction: undefined;
  PicturePhotos: undefined;
  SampleOne: undefined;
  SampleTwo: undefined;
  SampleThree: undefined;
};

export type HomeScreenRouteProps = NativeStackScreenProps<
  AppRoutesParams,
  'Home'
>;

export type WeatherScreenRouteProps = NativeStackScreenProps<
  AppRoutesParams,
  'Weather'
>;

export type PlotsScreenRouteProps = NativeStackScreenProps<
  AppRoutesParams,
  'Plots'
>;

export type PlotDetailScreenRouteProps = NativeStackScreenProps<
  AppRoutesParams,
  'PlotDetail'
>;

export type CreatePlotScreenRouteProps = NativeStackScreenProps<
  AppRoutesParams,
  'CreatePlot'
>;

export type PropertiesScreenRouteProps = NativeStackScreenProps<
  AppRoutesParams,
  'Properties'
>;

export type PropertyDetailScreenRouteProps = NativeStackScreenProps<
  AppRoutesParams,
  'PropertyDetail'
>;

export type NewPropertyScreenRouteProps = NativeStackScreenProps<
  AppRoutesParams,
  'NewProperty'
>;

export type QuotationScreenRouteProps = NativeStackScreenProps<
  AppRoutesParams,
  'Quotation'
>;

export type StatisticsScreenRouteProps = NativeStackScreenProps<
  AppRoutesParams,
  'Statistics'
>;

export type PlotCoordinatesScreenRouteProps = NativeStackScreenProps<
  AppRoutesParams,
  'PlotCoordinates'
>;

export type PlotIdentificationScreenRouteProps = NativeStackScreenProps<
  AppRoutesParams,
  'PlotIdentification'
>;

export type PlantingDistanceScreenRouteProps = NativeStackScreenProps<
  AppRoutesParams,
  'PlantingDistance'
>;

export type NumberPlantsScreenRouteProps = NativeStackScreenProps<
  AppRoutesParams,
  'NumberPlants'
>;

export type SampleExtractionScreenRouteProps = NativeStackScreenProps<
  AppRoutesParams,
  'SampleExtraction'
>;

export type SampleOneScreenRouteProps = NativeStackScreenProps<
  AppRoutesParams,
  'SampleOne'
>;

export type SampleTwoScreenRouteProps = NativeStackScreenProps<
  AppRoutesParams,
  'SampleTwo'
>;

export type CreatePlotStepNineScreenRouteProps = NativeStackScreenProps<
  AppRoutesParams,
  'SampleThree'
>;

export type PicturePhotosScreenRouteProps = NativeStackScreenProps<
  AppRoutesParams,
  'PicturePhotos'
>;
