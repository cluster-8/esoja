import { FlatList, FlatListProps } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';
import { RFHeight } from '../../utils/getResponsiveSizes';

import { DataListProps } from '.';

export const LocationList = styled(
  FlatList as new (
    props: FlatListProps<DataListProps>
  ) => FlatList<DataListProps>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
    display: 'flex',
    justifyContent: 'space-between'
  }
})``;

export const CenteredView = styled.View`
  flex: 0.3;
  justify-content: space-between;

  align-items: flex-start;

  margin-top: ${RFHeight(22)}px;
  background-color: ${({ theme }) => theme.colors.background};

  margin-top: auto;
`;

export const ModalStyled = styled.Modal`
  /* background-color: ${({ theme }) => theme.colors.background}; */
`;

export const ModalView = styled.View`
  width: 100%;
  overflow: hidden;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_over};
  padding: ${RFHeight(16)}px;
`;

export const Button = styled.Pressable`
  border-radius: ${RFHeight(20)}px;
  padding: ${RFHeight(10)}px;
  elevation: 2;
`;

export const TitleStyled = styled.Text`
  font-weight: bold;
  text-align: center;
  margin-top: 8px;
  margin-bottom: 12px;
  font-size: 20px;
`;

export const TextStyled = styled.Text`
  color: white;
  text-align: center;
`;

export const ModalText = styled.Text`
  margin-bottom: ${RFHeight(15)}px;
  text-align: center;
`;
