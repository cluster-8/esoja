import React, { useCallback, useEffect } from 'react';

import Animated, { useAnimatedStyle, useSharedValue, withTiming, interpolate, Extrapolate, runOnJS } from 'react-native-reanimated';
import { BrandText, Container, LogoImage } from './styles';
import { SplashScreenRouteProps } from '../../data/routes/auth';

export const Splash: React.FC<SplashScreenRouteProps> = ({ navigation }) => {
  const splashAnimation = useSharedValue(0);

  const brandImageStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [0, 1])
    };
  });

  const brandTextStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, 0.3, 1]),
      transform: [
        {
          translateX: interpolate(splashAnimation.value, [0, 50], [-50, 0], Extrapolate.CLAMP)
        }
      ]
    };
  });

  const startApp = useCallback(() => {
    navigation.navigate('SignIn');
  }, [navigation]);

  useEffect(() => {
    splashAnimation.value = withTiming(50, { duration: 1000 }, () => {
      'worklet';

      runOnJS(startApp)();
    });
  }, [splashAnimation, startApp]);

  return (
    <Container>
      <Animated.View style={brandImageStyle}>
        <LogoImage />
      </Animated.View>
      <Animated.View style={brandTextStyle}>
        <BrandText>eSoja</BrandText>
      </Animated.View>
    </Container>
  );
};
