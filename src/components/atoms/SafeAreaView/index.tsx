import React from 'react';
import { Platform, ViewProps } from 'react-native';

import { AndroidSafeAreaView, IOSSafeAreaView } from './styles';

type SafeAreaViewProps = ViewProps;

export const SafeAreaView: React.FC<SafeAreaViewProps> = ({
  children,
  ...rest
}) => {
  if (Platform.OS === 'android') {
    return <AndroidSafeAreaView {...rest}>{children}</AndroidSafeAreaView>;
  }

  return <IOSSafeAreaView {...rest}>{children}</IOSSafeAreaView>;
};
