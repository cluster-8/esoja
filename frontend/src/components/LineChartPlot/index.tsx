import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useTheme } from 'styled-components';
import { ChartContainer, TextStyled } from './styles';

interface ChartData {
  x: string[];
  y?: number[];
  datasets?: {
    data: number[];
    color: () => string; // optional
  }[];
}

interface LineChartProps {
  title: string;
  data: ChartData;
  backgroundColor?: 'OVER' | 'BACKGROUND';
  currence?: boolean;
  legend?: string[];
}

export const LineChartPlot: React.FC<LineChartProps> = ({
  title,
  data,
  backgroundColor = 'BACKGROUND',
  currence = true,
  legend = []
}) => {
  const theme = useTheme();

  return (
    <ChartContainer>
      <TextStyled>{title}</TextStyled>
      <LineChart
        data={{
          legend,
          labels: data?.x,
          datasets: data?.y
            ? [
                {
                  data: data?.y
                }
              ]
            : data.datasets
        }}
        width={Dimensions.get('window').width - 50}
        height={220}
        yAxisLabel={currence ? 'R$' : ''}
        yAxisSuffix=""
        yAxisInterval={1}
        verticalLabelRotation={320}
        xLabelsOffset={10}
        chartConfig={{
          backgroundGradientFrom:
            backgroundColor === 'OVER'
              ? theme.colors.background_over
              : theme.colors.background,
          backgroundGradientTo:
            backgroundColor === 'OVER'
              ? theme.colors.background_over
              : theme.colors.background,
          decimalPlaces: currence ? 2 : 0,
          color: () => theme.colors.text,
          labelColor: () => theme.colors.text,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2'
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
