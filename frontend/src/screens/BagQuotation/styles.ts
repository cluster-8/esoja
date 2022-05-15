import { Feather } from '@expo/vector-icons';
import { FlatList, FlatListProps } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';
import { DataListProps } from '.';
import { RFFontSize, RFHeight } from '../../utils/getResponsiveSizes';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 0 24px;
  background-color: ${({ theme }) => theme.colors.background_over};
`;

export const ListHeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: ${RFHeight(4)}px 0;
  padding: ${RFHeight(4)}px ${RFHeight(8)}px;
  border-radius: ${RFHeight(6)}px;
`;

export const QuotationDate = styled.Text`
  font-size: ${RFFontSize(18)}px;
`;
export const QuotationPrice = styled.Text`
  font-size: ${RFFontSize(18)}px;
`;
export const QuotationVariation = styled.Text`
  font-size: ${RFFontSize(18)}px;
`;

export const Header = styled.View`
  margin: ${RFHeight(16)}px 0;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${RFFontSize(18)}px;
  font-family: ${({ theme }) => theme.fonts.bold};

  margin-bottom: 8px;
`;

export const SubTitle = styled.Text`
  font-size: ${RFFontSize(16)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  margin-bottom: 16px;
`;

export const QuotationList = styled(
  FlatList as new (
    props: FlatListProps<DataListProps>
  ) => FlatList<DataListProps>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    // paddingBottom: getBottomSpace(),
    flex: 1
  }
})``;

export const AddButton = styled(RectButton)`
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 10px;
  margin: 35px;
  border-radius: 50px;
`;

export const Icon = styled(Feather)`
  font-size: ${RFFontSize(35)}px;

  color: ${({ theme }) => theme.colors.background_over};
`;
