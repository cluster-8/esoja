import React from 'react';
import { ActivityIndicator } from 'react-native';
import { ButtonText, RectButton } from './styles';

interface ButtonProps {
  title: string;
  type?: 'primary' | 'secondary' | 'tertiary';
  showLoadingIndicator?: boolean;
  onPress: () => void;
  style?: Record<string, unknown>;
}

export const DeleteButton: React.FC<ButtonProps> = ({
  title,
  showLoadingIndicator,
  onPress,
  style = {}
}) => {
    return (
      <RectButton onPress={onPress} style={style}>
        {showLoadingIndicator ? (
          <ActivityIndicator size="small" color="red" />
        ) : (
          <ButtonText type={'primary'}>{title}</ButtonText>
        )}
      </RectButton>
    );
};
