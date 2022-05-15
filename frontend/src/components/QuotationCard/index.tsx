import React from 'react';
import {
  Container,
  QuotationDate,
  QuotationPrice,
  QuotationVariation
} from './styles';

import { Quote } from '../../screens/SeedQuotation';

interface QuotationCardProps {
  id?: string;
  data: Quote;
}

export const QuotationCard: React.FC<QuotationCardProps> = ({ id, data }) => {
  return (
    <Container key={id} color={data.variation >= 0 ? 'green' : 'red'}>
      <QuotationDate>{data.date}</QuotationDate>
      <QuotationPrice>R${data.price}</QuotationPrice>
      <QuotationVariation>{data.variation}</QuotationVariation>
    </Container>
  );
};
