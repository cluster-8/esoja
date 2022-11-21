import { Feather } from '@expo/vector-icons';
import { FlatList, FlatListProps } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { RFFontSize, RFHeight } from '../../utils/getResponsiveSizes';

interface DataListProps {
  id: string;
  variation: number;
  date: string;
  price: number;
}

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

export const ListHeaderText = styled.Text`
  font-size: ${RFFontSize(18)}px;
  color: ${({ theme }) => theme.colors.text};
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
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
`;

export const SubTitle = styled.Text`
  font-size: ${RFFontSize(16)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;
`;

export const QuotationList = styled(
  FlatList as new (
    props: FlatListProps<DataListProps>
  ) => FlatList<DataListProps>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
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

export const QuotationNavigator = styled.View`
  flex-direction: row;
  width: 100%;
  height: ${RFFontSize(56)}px;
  background-color: ${({ theme }) => theme.colors.background_over};
`;

export const QuotationNavigatorButtonContainer = styled.TouchableOpacity`
  flex-direction: row;
  flex: 1;
  height: ${RFFontSize(56)}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const QuotationNavigatorButton = styled.TouchableOpacity`
  border: 1px solid ${({ theme }) => theme.colors.primary};
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const QuotationNavigatorText = styled.Text`
  font-size: ${RFFontSize(16)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.primary};
`;
