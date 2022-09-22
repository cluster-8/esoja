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
import { SampleThree } from '../screens/CreatePlot/SampleThree';
import { SampleExtraction } from '../screens/CreatePlot/SampleExtraction';
import { NumberPlants } from '../screens/CreatePlot/NumberPlants';
import { PicturePhotos } from '../screens/CreatePlot/PicturePhotos';
import { PlotCoordinates } from '../screens/CreatePlot/PlotCoordinates';
import { SampleTwo } from '../screens/CreatePlot/SampleTwo';
import { SampleOne } from '../screens/CreatePlot/SampleOne';
import { PlantingDistance } from '../screens/CreatePlot/PlantingDistance';
import { PlotIdentification } from '../screens/CreatePlot/PlotIdentification';
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
        name="PlotCoordinates"
        component={PlotCoordinates}
        options={options}
      />
      <Stack.Screen
        name="PlotIdentification"
        component={PlotIdentification}
        options={options}
      />
      <Stack.Screen
        name="PlantingDistance"
        component={PlantingDistance}
        options={options}
      />
      <Stack.Screen
        name="NumberPlants"
        component={NumberPlants}
        options={options}
      />
      <Stack.Screen
        name="SampleExtraction"
        component={SampleExtraction}
        options={options}
      />
      <Stack.Screen
        name="PicturePhotos"
        component={PicturePhotos}
        options={options}
      />
      <Stack.Screen
        name="SampleOne"
        component={SampleOne}
        options={options}
      />
      <Stack.Screen
        name="SampleTwo"
        component={SampleTwo}
        options={options}
      />
      <Stack.Screen
        name="SampleThree"
        component={SampleThree}
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
