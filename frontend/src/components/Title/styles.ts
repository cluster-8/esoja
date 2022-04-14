import styled from "styled-components/native";
import { RFFontSize } from "../../utils/getResponsiveSizes";

export const TitleContainer = styled.View``;

export const TitleStyled = styled.Text`
  margin: 8px 0;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFFontSize(30)}px;
  text-align: center;
  font-weight: bold;
`;

export const SubtitleStyled = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFFontSize(18)}px;
  text-align: center;
  font-weight: normal;
  max-width: 350px;
`;
