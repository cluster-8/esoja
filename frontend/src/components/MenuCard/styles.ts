import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { RFFontSize, RFHeight, RFWidth } from "../../utils/getResponsiveSizes";

export const MenuCardContainer = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  justify-content: center;
  height: ${RFHeight(160)}px;

  background-color: ${({ theme }) => theme.colors.background_over};
  border-radius: ${RFHeight(8)}px;
`;

export const MenuCardWidgetContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const MenuCardValueContainer = styled.View`
  align-items: center;
  justify-content: center;
  height: ${RFHeight(90)}px;
  width: ${RFWidth(80)}px;
  background-color: ${({ theme }) => theme.colors.background_over};
  border-radius: ${RFHeight(8)}px;
`;

export const MenuCardImage = styled.Image`
  height: ${RFHeight(24)}px;
  width: ${RFWidth(24)}px;
  margin: ${RFHeight(8)}px 0;
`;

export const MenuCardIcon = styled(MaterialCommunityIcons)`
  margin: ${RFHeight(8)}px 0;
  color: ${({ theme }) => theme.colors.primary};
`;

export const MenuCardWidgetIcon = styled(Feather)`
  margin: ${RFHeight(4)}px 0;
`;

export const MenuCardTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
  font-size: ${RFFontSize(24)}px;
`;

export const MenuCardTitleWidget = styled.Text`
  color: ${({ theme }) => theme.colors.background_over};
  font-weight: bold;
  font-size: ${RFFontSize(16)}px;
`;

export const MenuCardValue = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
  font-size: ${RFFontSize(14)}px;
`;
