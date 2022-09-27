import styled from 'styled-components/native';
import { RFFontSize, RFHeight } from '../../utils/getResponsiveSizes';

export const LoadingIndicatorContainer = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin: ${RFHeight(24)}px 0;
`;

export const LoadingIndicatorText = styled.Text`
  color: ${({ theme }) => theme.colors.background_over};
  font-weight: bold;
  font-size: ${RFFontSize(16)}px;
`;
