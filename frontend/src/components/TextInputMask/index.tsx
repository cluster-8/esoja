import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Control, useController } from 'react-hook-form';
import { TextInputProps as RNTextInputProps } from 'react-native';
import { useTheme } from 'styled-components';
import { translate } from '../../data/I18n';
import { RFFontSize } from '../../utils/getResponsiveSizes';

import {
  InnerContainer,
  FeatherIcon,
  ErrorMessage,
  Container,
  InputLabel,
  RNTextInput
} from './styles';

interface TextInputProps extends RNTextInputProps {
  icon?: string;
  containerStyle?: Record<string, unknown>;
  name: string;
  label?: string;
  control?: Control;
  errorMessage?: string;
  mask: string;
}

export const TextInputMask: React.FC<TextInputProps> = ({
  icon,
  containerStyle = {},
  name,
  label,
  control,
  mask,
  errorMessage,
  defaultValue,
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
    defaultValue
  });

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback((value: string) => {
    setIsFocused(false);
    setIsFilled(!!value);
  }, []);

  useEffect(() => {
    if (defaultValue) {
      handleInputBlur(defaultValue);
    }
  }, [defaultValue, handleInputBlur]);

  return (
    <Container>
      {label && <InputLabel>{translate(label)}</InputLabel>}
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
          type="custom"
          value={field.value}
          options={{ mask }}
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
