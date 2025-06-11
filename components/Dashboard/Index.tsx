import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { LineChart, PieChart, BarChart } from 'react-native-chart-kit';
import tw from 'twrnc';
import { fetchDashboardData } from '@/lib/DashboardApi';
import { DashboardData, FiltroKey, DadosItem } from '@/types/Dashboards';
import { useAuth } from '@/contexts/AuthContext';

const chartConfig = {
  backgroundGradientFrom: '#f3f4f6',
  backgroundGradientTo: '#f3f4f6',
  color: (opacity = 1) => `rgba(65, 108, 114, ${opacity})`, // #416C72
  labelColor: (opacity = 1) => `rgba(55, 65, 81, ${opacity})`, // #374151
  decimalPlaces: 0,
  propsForLabels: {
    fontSize: 12,
    fontWeight: '600',
  },
};

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [mesFiltro, setMesFiltro] = useState('2025-05');
  const [filtroSelecionado, setFiltroSelecionado] = useState<FiltroKey>('vitima');
  const chartWidth = Dimensions.get('window').width - 32;

  const filtros: { label: string; key: FiltroKey }[] = [
    { label: 'Vítima', key: 'vitima' },
    { label: 'Sexo', key: 'sexo' },
    { label: 'Estado', key: 'estado' },
    { label: 'Lesões', key: 'lesoes' },
    { label: 'Cidade', key: 'cidade' },
  ];

  const colors = ['#679AA3', '#73A5AE', '#416C72'];

  const loadData = async (mes?: string) => {
    setLoading(true);
    try {
      const filters: { ano?: string; mes?: string } = {};
      if (mes) {
        const [ano, mesNum] = mes.split('-');
        filters.ano = ano;
        filters.mes = mesNum;
      }
      const data = await fetchDashboardData(filters);
      console.log('Dados carregados no Dashboard:', data);
      setDashboardData(data);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      Alert.alert('Erro', 'Falha ao carregar dados do dashboard.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(mesFiltro);
  }, []);

  const handleFiltrar = () => {
    const regexMes = /^\d{4}-(0[1-9]|1[0-2])$/;
    if (regexMes.test(mesFiltro)) {
      loadData(mesFiltro);
    } else {
      Alert.alert('Filtro inválido', 'Digite um mês válido no formato YYYY-MM');
    }
  };

  const getChartData = () => {
    const dados = dashboardData?.[filtroSelecionado] || [];
    const isPieChart = ['vitima', 'sexo'].includes(filtroSelecionado);

    return {
      labels: dados.map((item) => item.categoria || 'Não Informado'),
      datasets: [
        {
          data: dados.map((item) => item.quantidade || 0),
          ...(isPieChart
            ? {
                pieData: dados.map((item, index) => ({
                  name: item.categoria || 'Não Informado',
                  value: item.quantidade || 0,
                  color: colors[index % colors.length],
                  legendFontColor: '#374151',
                  legendFontSize: 12,
                })),
              }
            : {}),
        },
      ],
    };
  };

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-[#f3f4f6]`}>
        <ActivityIndicator size="large" color="#416C72" />
        <Text style={tw`text-gray-700 text-lg mt-2`}>Carregando...</Text>
      </View>
    );
  }

  if (!dashboardData) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-[#f3f4f6]`}>
        <Text style={tw`text-red-600 text-lg`}>Erro ao carregar dados.</Text>
      </View>
    );
  }

  const chartData = getChartData();
  const isPieChart = ['vitima', 'sexo'].includes(filtroSelecionado);
  const adjustedBarWidth = Math.max(chartData.labels.length * 60, chartWidth);

  // Inside components/Dashboard/index.tsx, replace the return block with this:
return (
  <ScrollView contentContainerStyle={tw`p-4 pb-8 bg-white`} showsVerticalScrollIndicator={false}>
    {/* Total de Casos Registrados */}
    <View style={tw`bg-white p-4 rounded-2xl shadow-md mb-4 border border-gray-200`}>
      <Text style={tw`text-gray-800 text-lg font-semibold`}>Total de Casos Registrados</Text>
      <View style={tw`flex-row items-center mt-2`}>
        <View style={tw`w-10 h-10 bg-[#416C72] rounded-full flex items-center justify-center mr-2`}>
          <Text style={tw`text-white text-xl font-bold`}>
            {dashboardData?.totalCasos.toLocaleString() || '0'}
          </Text>
        </View>
        <Text style={tw`text-gray-600`}>casos</Text>
      </View>
    </View>

    {/* Filtrar por */}
    <TouchableOpacity
      style={tw`bg-[#679AA3] py-2 px-4 rounded-md mb-4`}
      onPress={handleFiltrar}
    >
      <Text style={tw`text-white text-center font-semibold`}>Filtrar por</Text>
    </TouchableOpacity>

    {/* Gráfico de Comparações */}
    <View style={tw`bg-white p-4 rounded-2xl shadow-md mb-4 border border-gray-200`}>
      <Text style={tw`text-gray-800 text-lg font-semibold mb-2`}>Gráfico de Comparações</Text>
      {chartData.labels.length > 0 ? (
        isPieChart ? (
          <PieChart
            data={(chartData.datasets[0].pieData ?? []).filter((item: any) => item.value > 0)}
            width={chartWidth}
            height={220}
            chartConfig={chartConfig}
            accessor="value"
            backgroundColor="transparent"
            paddingLeft="20"
            style={tw`rounded-xl border border-gray-200 bg-gray-50`}
          />
        ) : (
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
        )
      ) : (
        <Text style={tw`text-gray-700 text-center`}>Nenhum dado para exibir</Text>
      )}
    </View>

    {/* Dados */}
    <View style={tw`bg-white p-4 rounded-2xl shadow-md border border-gray-200`}>
      <Text style={tw`text-gray-800 text-lg font-semibold mb-2`}>Dados</Text>
      {(dashboardData[filtroSelecionado] ?? []).length > 0 ? (
        (dashboardData[filtroSelecionado] ?? []).map((item, index) => (
          <View
            key={index}
            style={tw`flex-row justify-between py-2 ${
              index < (dashboardData[filtroSelecionado] ?? []).length - 1 ? 'border-b border-gray-200' : ''
            }`}
          >
            <Text style={tw`text-gray-700 w-1/2`}>{item.categoria}</Text>
            <Text style={tw`text-gray-700 w-1/2 text-right`}>{item.quantidade.toLocaleString()}</Text>
          </View>
        ))
      ) : (
        <View style={tw`flex-row justify-between py-2`}>
          <Text style={tw`text-gray-500 w-1/2`}>Categoria</Text>
          <Text style={tw`text-gray-500 w-1/2 text-right`}>Quantidade</Text>
        </View>
      )}
    </View>
  </ScrollView>
);
};

export default Dashboard;