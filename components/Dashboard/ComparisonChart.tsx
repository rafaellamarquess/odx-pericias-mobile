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
  return dataFromApi.map((item, index) => ({
    name: item.categoria || 'Não Informado',
    value: item.quantidade,
    color: colors[index % colors.length],
    legendFontColor: '#374151',
    legendFontSize: 12, // Reduzido para melhor ajuste em telas pequenas
  }));
};

const ComparisonChart: React.FC<ComparisonChartProps> = ({ chartData, chartWidth, tipoGrafico = 'barra' }) => {
  if (!chartData || !chartData.labels || chartData.labels.length === 0) {
    return (
      <View style={tw`bg-white p-4 rounded-lg shadow mb-4`}>
        <Text style={tw`text-lg font-bold`}>Nenhum dado para exibir</Text>
      </View>
    );
  }

  const screenWidth = Dimensions.get('window').width - 32; // Largura disponível da tela
  const minBarWidth = 40; // Reduzido para telas menores
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
    verticalLabelRotation: chartData.labels.length > 3 ? 45 : 0, // Rotação adaptativa para menos labels
    fromZero: true,
    flatColor: true,
    withHorizontalLabels: true,
    withCustomBarColorFromData: false,
    segments: 4,
    barPercentage: 0.6, // Reduzido para barras mais finas
    yLabelsOffset: 10,
  };

  if (tipoGrafico === 'pizza') {
    const pieData = transformPieData((chartData.datasets[0] as any)?.pieData || []);
    if (pieData.length === 0) {
      return (
        <View style={tw`bg-white p-4 rounded-lg shadow mb-4`}>
          <Text style={tw`text-lg font-bold`}>Nenhum dado para exibir no gráfico de pizza</Text>
        </View>
      );
    }

    return (
      <View style={tw`bg-white p-4 rounded-lg shadow mb-4`}>
        <Text style={tw`text-lg font-bold mb-2`}>Gráfico de Comparações</Text>
        <PieChart
          data={pieData}
          width={screenWidth}
          height={300}
          chartConfig={chartConfig}
          accessor="value"
          backgroundColor="transparent"
          paddingLeft={screenWidth < 400 ? '5' : '15'} // Menos padding em telas pequenas
          style={tw`rounded-2xl border-2 border-blue-500`}
        />
      </View>
    );
  }

  return (
    <View style={tw`bg-white p-4 rounded-lg shadow mb-4`}>
      <Text style={tw`text-lg font-bold mb-2`}>Gráfico de Comparações</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <BarChart data={chartData} {...commonBarProps} />
      </ScrollView>
    </View>
  );
};

export default ComparisonChart;