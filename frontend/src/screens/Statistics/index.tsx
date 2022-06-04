import { Query } from 'nestjs-prisma-querybuilder-interface';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { Button } from '../../components/Button';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { MenuCard } from '../../components/MenuCard';
import { Select } from '../../components/Select';
import Title from '../../components/Title';
import { translate } from '../../data/I18n';
import { Plot } from '../../data/Model/Plot';
import { SelectOptions } from '../../data/Model/SelectOptions';
import { StatisticsScreenRouteProps } from '../../data/routes/app';
import { api } from '../../data/services/api';
import { useAuth } from '../../hooks/useAuth';
import { useProperty } from '../../hooks/useProperty';
import {
  Container,
  FormContainer,
  StatisticsCardContainer,
  StatisticsCardWidgetContainer,
  StatisticsContentContainer,
  StatisticsMenuContainer
} from './styles';

interface CultivarResponse {
  idCultivar: number;
  numeroRnc: string;
}

interface ProductionResponse {
  balancoHidrico: number;
  deficienciaHidrica: number;
  excedenteHidrico: number;
  grausDia: number;
  precipitacao: number;
  temperaturaMaxima: number;
  temperaturaMinima: number;
  produtividadeAlmejada: number;
  produtividadeMediaMunicipio: number;
}

