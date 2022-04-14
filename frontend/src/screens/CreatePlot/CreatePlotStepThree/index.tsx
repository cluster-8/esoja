import React from "react";
import {
  Container,
  FormContainer,
  HelperImageContainer,
  NextStepButton,
  StepThreeHelperImage,
} from "./styles";
import * as yup from "yup";

import StepThree from "../../../assets/plot-steps-images/StepThree.png";

import Title from "../../../components/Title";
import { StepIndicator } from "../../../components/StepIndicator";
import { CreatePlotStepThreeScreenRouteProps } from "../../../data/routes/app";
import { TextInput } from "../../../components/TextInput";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../../../components/Button";
import { ScrollView } from "react-native";

const userLogin = yup.object().shape({
  lineDistance: yup.string().required("Distancia é obrigatória"),
});

export const CreatePlotStepThree: React.FC<
  CreatePlotStepThreeScreenRouteProps
> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userLogin),
  });

  const handleSubmitStepThree = (data: FieldValues) => {
    navigation.navigate("CreatePlotStepFour");
  };

  return (
    <ScrollView>
      <Container>
        <Title
          title={"Identitifique o talhão"}
          subtitle={"Insira um nome e uma descrição para o seu novo talhão"}
        />
        <StepIndicator step={2} />
        <FormContainer>
          <HelperImageContainer>
            <StepThreeHelperImage source={StepThree} resizeMode="contain" />
          </HelperImageContainer>
          <TextInput
            label="Distancia entre linhas"
            placeholder="Digite a distancia em cm"
            icon="check-square"
            secureTextEntry
            name="lineDistance"
            control={control}
            errorMessage={errors?.lineDistance?.message}
          />
          <NextStepButton>
            <Button
              title={"Continuar"}
              onPress={handleSubmit(handleSubmitStepThree)}
            />
          </NextStepButton>
        </FormContainer>
      </Container>
    </ScrollView>
  );
};
