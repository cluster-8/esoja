import { yupResolver } from '@hookform/resolvers/yup';
import { format } from 'date-fns';
import { Query } from 'nestjs-prisma-querybuilder-interface';
import React, { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Alert, ScrollView } from 'react-native';
import * as yup from 'yup';
import { Button } from '../../../components/Button';
import { DateInput } from '../../../components/DateInput';
import { Select } from '../../../components/Select';
import { StepIndicator } from '../../../components/StepIndicator';
import { TextInput } from '../../../components/TextInput';
import { TextInputMask } from '../../../components/TextInputMask';
import Title from '../../../components/Title';
import { SelectOptions } from '../../../data/Model/SelectOptions';
import { CreatePlotStepTwoScreenRouteProps } from '../../../data/routes/app';
import { useAuth } from '../../../hooks/useAuth';
import { usePlot } from '../../../hooks/usePlot';
import { useProperty } from '../../../hooks/useProperty';
import { Container, FormContainer, NextStepButton } from './styles';

const stepTwo = yup.object().shape({
  description: yup.string().required('Nome é obrigatório'),
  plantingDate: yup.date().required('Data de plantio é obrigatória'),
  cropYear: yup
    .string()
    .required('Ano Safra é obrigatório')
    .min(9, 'Formato invalido ex: 2019/2020)')
});

export const CreatePlotStepTwo: React.FC<CreatePlotStepTwoScreenRouteProps> = ({
  navigation
}) => {
  const [options, setOptions] = useState<SelectOptions[]>([]);
  const [propertyId, setPropertyId] = useState('default');
  const [error, setError] = useState('');
  const { createPlot } = usePlot();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(stepTwo)
  });

  const { authUser } = useAuth();
  const { getProperties } = useProperty();

  const handleSubmitStepTwo = async (data: FieldValues) => {
    if (propertyId === 'default') {
      return setError('Propriedade é obrigatória');
    }
    data.plantingDate = format(new Date(data.plantingDate), 'yyyy-MM-dd');
    try {
      await createPlot({ ...data, propertyId });
      return navigation.navigate('Plots');
    } catch (err) {
      return Alert.alert('Não foi possível criar o talhão');
    }
  };

  useEffect(() => {
    const getSelectData = async (): Promise<void> => {
      const query: Query = {
        select: 'name',
        filter: [{ path: 'userId', operator: 'equals', value: authUser.id }]
      };
      const properties = await getProperties(query);
      if (properties) {
        setOptions(
          properties.map(property => ({
            value: `${property.id}`,
            label: `${property.name}`
          }))
        );
      }
    };
    getSelectData();
  }, [authUser.id, getProperties]);

  return (
    <ScrollView>
      <Container>
        <Title
          title="Identitifique o talhão"
          subtitle="Insira um nome e uma descrição para o seu novo talhão"
        />
        <StepIndicator step={1} />
        <FormContainer>
          {!!options.length && (
            <Select
              placeholder="Selecione uma propriedade"
              selectedValue={propertyId}
              onValueChange={value =>
                value !== 'default' && setPropertyId(`${value}`)
              }
              icon="file-text"
              itens={options}
              label="signUp.stepTwo.genderLabel"
              error={error}
            />
          )}

          <TextInput
            label="Nome"
            placeholder="Digite um nome para o talhão"
            icon="check-square"
            name="description"
            control={control}
            errorMessage={errors?.description?.message}
          />
          <DateInput
            name="plantingDate"
            control={control}
            icon="calendar"
            label="Data de plantio"
            errorMessage={errors?.plantingDate?.message}
            placeholder="Data do plantio"
          />
          <TextInputMask
            mask="9999-9999"
            label="Ano safra"
            placeholder="Informe o ano safra"
            icon="check-square"
            name="cropYear"
            control={control}
            errorMessage={errors?.cropYear?.message}
          />
          <NextStepButton>
            <Button
              title="Finalizar"
              onPress={handleSubmit(handleSubmitStepTwo)}
            />
          </NextStepButton>
        </FormContainer>
      </Container>
    </ScrollView>
  );
};
