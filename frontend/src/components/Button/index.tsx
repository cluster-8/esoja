import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

import { RectButton, TouchableOpacity, ButtonText } from './styles';

interface ButtonProps {
  title: string;
  type?: 'primary' | 'secondary' | 'tertiary';
  showLoadingIndicator?: boolean;
  onPress: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  type = 'primary',
  showLoadingIndicator,
  onPress
}) => {
  const theme = useTheme();

  if (type === 'primary') {
    return (
      <RectButton onPress={onPress}>
        {showLoadingIndicator ? (
          <ActivityIndicator size="large" color={theme.colors.text} />
        ) : (
          <ButtonText type={type}>{title}</ButtonText>
        )}
      </RectButton>
    );
  }

  return (
    <TouchableOpacity type={type} onPress={onPress}>
      {showLoadingIndicator ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : (
        <ButtonText type={type}>{title}</ButtonText>
      )}
    </TouchableOpacity>
  );
};
