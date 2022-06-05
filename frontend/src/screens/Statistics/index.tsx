import { Query } from 'nestjs-prisma-querybuilder-interface';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { Button } from '../../components/Button';
import { EmptyData } from '../../components/EmptyData';
import { LineChartPlot } from '../../components/LineChartPlot';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { Select } from '../../components/Select';
import { StatisticsCard } from '../../components/StatisticsCard';
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
  StatisticsCardWidgetContainer,
  StatisticsContentContainer,
  StatisticsMenuContainer
} from './styles';

interface CultivarResponse {
  idCultivar: number;
  numeroRnc: string;
}

interface ChartData {
  x: string[];
  y: number[];
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
  const [average, setAverage] = useState(0);
  const [plotOptions, setPlotOptions] = useState<SelectOptions[]>([]);
  const [obtentoresOptions, setObtentoresOptions] = useState<SelectOptions[]>(
    []
  );
  const [cultivarOptions, setCultivarOptions] = useState<SelectOptions[]>([]);

  const [emptyPlots, setEmptyPlots] = useState(false);

  const [plots, setPlots] = useState<Plot[]>([]);
  const [production, setProduction] = useState<ProductionResponse[]>([]);
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);

  const [selectedPlotId, setSelectedPlotId] = useState('default');
  const [selectedObtentor, setSelectedObtentor] = useState('default');
  const [selectedCultivar, setSelectedCultivar] = useState('default');

  const [productionChartData, setProductionChartData] = useState<ChartData>({
    x: ['1'],
    y: [1]
  });
  const [weatherChartData, setWeatherChartData] = useState<ChartData>({
    x: ['1'],
    y: [1]
  });
  const [waterChartData, setWaterChartData] = useState<ChartData>({
    x: ['1'],
    y: [1]
  });

  const [loading, setLoading] = useState(false);

  const { authUser } = useAuth();
  const { getProperties } = useProperty();

  const handleSubmitCultivar = async (
    cultiveId: string,
    idCultivar: string | number
  ) => {
    if (idCultivar && idCultivar !== 'default') {
      try {
        const { data } = await api.post<ProductionResponse[]>(
          'agritec/produtividade',
          {
            cultiveId,
            idCultivar: +idCultivar
          }
        );
        setProduction(data);
        setObtentoresOptions([]);
      } catch (err) {
        Alert.alert(
          'Erro',
          'Não foi possivel estimar a produtividade, tente novamente mais tarde!'
        );
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
    const { data } = await api.get<{ avarege: number }>(
      `/cultive/productivity/${cultiveId}`
    );
    setAverage(data.avarege);
    try {
      const plot = plots.find(p => p.id === cultiveId);
      if (plot) {
        setSelectedPlot(plot);
        setSelectedPlotId(cultiveId);
        if (plot?.idCultivar) {
          handleSubmitCultivar(plot.id, plot.idCultivar);
        } else {
          const { data: obtentores } = await api.post<string[]>(
            'agritec/obtentores',
            {
              cultiveId
            }
          );
          setObtentoresOptions(
            obtentores.map(obtentor => ({ label: obtentor, value: obtentor }))
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
            select:
              'description expectedProduction expectedBagsPerHectares idCultivar areaTotal'
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
            if (plot.photo) {
              setEmptyPlots(true);
            }
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

            {emptyPlots && (
              <EmptyData message="Você não possui nenhum talhão com amostras ja cadastradas, crie um talhão ou adicione amostras em um para vizualizar suas estatisticas" />
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
                        handleSubmitCultivar(selectedPlotId, selectedCultivar)
                      }
                      showLoadingIndicator={loading}
                      style={{ marginTop: 24 }}
                    />
                  </>
                )}
              </>
            )}
          </FormContainer>
        )}
        {!production.length && (
          <>
            <Title title="Produção" />
            <StatisticsMenuContainer>
              <StatisticsCardWidgetContainer>
                <StatisticsCard
                  title="Total"
                  value={`${
                    (selectedPlot?.expectedProduction || 0) *
                    (selectedPlot?.areaTotal || 0)
                  } ton`}
                />
                <StatisticsCard
                  title="sc/ha"
                  value={`${selectedPlot?.expectedBagsPerHectares} sc/ha`}
                />
                <StatisticsCard
                  title="media UF"
                  value={`${average.toFixed(2)} ton/ha`}
                />
              </StatisticsCardWidgetContainer>
              <StatisticsContentContainer>
                <LineChartPlot
                  title={translate('quotation.chartTitle')}
                  data={productionChartData}
                  backgroundColor="OVER"
                />
                <LineChartPlot
                  title={translate('quotation.chartTitle')}
                  data={weatherChartData}
                  backgroundColor="OVER"
                />

                <LineChartPlot
                  title={translate('quotation.chartTitle')}
                  data={waterChartData}
                  backgroundColor="OVER"
                />
              </StatisticsContentContainer>
            </StatisticsMenuContainer>
          </>
        )}
      </Container>
    </ScrollView>
  );
};
