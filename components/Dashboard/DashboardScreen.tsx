import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { fetchDashboardData } from '@/lib/DashboardApi';
import { DashboardData } from '@/Types/Dashboards';
import TotalCasesCard from '@/components/Dashboard/TotalCasesCard';
import PeriodFilters from '@/components/Dashboard/PeriodFilters';
import FilterButtons from '@/components/Dashboard/FilterButton';
import ComparisonChart from '@/components/Dashboard/ComparisonChart';
import DataTable from '@/components/Dashboard/DataTable';
import MonthlyCasesChart from '@/components/Dashboard/CasesPerMonth';
import { SafeAreaView } from 'react-native-safe-area-context';

const DashboardScreen: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [mesFiltro, setMesFiltro] = useState('2025-05');
  // Remova filtro de data por enquanto
  // const [dataFiltroSelecionada, setDataFiltroSelecionada] = useState('');
  const [filtroSelecionado, setFiltroSelecionado] = useState<'vitima' | 'sexo' | 'estado' | 'lesoes' | 'cidade'>('vitima');

  const chartWidth = Dimensions.get('window').width - 32;

  const loadData = async (mes?: string) => {
    setLoading(true);
    try {
      const filters: { mes?: string } = {};
      if (mes) filters.mes = mes;

      const data = await fetchDashboardData(filters);
      console.log("Dados carregados no DashboardScreen:", data);
      setDashboardData(data);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  // Carrega dados só uma vez na montagem do componente, sem filtros ainda
  useEffect(() => {
    loadData(mesFiltro);
  }, []);

  // Função para validar o mês e chamar API ao clicar no botão filtrar
  const handleFiltrar = () => {
    const regexMes = /^\d{4}-(0[1-9]|1[0-2])$/; // YYYY-MM, mês 01-12
    if (regexMes.test(mesFiltro)) {
      loadData(mesFiltro);
    } else {
      Alert.alert('Filtro inválido', 'Digite um mês válido no formato YYYY-MM');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  if (!dashboardData) {
    return <Text style={styles.error}>Erro ao carregar dados.</Text>;
  }

  const colors = [
    '#679AA3', '#73A5AE', '#416C72',
  ];

  const getChartData = () => {
    const dados = dashboardData[filtroSelecionado] || [];
    const isPieChart = ['vitima', 'sexo'].includes(filtroSelecionado);

    return {
      labels: dados.map(item => item.categoria),
      datasets: [
        {
          data: dados.map(item => item.quantidade),
          ...(isPieChart
            ? {
                pieData: dados.map((item, index) => ({
                  value: item.quantidade,
                  name: item.categoria || 'Não Informado',
                  color: colors[index % colors.length],
                  legendFontColor: '#111827',
                  legendFontSize: 16,
                })),
              }
            : {}),
        },
      ],
    };
  };

  const chartData = getChartData();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <TotalCasesCard totalCasos={dashboardData.totalCasos} />
        <MonthlyCasesChart data={dashboardData.casosPorMes} width={chartWidth} />
        <PeriodFilters
          mesFiltro={mesFiltro}
          setMesFiltro={setMesFiltro}
          onFiltrar={handleFiltrar} // <-- Aqui passa a função para disparar filtro
        />
        <FilterButtons
          filtroSelecionado={filtroSelecionado}
          setFiltroSelecionado={setFiltroSelecionado}
        />
        <ComparisonChart
          chartData={chartData}
          chartWidth={chartWidth}
          tipoGrafico={['vitima', 'sexo'].includes(filtroSelecionado) ? 'pizza' : 'barra'}
        />
        <DataTable dadosAtuais={dashboardData[filtroSelecionado] || []} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#374151',
  },
  error: {
    textAlign: 'center',
    color: '#dc2626',
    marginTop: 20,
    fontSize: 16,
  },
});

export default DashboardScreen;
