import React from 'react';
import { Keyboard, Platform } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAuth } from '../../hooks/useAuth';

import { SignInScreenRouteProps } from '../../data/routes/auth';
import { translate } from '../../data/I18n';

import { RFFontSize, RFHeight, RFWidth } from '../../utils/getResponsiveSizes';

import { SafeAreaView } from '../../components/atoms/SafeAreaView';
import { TextInput } from '../../components/atoms/TextInput';
import { Button } from '../../components/atoms/Button';

import {
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Container,
  ForgotPasswordButton,
  ForgotPasswordButtonText,
  FormContainer,
  LogoImage,
  WelcomeCaptionText,
  WelcomeText,
  SocialSignInText,
  SocialSignInButtonsContainer,
  SocialSignInButton,
  SocialSignInButtonText,
  SignUpButtonContainer,
  SignUpHelpText,
  SignUpButton,
  SignUpButtonText,
} from './styles';

const userLogin = yup.object().shape({
  email: yup
    .string()
    .required('signIn.errors.email.required')
    .email('signIn.errors.email.format'),
  password: yup.string().min(6, 'signIn.errors.password.length'),
});

export const SignIn: React.FC<SignInScreenRouteProps> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userLogin),
  });
  const {
    isLoading,
    signInWithPassword,
    signInWithGoogle,
    siginWithFacebook,
    siginWithApple,
  } = useAuth();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView>
        <Container>
          <SafeAreaView
            style={{
              paddingHorizontal: RFHeight(24),
              paddingBottom: getBottomSpace() + RFHeight(24),
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <LogoImage />

            <WelcomeText>{translate('signIn.welcome')}</WelcomeText>

            <WelcomeCaptionText>
              {translate('signIn.signInMessage')}
            </WelcomeCaptionText>

            <FormContainer>
              <TextInput
                placeholder={translate('signIn.emailPlaceholder')}
                icon="mail"
                keyboardType="email-address"
                autoCapitalize="none"
                name="email"
                control={control}
                errorMessage={errors?.email?.message}
              />

              <TextInput
                placeholder={translate('signIn.passwordPlaceholder')}
                icon="lock"
                secureTextEntry
                name="password"
                control={control}
                errorMessage={errors?.password?.message}
              />

              <ForgotPasswordButton>
                <ForgotPasswordButtonText>
                  {translate('signIn.forgotPassword')}
                </ForgotPasswordButtonText>
              </ForgotPasswordButton>

              <Button
                title={translate('signIn.signIn')}
                onPress={handleSubmit(signInWithPassword)}
                showLoadingIndicator={isLoading}
              />
            </FormContainer>

            <SocialSignInText>
              {translate('signIn.socialSignIn')}
            </SocialSignInText>

            <SocialSignInButtonsContainer>
              <SocialSignInButton network="google" onPress={signInWithGoogle}>
                <FontAwesome5
                  name="google"
                  size={RFFontSize(16)}
                  color="#FFFFFF"
                />
                <SocialSignInButtonText network="google">
                  Google
                </SocialSignInButtonText>
              </SocialSignInButton>

              <SocialSignInButton
                network="facebook"
                style={{ marginLeft: RFWidth(8) }}
                onPress={siginWithFacebook}
              >
                <FontAwesome5
                  name="facebook-f"
                  size={RFFontSize(16)}
                  color="#FFFFFF"
                />
                <SocialSignInButtonText network="facebook">
                  Facebook
                </SocialSignInButtonText>
              </SocialSignInButton>

              {Platform.OS === 'ios' && (
                <SocialSignInButton
                  network="apple"
                  style={{ marginLeft: RFWidth(8) }}
                  onPress={siginWithApple}
                >
                  <FontAwesome5
                    name="apple"
                    size={RFFontSize(16)}
                    color="#000000"
                  />
                  <SocialSignInButtonText network="apple">
                    Apple
                  </SocialSignInButtonText>
                </SocialSignInButton>
              )}
            </SocialSignInButtonsContainer>

            <SignUpButtonContainer>
              <SignUpHelpText>
                {translate('signIn.signUpMessage')}
              </SignUpHelpText>

              <SignUpButton onPress={() => navigation.navigate('SignUp')}>
                <SignUpButtonText>
                  {translate('signIn.signUp')}
                </SignUpButtonText>
              </SignUpButton>
            </SignUpButtonContainer>
          </SafeAreaView>
        </Container>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
