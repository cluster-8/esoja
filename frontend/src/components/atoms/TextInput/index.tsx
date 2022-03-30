import React, { useState, useCallback, useRef } from 'react';
import { Control, useController } from 'react-hook-form';
import { TextInputProps as RNTextInputProps } from 'react-native';
import { useTheme } from 'styled-components';
import { translate } from '../../../data/I18n';

import { RFFontSize } from '../../../utils/getResponsiveSizes';

import {
  InnerContainer,
  RNTextInput,
  FeatherIcon,
  ErrorMessage,
  Container,
} from './styles';

interface TextInputProps extends RNTextInputProps {
  icon?: string;
  containerStyle?: Record<string, unknown>;
  name: string;
  control: Control;
  errorMessage?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  icon,
  containerStyle = {},
  name,
  control,
  errorMessage,
  ...rest
}) => {
  const theme = useTheme();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputElementRef = useRef<any>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { field } = useController({
    name,
    control,
    defaultValue: '',
  });

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback((value: string) => {
    setIsFocused(false);
    setIsFilled(!!value);
  }, []);

  return (
    <Container>
      <InnerContainer
        style={containerStyle}
        isFocused={isFocused}
        isErrored={!!errorMessage}
      >
        {!!icon && (
          <FeatherIcon
            name={icon}
            size={RFFontSize(20)}
            isFocusedOrFilled={isFocused || isFilled}
            isErrored={!!errorMessage}
          />
        )}

        <RNTextInput
          {...rest}
          value={field.value}
          ref={inputElementRef}
          keyboardAppearance="dark"
          placeholderTextColor={theme.colors.details}
          onFocus={handleInputFocus}
          onBlur={() => handleInputBlur(field.value)}
          onChangeText={field.onChange}
        />
      </InnerContainer>

      {errorMessage && <ErrorMessage>{translate(errorMessage)}</ErrorMessage>}
    </Container>
  );
};
