import { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, ActivityIndicator, Alert, TextInput, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { useAuth } from '@/contexts/AuthContext';
import { fetchDashboardData } from '@/lib/api';
import { DashboardData, FiltroKey } from '@/types/Dashboard';
import { theme } from '@/constants/theme';
import Header from '@/components/Header';
import DataCard from './DataCard';
import ChartCard from './ChartCard';
import FilterBar from './FilterBar';
import { Dimensions } from 'react-native';
import * as Haptics from 'expo-haptics';

const Dashboard = () => {
  const { user, loading: authLoading, error: authError } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [mesFiltro, setMesFiltro] = useState('');
  const [filtroSelecionado, setFiltroSelecionado] = useState<FiltroKey>('vitima');
  const chartWidth = Dimensions.get('window').width - 32;
  const [error, setError] = useState('');

  const filtros: { label: string; key: FiltroKey }[] = [
    { label: 'Vítima', key: 'vitima' },
    { label: 'Sexo', key: 'sexo' },
    { label: 'Estado do Corpo', key: 'estado' },
    { label: 'Lesões', key: 'lesoes' },
    { label: 'Cidade', key: 'cidade' },
  ];

  const loadData = async (mes?: string) => {
    setLoading(true);
    setError('');
    try {
      const filters: { ano?: string; mes?: string } = {};
      if (mes) {
        const [ano, mesNum] = mes.split('-');
        filters.ano = ano;
        filters.mes = mesNum;
      }
      const data = await fetchDashboardData(filters);
      setDashboardData(data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Falha ao carregar dados do dashboard.');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && !authLoading && ['admin', 'perito'].includes(user.perfil.toLowerCase())) {
      loadData(mesFiltro);
    }
  }, [user, authLoading, mesFiltro]);

  const handleFiltrar = () => {
    if (!mesFiltro) {
      loadData();
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      return;
    }
    const regexMes = /^\d{4}-(0[1-9]|1[0-2])$/;
    if (regexMes.test(mesFiltro)) {
      loadData(mesFiltro);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else {
      Alert.alert('Filtro inválido', 'Digite um mês válido no formato YYYY-MM ou deixe vazio.');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  if (authLoading || loading) {
    return (
      <SafeAreaView style={tw`flex-1 justify-center items-center bg-[${theme.colors.background}]`}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={tw`text-[${theme.colors.text}] mt-4`}>Carregando...</Text>
      </SafeAreaView>
    );
  }

  if (authError || error) {
    return (
      <SafeAreaView style={tw`flex-1 justify-center items-center bg-[${theme.colors.background}]`}>
        <Text style={tw`text-[${theme.colors.error}] text-center px-5`}>{authError || error}</Text>
      </SafeAreaView>
    );
  }

  if (!user || !['admin', 'perito'].includes(user.perfil.toLowerCase())) {
    return (
      <SafeAreaView style={tw`flex-1 justify-center items-center bg-[${theme.colors.background}]`}>
        <Text style={tw`text-[${theme.colors.error}] text-center px-5`}>Acesso não autorizado.</Text>
      </SafeAreaView>
    );
  }

  if (!dashboardData) {
    return (
      <SafeAreaView style={tw`flex-1 justify-center items-center bg-[${theme.colors.background}]`}>
        <Text style={tw`text-[${theme.colors.error}] text-lg`}>Erro ao carregar dados.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-[${theme.colors.background}]`}>
      <Header title="DASHBOARD" />
      <View style={tw`flex-row items-center mx-4 mb-4`}>
        <TextInput
          style={tw`flex-1 bg-white rounded-xl px-4 py-3 border border-gray-200 text-[${theme.colors.text}] text-sm`}
          placeholder="YYYY-MM (opcional)"
          value={mesFiltro}
          onChangeText={setMesFiltro}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={tw`ml-2 bg-[${theme.colors.primary}] py-3 px-4 rounded-xl`}
          onPress={handleFiltrar}
        >
          <Text style={tw`text-white font-semibold`}>Filtrar</Text>
        </TouchableOpacity>
      </View>
      <DataCard title="Total de Casos Registrados" value={dashboardData.totalCasos.toLocaleString()} />
      <ChartCard
        title="Casos por Mês"
        data={dashboardData.casosPorMes}
        chartType="line"
        chartWidth={chartWidth}
      />
      <FilterBar filters={filtros} selectedFilter={filtroSelecionado} onSelectFilter={setFiltroSelecionado} />
      <ChartCard
        title="Gráfico de Comparações"
        data={dashboardData[filtroSelecionado] || []}
        chartType={['vitima', 'sexo'].includes(filtroSelecionado) ? 'pie' : 'bar'}
        chartWidth={chartWidth}
      />
    </SafeAreaView>
  );
};

export default Dashboard;