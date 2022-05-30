import { useNavigation } from '@react-navigation/core';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions
} from '@react-navigation/native-stack';
import React, { useEffect, useMemo } from 'react';
import { BackHandler, Image } from 'react-native';
import { useTheme } from 'styled-components';
import { NavigatorProps } from '.';
import Logo from '../assets/images/logo-dark.png';
import { AppRoutesParams } from '../data/routes/app';
import { CreatePlotStepEight } from '../screens/CreatePlot/CreatePlotStepEight';
import { CreatePlotStepFive } from '../screens/CreatePlot/CreatePlotStepFive';
import { CreatePlotStepFour } from '../screens/CreatePlot/CreatePlotStepFour';
import { CreatePlotStepNine } from '../screens/CreatePlot/CreatePlotStepNine';
import { CreatePlotStepOne } from '../screens/CreatePlot/CreatePlotStepOne';
import { CreatePlotStepSeven } from '../screens/CreatePlot/CreatePlotStepSeven';
import { CreatePlotStepSix } from '../screens/CreatePlot/CreatePlotStepSix';
import { CreatePlotStepThree } from '../screens/CreatePlot/CreatePlotStepThree';
import { CreatePlotStepTwo } from '../screens/CreatePlot/CreatePlotStepTwo';
import { Home } from '../screens/Home';
import { NewProperty } from '../screens/NewProperty';
import { PlotDetail } from '../screens/PlotDetail';
import { Plots } from '../screens/Plots';
import { Properties } from '../screens/Properties';
import { PropertyDetail } from '../screens/PropertyDetail';
import { QuotationPage as Quotation } from '../screens/Quotation';
import { Statistics } from '../screens/Statistics';
import { Weather } from '../screens/Weather';

const Stack = createNativeStackNavigator<AppRoutesParams>();

export const AppRoutes: React.FC<NavigatorProps> = ({ screenOptions }) => {
  const theme = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
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

  const options = useMemo<NativeStackNavigationOptions>(
    () => ({
      headerTitleAlign: 'center',
      headerStyle: { backgroundColor: theme.colors.primary },
      headerTintColor: theme.colors.white,
      headerShadowVisible: false,

      headerTitle: () => (
        <Image
          style={{
            width: 150,
            height: 50,
            resizeMode: 'contain'
          }}
          source={Logo}
        />
      )
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
      initialRouteName="Home"
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Plots" component={Plots} options={options} />
      <Stack.Screen
        name="PlotDetail"
        component={PlotDetail}
        options={{
          ...options,
          headerStyle: { backgroundColor: 'transparent' },
          headerShadowVisible: true,
          headerTransparent: true
        }}
      />
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
        name="CreatePlotStepFour"
        component={CreatePlotStepFour}
        options={options}
      />
      <Stack.Screen
        name="CreatePlotStepFive"
        component={CreatePlotStepFive}
        options={options}
      />
      <Stack.Screen
        name="CreatePlotStepSix"
        component={CreatePlotStepSix}
        options={options}
      />
      <Stack.Screen
        name="CreatePlotStepSeven"
        component={CreatePlotStepSeven}
        options={options}
      />
      <Stack.Screen
        name="CreatePlotStepEight"
        component={CreatePlotStepEight}
        options={options}
      />
      <Stack.Screen
        name="CreatePlotStepNine"
        component={CreatePlotStepNine}
        options={options}
      />
      <Stack.Screen
        name="Properties"
        component={Properties}
        options={options}
      />
      <Stack.Screen
        name="PropertyDetail"
        component={PropertyDetail}
        options={{
          ...options,
          headerStyle: { backgroundColor: 'transparent' },
          headerShadowVisible: true,
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="NewProperty"
        component={NewProperty}
        options={options}
      />
      <Stack.Screen name="Quotation" component={Quotation} options={options} />
      <Stack.Screen
        name="Statistics"
        component={Statistics}
        options={options}
      />
      <Stack.Screen
        name="Weather"
        component={Weather}
        options={{
          ...options,
          headerStyle: { backgroundColor: 'transparent' },
          headerShadowVisible: true,
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
};
