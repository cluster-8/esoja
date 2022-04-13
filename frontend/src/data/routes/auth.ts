import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type AuthRoutesParams = {
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Home: undefined;
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

export type WeatherScreenRouteProps = NativeStackScreenProps<
  AuthRoutesParams,
  "Weather"
>;
