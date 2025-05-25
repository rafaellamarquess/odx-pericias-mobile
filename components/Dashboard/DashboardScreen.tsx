// src/components/Dashboards.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { fetchDashboardData } from '@/lib/DashboardApi';
import { DashboardData } from '@/Types/Dashboards';
import TotalCasesCard from './TotalCasesCard';
import PeriodFilters from './PeriodFilters';
import FilterButtons from './FilterButton';
import ComparisonChart from './ComparisonChart';
import DataTable from './DataTable';
import NavigationBar from './NavigationBar';
import styles from '@/styles/Dashboard'; // Ajuste o caminho conforme necessário

const DashboardScreen: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mesFiltro, setMesFiltro] = useState('2025-05');
  const [dataFiltro, setDataFiltro] = useState('');
  const [filtroSelecionado, setFiltroSelecionado] = useState<'vitima' | 'sexo' | 'estado' | 'lesoes' | 'cidade'>('vitima');

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const filters: { mes?: string; data?: string } = {};
      if (mesFiltro) filters.mes = mesFiltro;
      if (dataFiltro) filters.data = dataFiltro;
      const data = await fetchDashboardData(filters);
      setDashboardData(data);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setError('Falha ao carregar dados.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [mesFiltro, dataFiltro]);

  if (loading) return <Text style={styles.tableEmpty}>Carregando...</Text>;
  if (error) return <Text style={styles.tableEmpty}>{error}</Text>;
  if (!dashboardData) return <Text style={styles.tableEmpty}>Nenhum dado disponível.</Text>;

  const getChartData = () => {
    const data = dashboardData[filtroSelecionado] || [];
    return {
      labels: data.map((item) => item.categoria),
      datasets: [
        {
          data: data.map((item) => item.quantidade),
          ...(filtroSelecionado === 'cidade'
            ? {
                pieData: data.map((item) => ({
                  value: item.quantidade,
                  name: item.categoria,
                })),
              }
            : {}),
        },
      ],
    };
  };

  const chartData = getChartData();
  const chartWidth = Dimensions.get('window').width - 32;

  return (
   <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
  <NavigationBar />
  <TotalCasesCard totalCasos={dashboardData.totalCasos} />

  <PeriodFilters
    mesFiltro={mesFiltro}
    setMesFiltro={setMesFiltro}
    dataFiltro={dataFiltro}
    setDataFiltro={setDataFiltro}
  />

  <FilterButtons
    filtroSelecionado={filtroSelecionado}
    setFiltroSelecionado={setFiltroSelecionado}
  />

  <View style={styles.chartContainer}>
    <Text style={styles.chartTitle}>Gráfico de Comparação</Text>
    <ComparisonChart
      chartData={chartData}
      chartWidth={chartWidth}
      tipoGrafico={dashboardData[filtroSelecionado]?.[0]?.tipoGrafico || 'barra'}
    />
  </View>

  <View style={styles.tableContainer}>
    <Text style={styles.tableTitle}>Tabela de Dados</Text>
    <DataTable dadosAtuais={dashboardData[filtroSelecionado] || []} />
  </View>
</ScrollView>
  );
};

export default DashboardScreen;
