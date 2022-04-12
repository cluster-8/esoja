import * as React from "react";
import { BaseNavigationContainer } from "@react-navigation/core";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigatorProps } from ".";

import { Home } from "../screens/Home";
import { Weather } from "../screens/Weather";

const Stack = createNativeStackNavigator();

export const AppRoutes: React.FC<NavigatorProps> = ({ screenOptions }) => {
  return (
    <BaseNavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Weather" component={Weather} />
      </Stack.Navigator>
    </BaseNavigationContainer>
  );
};
