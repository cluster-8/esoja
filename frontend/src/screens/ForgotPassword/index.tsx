import { FontAwesome5 } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import * as yup from 'yup';
import { Button } from '../../components/Button';
import { SafeAreaView } from '../../components/SafeAreaView';
import { TextInput } from '../../components/TextInput';
import { translate } from '../../data/I18n';
import { ForgotPasswordScreenRouteProps } from '../../data/routes/auth';
import { useAuth } from '../../hooks/useAuth';
import { RFFontSize, RFHeight, RFWidth } from '../../utils/getResponsiveSizes';
import {
  Container,
  ForgotPasswordButton,
  ForgotPasswordButtonText,
  FormContainer,
  KeyboardAvoidingView,
  LogoImage,
  SignUpButton,
  SignUpButtonContainer,
  SignUpButtonText,
  SignUpHelpText,
  SocialSignInButton,
  SocialSignInButtonsContainer,
  SocialSignInButtonText,
  SocialSignInText,
  TouchableWithoutFeedback,
  WelcomeCaptionText,
  WelcomeText
} from './styles';

const userLogin = yup.object().shape({
  email: yup
    .string()
    .required('signIn.errors.email.required')
    .email('signIn.errors.email.format'),
  password: yup.string().min(6, 'signIn.errors.password.length')
});

export const ForgotPassword: React.FC<ForgotPasswordScreenRouteProps> = ({
  navigation
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(userLogin)
  });
  const { isLoading, signInWithPassword, signInWithGoogle, sigInWithFacebook } =
    useAuth();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView>
        <Container>
          <SafeAreaView
            style={{
              paddingHorizontal: RFHeight(24),
              paddingBottom: getBottomSpace() + RFHeight(24),
              justifyContent: 'center',
              alignItems: 'center'
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

              <ForgotPasswordButton
                onPress={() => navigation.navigate('ForgotPassword')}
              >
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
                onPress={sigInWithFacebook}
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
