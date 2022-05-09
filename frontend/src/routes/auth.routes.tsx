import { BaseNavigationContainer } from '@react-navigation/core';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions
} from '@react-navigation/native-stack';
import * as React from 'react';
import { useTheme } from 'styled-components';
import { NavigatorProps } from '.';
import { AuthRoutesParams } from '../data/routes/auth';
import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';

/* import { Splash } from '../pages/Splash';
 */
const Stack = createNativeStackNavigator<AuthRoutesParams>();

export const AuthRoutes: React.FC<NavigatorProps> = ({ screenOptions }) => {
  const theme = useTheme();
  const options = React.useMemo<NativeStackNavigationOptions>(
    () => ({
      headerTintColor: theme.colors.primary,
      headerShadowVisible: false,
      headerTitle: ''
    }),
    [theme]
  );

  return (
    <BaseNavigationContainer>
      <Stack.Navigator
        screenOptions={{
          ...screenOptions,
          headerShown: true,
          headerTintColor: theme.colors.white
        }}
      >
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="SignUp" component={SignUp} options={options} />
      </Stack.Navigator>
    </BaseNavigationContainer>
  );
};
