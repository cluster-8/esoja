import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CultiveCardProps } from '../../components/PlotCard';
import { QuotationCard } from '../../components/QuotationCard';
import { Select } from '../../components/Select';
import Title from '../../components/Title';
import { QuotationScreenRouteProps } from '../../data/routes/app';
import { translate } from 'i18n-js';
import { useSample } from '../../hooks/useSample';
import { AddButton, Container, Header, Icon, QuotationList } from './styles';

export interface DataListProps extends CultiveCardProps {
  id: string;
}

const genderOptions = [
  {
    value: 'MALE',
    label: 'labelMale'
  },
  {
    value: 'FEMALE',
    label: 'labelFemale'
  },
  {
    value: 'NON_BINARY',
    label: 'labelNotBinary'
  },
  {
    value: 'OTHER',
    label: 'labelOther'
  }
];

export const Quotation: React.FC<QuotationScreenRouteProps> = ({
  navigation
}) => {
  const [gender, setGender] = useState('NOT_DEFINED');
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const data = [
    {
      id: '2',
      variation: 2,
      date: 40,
      price: 10
    },
    {
      id: '3',
      variation: -3,
      date: '40',
      price: '10'
    },
    {
      id: '4',
      variation: 1,
      date: '40',
      price: '10'
    }
  ];
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
          title={translate('quotation.title')}
          subtitle={translate('quotation.subtitle')}
        />
      </Header>

      <Select
        defaultValueLabel="labelUndefined"
        defaultValue={gender}
        selectedValue={gender}
        onValueChange={value => setGender(value as string)}
        icon="file-text"
        itens={genderOptions}
        label="signUp.stepTwo.genderLabel"
      />

      <QuotationList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <QuotationCard data={item} />}
      />

      <AddButton onPress={() => navigation.navigate('CreatePlotStepOne')}>
        <Icon name="plus" />
      </AddButton>
    </Container>
  );
};
