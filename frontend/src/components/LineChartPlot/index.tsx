import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useTheme } from 'styled-components';
import { ChartData } from '../../screens/Quotation/SeedQuotation';
import { ChartContainer, TextStyled } from './styles';

interface LineChartProps {
  title: string;
  data: ChartData;
}

export const LineChartPlot: React.FC<LineChartProps> = ({ title, data }) => {
  const theme = useTheme();

  return (
    <ChartContainer>
      <TextStyled>{title}</TextStyled>
      <LineChart
        data={{
          labels: data?.x,
          datasets: [
            {
              data: data?.y
            }
          ]
        }}
        width={Dimensions.get('window').width - 50}
        height={220}
        yAxisLabel="R$"
        yAxisSuffix=""
        yAxisInterval={1}
        verticalLabelRotation={320}
        xLabelsOffset={10}
        chartConfig={{
          backgroundGradientFrom: theme.colors.background,
          backgroundGradientTo: theme.colors.background,
          decimalPlaces: 2,
          color: () => theme.colors.text,
          labelColor: () => theme.colors.text,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726'
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </ChartContainer>
  );
};
