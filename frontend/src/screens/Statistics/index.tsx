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
import { useAuth } from '../../hooks/useAuth';
import { useHome } from '../../hooks/useHome';
import { usePlot } from '../../hooks/usePlot';
import { useProperty } from '../../hooks/useProperty';
import { Produtividade, useStatistics } from '../../hooks/useStatistics';
import { formatCurrency } from '../../utils/formatCurrence';
import {
  Container,
  FormContainer,
  StatisticsCardWidgetContainer,
  StatisticsContentContainer,
  StatisticsMenuContainer
} from './styles';

interface ChartData {
  x: string[];
  y?: number[];
  datasets?: {
    data: number[];
    color: () => string; // optional
  }[];
  legend?: string[];
}

const produtividade = {
  data: {
    produtividadeAlmejada: [3.57, 3.57, 3.57, 3.57, 3.57],
    produtividadeMediaMunicipio: [
      2.999191593128688, 2.9983646917193654, 2.9975250683836463,
      2.996674034753864, 2.996674034753864
    ],
    temperaturaMinima: [15.5, 16, 18, 18, 16],
    temperaturaMaxima: [25, 26.5, 26.5, 27, 29.5],
    precipitacao: [0, 0, 0, 0, 15.75],
    grausDia: [6.25, 10.75, 15, 19, 30],
    balancoHidrico: [
      48.37136384046921, 48.01206155057355, 47.68801874470446,
      47.39738353089488, 70
    ],
    deficienciaHidrica: [
      2.384237497802248, 1.380365894658342, 1.256107947715423,
      1.1357686881577302, 2.764941198737602
    ],
    excedenteHidrico: [0, 0, 0, 0, 0.0019513565920199483]
  }
};

