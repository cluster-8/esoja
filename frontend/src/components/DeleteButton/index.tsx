import React from 'react';
import { ActivityIndicator } from 'react-native';
import { TrashIcon } from '../Select/styles';
import { RectButton } from './styles';

interface ButtonProps {
  showLoadingIndicator?: boolean;
  onPress: () => void;
  style?: Record<string, unknown>;
}

export const DeleteButton: React.FC<ButtonProps> = ({
  showLoadingIndicator,
  onPress,
  style = {}
}) => {
    return (
      <RectButton onPress={onPress} style={style}>
        {showLoadingIndicator ? (
          <ActivityIndicator size="small" color="red" />
        ) : (
          <TrashIcon name="trash-2"/>
        )}
      </RectButton>
    );
};
