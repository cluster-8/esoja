import { Query } from 'nestjs-prisma-querybuilder-interface';
import React, { useCallback, useEffect, useState } from 'react';
import { PlotCard } from '../../components/PlotCard';
import { Separator } from '../../components/Separator';
import Title from '../../components/Title';
import { translate } from '../../data/I18n';
import { Plot } from '../../data/Model/Plot';
import { PlotsScreenRouteProps } from '../../data/routes/app';
import { useAuth } from '../../hooks/useAuth';
import { useProperty } from '../../hooks/useProperty';
import { AddButton, Container, Header, Icon, PlotList } from './styles';

export const Plots: React.FC<PlotsScreenRouteProps> = ({ navigation }) => {
  const [hasProperties, setHasProperties] = useState(false);
  const [plots, setPlots] = useState<Plot[]>([]);
  const { getProperties } = useProperty();
  const { authUser } = useAuth();

  const handleSelectPlot = (plotId: string) => {
    navigation.navigate('PlotDetail', { plotId });
  };

  const getData = useCallback(async () => {
    const query: Query = {
      select: 'name city state picture',
      populate: [
        {
          path: 'cultives',
          select: 'cropYear areaTotal photo description expectedProduction'
        }
      ],
      filter: [{ path: 'userId', operator: 'equals', value: authUser.id }]
    };
    const properties = await getProperties(query);
    setHasProperties(properties?.length > 0);
    const userPlots: Plot[] = [];
    properties.map(property =>
      property?.cultives ? userPlots.push(...property.cultives) : null
    );
    setPlots(userPlots);
  }, [authUser.id, getProperties]);

  useEffect(() => {
    const subscription = navigation.addListener('focus', () => {
      getData();
    });
    return subscription;
  }, [getData, navigation]);

  return (
    <Container>
      <Header>
        <Title
          title={translate('plots.plots')}
          subtitle={translate('plots.SeeAllYourPlots')}
        />
      </Header>

      <PlotList
        data={plots}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={({ item }) => (
          <PlotCard plot={item} onPress={handleSelectPlot} />
        )}
      />
      {hasProperties && (
        <AddButton onPress={() => navigation.navigate('CreatePlotStepOne')}>
          <Icon name="plus" />
        </AddButton>
      )}
    </Container>
  );
};
