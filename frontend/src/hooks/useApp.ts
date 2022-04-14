import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFonts } from 'expo-font';
import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

import { useColorScheme } from 'react-native';

type Theme = 'dark' | 'light';

export const useApp = () => {
  const deviceTheme = useColorScheme();
  const [selectedTheme, setSelectedTheme] = useState<Theme>(deviceTheme || 'dark');

  const handleChageTheme = async (changeTheme: Theme = 'dark') => {
    setSelectedTheme(changeTheme);
    AsyncStorage.setItem('@esoja:theme', changeTheme);
  };

  const getStoredTheme = async () => {
    const storedTheme = await AsyncStorage.getItem('@esoja:theme');
    if (storedTheme) {
      setSelectedTheme(storedTheme as Theme);
    }
  };

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold
  });

  return {
    handleChageTheme,
    getStoredTheme,
    fontsLoaded,
    selectedTheme
  };
};
