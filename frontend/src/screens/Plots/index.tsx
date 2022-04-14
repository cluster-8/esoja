import React from "react";
import { Text, TouchableOpacity } from "react-native";

import { useTheme } from "styled-components";

import { PlotsScreenRouteProps } from "../../data/routes/app";

import { Container } from "./styles";

export const Plots: React.FC<PlotsScreenRouteProps> = ({ navigation }) => {
  const theme = useTheme();

  return (
    <Container>
      <TouchableOpacity
        onPress={() => navigation.navigate("CreatePlotStepOne")}
      >
        <Text style={{ fontSize: 24, color: theme.colors.text }}>
          Criar Talhão
        </Text>
      </TouchableOpacity>
    </Container>
  );
};
