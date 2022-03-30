import styled, { css } from "styled-components/native";
import { Platform } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import { RFFontSize, RFHeight, RFWidth } from "../../utils/getResponsiveSizes";
import theme from "../../global/styles/theme";

interface SocialSignProps {
  network: "google" | "facebook" | "apple";
}

export const TouchableWithoutFeedback = styled.TouchableWithoutFeedback`
  flex: 1;
`;

export const KeyboardAvoidingView = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === "ios" ? "padding" : undefined,
  enabled: true,
})`
  flex: 1;
`;

export const Container = styled.ImageBackground.attrs(({ theme }) => ({
  source: theme.images.background,
}))`
  flex: 1;
`;

const logoImageSize = RFWidth(160);

export const LogoImage = styled.Image.attrs(({ theme }) => ({
  source: theme.images.esoja_logo,
}))`
  width: ${logoImageSize}px;
  height: ${logoImageSize}px;
`;

export const WelcomeText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFFontSize(24)}px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin-top: ${RFHeight(24)}px;
`;

export const WelcomeCaptionText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFFontSize(13)}px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin-top: ${RFHeight(8)}px;
`;

export const FormContainer = styled.View`
  margin-top: ${RFHeight(40)}px;
`;
export const ForgotPasswordButton = styled.TouchableOpacity`
  margin-bottom: ${RFHeight(24)}px;
`;

export const ForgotPasswordButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFFontSize(13)}px;
  color: ${({ theme }) => theme.colors.text};
  text-align: right;
`;

export const SocialSignInText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFFontSize(14)}px;
  color: ${({ theme }) => theme.colors.text};
  margin-top: ${RFHeight(32)}px;
`;

export const SocialSignInButtonsContainer = styled.View`
  margin-top: ${RFHeight(8)}px;
  flex-direction: row;
`;

export const SocialSignInButton = styled(RectButton)<SocialSignProps>`
  flex: 1;
  height: ${RFHeight(40)}px;
  border-radius: ${RFHeight(8)}px;

  flex-direction: row;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.network === "google" &&
    css`
      background-color: #de5246;
    `}

  ${(props) =>
    props.network === "facebook" &&
    css`
      background-color: #1877f2;
    `}

${(props) =>
    props.network === "apple" &&
    css`
      background-color: #ffffff;
    `}
`;

export const SocialSignInButtonText = styled.Text<SocialSignProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFFontSize(13)}px;
  margin-left: ${RFWidth(8)}px;

  ${(props) =>
    (props.network === "google" || props.network === "facebook") &&
    css`
      color: #ffffff;
    `}

  ${(props) =>
    props.network === "apple" &&
    css`
      color: #000000;
    `}
`;

export const SignUpButtonContainer = styled.View`
  margin-top: ${RFHeight(56)}px;

  flex-direction: row;
  align-items: center;
`;

export const SignUpHelpText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFFontSize(14)}px;
  color: ${({ theme }) => theme.colors.text};
  margin-right: ${RFWidth(8)}px;
`;

export const SignUpButton = styled.TouchableOpacity``;

export const SignUpButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFFontSize(14)}px;
  color: ${({ theme }) => theme.colors.primary};
`;
