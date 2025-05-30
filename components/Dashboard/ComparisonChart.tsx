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
  customColors?: string[];
}

const transformPieData = (dataFromApi: any[], customColors?: string[]) => {
  const defaultColors = [
    '#EF4444', '#3B82F6', '#FACC15', '#10B981', '#8B5CF6', 
    '#F97316', '#14B8A6', '#EC4899', '#6B7280', '#84CC16', 
    '#F43F5E', '#0EA5E9',
  ];

  const colors = customColors?.length ? customColors : defaultColors;

  console.log('Dados da API recebidos:', dataFromApi);

  return dataFromApi
    .filter((item) => {
      const isValid = typeof item.value === 'number' && item.value > 0;
      if (!isValid) {
        console.warn('Item inválido filtrado:', item);
      }
      return isValid;
    })
    .map((item, index) => ({
      name: item.name && typeof item.name === 'string' 
        ? item.name.trim() 
        : 'Não Informado',
      value: item.value,
      color: item.cor && typeof item.cor === 'string' 
        ? item.cor 
        : colors[index % colors.length],
      legendFontColor: '#111827',
      legendFontSize: Math.min(16, Math.max(12, Dimensions.get('window').width / 30)), 
    }));
};

const ComparisonChart: React.FC<ComparisonChartProps> = ({
  chartData,
  chartWidth,
  tipoGrafico = 'barra',
  customColors,
}) => {
  if (!chartData || !chartData.labels || chartData.labels.length === 0) {
    console.log('Nenhum dado válido em chartData:', chartData);
    return (
      <View style={tw`bg-white p-4 rounded-lg shadow-md mb-4`}>
        <Text style={tw`text-lg font-bold`}>Nenhum dado para exibir</Text>
      </View>
    );
  }

  const screenWidth = Dimensions.get('window').width - 32;
  const screenHeight = Dimensions.get('window').height;

 
  const chartHeight = Math.min(300, Math.max(200, screenHeight * 0.3)); 
  const minFontSize = 12;
  const maxFontSize = 16;
  const legendFontSize = Math.min(maxFontSize, Math.max(minFontSize, screenWidth / 30));

  if (tipoGrafico === 'pizza') {
    const pieDataRaw = (chartData.datasets[0] as any)?.pieData || [];
    const pieData = transformPieData(pieDataRaw, customColors);

    console.log('Dados transformados para PieChart:', pieData);

    if (pieData.length === 0) {
      console.log('Nenhum dado válido para o gráfico de pizza:', pieDataRaw);
      return (
        <View style={tw`bg-white p-4 rounded-lg shadow-md mb-4`}>
          <Text style={tw`text-lg font-bold`}>Nenhum dado para exibir no gráfico de pizza</Text>
        </View>
      );
    }

    return (
      <View style={tw`bg-white p-4 rounded-lg shadow-md mb-4 ${screenWidth < 400 ? 'p-2' : ''}`}>
        <Text style={tw`text-lg font-bold mb-2 ${screenWidth < 400 ? 'text-base' : ''}`}>Gráfico de Comparações</Text>
        <PieChart
          data={pieData}
          width={screenWidth} 
          height={chartHeight} 
          chartConfig={chartConfig}
          accessor="value"
          backgroundColor="transparent"
          paddingLeft={screenWidth < 400 ? '10' : '20'} 
          style={tw`rounded-2xl border border-gray-300 bg-gray-50`}
        
          {...(pieData.length > 0 && { legendFontSize })}
        />
      </View>
    );
  }

  const minBarWidth = 50;
  const adjustedWidth = Math.max(chartData.labels.length * minBarWidth, screenWidth);

  const commonBarProps = {
    width: adjustedWidth,
    height: Math.min(320, screenHeight * 0.4),
    yAxisLabel: '',
    yAxisSuffix: '',
    chartConfig,
    style: tw`rounded-2xl border border-gray-300 bg-gray-50`,
    withInnerLines: false,
    showValuesOnTopOfBars: true,
    verticalLabelRotation: chartData.labels.length > 4 ? 45 : 0,
    fromZero: true,
    flatColor: true,
    withHorizontalLabels: true,
    withCustomBarColorFromData: false,
    segments: 5,
    barPercentage: 0.7,
    yLabelsOffset: 12,
  };

  const barData = {
    labels: chartData.labels,
    datasets: chartData.datasets.map((dataset) => ({
      ...dataset,
      data: dataset.data.map((value) => (typeof value === 'number' && !isNaN(value) ? value : 0)),
    })),
  };

  return (
    <View style={tw`bg-white p-4 rounded-lg shadow-md mb-4 ${screenWidth < 400 ? 'p-2' : ''}`}>
      <Text style={tw`text-lg font-bold mb-2 ${screenWidth < 400 ? 'text-base' : ''}`}>Gráfico de Comparações</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <BarChart data={barData} {...commonBarProps} />
      </ScrollView>
    </View>
  );
};

export default ComparisonChart;