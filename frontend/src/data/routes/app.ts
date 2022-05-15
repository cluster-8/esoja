import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AppRoutesParams = {
  Home: undefined;
  Weather: undefined;
  Plots: undefined;
  Properties: undefined;
  NewProperty: undefined;
  SeedQuotation: undefined;
  BagQuotation: undefined;
  CreatePlot: undefined;
  CreatePlotStepOne: undefined;
  CreatePlotStepTwo: undefined;
  CreatePlotStepThree: undefined;
  CreatePlotStepFour: undefined;
  CreatePlotStepFive: undefined;
  CreatePlotStepSix: undefined;
  CreatePlotStepSeven: undefined;
  CreatePlotStepEight: undefined;
  CreatePlotStepNine: undefined;
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

export type CreatePlotScreenRouteProps = NativeStackScreenProps<
  AppRoutesParams,
  'CreatePlot'
>;

export type PropertiesScreenRouteProps = NativeStackScreenProps<
  AppRoutesParams,
  'Properties'
>;

export type NewPropertyScreenRouteProps = NativeStackScreenProps<
  AppRoutesParams,
  'NewProperty'
>;

export type SeedQuotationScreenRouteProps = NativeStackScreenProps<
  AppRoutesParams,
  'SeedQuotation'
>;

export type BagQuotationScreenRouteProps = NativeStackScreenProps<
  AppRoutesParams,
  'BagQuotation'
>;

export type CreatePlotStepOneScreenRouteProps = NativeStackScreenProps<
  AppRoutesParams,
  'CreatePlotStepOne'
>;

export type CreatePlotStepTwoScreenRouteProps = NativeStackScreenProps<
  AppRoutesParams,
  'CreatePlotStepTwo'
>;

export type CreatePlotStepThreeScreenRouteProps = NativeStackScreenProps<
  AppRoutesParams,
  'CreatePlotStepThree'
>;

export type CreatePlotStepFourScreenRouteProps = NativeStackScreenProps<
  AppRoutesParams,
  'CreatePlotStepFour'
>;

export type CreatePlotStepFiveScreenRouteProps = NativeStackScreenProps<
  AppRoutesParams,
  'CreatePlotStepFive'
>;

export type CreatePlotStepSixScreenRouteProps = NativeStackScreenProps<
  AppRoutesParams,
  'CreatePlotStepSix'
>;

export type CreatePlotStepSevenScreenRouteProps = NativeStackScreenProps<
  AppRoutesParams,
  'CreatePlotStepSeven'
>;

export type CreatePlotStepEightScreenRouteProps = NativeStackScreenProps<
  AppRoutesParams,
  'CreatePlotStepEight'
>;

export type CreatePlotStepNineScreenRouteProps = NativeStackScreenProps<
  AppRoutesParams,
  'CreatePlotStepNine'
>;
