import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AuthRoutesParams = {
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

export type SplashScreenRouteProps = NativeStackScreenProps<
  AuthRoutesParams,
  'Splash'
>;
export type SignInScreenRouteProps = NativeStackScreenProps<
  AuthRoutesParams,
  'SignIn'
>;

export type SignUpScreenRouteProps = NativeStackScreenProps<
  AuthRoutesParams,
  'SignUp'
>;

export type ForgotPasswordScreenRouteProps = NativeStackScreenProps<
  AuthRoutesParams,
  'ForgotPassword'
>;
