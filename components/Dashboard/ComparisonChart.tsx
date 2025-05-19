import React from 'react';
import { View, Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit'; 
import tw from 'twrnc';
import styles from '../../styles/Dashboard';
import { chartConfig } from '../../constants/Dashboard';
import { ChartData } from 'react-native-chart-kit/dist/HelperTypes';




interface ComparisonChartProps {
  chartData: ChartData; 
  chartWidth: number;
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({ chartData, chartWidth }) => {
    
  if (!chartData.labels || chartData.labels.length === 0) {
    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Nenhum dado para exibir</Text>
      </View>
    );
  }

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>Gráfico de Comparações</Text>
      <BarChart
        data={chartData}
        width={chartWidth}
        height={200}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={chartConfig}
        style={tw`rounded-2xl border-2 border-blue-500`}
        withInnerLines={false}
      />
    </View>
  );
};

export default ComparisonChart;