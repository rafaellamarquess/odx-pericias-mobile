import React from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import tw from 'twrnc';
import { ChartData } from 'react-native-chart-kit/dist/HelperTypes';
import { chartConfig } from '@/constants/Dashboard';

interface ComparisonChartProps {
  chartData: ChartData;
  chartWidth: number;
  tipoGrafico?: 'barra' | 'pizza';
  titulo?: string;
}

const transformPieData = (dataFromApi: any[]) => {
  const diverseColors = [
    '#679AA3', '#73A5AE', '#416C72',
    '#F59E0B', '#EF4444', '#10B981',
    '#8B5CF6', '#F43F5E', '#0EA5E9',
    '#84CC16', '#EC4899', '#6B7280'
  ];

  return dataFromApi
    .filter(item => typeof item.value === 'number' && item.value > 0)
    .map((item, index) => ({
      name: item.name && typeof item.name === 'string' ? item.name.trim() : 'Não Informado',
      value: item.value,
      color: item.cor && typeof item.cor === 'string' ? item.cor : diverseColors[index % diverseColors.length],
      legendFontColor: '#374151',
      legendFontSize: Math.min(14, Math.max(11, Dimensions.get('window').width / 32)),
    }));
};

const ComparisonChart: React.FC<ComparisonChartProps> = ({
  chartData,
  chartWidth,
  tipoGrafico = 'barra',
  titulo = 'Gráfico de Comparações',
}) => {
  if (!chartData || !chartData.labels || chartData.labels.length === 0) {
    return (
      <View style={tw`bg-white p-4 rounded-lg shadow-md mb-4`}>
        <Text style={tw`text-lg font-bold`}>Nenhum dado para exibir</Text>
      </View>
    );
  }

  const screenWidth = Dimensions.get('window').width - 32;
  const screenHeight = Dimensions.get('window').height;
  const chartHeight = Math.min(300, Math.max(200, screenHeight * 0.3));

  if (tipoGrafico === 'pizza') {
    const pieDataRaw = (chartData.datasets[0] as any)?.pieData || [];
    const pieData = transformPieData(pieDataRaw);

    if (pieData.length === 0) {
      return (
        <View style={tw`bg-white p-4 rounded-lg shadow-md mb-4`}>
          <Text style={tw`text-lg font-bold`}>Nenhum dado para exibir no gráfico de pizza</Text>
        </View>
      );
    }

    return (
      <View style={tw`bg-white p-4 rounded-lg shadow-md mb-4`}>
        <Text style={tw`text-lg font-bold mb-2`}>{titulo}</Text>
        <PieChart
          data={pieData}
          width={screenWidth}
          height={chartHeight}
          chartConfig={chartConfig}
          accessor="value"
          backgroundColor="transparent"
          paddingLeft={screenWidth < 400 ? '10' : '20'}
          style={tw`rounded-2xl border border-gray-300 bg-gray-50`}
        />
      </View>
    );
  }

  const minBarWidth = 60;
  const adjustedWidth = Math.max(chartData.labels.length * minBarWidth, screenWidth);
  const maxDataValue = Math.max(...chartData.datasets.flatMap(ds => ds.data), 0);
  const segments = Math.max(2, Math.min(5, Math.ceil(maxDataValue / 2)));

  const fixedColors = ['#679AA3', '#73A5AE', '#416C72'];

  const barData = {
    labels: chartData.labels,
    datasets: chartData.datasets.map(dataset => ({
      ...dataset,
      data: dataset.data.map(value => (typeof value === 'number' && !isNaN(value) ? value : 0)),
      colors: dataset.data.map((_, i) => () => fixedColors[i % fixedColors.length]),
    })),
  };

  const commonBarProps = {
    width: adjustedWidth,
    height: Math.min(320, screenHeight * 0.4),
    yAxisLabel: '',
    yAxisSuffix: '',
    chartConfig: {
      ...chartConfig,
      backgroundGradientFrom: undefined,
      backgroundGradientTo: undefined,
      color: (opacity = 1, index = 0) => fixedColors[index % fixedColors.length],
    },
    style: tw`rounded-2xl border border-gray-300 bg-gray-50`,
    withInnerLines: false,
    showValuesOnTopOfBars: true,
    verticalLabelRotation: chartData.labels.length > 6 ? 60 : 30,
    fromZero: true,
    withHorizontalLabels: true,
    withCustomBarColorFromData: true,
    segments: segments,
    barPercentage: chartData.labels.length > 6 ? 0.5 : 0.7,
    yLabelsOffset: 8,
    flatColor: true,
  };

  return (
    <View style={tw`bg-white p-4 rounded-lg shadow-md mb-4`}>
      <Text style={tw`text-lg font-bold mb-2`}>{titulo}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <BarChart data={barData} {...commonBarProps} />
      </ScrollView>
    </View>
  );
};

export default ComparisonChart;
