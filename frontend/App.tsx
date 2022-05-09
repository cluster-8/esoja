import AppLoading from 'expo-app-loading';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components';
import { i18nConfig } from './src/data/I18n';
import theme from './src/global/styles/theme';
import { useApp } from './src/hooks/useApp';
import { AuthProvider } from './src/hooks/useAuth';
import { HomeProvider } from './src/hooks/useHome';
import { LocationProvider } from './src/hooks/useLocation';
import { SampleProvider } from './src/hooks/useSample';
import { UploadProvider } from './src/hooks/useUpload';
import { Routes } from './src/routes';

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
        <LocationProvider>
          <HomeProvider>
            <SampleProvider>
              <UploadProvider>
                <GestureHandlerRootView style={{ flex: 1 }}>
                  <SafeAreaProvider>
                    <StatusBar
                      barStyle={
                        selectedTheme === 'dark'
                          ? 'light-content'
                          : 'dark-content'
                      }
                      backgroundColor="transparent"
                      translucent
                    />
                    <Routes />
                  </SafeAreaProvider>
                </GestureHandlerRootView>
              </UploadProvider>
            </SampleProvider>
          </HomeProvider>
        </LocationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};
