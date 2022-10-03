import { useNavigation } from '@react-navigation/core';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions
} from '@react-navigation/native-stack';
import * as React from 'react';
import { BackHandler } from 'react-native';
import { useTheme } from 'styled-components';
import { NavigatorProps } from '.';
import { AuthRoutesParams } from '../data/routes/auth';
import { PicturePhotos } from '../screens/CreatePlot/PicturePhotos';
import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';

const Stack = createNativeStackNavigator<AuthRoutesParams>();

export const AuthRoutes: React.FC<NavigatorProps> = ({ screenOptions }) => {
  const theme = useTheme();
  const navigation = useNavigation();

  React.useEffect(() => {
    const handleBackAction = () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        BackHandler.exitApp();
      }
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackAction
    );
    return () => backHandler.remove();
  }, [navigation]);

  const options = React.useMemo<NativeStackNavigationOptions>(
    () => ({
      headerTintColor: theme.colors.primary,
      headerShadowVisible: false,
      headerTitle: ''
    }),
    [theme]
  );

  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions,
        headerShown: true,
        headerTintColor: theme.colors.white
      }}
    >
      <Stack.Screen
        name="SignIn"
        component={PicturePhotos}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="SignUp" component={SignUp} options={options} />
    </Stack.Navigator>
  );
};
