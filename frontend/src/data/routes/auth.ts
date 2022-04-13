import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type AuthRoutesParams = {
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Home: undefined;
  Properties: undefined;
  NewProperty: undefined;
  Cultives: undefined;
  Weather: undefined;
};

export type SplashScreenRouteProps = NativeStackScreenProps<
  AuthRoutesParams,
  "Splash"
>;
export type SignInScreenRouteProps = NativeStackScreenProps<
  AuthRoutesParams,
  "SignIn"
>;

export type SignUpScreenRouteProps = NativeStackScreenProps<
  AuthRoutesParams,
  "SignUp"
>;

export type HomeScreenRouteProps = NativeStackScreenProps<
  AuthRoutesParams,
  "Home"
>;

export type PropertiesScreenRouteProps = NativeStackScreenProps<
  AuthRoutesParams,
  "Properties"
>;

export type NewPropertyScreenRouteProps = NativeStackScreenProps<
  AuthRoutesParams,
  "NewProperty"
>;

export type CultivesScreenRouteProps = NativeStackScreenProps<
  AuthRoutesParams,
  "Cultives"
>;

export type WeatherScreenRouteProps = NativeStackScreenProps<
  AuthRoutesParams,
  "Weather"
>;
