import { format } from 'date-fns';
import React from 'react';
import { Quotation } from '../../hooks/useHome';
import {
  Container,
  QuotationDate,
  QuotationPrice,
  QuotationVariation
} from './styles';

interface QuotationCardProps {
  data: Quotation;
}

export const QuotationCard: React.FC<QuotationCardProps> = ({ data }) => {
  return (
    <Container color={data.Variacao >= 0 ? 'green' : 'red'}>
      <QuotationDate>
        {format(new Date(data?.DataPublicacao?.split(' ')[0]), 'dd/MM')}
      </QuotationDate>
      <QuotationPrice>R${data.Valor}</QuotationPrice>
      <QuotationVariation>
        {data.Variacao >= 0 ? '+ ' : '- '}
        {data.Variacao}
      </QuotationVariation>
    </Container>
  );
};
