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
import { translate } from '../../../data/I18n';


const stepTwo = yup.object().shape({
  description: yup.string().required('CreatePlotStepTwo.errors.stepTwoName.required'),
  plantingDate: yup.date().required('CreatePlotStepTwo.errors.plantingDate.required'),
  cropYear: yup
    .string()
    .required('CreatePlotStepTwo.errors.cropYear.required')
    .min(4, 'CreatePlotStepTwo.errors.cropYear.min')
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
          title={translate('CreatePlotStepTwo.title')}
          subtitle={translate('CreatePlotStepTwo.subtitle')}
        />
        <StepIndicator step={1} />
        <FormContainer>
          {!!options.length && (
            <Select
              placeholder={translate('CreatePlotStepTwo.defaultValueLabel')}
              selectedValue={propertyId}
              onValueChange={value =>
                value !== 'default' && setPropertyId(`${value}`)
              }
              icon="file-text"
              itens={options}
              label='CreatePlotStepTwo.genderLabel'
              error={error}
            />
          )}

          <TextInput
            label='CreatePlotStepTwo.fieldName'
            placeholder={translate('CreatePlotStepTwo.fieldNamePlaceholder')}
            icon="check-square"
            name="description"
            control={control}
            errorMessage={errors?.description?.message}
          />
          <DateInput
            name="plantingDate"
            control={control}
            icon="calendar"
            label='CreatePlotStepTwo.plantingDateLabel'
            errorMessage={errors?.plantingDate?.message}
            placeholder={translate('CreatePlotStepTwo.plantingDatePlaceholder')}
          />
          <TextInputMask
            mask="9999-9999"
            label='CreatePlotStepTwo.cropYearLabel'
            placeholder={translate('CreatePlotStepTwo.cropYearPlaceholder')}
            icon="check-square"
            name="cropYear"
            control={control}
            errorMessage={errors?.cropYear?.message}
          />
          <NextStepButton>
            <Button
              title={translate('CreatePlotStepTwo.continueButton')}
              onPress={handleSubmit(handleSubmitStepTwo)}
            />
          </NextStepButton>
        </FormContainer>
      </Container>
    </ScrollView>
  );
};
