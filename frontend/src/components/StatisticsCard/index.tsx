import React from 'react';
import { Container, StatisticsCardTitle, StatisticsCardValue } from './styles';

interface StatisticsCardProps {
  title: string;
  value: string;
}

export const StatisticsCard: React.FC<StatisticsCardProps> = ({
  title,
  value
}) => {
  return (
    <Container>
      <StatisticsCardTitle>{title}</StatisticsCardTitle>
      <StatisticsCardValue>{value}</StatisticsCardValue>
    </Container>
  );
};
