import styled, { css } from "styled-components/native";
import { RFFontSize, RFWidth } from "../../utils/getResponsiveSizes";

interface WeekDayItemProps {
  selectedDate: boolean;
}

export const WeekDayCardContainer = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const WeekDayItem = styled.Text<WeekDayItemProps>`
  justify-content: center;
  align-items: center;
  padding: ${RFWidth(4)}px;
  border-radius: ${RFWidth(4)}px;
  font-size: ${RFFontSize(20)}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};

  ${({ selectedDate }) =>
    selectedDate &&
    css`
      color: ${({ theme }) => theme.colors.text};
      background-color: ${({ theme }) => theme.colors.white};
    `}
`;
