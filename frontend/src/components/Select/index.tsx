import { Picker } from '@react-native-community/picker';
import { PickerProps } from '@react-native-community/picker/typings/Picker';
import React from 'react';
import { useTheme } from 'styled-components';
import { translate } from '../../data/I18n';
import { RFWidth } from '../../utils/getResponsiveSizes';
import {
  Container,
  ErrorMessage,
  Icon,
  InputLabel,
  StyledPickerSelect
} from './styles';

type ItemType = {
  value: string;
  label: string;
};
export interface PickerSelectProps extends PickerProps {
  icon?: string;
  defaultValue: string | number;
  defaultValueLabel: string;
  itens: ItemType[];
  label: string;
  error?: string;
}

export const Select: React.FC<PickerSelectProps> = ({
  icon,
  defaultValue,
  defaultValueLabel,
  itens,
  label,
  error,
  ...rest
}) => {
  const theme = useTheme();
  return (
    <>
      {label && <InputLabel>{translate(label)}</InputLabel>}
      <Container error={error}>
        {icon && (
          <Icon
            name={icon}
            size={RFWidth(20)}
            error={error}
            selectedValue={rest.selectedValue}
          />
        )}
        <StyledPickerSelect {...rest}>
          <StyledPickerSelect.Item
            key="default-value"
            label={translate(defaultValueLabel)}
            value={defaultValue}
            color={theme.colors.primary}
          />
          {itens.map(item => (
            <Picker.Item
              color={
                item.value === rest.selectedValue
                  ? theme.colors.primary
                  : theme.colors.text
              }
              key={item.value}
              value={item.value}
              label={translate(item.label)}
            />
          ))}
        </StyledPickerSelect>
      </Container>
      {!!error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  );
};
