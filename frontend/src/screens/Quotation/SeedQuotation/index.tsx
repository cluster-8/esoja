/* eslint-disable react/no-array-index-key */
import { format } from 'date-fns';
import React, { useMemo } from 'react';
import { LineChartPlot } from '../../../components/LineChartPlot';
import { NavigationBar } from '../../../components/NavigationBar';
import { QuotationCard } from '../../../components/QuotationCard';
import Title from '../../../components/Title';
import { translate } from '../../../data/I18n';
import { Quotation } from '../../../hooks/useHome';
import {
  Container,
  Header,
  ListHeaderContainer,
  ListHeaderText,
  QuotationNavigator
} from '../styles';

export interface DataListProps {
  id: string;
  variation: number;
  date: string;
  price: number;
}

export interface Quote {
  id: string;
  variation: number;
  date: string;
  price: number;
}

const buttons = [
  {
    path: 'SeedQuotation',
    selected: true,
    title: 'Sementes'
  },
  {
    path: 'BagQuotation',
    selected: false,
    title: 'Saca'
  }
];

interface SeedQuotationProps {
  navigate: () => void;
  seedQuotation: Quotation[];
}

export const SeedQuotation: React.FC<SeedQuotationProps> = ({
  navigate,
  seedQuotation
}) => {
  const quotationData = useMemo(() => {
    const x: string[] = [];
    const y: number[] = [];
    seedQuotation.forEach(quotation => {
      if (quotation?.DataPublicacao) {
        x.push(
          format(new Date(quotation.DataPublicacao.split(' ')[0]), 'dd/MM')
        );
        y.push(quotation.Valor);
      }
    });
    return { x, y };
  }, [seedQuotation]);

  const handleNavigatorClick = () => {
    navigate();
  };
  return (
    <>
      <Container>
        <Header>
          <Title
            title={translate('quotation.seedPageTitle')}
            subtitle="Valores baseados no preço da semente convencional do estado do Mato Grosso do Sul"
          />
        </Header>
        <ListHeaderContainer>
          <ListHeaderText>{translate('quotation.date')}</ListHeaderText>
          <ListHeaderText>{translate('quotation.bagPrice')}</ListHeaderText>
          <ListHeaderText>{translate('quotation.variation')}</ListHeaderText>
        </ListHeaderContainer>
        {seedQuotation.map(
          (item, i) => i <= 3 && <QuotationCard key={i} data={item} />
        )}
        {!!quotationData?.x?.length && (
          <LineChartPlot
            title={translate('quotation.chartTitle')}
            data={quotationData}
          />
        )}
      </Container>
      <QuotationNavigator>
        <NavigationBar buttons={buttons} onPress={handleNavigatorClick} />
      </QuotationNavigator>
    </>
  );
};
