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

export interface Quote {
  id: string;
  variation: number;
  date: string;
  price: number;
}

const buttons = [
  {
    path: 'SeedQuotation',
    selected: false,
    title: 'Sementes'
  },
  {
    path: 'BagQuotation',
    selected: true,
    title: 'Saca'
  }
];

interface BagQuotationProps {
  navigate: () => void;
  bagQuotation: Quotation[];
}

export const BagQuotation: React.FC<BagQuotationProps> = ({
  navigate,
  bagQuotation
}) => {
  const quotationData = useMemo(() => {
    const x: string[] = [];
    const y: number[] = [];
    bagQuotation.forEach(quotation => {
      x.push(format(new Date(quotation.DataPublicacao.split(' ')[0]), 'dd/MM'));
      y.push(quotation.Valor);
    });
    return { x, y };
  }, [bagQuotation]);

  const handleNavigatorClick = () => {
    navigate();
  };
  return (
    <>
      <Container>
        <Header>
          <Title
            title={translate('quotation.bagPageTitle')}
            subtitle={translate('quotation.bagPageSubtitle')}
          />
        </Header>
        <ListHeaderContainer>
          <ListHeaderText>{translate('quotation.date')}</ListHeaderText>
          <ListHeaderText>{translate('quotation.bagPrice')}</ListHeaderText>
          <ListHeaderText>{translate('quotation.variation')}</ListHeaderText>
        </ListHeaderContainer>
        {bagQuotation.map(
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
