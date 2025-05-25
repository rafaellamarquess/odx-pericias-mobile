// app/(tabs)/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fetchDashboardData } from '@/lib/DashboardApi';
import { DashboardData } from '@/Types/Dashboards';
import TotalCasesCard from '@/components/Dashboard/TotalCasesCard';
import PeriodFilters from '@/components/Dashboard/PeriodFilters';
import FilterButtons from '@/components/Dashboard/FilterButton';
import ComparisonChart from '@/components/Dashboard/ComparisonChart';
import DataTable from '@/components/Dashboard/DataTable';
import NavigationBar from '@/components/Dashboard/NavigationBar';

const DashboardScreen: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [mesFiltro, setMesFiltro] = useState('2025-05');
  const [dataFiltro, setDataFiltro] = useState('');
  const [filtroSelecionado, setFiltroSelecionado] = useState<'vitima' | 'sexo' | 'estado' | 'lesoes' | 'cidade'>('vitima');

  const loadData = async () => {
    setLoading(true);
    try {
      const filters: { mes?: string; data?: string } = {};
      if (mesFiltro) filters.mes = mesFiltro;
      if (dataFiltro) filters.data = dataFiltro;
      const data = await fetchDashboardData(filters);
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

  if (loading) return <Text>Carregando...</Text>;
  if (!dashboardData) return <Text>Erro ao carregar dados.</Text>;

  const getChartData = () => {
    const data = dashboardData[filtroSelecionado] || [];
    return {
      labels: data.map((item) => item.categoria),
      datasets: [
        {
          data: data.map((item) => item.quantidade),
          ...(filtroSelecionado === 'cidade' ? { pieData: data.map((item) => ({ value: item.quantidade, name: item.categoria })) } : {}),
        },
      ],
    };
  };

  const chartData = getChartData();
  const chartWidth = 300;

  return (
    <View style={styles.container}>
      <NavigationBar />
      <TotalCasesCard totalCasos={dashboardData.totalCasos} />
      <PeriodFilters
        mesFiltro={mesFiltro}
        setMesFiltro={setMesFiltro}
        dataFiltro={dataFiltro}
        setDataFiltro={setDataFiltro}
      />
      <FilterButtons filtroSelecionado={filtroSelecionado} setFiltroSelecionado={setFiltroSelecionado} />
      <ComparisonChart chartData={chartData} chartWidth={chartWidth} tipoGrafico={dashboardData[filtroSelecionado]?.[0]?.tipoGrafico || 'barra'} />
      <DataTable dadosAtuais={dashboardData[filtroSelecionado] || []} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
});

export default DashboardScreen;