export const Statistics: React.FC<StatisticsScreenRouteProps> = () => {
  const [average, setAverage] = useState(0);
  const [profit, setProfit] = useState(0);

  const [plotOptions, setPlotOptions] = useState<SelectOptions[]>([]);
  const [obtentoresOptions, setObtentoresOptions] = useState<SelectOptions[]>(
    []
  );
  const [cultivarOptions, setCultivarOptions] = useState<SelectOptions[]>([]);

  const [emptyPlots, setEmptyPlots] = useState(true);

  const [plots, setPlots] = useState<Plot[]>([]);
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);

  const [selectedPlotId, setSelectedPlotId] = useState('default');
  const [selectedObtentor, setSelectedObtentor] = useState('default');
  const [selectedCultivar, setSelectedCultivar] = useState('default');

  const [productionChartData, setProductionChartData] =
    useState<ChartData | null>(null);
  const [weatherChartData, setWeatherChartData] = useState<ChartData | null>(
    null
  );
  const [waterChartData, setWaterChartData] = useState<ChartData | null>(null);

  const [loading, setLoading] = useState(false);

  const { getProduction, getObtentores, getCultivares } = useStatistics();
  const { authUser } = useAuth();
  const { getQuotation } = useHome();
  const { getAverageProductivity } = usePlot();
  const { getProperties } = useProperty();

  const getWaterChartData = (productivity: Produtividade) => {
    const { balancoHidrico } = productivity.data;
    const { deficienciaHidrica } = productivity.data;
    return {
      x: balancoHidrico.map((item, index) => String(index + 1)),
      datasets: [
        {
          data: balancoHidrico,
          title: 'Balanco Hidrico',
          color: () => `rgb(6, 15, 139)`
        },
        {
          data: deficienciaHidrica,
          title: 'Deficiencia Hidrica',
          color: () => `rgb(171, 193, 5)`
        }
      ],
      legend: ['Balanco Hid.', 'Deficiencia Hid.']
    };
  };

  const getWeatherChartData = (productivity: Produtividade) => {
    const { temperaturaMinima } = productivity.data;
    const { temperaturaMaxima } = productivity.data;
    const { precipitacao } = productivity.data;
    return {
      x: temperaturaMinima.map((item, index) => String(index + 1)),
      datasets: [
        {
          data: temperaturaMinima,
          Title: 'Minima',
          color: () => `rgb(6, 15, 139)`
        },
        {
          data: temperaturaMaxima,
          title: 'Maxima',
          color: () => `rgb(221, 138, 4)`
        },
        {
          data: precipitacao,
          title: 'Preciptação',
          color: () => `rgb(3, 153, 183)`
        }
      ],
      legend: ['Min', 'Max', 'Preciptation %']
    };
  };

  const getProductionChartData = (productivity: Produtividade) => {
    const { produtividadeAlmejada } = productivity.data;
    const { produtividadeMediaMunicipio } = productivity.data;
    return {
      x: produtividadeAlmejada.map((item, index) => String(index + 1)),
      datasets: [
        {
          data: produtividadeAlmejada,
          Title: 'Produtividade',
          color: () => `rgb(6, 139, 6)`
        },
        {
          data: produtividadeMediaMunicipio,
          title: 'Media Municipal',
          color: () => `rgb(6, 15, 139)`
        }
      ],
      legend: ['Produtividade', 'Media Municipal']
    };
  };

  const handleSubmitCultivar = async (
    cultiveId: string,
    idCultivar: string | number
  ) => {
    if (idCultivar && idCultivar !== 'default') {
      try {
        const res = await getProduction(cultiveId, Number(idCultivar));
        setProductionChartData(getProductionChartData(produtividade));
        setWeatherChartData(getWeatherChartData(produtividade));
        setWaterChartData(getWaterChartData(produtividade));
        console.log(res);
        setObtentoresOptions([]);
      } catch (err) {
        Alert.alert(
          translate('statistics.errorAlertTitle'),
          translate('statistics.ProdExpectationMsgError')
        );
      }
    } else {
      Alert.alert(
        translate('statistics.incompleteAlertTitle'),
        'Registro Nacional do Cultivar é obrigatório!'
      );
    }
  };

  const handleSelectPlot = async (cultiveId: string) => {
    setLoading(true);
    try {
      const data = await getAverageProductivity(cultiveId);
      setAverage(data.avarege);
      const plot = plots.find(p => p.id === cultiveId);
      if (plot) {
        setSelectedPlot(plot);
        setSelectedPlotId(cultiveId);
        const { availableSoybeanPack } = await getQuotation();
        setProfit(
          availableSoybeanPack.Valor *
            (plot.areaTotal * plot.expectedBagsPerHectares)
        );

        if (plot?.idCultivar) {
          handleSubmitCultivar(plot.id, plot.idCultivar);
        } else {
          const obtentores = await getObtentores(cultiveId);
          setObtentoresOptions(
            obtentores.map(obtentor => ({ label: obtentor, value: obtentor }))
          );
        }
      }
    } catch (err) {
      Alert.alert(translate('statistics.holdersAlertMsg'));
    }
    setLoading(false);
  };

  const handleSelectObtentor = async (obtentor: string) => {
    setLoading(true);
    try {
      setSelectedObtentor(obtentor);
      const cultivares = await getCultivares(selectedPlotId, obtentor);
      setCultivarOptions(
        cultivares.map(cultivar => ({
          label: cultivar.numeroRnc,
          value: cultivar.idCultivar
        }))
      );
    } catch (err) {
      Alert.alert(translate('statistics.cultivarsAlertMsg'));
    }
    setLoading(false);
  };

  useEffect(() => {
    const getSelectData = async (): Promise<void> => {
      setLoading(true);
      const query: Query = {
        select: 'id',
        populate: [
          {
            path: 'cultives',
            select:
              'photo description expectedProduction expectedBagsPerHectares idCultivar areaTotal'
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
              setEmptyPlots(false);
              tempPlots.push(plot);
              options.push({
                value: `${plot.id}`,
                label: `${plot.description}`
              });
            }
          });
        });
        setPlots(tempPlots);
        setPlotOptions(options);
      }
      setLoading(false);
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
              <EmptyData message={translate('statistics.emptyPlotsMsg')} />
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
        {!!productionChartData && !!weatherChartData && !!waterChartData && (
          <>
            <Title title={translate('statistics.productionTitle')} />
            <StatisticsMenuContainer>
              <StatisticsCardWidgetContainer>
                <StatisticsCard
                  title="Total"
                  value={`${
                    selectedPlot?.expectedProduction.toFixed(2) || 0
                  } ton/ha`}
                />
                <StatisticsCard
                  title={translate('statistics.profitCard')}
                  value={formatCurrency(profit)}
                />
                <StatisticsCard
                  title={translate('statistics.stateAverage')}
                  value={`${average.toFixed(2)} ton/ha`}
                />
              </StatisticsCardWidgetContainer>
              <StatisticsContentContainer>
                <LineChartPlot
                  title={translate(
                    'statistics.lineChart.productionExpectation'
                  )}
                  data={productionChartData}
                  backgroundColor="OVER"
                  legend={productionChartData.legend}
                />
                <LineChartPlot
                  title={translate('statistics.lineChart.rainPreciptation')}
                  data={weatherChartData}
                  currence={false}
                  backgroundColor="OVER"
                  legend={weatherChartData.legend}
                />

                <LineChartPlot
                  title={translate('statistics.lineChart.water')}
                  data={waterChartData}
                  currence={false}
                  backgroundColor="OVER"
                  legend={waterChartData.legend}
                />
              </StatisticsContentContainer>
            </StatisticsMenuContainer>
          </>
        )}
      </Container>
    </ScrollView>
  );
};
