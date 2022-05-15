import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { CultiveCardProps } from '../../components/PlotCard';
import { QuotationCard } from '../../components/QuotationCard';
import { Select } from '../../components/Select';
import Title from '../../components/Title';
import { BagQuotationScreenRouteProps } from '../../data/routes/app';
import { useSample } from '../../hooks/useSample';
import { translate } from '../../data/I18n';
import {
  AddButton,
  Container,
  Header,
  Icon,
  QuotationList,
  ListHeaderContainer,
  QuotationDate,
  QuotationPrice,
  QuotationVariation
} from './styles';

import { LineChartPlot } from '../../components/LineChartPlot';

// import { QuotationNavigator } from '../../components/QuotationNavigator';

// export interface DataListProps extends CultiveCardProps {
//   id: string;
// }
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

export interface ChartData {
  x: string[];
  y: number[];
}

const cityOptions: any = [
  {
    label: 'São José dos Campos',
    value: '1'
  },
  {
    label: 'Caçapava',
    value: '2'
  },
  {
    label: 'Jacareí',
    value: '3'
  },
  {
    label: 'Jambeiro',
    value: '4'
  }
];

export const BagQuotation: React.FC<BagQuotationScreenRouteProps> = ({
  navigation
}) => {
  const [city, setCity] = useState<string | number>(cityOptions[0]);
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const data: Quote[] = [
    {
      id: '2',
      variation: 2,
      date: '07/05/2022',
      price: 164.18
    },
    {
      id: '3',
      variation: -3,
      date: '08/05/2022',
      price: 163.12
    },
    {
      id: '4',
      variation: 1,
      date: '09/05/2022',
      price: 164.02
    },
    {
      id: '5',
      variation: 2,
      date: '10/05/2022',
      price: 164.18
    },
    {
      id: '6',
      variation: -3,
      date: '11/05/2022',
      price: 163.12
    },
    {
      id: '7',
      variation: 1,
      date: '12/05/2022',
      price: 164.02
    },
    {
      id: '8',
      variation: 2,
      date: '13/05/2022',
      price: 164.18
    },
    {
      id: '9',
      variation: -3,
      date: '14/05/2022',
      price: 163.12
    },
    {
      id: '10',
      variation: 1,
      date: '15/05/2022',
      price: 164.02
    }
  ];

  const quotationData: ChartData = {
    x: [
      '07/05',
      '08/05',
      '09/05',
      '10/05',
      '11/05',
      '12/05',
      '13/05',
      '14/05',
      '15/05'
    ],
    y: [164.18, 163.12, 164.02, 164.18, 163.12, 164.02, 164.18, 163.12, 164.02]
  };

  const [plots, setPlots] = useState<any[]>([]);
  const { getPlot } = useSample();

  const getData = useCallback(async () => {
    setPlots(await getPlot());
  }, [getPlot]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Container>
      <Header>
        <Title
          title={translate('quotation.bagPageTitle')}
          subtitle={translate('quotation.pageDescription')}
        />
      </Header>

      <Select
        defaultValueLabel="labelUndefined"
        defaultValue={city}
        selectedValue={city}
        onValueChange={value => setCity(value as string)}
        icon="file-text"
        itens={cityOptions}
        label="quotation.selectTitle"
      />

      <ListHeaderContainer>
        <QuotationDate>{translate('quotation.date')}</QuotationDate>
        <QuotationPrice>{translate('quotation.bagPrice')}</QuotationPrice>
        <QuotationVariation>
          {translate('quotation.variation')}
        </QuotationVariation>
      </ListHeaderContainer>

      {data.map((item, index) => {
        if (index <= 3) {
          // eslint-disable-next-line react/no-array-index-key
          return <QuotationCard key={index} data={item} />;
        }
        return null;
      })}

      {/* <QuotationList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => {
          if (index <= 3) {
            return <QuotationCard data={item} />;
          }
          return null;
        }}
        ListFooterComponent={
          <LineChartPlot
            title={translate('quotation.chartTitle')}
            data={quotationData}
          />
        }
      /> */}

      <LineChartPlot
        title={translate('quotation.chartTitle')}
        data={quotationData}
      />

      {/* <QuotationNavigator /> */}
    </Container>
  );
};
