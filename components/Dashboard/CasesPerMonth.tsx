// src/components/Dashboard/MonthlyCasesChart.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import tw from 'twrnc';
import { chartConfig } from '@/constants/Dashboard';

interface MonthlyCasesChartProps {
  data: { mes: string; quantidade: number }[];
  width: number;
}

const MonthlyCasesChart: React.FC<MonthlyCasesChartProps> = ({ data, width }) => {
  if (!data || data.length === 0) {
    return (
      <View style={tw`bg-white p-4 rounded-lg shadow-md mb-4`}>
        <Text style={tw`text-lg font-bold`}>Nenhum dado para exibir</Text>
      </View>
    );
  }

  const validData = data.filter(item => typeof item.quantidade === 'number' && !isNaN(item.quantidade));
  if (validData.length === 0) {
    return (
      <View style={tw`bg-white p-4 rounded-lg shadow-md mb-4`}>
        <Text style={tw`text-lg font-bold`}>Nenhum dado válido para exibir</Text>
      </View>
    );
  }

  const chartData = {
    labels: validData.map(item => item.mes),
    datasets: [{ data: validData.map(item => item.quantidade) }],
  };

  return (
    <View style={tw`bg-white p-4 rounded-lg shadow-md mb-4`}>
      <Text style={tw`text-lg font-bold mb-2`}>Casos ao Longo dos Meses</Text>
      <LineChart
        data={chartData}
        width={width}
        height={220}
        yAxisLabel=""
        chartConfig={chartConfig}
        bezier
        style={tw`rounded-2xl border-2 border-blue-500`}
      />
    </View>
  );
};

export default MonthlyCasesChart;