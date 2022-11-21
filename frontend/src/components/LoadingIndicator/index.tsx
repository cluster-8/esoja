import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import { LoadingIndicatorContainer, LoadingIndicatorText } from './styles';

interface LoadingIndicatorProps {
  message?: string;
  color?: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  message,
  color
}) => {
  const theme = useTheme();
  return (
    <LoadingIndicatorContainer>
      <ActivityIndicator size="large" color={color || theme.colors.text} />
      {!!message && <LoadingIndicatorText>{message}</LoadingIndicatorText>}
    </LoadingIndicatorContainer>
  );
};
