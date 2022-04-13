import styled from 'styled-components/native';
import { RFHeight } from "../../utils/getResponsiveSizes";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const TouchableWithoutFeedback = styled.TouchableWithoutFeedback`
  flex: 1;
`;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background_over};
`;

export const Header = styled.View`
  margin-top: ${RFPercentage(6)}px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  `;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.bold};

  margin-bottom: 8px;
`;

export const SubTitle = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  margin-bottom: 16px;
`;


export const MenuContainer = styled.View`
  position: relative;
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: ${RFHeight(32)}px;
  background-color: ${({ theme }) => theme.colors.background};
  border-top-left-radius: ${RFHeight(24)}px;
  border-top-right-radius: ${RFHeight(24)}px;
`;

export const Form = styled.View`
  flex: 1;
  justify-content: space-between;
  width: 100%;

  padding: 24px;
`;

export const Fields = styled.View`
  align-items: center;
`;

export const AvatarField = styled.View`
  margin-bottom: ${RFHeight(24)}px;
`;
