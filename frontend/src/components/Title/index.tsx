import React from "react";
import { TitleContainer, TitleStyled, SubtitleStyled } from "./styles";

export interface TitleProps {
  title: string;
  subtitle?: string | JSX.Element;
}

const Title: React.FC<TitleProps> = ({ title, subtitle }) => {
  return (
    <TitleContainer>
      <TitleStyled>{title}</TitleStyled>
      <SubtitleStyled>{subtitle}</SubtitleStyled>
    </TitleContainer>
  );
};

export default Title;
