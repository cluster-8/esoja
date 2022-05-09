import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import * as React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { useAuth } from '../hooks/useAuth';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

export interface NavigatorProps {
  screenOptions: NativeStackNavigationOptions;
}

export const Routes: React.FC = () => {
  const theme = useTheme();

  const { authUser } = useAuth();

  const screenOptions: NativeStackNavigationOptions = React.useMemo(
    () => ({
      headerShown: false,
      contentStyle: { backgroundColor: theme.colors.background },
      animation: 'slide_from_right'
    }),
    [theme]
  );

  return !authUser.id ? (
    <AuthRoutes screenOptions={screenOptions} />
  ) : (
    <>
      <StatusBar backgroundColor={theme.colors.primary} translucent />
      <AppRoutes screenOptions={screenOptions} />
    </>
  );
};
