import React from 'react';
import { Avatar } from 'react-native-paper';
import { defaultImage } from '../../utils/default';
import {
  InformationContainer,
  UserCardContainer,
  UserCardName
} from './styles';

export interface UserCardProps {
  picture: string;
  name: string;
}

export const UserCard: React.FC<UserCardProps> = ({ picture, name }) => {
  return (
    <UserCardContainer>
      <Avatar.Image source={{ uri: picture || defaultImage }} />
      <InformationContainer>
        <UserCardName>{name}</UserCardName>
      </InformationContainer>
    </UserCardContainer>
  );
};
