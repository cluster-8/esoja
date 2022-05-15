import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { CultiveCardProps } from '../../components/PlotCard';
import { QuotationCard } from '../../components/QuotationCard';
import { Select } from '../../components/Select';
import Title from '../../components/Title';
import { SeedQuotationScreenRouteProps } from '../../data/routes/app';
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

export const SeedQuotation: React.FC<SeedQuotationScreenRouteProps> = ({
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
      date: '2014/15',
      price: 228.96
    },
    {
      id: '3',
      variation: -3,
      date: '2015/16',
      price: 230.12
    },
    {
      id: '4',
      variation: 1,
      date: '2016/17',
      price: 233.02
    },
    {
      id: '5',
      variation: 2,
      date: '2017/18',
      price: 231.18
    },
    {
      id: '6',
      variation: -3,
      date: '2018/19',
      price: 234.12
    },
    {
      id: '7',
      variation: 1,
      date: '2019/20',
      price: 229.02
    },
    {
      id: '8',
      variation: 2,
      date: '2020/21',
      price: 228.18
    },
    {
      id: '9',
      variation: -3,
      date: '2021/22',
      price: 225.12
    },
    {
      id: '10',
      variation: 1,
      date: '2022/23',
      price: 227.02
    }
  ];

  const quotationData: ChartData = {
    x: [
      '2014/15',
      '2015/16',
      '2016/17',
      '2017/18',
      '2018/19',
      '2019/20',
      '2020/21',
      '2021/22',
      '2022/23'
    ],
    y: [228.96, 230.12, 233.02, 231.18, 234.12, 229.02, 228.18, 225.12, 227.02]
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
          title={translate('quotation.seedPageTitle')}
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
        <QuotationPrice>{translate('quotation.seedPrice')}</QuotationPrice>
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
