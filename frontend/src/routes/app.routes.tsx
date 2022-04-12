import * as React from "react";
import { View, Text } from "react-native";
import { BaseNavigationContainer } from "@react-navigation/core";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigatorProps } from ".";

import { Button } from "../components/atoms/Button";
import { useAuth } from "../hooks/useAuth";
import { Home } from "../screens/Home";

const Stack = createNativeStackNavigator();

const MockScreen = () => {
  const { signOut } = useAuth();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: "#ffffff" }}>Hello World!</Text>
      <Button title="Sair" onPress={() => signOut()} type="tertiary" />
    </View>
  );
};

export const AppRoutes: React.FC<NavigatorProps> = ({ screenOptions }) => {
  return (
    <BaseNavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </BaseNavigationContainer>
  );
};
