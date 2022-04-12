import * as React from "react";
import { BaseNavigationContainer } from "@react-navigation/core";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigatorProps } from ".";

import { AuthRoutesParams } from "../data/routes/auth";

import { SignIn } from "../screens/SignIn";
import { SignUp } from "../screens/SignUp";
/* import { Splash } from '../pages/Splash';
 */
const Stack = createNativeStackNavigator<AuthRoutesParams>();

export const AuthRoutes: React.FC<NavigatorProps> = ({ screenOptions }) => {
  return (
    <BaseNavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </BaseNavigationContainer>
  );
};
