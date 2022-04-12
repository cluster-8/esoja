import React, { useEffect } from "react";
import AppLoading from "expo-app-loading";
import { ThemeProvider } from "styled-components";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useApp } from "./src/hooks/useApp";
import { AuthProvider } from "./src/hooks/useAuth";

import { i18nConfig } from "./src/data/I18n";

import theme from "./src/global/styles/theme";

import { Routes } from "./src/routes";
import { HomeProvider } from "./src/hooks/useHome";

export const App: React.FC = () => {
  const { handleChageTheme, getStoredTheme, fontsLoaded, selectedTheme } =
    useApp();

  useEffect(() => {
    i18nConfig();
    getStoredTheme();
  }, [getStoredTheme]);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme[selectedTheme]}>
      <AuthProvider>
        <HomeProvider>
          <StatusBar
            barStyle={
              selectedTheme === "dark" ? "light-content" : "dark-content"
            }
            backgroundColor={theme[selectedTheme].colors.background}
            translucent
          />
          <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
              <Routes />
            </SafeAreaProvider>
          </GestureHandlerRootView>
        </HomeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};
