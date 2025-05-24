import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import tw from 'twrnc';
import styles from '../../styles/Dashboard';
import { chartConfig } from '../../constants/Dashboard';
import { DadosItem } from '@/Types/Dashboards';

interface ComparisonChartProps {
  chartData: DadosItem[];
  chartWidth: number;
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({ chartData, chartWidth }) => {
  if (!chartData || chartData.length === 0) {
    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Nenhum dado para exibir</Text>
      </View>
    );
  }

  // Função para gerar cores com opacidade
  const getColorWithOpacity = (baseColor: string) => (opacity: number) => baseColor.replace(')', `, ${opacity})`).replace('rgb', 'rgba');

  const baseColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

  // Dados para PieChart
  const pieData = chartData.map((item, index) => ({
    name: item.categoria,
    value: item.quantidade,
    color: baseColors[index % baseColors.length],
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  }));

  // Dados para BarChart
  const barData = {
    labels: chartData.map(item => item.categoria),
    datasets: [{
      data: chartData.map(item => item.quantidade),
      colors: baseColors.map(color => getColorWithOpacity(color)),
    }],
  };

  const tipoGrafico = chartData[0]?.tipoGrafico || 'barra';

  if (tipoGrafico === 'pizza') {
    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Gráfico de Comparações</Text>
        <PieChart
          data={pieData}
          width={chartWidth}
          height={220}
          chartConfig={chartConfig}
          accessor="value"
          backgroundColor="transparent" // Adicionado para resolver o erro
          paddingLeft="15"
          style={tw`rounded-2xl border-2 border-blue-500`}
        />
      </View>
    );
  } else if (tipoGrafico === 'dispersao') {
    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Gráfico de Comparações</Text>
        <BarChart
          data={{
            labels: barData.labels,
            datasets: [{
              data: barData.datasets[0].data,
              colors: barData.datasets[0].colors,
            }],
          }}
          width={chartWidth}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={chartConfig}
          style={tw`rounded-2xl border-2 border-blue-500`}
          withInnerLines={false}
          showValuesOnTopOfBars={false}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Gráfico de Comparações</Text>
        <BarChart
          data={{
            labels: barData.labels,
            datasets: [{
              data: barData.datasets[0].data,
              colors: barData.datasets[0].colors,
            }],
          }}
          width={chartWidth}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={chartConfig}
          style={tw`rounded-2xl border-2 border-blue-500`}
          withInnerLines={false}
        />
      </View>
    );
  }
};

export default ComparisonChart;