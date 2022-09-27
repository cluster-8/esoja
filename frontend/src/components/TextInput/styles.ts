import { Feather } from '@expo/vector-icons';
import styled, { css } from 'styled-components/native';
import { RFFontSize, RFHeight, RFWidth } from '../../utils/getResponsiveSizes';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
  editable: boolean;
}

interface FeatherIconProps {
  isFocusedOrFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.View`
  width: 100%;
  margin-bottom: ${RFWidth(8)}px;
`;

export const InnerContainer = styled.View<ContainerProps>`
  width: 100%;
  min-height: ${RFHeight(56)}px;
  padding: 0 ${RFWidth(16)}px;
  background: ${({ theme, editable }) =>
    editable ? theme.colors.background_over : theme.colors.background};
  border-radius: ${RFHeight(8)}px;
  border-width: ${RFWidth(2)}px;
  border-color: ${({ theme }) => theme.colors.details};
  flex-direction: row;
  align-items: center;
  position: relative;

  ${props =>
    props.isErrored
      ? css`
          border-color: ${({ theme }) => theme.colors.attention};
        `
      : props.isFocused &&
        css`
          border-color: ${({ theme }) => theme.colors.primary};
        `}
`;

export const RNTextInput = styled.TextInput`
  flex: 1;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFFontSize(16)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  padding-left: 0px;
  padding-right: 0px;
`;

export const FeatherIcon = styled(Feather)<FeatherIconProps>`
  margin-right: ${RFWidth(16)}px;
  color: ${({ theme }) => theme.colors.details};

  ${({ isFocusedOrFilled, theme }) =>
    isFocusedOrFilled &&
    css`
      color: ${theme.colors.primary};
    `}

  ${({ isErrored, theme }) =>
    isErrored &&
    css`
      color: ${theme.colors.attention};
    `}
`;

export const InputLabel = styled.Text`
  color: ${({ theme }) => theme.colors.text_secondary};
  font-size: ${RFFontSize(14)}px;
  margin-top: ${RFHeight(12)}px;
  margin-bottom: ${RFHeight(8)}px;
`;

export const ErrorMessage = styled.Text`
  color: ${({ theme }) => theme.colors.attention};
  font-size: ${RFFontSize(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-top: ${RFHeight(4)}px;
`;
