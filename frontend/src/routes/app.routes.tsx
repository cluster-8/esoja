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
import { Weather } from "../screens/Weather";
import { useTheme } from "styled-components";
import { AppRoutesParams } from "../data/routes/app";
import { CreatePlotStepOne } from "../screens/CreatePlot/CreatePlotStepOne";
import { CreatePlotStepTwo } from "../screens/CreatePlot/CreatePlotStepTwo";
import { Plots } from "../screens/Plots";
import { CreatePlotStepThree } from "../screens/CreatePlot/CreatePlotStepThree";

const Stack = createNativeStackNavigator<AppRoutesParams>();

export const AppRoutes: React.FC<NavigatorProps> = ({ screenOptions }) => {
  const theme = useTheme();
  const options = useMemo<NativeStackNavigationOptions>(
    () => ({
      headerTitleAlign: "center",
      headerStyle: { backgroundColor: theme.colors.primary },
      headerShadowVisible: false,

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
          headerTintColor: theme.colors.white,
        }}
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={Home} options={options} />
        <Stack.Screen name="Plots" component={Plots} options={options} />
        <Stack.Screen
          name="CreatePlotStepOne"
          component={CreatePlotStepOne}
          options={options}
        />
        <Stack.Screen
          name="CreatePlotStepTwo"
          component={CreatePlotStepTwo}
          options={options}
        />
        <Stack.Screen
          name="CreatePlotStepThree"
          component={CreatePlotStepThree}
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
          name="Weather"
          component={Weather}
          options={{
            ...options,
            headerStyle: { backgroundColor: "transparent" },
            headerTransparent: true,
            headerTintColor: theme.colors.white,
          }}
        />
      </Stack.Navigator>
    </BaseNavigationContainer>
  );
};
