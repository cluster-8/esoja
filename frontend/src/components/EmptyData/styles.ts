import styled from 'styled-components/native';
import { RFFontSize, RFHeight } from '../../utils/getResponsiveSizes';

export const EmptyDataContainer = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin: ${RFHeight(24)}px 0;
`;

export const EmptyDataMessage = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFFontSize(16)}px;
`;