export const Statistics: React.FC<StatisticsScreenRouteProps> = ({
  navigation
}) => {
  const [plotOptions, setPlotOptions] = useState<SelectOptions[]>([]);
  const [obtentoresOptions, setObtentoresOptions] = useState<SelectOptions[]>(
    []
  );
  const [cultivarOptions, setCultivarOptions] = useState<SelectOptions[]>([]);

  const [plots, setPlots] = useState<Plot[]>([]);
  const [productions, setProductions] = useState<ProductionResponse[]>([]);
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [selectedPlotId, setSelectedPlotId] = useState('default');
  const [selectedObtentor, setSelectedObtentor] = useState('default');
  const [selectedCultivar, setSelectedCultivar] = useState('default');

  const [loading, setLoading] = useState(false);

  const { authUser } = useAuth();
  const { getProperties } = useProperty();

  const handleSubmitCultivar = async (
    cultiveId: string,
    idCultivar: number
  ) => {
    if (idCultivar && typeof idCultivar === 'number') {
      try {
        const { data } = await api.post<ProductionResponse[]>(
          'agritec/produtividade',
          {
            cultiveId,
            idCultivar
          }
        );
        console.log(data);
      } catch (err) {
        console.log(err.response);
      }
    } else {
      Alert.alert(
        'Preenchimento incompleto',
        'Registro Nacional do Cultivar é obrigatório!'
      );
    }
  };

  const handleSelectPlot = async (cultiveId: string) => {
    setLoading(true);
    try {
      const plot = plots.find(p => p.id === cultiveId);
      if (plot) {
        setSelectedPlot(plot);
        setSelectedPlotId(cultiveId);
        if (plot?.idCultivar) {
          handleSubmitCultivar(plot.id, plot.idCultivar);
        } else {
          const { data } = await api.post<string[]>('agritec/obtentores', {
            cultiveId
          });
          setObtentoresOptions(
            data.map(obtentor => ({ label: obtentor, value: obtentor }))
          );
        }
      }
    } catch (err) {
      Alert.alert('Não foi possivel buscar os obtentores');
    }
    setLoading(false);
  };

  const handleSelectObtentor = async (obtentor: string) => {
    setLoading(true);
    try {
      setSelectedObtentor(obtentor);
      const { data } = await api.post<CultivarResponse[]>(
        'agritec/cultivares',
        {
          cultiveId: selectedPlotId,
          obtentorMantenedor: obtentor
        }
      );
      setCultivarOptions(
        data.map(cultivar => ({
          label: cultivar.numeroRnc,
          value: cultivar.idCultivar
        }))
      );
    } catch (err) {
      Alert.alert('Não foi possivel buscar os obtentores');
    }
    setLoading(false);
  };

  useEffect(() => {
    const getSelectData = async (): Promise<void> => {
      const query: Query = {
        select: 'id',
        populate: [
          {
            path: 'cultives',
            select: 'description expectedProduction idCultivar'
          }
        ],
        filter: [{ path: 'userId', operator: 'equals', value: authUser.id }]
      };
      const properties = await getProperties(query);
      if (properties) {
        const options: SelectOptions[] = [];
        const tempPlots: Plot[] = [];
        properties.forEach(property => {
          property?.cultives?.forEach(plot => {
            tempPlots.push(plot);
            options.push({
              value: `${plot.id}`,
              label: `${plot.description}`
            });
          });
        });
        setPlots(tempPlots);
        setPlotOptions(options);
      }
    };
    getSelectData();
  }, [authUser.id, getProperties]);

  return (
    <ScrollView>
      <Container>
        <Title
          title={translate('statistics.title')}
          subtitle={translate('statistics.subtitle')}
        />
        {loading ? (
          <LoadingIndicator />
        ) : (
          <FormContainer>
            {!!plotOptions.length && (
              <Select
                placeholder={translate('statistics.selectPlot')}
                selectedValue={selectedPlotId}
                onValueChange={value =>
                  value !== 'default' && handleSelectPlot(`${value}`)
                }
                icon="file-text"
                itens={plotOptions}
                label="statistics.selectPlot"
              />
            )}

            {!!obtentoresOptions.length && (
              <>
                <Select
                  selectedValue={selectedObtentor}
                  onValueChange={value =>
                    value !== 'default' && handleSelectObtentor(`${value}`)
                  }
                  placeholder={translate('statistics.selectPlot')}
                  icon="file-text"
                  itens={obtentoresOptions}
                  label="statistics.selectPlot"
                />

                {selectedObtentor !== 'default' && (
                  <>
                    <Select
                      selectedValue={selectedCultivar}
                      onValueChange={value =>
                        value !== 'default' &&
                        setSelectedCultivar(value as string)
                      }
                      placeholder={translate('statistics.selectNCR')}
                      icon="file-text"
                      itens={cultivarOptions}
                      label="statistics.selectNCR"
                    />

                    <Button
                      title={translate('statistics.pressAction')}
                      onPress={() =>
                        handleSubmitCultivar(selectedPlotId, +selectedCultivar)
                      }
                      style={{ marginTop: 24 }}
                    />
                  </>
                )}
              </>
            )}
          </FormContainer>
        )}
        {!productions.length && (
          <StatisticsMenuContainer>
            <StatisticsCardWidgetContainer>
              <MenuCard
                onPress={() => {}}
                widget
                title={translate('home.seeds')}
                value={String(selectedPlot?.expectedProduction) || 'Não possui'}
                loadingIndicator={loading}
                icon="trending-down"
              />
              <MenuCard
                onPress={() => {}}
                widget
                title={translate('home.soybeanPrice')}
                value={
                  String(selectedPlot?.expectedBagsPerHectares) || 'Não possui'
                }
                loadingIndicator={loading}
                icon="trending-down"
              />
            </StatisticsCardWidgetContainer>
            <StatisticsContentContainer>
              <StatisticsCardContainer>
                <MenuCard
                  onPress={() => {}}
                  title={translate('home.properties')}
                  icon="warehouse"
                />
              </StatisticsCardContainer>
              <StatisticsCardContainer>
                <MenuCard
                  title={translate('home.plots')}
                  icon="seed-outline"
                  onPress={() => {}}
                />
              </StatisticsCardContainer>
              <StatisticsCardContainer>
                <MenuCard
                  onPress={() => {}}
                  title={translate('home.statistics')}
                  icon="chart-line"
                />
              </StatisticsCardContainer>
            </StatisticsContentContainer>
          </StatisticsMenuContainer>
        )}
      </Container>
    </ScrollView>
  );
};
