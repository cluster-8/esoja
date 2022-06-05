import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import * as yup from 'yup';
import { Button } from '../../components/Button';
import { translate } from '../../data/I18n';
import { PictureInput } from '../../components/PictureInput';
import { TextInput } from '../../components/TextInput';
import Title from '../../components/Title';
import { SignUpScreenRouteProps } from '../../data/routes/auth';
import { useAuth } from '../../hooks/useAuth';
import { useUpload } from '../../hooks/useUpload';
import { PictureContainer } from '../CreatePlot/CreatePlotStepNine/styles';
import { Container, FormContainer, NextStepButton } from './styles';

const signUpValidator = yup.object().shape({
  name: yup.string().required('signUp.errors.nameValidator.required'),
  email: yup.string().required('signUp.errors.email.required').email('signUp.errors.email.format'),
  password: yup
    .string()
    .required('signUp.errors.password.required')
    .min(6, 'signUp.errors.password.min'),
  passwordConfirmation: yup
    .string()
    .required('signUp.errors.passwordConfirmation.required')
    .oneOf([yup.ref('password'), null], 'signUp.errors.passwordConfirmation.oneOf')
});

export const SignUp: React.FC<SignUpScreenRouteProps> = () => {
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const { pictureUpload, selectImage } = useUpload();

  const { signUp } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(signUpValidator)
  });

  const handleSubmitSignUp = async (data: FieldValues) => {
    setLoading(true);
    if (image) {
      const url = await pictureUpload(image, 'user');
      data.picture = url;
    }
    await signUp(data);
    setLoading(false);
  };

  const handleSelectImage = async () => {
    const uri = await selectImage();
    setImage(uri);
  };

  return (
    <ScrollView>
      <Container>
        <Title
          title={translate('signUp.title')}
          subtitle={translate('signUp.subtitle')}
        />
        <FormContainer>
          <PictureContainer>
            <PictureInput
              placeholder="signUp.imagePlaceholder"
              updatePictureLabel="signUp.imageUpdatePictureLabel"
              onPress={handleSelectImage}
              uri={image}
            />
          </PictureContainer>

          <TextInput
            label="signUp.name"
            placeholder={translate('signUp.namePlaceholder')}
            icon="user"
            name="name"
            control={control}
            errorMessage={errors?.name?.message}
          />
          <TextInput
            label="signUp.email"
            placeholder={translate('signUp.emailPlaceholder')}
            icon="mail"
            name="email"
            control={control}
            errorMessage={errors?.email?.message}
          />

          <TextInput
            label="signUp.signUpPassword"
            placeholder={translate('signUp.passwordPlaceholder')}
            icon="lock"
            secureTextEntry
            name="password"
            control={control}
            errorMessage={errors?.password?.message}
          />

          <TextInput
            label="signUp.passwordConfirmation"
            placeholder={translate('signUp.passwordRepeatPlaceholder')}
            secureTextEntry
            icon="repeat"
            name="passwordConfirmation"
            control={control}
            errorMessage={errors?.passwordConfirmation?.message}
          />
          <NextStepButton>
            <Button
              title={translate('signUp.signUp')}
              onPress={handleSubmit(handleSubmitSignUp)}
              showLoadingIndicator={loading}
            />
          </NextStepButton>
        </FormContainer>
      </Container>
    </ScrollView>
  );
};
