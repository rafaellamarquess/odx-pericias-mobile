import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FiltroKey, DashboardData } from '@/Types/Dashboards';
import { fetchDashboardData } from '@/lib/DashboardApi';
import { Dimensions } from 'react-native';

export const useDashboard = () => {
  const navigation = useNavigation();
  const [filtroSelecionado, setFiltroSelecionado] = useState<FiltroKey>('vitima');
  const [dados, setDados] = useState<DashboardData>({ totalCasos: 0, casosPorMes: [] });
  const [mesFiltro, setMesFiltro] = useState<string>('');
  const [dataFiltro, setDataFiltro] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const chartWidth = Dimensions.get('window').width - 40;

  const fetchDados = async () => {
    try {
      setLoading(true);
      setError(null);
      const filters = { mes: mesFiltro, data: dataFiltro };
      const result = await fetchDashboardData(filters);
      setDados(result);
    } catch (error: any) {
      if (error.response?.status === 401) {
        // navigation.navigate('Login');
      } else {
        setError('Erro ao carregar os dados. Tente novamente.');
        console.error('Erro ao buscar dados:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDados();
  }, [mesFiltro, dataFiltro]);

  return {
    filtroSelecionado,
    setFiltroSelecionado,
    dados,
    mesFiltro,
    setMesFiltro,
    dataFiltro,
    setDataFiltro,
    loading,
    error,
    chartWidth,
    fetchDados,
  };
};