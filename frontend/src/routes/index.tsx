import * as React from "react";
import { useTheme } from "styled-components";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import AppLoading from "expo-app-loading";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

import { useAuth } from "../hooks/useAuth";

export interface NavigatorProps {
  screenOptions: NativeStackNavigationOptions;
}

export const Routes: React.FC = () => {
  const theme = useTheme();

  const { authUser, isLoading } = useAuth();

  const screenOptions: NativeStackNavigationOptions = React.useMemo(
    () => ({
      headerShown: false,
      contentStyle: { backgroundColor: theme.colors.background },
      animation: "slide_from_right",
    }),
    [theme]
  );

  if (isLoading) {
    return <AppLoading />;
  }

  return authUser.id ? (
    <AuthRoutes screenOptions={screenOptions} />
  ) : (
    <AppRoutes screenOptions={screenOptions} />
  );
};
