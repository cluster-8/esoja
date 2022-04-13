import React, { useMemo } from "react";
import { Image } from "react-native";
import Logo from "../assets/images/logo-dark.png";

import { BaseNavigationContainer } from "@react-navigation/core";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";

import { NavigatorProps } from ".";

import { Home } from "../screens/Home";
import { Properties } from "../screens/Properties";
import { NewProperty } from "../screens/NewProperty";
import { Cultives } from "../screens/Cultives";
import { Weather } from "../screens/Weather";
import { useTheme } from "styled-components";

const Stack = createNativeStackNavigator();

export const AppRoutes: React.FC<NavigatorProps> = ({ screenOptions }) => {
  const theme = useTheme();
  const options = useMemo<NativeStackNavigationOptions>(
    () => ({
      headerTitleAlign: "center",
      headerStyle: { backgroundColor: theme.colors.primary },

      headerTitle: () => (
        <Image
          style={{
            width: 150,
            height: 50,
            resizeMode: "contain",
          }}
          source={Logo}
        />
      ),
    }),
    [theme]
  );
  return (
    <BaseNavigationContainer>
      <Stack.Navigator
        screenOptions={{
          ...screenOptions,
          headerShown: true,
        }}
        initialRouteName="Home"
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={options}
        />
        <Stack.Screen
          name="Properties"
          component={Properties}
          options={options}
        />
        <Stack.Screen
          name="NewProperty"
          component={NewProperty}
          options={options}
        />
        <Stack.Screen
          name="Cultives"
          component={Cultives}
          options={options}
        />
        <Stack.Screen
          name="Weather"
          component={Weather}
          options={{
            ...options,
            headerStyle: { backgroundColor: "transparent" },
            headerShadowVisible: false,
            headerTransparent: true,
            headerTintColor: theme.colors.white,
          }}
        />
      </Stack.Navigator>
    </BaseNavigationContainer>
  );
};
