import { View, Text, ScrollView } from 'react-native';
import tw from 'twrnc';
import { PieChart, BarChart, LineChart } from 'react-native-chart-kit';
import { theme } from '@/constants/theme';
import { DadosItem } from '@/types/Dashboard';

interface Props {
  title: string;
  data: DadosItem[] | { mes: string; quantidade: number }[];
  chartType: 'pie' | 'bar' | 'line';
  chartWidth: number;
}

const chartConfig = {
  backgroundGradientFrom: theme.colors.background,
  backgroundGradientTo: theme.colors.background,
  color: (opacity = 1) => `rgba(74, 132, 129, ${opacity})`, // #4A8481
  labelColor: (opacity = 1) => `rgba(${theme.colors.text}, ${opacity})`,
  decimalPlaces: 0,
  propsForLabels: { fontSize: 12, fontWeight: '600' },
};

const ChartCard = ({ title, data, chartType, chartWidth }: Props) => {
  const colors = [theme.colors.primary, theme.colors.secondary, theme.colors.accent];

  const isLineChart = chartType === 'line';
  const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  const chartData = isLineChart
    ? {
        labels: (data as { mes: string; quantidade: number }[]).map((item) => {
          const [ano, mes] = item.mes.split('-');
          const monthIndex = parseInt(mes, 10) - 1;
          return `${monthNames[monthIndex]}/${ano?.slice(-2)}`;
        }),
        datasets: [{ data: (data as { mes: string; quantidade: number }[]).map((item) => item.quantidade || 0) }],
      }
    : {
        labels: (data as DadosItem[]).map((item) => item.categoria || 'Não Informado'),
        datasets: [
          {
            data: (data as DadosItem[]).map((item) => item.quantidade || 0),
            ...(chartType === 'pie'
              ? {
                  pieData: (data as DadosItem[]).map((item, index) => ({
                    name: item.categoria || 'Não Informado',
                    value: item.quantidade || 0,
                    color: colors[index % colors.length],
                    legendFontColor: theme.colors.text,
                    legendFontSize: 12,
                  })),
                }
              : {}),
          },
        ],
      };

  const adjustedBarWidth = chartType === 'bar' ? Math.max(chartData.labels.length * 60, chartWidth) : chartWidth;

  if (!chartData.labels.length) {
    return (
      <View style={tw`bg-white p-4 rounded-2xl mb-4 shadow-md border border-gray-200`}>
        <Text style={tw`text-[${theme.colors.text}] text-lg font-semibold mb-2`}>{title}</Text>
        <Text style={tw`text-gray-700 text-center`}>Nenhum dado para exibir</Text>
      </View>
    );
  }

  return (
    <View style={tw`bg-white p-4 rounded-2xl mb-4 shadow-md border border-gray-200`}>
      <Text style={tw`text-[${theme.colors.text}] text-lg font-semibold mb-2`}>{title}</Text>
      {chartType === 'pie' ? (
        <PieChart
          data={chartData.datasets[0].pieData?.filter((item: any) => item.value > 0) || []}
          width={chartWidth}
          height={220}
          chartConfig={chartConfig}
          accessor="value"
          backgroundColor="transparent"
          paddingLeft="20"
          style={tw`rounded-xl border border-gray-200 bg-gray-50`}
        />
      ) : chartType === 'bar' ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <BarChart
            data={{
              labels: chartData.labels,
              datasets: chartData.datasets.map((ds) => ({
                ...ds,
                data: ds.data.map((value) => (typeof value === 'number' ? value : 0)),
              })),
            }}
            width={adjustedBarWidth}
            height={220}
            yAxisLabel=""
            chartConfig={chartConfig}
            style={tw`rounded-xl border border-gray-200 bg-gray-50`}
            showValuesOnTopOfBars={true}
            verticalLabelRotation={chartData.labels.length > 6 ? 45 : 0}
            yAxisSuffix=""
            fromZero={true}
          />
        </ScrollView>
      ) : (
        <LineChart
          data={chartData}
          width={chartWidth}
          height={220}
          yAxisLabel=""
          chartConfig={chartConfig}
          bezier
          style={tw`rounded-xl border border-gray-200 bg-gray-50`}
        />
      )}
    </View>
  );
};

export default ChartCard;