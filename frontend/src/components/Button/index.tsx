import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import { ButtonText, RectButton, TouchableOpacity } from './styles';

interface ButtonProps {
  title: string;
  type?: 'primary' | 'secondary' | 'tertiary';
  showLoadingIndicator?: boolean;
  onPress: () => void;
  style?: Record<string, unknown>;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  type = 'primary',
  showLoadingIndicator,
  onPress,
  style = {}
}) => {
  const theme = useTheme();

  if (type === 'primary') {
    return (
      <RectButton onPress={onPress} style={style}>
        {showLoadingIndicator ? (
          <ActivityIndicator size="large" color={theme.colors.text} />
        ) : (
          <ButtonText type={type}>{title}</ButtonText>
        )}
      </RectButton>
    );
  }

  return (
    <TouchableOpacity type={type} onPress={onPress} style={style}>
      {showLoadingIndicator ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : (
        <ButtonText type={type}>{title}</ButtonText>
      )}
    </TouchableOpacity>
  );
};
