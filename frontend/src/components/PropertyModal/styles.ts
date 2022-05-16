import { Feather } from '@expo/vector-icons';
import { FlatList, FlatListProps } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';
import { Property } from '../../data/Model/Property';
import { RFFontSize, RFHeight, RFWidth } from '../../utils/getResponsiveSizes';

export const LocationList = styled(
  FlatList as new (props: FlatListProps<Property>) => FlatList<Property>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
    display: 'flex',
    justifyContent: 'space-between'
  }
})``;

export const CenteredView = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  margin-top: ${RFHeight(22)}px;
  background-color: transparent;
  margin-top: auto;
`;

export const ModalStyled = styled.Modal`
  /* background-color: ${({ theme }) => theme.colors.background}; */
`;

export const ModalView = styled.View`
  position: relative;
  border-top-left-radius: ${RFHeight(32)}px;
  border-top-right-radius: ${RFHeight(32)}px;
  width: 100%;
  overflow: hidden;
  height: 30%;
  background-color: ${({ theme }) => theme.colors.background_over};
  padding: ${RFHeight(16)}px;
`;

export const Button = styled.Pressable`
  border-radius: ${RFHeight(20)}px;
  padding: ${RFHeight(10)}px;
`;

export const TitleStyled = styled.Text`
  font-weight: bold;
  text-align: center;
  margin-top: 8px;
  margin-bottom: 12px;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.text};
`;

export const TextStyled = styled.Text`
  color: white;
  text-align: center;
`;

export const ModalText = styled.Text`
  margin-bottom: ${RFHeight(15)}px;
  text-align: center;
`;

export const CloseButtonIcon = styled(Feather)`
  font-size: ${RFFontSize(24)}px;
  color: ${({ theme }) => theme.colors.attention};
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  right: ${RFWidth(16)}px;
  top: ${RFHeight(16)}px;
  height: ${RFHeight(30)}px;
  width: ${RFWidth(30)}px;
  align-items: center;
  justify-content: center;
`;
