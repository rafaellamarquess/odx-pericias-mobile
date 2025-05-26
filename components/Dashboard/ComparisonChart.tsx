// src/components/Dashboard/ComparisonChart.tsx
import React from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import tw from 'twrnc';
import { ChartData } from 'react-native-chart-kit/dist/HelperTypes';
import { chartConfig } from '@/constants/Dashboard';

interface ComparisonChartProps {
  chartData: ChartData;
  chartWidth: number;
  tipoGrafico?: string;
}

const transformPieData = (dataFromApi: any[]) => {
  const colors = ['#f44336', '#2196f3', '#ffeb3b', '#4caf50', '#9c27b0', '#ff9800', '#009688'];
  return dataFromApi
    .filter(item => typeof item.quantidade === 'number' && !isNaN(item.quantidade))
    .map((item, index) => ({
      name: item.categoria || 'Não Informado',
      value: item.quantidade,
      color: colors[index % colors.length],
      legendFontColor: '#374151',
      legendFontSize: 12,
    }));
};

const ComparisonChart: React.FC<ComparisonChartProps> = ({ chartData, chartWidth, tipoGrafico = 'barra' }) => {
  if (!chartData || !chartData.labels || chartData.labels.length === 0) {
    return (
      <View style={tw`bg-white p-4 rounded-lg shadow-md mb-4`}>
        <Text style={tw`text-lg font-bold`}>Nenhum dado para exibir</Text>
      </View>
    );
  }

  const screenWidth = Dimensions.get('window').width - 32;
  const minBarWidth = 40;
  const adjustedWidth = Math.max(chartData.labels.length * minBarWidth, screenWidth);

  const commonBarProps = {
    width: adjustedWidth,
    height: 300,
    yAxisLabel: '',
    yAxisSuffix: '',
    chartConfig,
    style: tw`rounded-2xl border-2 border-blue-500`,
    withInnerLines: false,
    showValuesOnTopOfBars: false,
    verticalLabelRotation: chartData.labels.length > 3 ? 45 : 0,
    fromZero: true,
    flatColor: true,
    withHorizontalLabels: true,
    withCustomBarColorFromData: false,
    segments: 4,
    barPercentage: 0.6,
    yLabelsOffset: 10,
  };

  if (tipoGrafico === 'pizza') {
    const pieData = transformPieData((chartData.datasets[0] as any)?.pieData || []);
    if (pieData.length === 0) {
      return (
        <View style={tw`bg-white p-4 rounded-lg shadow-md mb-4`}>
          <Text style={tw`text-lg font-bold`}>Nenhum dado para exibir no gráfico de pizza</Text>
        </View>
      );
    }

    return (
      <View style={tw`bg-white p-4 rounded-lg shadow-md mb-4`}>
        <Text style={tw`text-lg font-bold mb-2`}>Gráfico de Comparações</Text>
        <PieChart
          data={pieData}
          width={screenWidth}
          height={300}
          chartConfig={chartConfig}
          accessor="value"
          backgroundColor="transparent"
          paddingLeft={screenWidth < 400 ? '5' : '15'}
          style={tw`rounded-2xl border-2 border-blue-500`}
        />
      </View>
    );
  }

  const barData = {
    labels: chartData.labels,
    datasets: chartData.datasets.map(dataset => ({
      ...dataset,
      data: dataset.data.map(value => (typeof value === 'number' && !isNaN(value) ? value : 0)),
    })),
  };

  return (
    <View style={tw`bg-white p-4 rounded-lg shadow-md mb-4`}>
      <Text style={tw`text-lg font-bold mb-2`}>Gráfico de Comparações</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <BarChart data={barData} {...commonBarProps} />
      </ScrollView>
    </View>
  );
};

export default ComparisonChart;