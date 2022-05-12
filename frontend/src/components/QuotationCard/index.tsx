import React from 'react';
import {
  Container,
  QuotationDate,
  QuotationPrice,
  QuotationVariation
} from './styles';

interface QuotationCardProps {
  id: string;
  variation: number;
  date: string;
  price: string;
}

export const QuotationCard: React.FC<QuotationCardProps> = ({
  id,
  variation,
  date,
  price
}) => {
  return (
    <Container color={variation >= 0 ? 'green' : 'red'}>
      <QuotationDate>{date}</QuotationDate>
      <QuotationPrice>{price}</QuotationPrice>
      <QuotationVariation>{variation}</QuotationVariation>
    </Container>
  );
};
