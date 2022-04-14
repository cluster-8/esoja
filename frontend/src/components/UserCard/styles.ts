import styled from 'styled-components/native';

export const UserCardContainer = styled.View`
  flex-flow: row;
  align-items: center;
  padding: 24px 16px;
`;

export const InformationContainer = styled.View`
  flex: 1;
  padding-left: 16px;
`;

export const UserCardName = styled.Text`
  color: ${({ theme }) => theme.colors.background_over};
  font-weight: bold;
`;

export const UserCardDescription = styled.Text`
  color: ${({ theme }) => theme.colors.text};
`;
