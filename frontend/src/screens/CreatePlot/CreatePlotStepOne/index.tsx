import React, { useState } from "react";
import { translate } from "../../../data/I18n";
import { Container, FormContainer, NextStepButton } from "./styles";

import Title from "../../../components/Title";
import { StepIndicator } from "../../../components/StepIndicator";
import { CreatePlotStepOneScreenRouteProps } from "../../../data/routes/app";
import { Button } from "../../../components/Button";

interface Coordinates {
  latitude: number;
  longitude: number;
}

export const CreatePlotStepOne: React.FC<CreatePlotStepOneScreenRouteProps> = ({
  navigation,
}) => {
  const [poligon, setPoligon] = useState<Coordinates[]>([]);

  const handleSubmitStepOne = () => {
    navigation.navigate("CreatePlotStepTwo");
  };

  return (
    <Container>
      <Title
        title={"Coordenadas do talhão"}
        subtitle={"Desenhe no mapa a area correspondente ao talhão"}
      />
      <StepIndicator step={0} />
      <FormContainer>
        <NextStepButton>
          <Button title={"Continuar"} onPress={handleSubmitStepOne} />
        </NextStepButton>
      </FormContainer>
    </Container>
  );
};
