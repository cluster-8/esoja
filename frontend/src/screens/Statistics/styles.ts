import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { RFFontSize, RFHeight, RFWidth } from '../../utils/getResponsiveSizes';

export const HomeContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  padding-top: ${RFHeight(60)}px;
`;

export const HeaderContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${RFWidth(16)}px;
`;

export const HeaderButtonContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 10%;
`;

interface HeaderButtonProps {
  color: string;
}
export const HeaderButton = styled.TouchableOpacity<HeaderButtonProps>`
  background-color: ${({ theme, color }) =>
    color === 'attention' ? theme.colors.attention : theme.colors.success};
  height: ${RFHeight(40)}px;
  width: ${RFWidth(40)}px;
  align-items: center;
  justify-content: center;
  border-radius: ${RFHeight(6)}px;
  margin: ${RFHeight(4)}px 0;
`;

export const HeaderButtonIcon = styled(Feather)`
  font-size: ${RFFontSize(18)}px;
  color: ${({ theme }) => theme.colors.white};
`;

export const HomeMenuContainer = styled.View`
  position: relative;
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: ${RFHeight(40)}px;
  background-color: ${({ theme }) => theme.colors.background};
  border-top-left-radius: ${RFHeight(24)}px;
  border-top-right-radius: ${RFHeight(24)}px;
`;

export const HomeMenuCardWidgetContainer = styled.View`
  flex-direction: row;
  position: absolute;
  top: -${RFHeight(40)}px;
  justify-content: space-evenly;
  width: 100%;
`;

export const HomeMenuContentContainer = styled.View`
  flex: 1;
  width: 100%;
  margin: ${RFHeight(60)}px 0;
  padding: 0 ${RFHeight(16)}px;
`;

export const MenuCardContainer = styled.View`
  flex: 1;
  width: 100%;
  margin-top: ${RFHeight(40)}px;
`;
