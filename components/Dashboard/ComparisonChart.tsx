import React from 'react';
import { View, Text } from 'react-native';
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
  const colors = ["#f44336", "#2196f3", "#ffeb3b", "#4caf50", "#9c27b0", "#ff9800", "#009688"];
  
  return dataFromApi.map((item, index) => ({
    name: item.categoria || "Não Informado",
    value: item.quantidade,
    color: colors[index % colors.length],
    legendFontColor: "#374151", // Cinza escuro
    legendFontSize: 16, // Aumentado
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

  const commonBarProps = {
    width: chartWidth,
    height: 320, // Aumentado
    yAxisLabel: '',
    yAxisSuffix: '',
    chartConfig,
    style: tw`rounded-2xl border-2 border-blue-500`,
    withInnerLines: false,
    showValuesOnTopOfBars: false,
    verticalLabelRotation: 45,
    fromZero: true,
    flatColor: true,
    withHorizontalLabels: true,
    segments: 5,
    barPercentage: 0.6, // Aumenta o espaçamento entre as barras
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
          width={chartWidth}
          height={320} // Aumentado
          chartConfig={chartConfig}
          accessor="value"
          backgroundColor="transparent"
          paddingLeft="15"
          style={tw`rounded-2xl border-2 border-blue-500`}
        />
      </View>
    );
  }

  return (
    <View style={tw`bg-white p-4 rounded-lg shadow mb-4`}>
      <Text style={tw`text-lg font-bold mb-2`}>Gráfico de Comparações</Text>
      <BarChart
        data={chartData}
        {...commonBarProps}
      />
    </View>
  );
};

export default ComparisonChart;
