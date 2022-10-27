import React from 'react';
import { ActivityIndicator } from 'react-native';
import { TrashIcon } from '../Select/styles';
import { RectButton } from './styles';

interface ButtonProps {
  showLoadingIndicator?: boolean;
  onPress: () => void;
  style?: Record<string, unknown>;
}

export const DeleteButtonLarge: React.FC<ButtonProps> = ({
  showLoadingIndicator,
  onPress,
  style = {}
}) => {
    return (
      <RectButton onPress={onPress} style={style}>
        {showLoadingIndicator ? (
          <ActivityIndicator size="large" color="red" />
        ) : (
          <TrashIcon name="trash-2"/>
        )}
      </RectButton>
    );
};
