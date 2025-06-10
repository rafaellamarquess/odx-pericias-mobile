// src/components/Dashboard/MonthlyCasesChart.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import tw from 'twrnc';
import { chartConfig } from '@/constants/Dashboard';

interface MonthlyCasesChartProps {
  data: { mes: string; quantidade: number }[];
  width: number;
  tipo?: 'mes' | 'dia';
}

const MonthlyCasesChart: React.FC<MonthlyCasesChartProps> = ({ data, width, tipo = 'mes' }) => {
  if (!data || data.length === 0) {
    return (
      <View style={tw`bg-white p-4 rounded-lg shadow-md mb-4`}>
        <Text style={tw`text-lg font-bold`}>Nenhum dado para exibir</Text>
      </View>
    );
  }

  const validData = data.filter(
    item => typeof item.quantidade === 'number' && !isNaN(item.quantidade)
  );

  if (validData.length === 0) {
    return (
      <View style={tw`bg-white p-4 rounded-lg shadow-md mb-4`}>
        <Text style={tw`text-lg font-bold`}>Nenhum dado válido para exibir</Text>
      </View>
    );
  }

  const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  const chartData = {
    labels: validData.map(item => {
      if (!item.mes) return 'Indef.';

      if (tipo === 'mes') {
        const [ano, mes] = item.mes.split('-');
        const monthIndex = parseInt(mes, 10) - 1;
        return `${monthNames[monthIndex]}/${ano?.slice(-2)}`;
      } else {
        const [ano, mes, dia] = item.mes.split('-');
        return `${dia}/${mes}`;
      }
    }),
    datasets: [
      {
        data: validData.map(item => item.quantidade),
      },
    ],
  };

  return (
    <View style={tw`bg-white p-4 rounded-lg shadow-md mb-4`}>
      <Text style={tw`text-lg font-bold mb-2`}>
        Casos por {tipo === 'mes' ? 'Mês' : 'Dia'}
      </Text>
      <LineChart
        data={chartData}
        width={width}
        height={220}
        yAxisLabel=""
        chartConfig={chartConfig}
        bezier
        style={tw`rounded-2xl border border-gray-300 bg-gray-50`}
      />
    </View>
  );
};

export default MonthlyCasesChart;
