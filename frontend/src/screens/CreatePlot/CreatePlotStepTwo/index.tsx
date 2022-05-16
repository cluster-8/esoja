import { yupResolver } from '@hookform/resolvers/yup';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
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
import { useProperty } from '../../../hooks/useProperty';
import { useSample } from '../../../hooks/useSample';
import { Container, FormContainer, NextStepButton } from './styles';

const stepTwo = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
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
  const { saveStep, getPersistedData } = useSample();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(stepTwo)
  });

  const { getProperties } = useProperty();

  const handleSubmitStepTwo = (data: FieldValues) => {
    if (propertyId === 'default') {
      return setError('Propriedade é obrigatória');
    }
    data.plantingDate = format(new Date(data.plantingDate), 'yyyy-MM-dd');
    saveStep({ ...data, propertyId });
    return navigation.navigate('CreatePlotStepThree');
  };

  useEffect(() => {
    getPersistedData().then(data => {
      if (data) {
        setValue('name', data?.name || '');
        setValue('description', data?.description || '');
        setValue('plantingDate', new Date(data?.plantingDate || new Date()));
        setValue('cropYear', data?.cropYear);
        setPropertyId(data.propertyId || 'default');
      }
    });
  }, [getPersistedData, setValue]);

  useEffect(() => {
    const getSelectData = async (): Promise<void> => {
      const properties = await getProperties('?select=name');
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
  }, [getProperties]);

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
              defaultValueLabel="Selecione a propiedade"
              defaultValue={propertyId}
              selectedValue={propertyId}
              onValueChange={value => setPropertyId(`${value}`)}
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
            name="name"
            control={control}
            errorMessage={errors?.name?.message}
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
          <TextInput
            label="Descrição"
            placeholder="Digite uma descrição"
            icon="check-square"
            name="description"
            control={control}
          />
          <NextStepButton>
            <Button
              title="Continuar"
              onPress={handleSubmit(handleSubmitStepTwo)}
            />
          </NextStepButton>
        </FormContainer>
      </Container>
    </ScrollView>
  );
};
