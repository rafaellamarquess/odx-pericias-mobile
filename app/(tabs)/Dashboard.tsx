import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { fetchDashboardData } from '@/lib/DashboardApi';
import { DashboardData } from '@/Types/Dashboards';
import TotalCasesCard from '@/components/Dashboard/TotalCasesCard';
import PeriodFilters from '@/components/Dashboard/PeriodFilters';
import FilterButtons from '@/components/Dashboard/FilterButton';
import ComparisonChart from '@/components/Dashboard/ComparisonChart';
import DataTable from '@/components/Dashboard/DataTable';
import NavigationBar from '@/components/Dashboard/NavigationBar';
import Header from '@/components/Dashboard/Header';
import MonthlyCasesChart from '@/components/Dashboard/CasesPerMonth';

const DashboardScreen: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [mesFiltro, setMesFiltro] = useState('2025-05');
  const [dataFiltro, setDataFiltro] = useState('');
  const [filtroSelecionado, setFiltroSelecionado] = useState<'vitima' | 'sexo' | 'estado' | 'lesoes' | 'cidade'>('vitima');

  const chartWidth = Dimensions.get('window').width - 32;

  const loadData = async () => {
    setLoading(true);
    try {
      const filters: { mes?: string; data?: string } = {};
      if (mesFiltro) filters.mes = mesFiltro;
      if (dataFiltro) filters.data = dataFiltro;
      const data = await fetchDashboardData(filters);
      console.log("Dados carregados no DashboardScreen:", data);
      setDashboardData(data);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [mesFiltro, dataFiltro]);

  if (loading) return <Text style={styles.loading}>Carregando...</Text>;
  if (!dashboardData) return <Text style={styles.error}>Erro ao carregar dados.</Text>;

  const getChartData = () => {
    const data = dashboardData[filtroSelecionado] || [];
    return {
      labels: data.map((item) => item.categoria),
      datasets: [
        {
          data: data.map((item) => item.quantidade),
          ...(['vitima', 'sexo'].includes(filtroSelecionado) 
            ? { pieData: data.map((item) => ({ value: item.quantidade, name: item.categoria })) }
            : {}),
        },
      ],
    };
  };

  const chartData = getChartData();

  return (
    <View style={styles.container}>
      <Header />
      <NavigationBar />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <TotalCasesCard totalCasos={dashboardData.totalCasos} />
        <MonthlyCasesChart data={dashboardData.casosPorMes} width={chartWidth} />
        <PeriodFilters
          mesFiltro={mesFiltro}
          setMesFiltro={setMesFiltro}
          dataFiltro={dataFiltro}
          setDataFiltro={setDataFiltro}
        />
        <FilterButtons filtroSelecionado={filtroSelecionado} setFiltroSelecionado={setFiltroSelecionado} />
        <ComparisonChart
          chartData={chartData}
          chartWidth={chartWidth}
          tipoGrafico={
            ['vitima', 'sexo'].includes(filtroSelecionado) ? 'pizza' : 'barra'
          }
        />
        <DataTable dadosAtuais={dashboardData[filtroSelecionado] || []} />
      </ScrollView>
    </View>
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
  loading: {
    textAlign: 'center',
    color: '#374151',
    marginTop: 20,
  },
  error: {
    textAlign: 'center',
    color: '#dc2626',
    marginTop: 20,
  },
});

export default DashboardScreen;