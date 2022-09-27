import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { Control, useController } from 'react-hook-form';
import { Platform } from 'react-native';
import { useTheme } from 'styled-components';
import { translate } from '../../data/I18n';
import { RFFontSize } from '../../utils/getResponsiveSizes';
import {
  Container,
  ErrorMessage,
  FeatherIcon,
  InnerContainer,
  InputLabel,
  PickerPressable,
  ValueText
} from './styles';

interface TextInputProps {
  icon?: string;
  containerStyle?: Record<string, unknown>;
  maximumDate?: Date;
  minimumDate?: Date;
  defaultValue?: string;
  name: string;
  label?: string;
  control: Control;
  errorMessage?: string;
  placeholder?: string;
}

export const DateInput: React.FC<TextInputProps> = ({
  icon,
  containerStyle = {},
  name,
  label,
  control,
  maximumDate,
  minimumDate,
  defaultValue,
  errorMessage,
  placeholder
}) => {
  const theme = useTheme();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { field } = useController({
    name,
    control,
    defaultValue
  });

  const handleDateChanged = (
    date: Date | undefined,
    onChange: (...event: any[]) => void
  ) => {
    setShowDatePicker(false);
    if (date) {
      onChange(date);
    }
  };

  return (
    <Container>
      {label && <InputLabel>{translate(label)}</InputLabel>}
      <InnerContainer
        style={containerStyle}
        isFocused={showDatePicker}
        isErrored={!!errorMessage}
      >
        <PickerPressable
          onPress={() => setShowDatePicker(prevState => !prevState)}
          rippleColor={theme.colors.background}
        >
          {!!icon && (
            <FeatherIcon
              name={icon}
              size={RFFontSize(20)}
              isFocusedOrFilled={showDatePicker || field.value}
              isErrored={!!errorMessage}
            />
          )}
          {!!field.value && (
            <ValueText>{format(field.value, 'dd/MM/yyyy')}</ValueText>
          )}

          {!field.value && placeholder && (
            <ValueText isPlaceholder>{placeholder}</ValueText>
          )}
        </PickerPressable>
      </InnerContainer>
      {showDatePicker && (
        <DateTimePicker
          mode="date"
          display={Platform.OS === 'ios' ? 'compact' : 'calendar'}
          onChange={(_event: any, date?: Date) =>
            handleDateChanged(date, field.onChange)
          }
          value={field.value || new Date()}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
        />
      )}

      {errorMessage && <ErrorMessage>{translate(errorMessage)}</ErrorMessage>}
    </Container>
  );
};
