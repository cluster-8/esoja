import React from "react";

import { PlotsScreenRouteProps } from "../../data/routes/app";

import { Container, Header, CultiveList, AddButton, Icon } from "./styles";

import { CultiveCard, CultiveCardProps } from "../../components/PlotCard";
import Title from "../../components/Title";

export interface DataListProps extends CultiveCardProps {
  id: string;
}

export const Plots: React.FC<PlotsScreenRouteProps> = ({ navigation }) => {
  const data = [
    {
      id: "1",
      name: "Teste 1",
      area: 40,
      distancia: 10,
      media: 65,
      produtividade: 50,
    },
    {
      id: "2",
      name: "Teste 2",
      area: 40,
      distancia: 10,
      media: 65,
      produtividade: 50,
    },
    {
      id: "3",
      name: "Teste 3",
      area: 40,
      distancia: 10,
      media: 65,
      produtividade: 50,
    },
    {
      id: "4",
      name: "Teste 4",
      area: 40,
      distancia: 10,
      media: 65,
      produtividade: 50,
    },
  ];

  return (
    <Container>
      <Header>
        <Title
          title="Talhões"
          subtitle="Visualize todos seus talhões registrados."
        />
      </Header>

      <CultiveList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CultiveCard data={item} />}
      />

      <AddButton onPress={() => navigation.navigate("CreatePlotStepOne")}>
        <Icon name={"plus"} />
      </AddButton>
    </Container>
  );
};
