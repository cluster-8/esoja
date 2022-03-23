import React from 'react';
import { Text } from 'react-native';

import { useTheme } from 'styled-components';

import { SignInScreenRouteProps } from '../../data/routes/auth';

import { Container } from './styles';

export const SignUp: React.FC<SignInScreenRouteProps> = () => {
  const theme = useTheme();

  return (
    <Container>
      <Text style={{ fontSize: 24, color: theme.colors.text }}>SignUp</Text>
    </Container>
  );
};
