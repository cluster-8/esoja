import styled from 'styled-components/native';
import { RFFontSize } from '../../utils/getResponsiveSizes';

export const UserCardContainer = styled.View`
  flex-flow: row;
  align-items: center;
  padding: 24px 0;
  width: 90%;
`;

export const InformationContainer = styled.View`
  flex: 1;
  padding-left: 16px;
`;

export const UserCardName = styled.Text`
  color: ${({ theme }) => theme.colors.background_over};
  font-weight: bold;
  font-size: ${RFFontSize(18)}px;
`;

export const UserCardDescription = styled.Text`
  color: ${({ theme }) => theme.colors.text};
`;
