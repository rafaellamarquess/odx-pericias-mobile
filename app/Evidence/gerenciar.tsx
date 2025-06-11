import { useState, useEffect, useCallback, useMemo } from 'react';
import { SafeAreaView, View, ActivityIndicator, Text, Alert, TouchableWithoutFeedback } from 'react-native';
import { useRouter } from 'expo-router';
import tw from 'twrnc';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar/SearchBar';
import StatusFilter from '../../components/StatusFilter/StatusFilter';
import EvidenceList from '../../components/Evidence/GestaoEvidenciasScreen/EvidenceList';
import FloatingActionButton from '../../components/Evidence/GestaoEvidenciasScreen/FloatingActionButton';
import { IEvidence, EvidenceListResponse } from '../../types/Evidence';
import { IVitima, VitimaListResponse } from '../../types/Vitima';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';

interface EvidenceQueryParams {
  page: number;
  limit: number;
  populate: string;
  search?: string;
  vitima?: 'identificada' | 'não identificada' | '';
}

const EvidenceManagementScreen = () => {
  const router = useRouter();
  const { user, loading: authLoading, error: authError } = useAuth();
  const [evidences, setEvidences] = useState<(IEvidence & { vitima?: IVitima })[]>([]);
  const [vitimas, setVitimas] = useState<IVitima[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    paginaAtual: 1,
    porPagina: 10,
    totalPaginas: 0,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [searchText, setSearchText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [activeEvidenceId, setActiveEvidenceId] = useState<string | null>(null);
  const statusOptions = ['Todos', 'Identificada', 'Não Identificada'];

  const API_URL = process.env.API_URL || 'http://localhost:3000';

  const fetchEvidences = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('authToken');
      const params: EvidenceQueryParams = {
        page: pagination.paginaAtual,
        limit: pagination.porPagina,
        populate: 'vitima coletadoPor caso',
      };

      if (searchText.trim()) params.search = searchText;
      if (selectedStatus && selectedStatus !== 'Todos') {
        params.vitima = selectedStatus === 'Identificada' ? 'identificada' : 'não identificada';
      }

      const response = await axios.get<EvidenceListResponse>(`${API_URL}/api/evidence`, {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });

      setEvidences(response.data.evidencias || []);
      setPagination(response.data.paginacao || {
        total: 0,
        paginaAtual: 1,
        porPagina: 10,
        totalPaginas: 0,
      });
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Erro ao buscar evidências.');
      setEvidences([]);
    } finally {
      setIsLoading(false);
    }
  }, [pagination.paginaAtual, pagination.porPagina, searchText, selectedStatus, API_URL]);

  const fetchVitimas = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await axios.get<VitimaListResponse>(`${API_URL}/api/vitima`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { populate: 'caso' },
      });
      setVitimas(response.data.data || []);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Erro ao buscar vítimas.');
      setVitimas([]);
    }
  }, [API_URL]);

  const handleDelete = async (id: string) => {
    Alert.alert('Confirmar Exclusão', 'Tem certeza que deseja excluir esta evidência?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem('authToken');
            await axios.delete(`${API_URL}/api/evidence/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            await fetchEvidences();
            setSuccess('Evidência deletada com sucesso.');
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            setActiveEvidenceId(null);
          } catch (err: any) {
            setError(err.response?.data?.msg || 'Erro ao excluir a evidência.');
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          }
        },
      },
    ]);
  };

  const handlePaginationChange = (page: number) => {
    setPagination((prev) => ({ ...prev, paginaAtual: page }));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const toggleStatusFilter = (status: string) => {
    setSelectedStatus(selectedStatus === status ? null : status);
    setPagination((prev) => ({ ...prev, paginaAtual: 1 }));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const onLongPress = (id: string) => {
    setActiveEvidenceId(id === activeEvidenceId ? null : id);
  };

  const onOutsidePress = () => {
    setActiveEvidenceId(null);
  };

  //DESCOMENTAR QUANDO FOR IMPLEMENTADO O CONTROLE DE ACESSO
  // useEffect(() => {
  //   if (!authLoading && (!user || !['admin', 'perito', 'assistente'].includes(user.perfil.toLowerCase()))) {
  //     router.push('/(tabs)/home');
  //   }
  // }, [user, authLoading, router]);

  useEffect(() => {
    if (user && !authLoading) {
      fetchEvidences();
      fetchVitimas();
    }
  }, [user, authLoading, fetchEvidences, fetchVitimas]);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess('');
        setError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const filteredEvidences = useMemo(() => {
    let result = [...evidences];
    // Client-side filtering is minimal since we rely on the backend
    return result;
  }, [evidences]);

  if (authLoading) {
    return (
      <SafeAreaView style={tw`flex-1 justify-center items-center bg-[#F5F5F5]`}>
        <ActivityIndicator size="large" color="#4A8481" />
        <Text style={tw`text-gray-600 mt-4`}>Carregando...</Text>
      </SafeAreaView>
    );
  }

  if (authError) {
    return (
      <SafeAreaView style={tw`flex-1 justify-center items-center bg-[#F5F5F5]`}>
        <Text style={tw`text-red-500 text-center px-5`}>Erro de autenticação: {authError}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-[#F5F5F5]`}>
      <TouchableWithoutFeedback onPress={onOutsidePress}>
        <View style={tw`flex-1`}>
          <Header title="GESTÃO DE EVIDÊNCIAS" />
          <SearchBar searchText={searchText} setSearchText={setSearchText} />
          <StatusFilter
            statusOptions={statusOptions}
            selectedStatus={selectedStatus}
            toggleStatusFilter={toggleStatusFilter}
          />
          {error && <Text style={tw`text-red-500 text-sm mx-5 mb-4 text-center`}>{error}</Text>}
          {success && <Text style={tw`text-green-600 text-sm mx-5 mb-4 text-center`}>{success}</Text>}
          {isLoading && !evidences.length ? (
            <View style={tw`flex-1 justify-center items-center mt-10`}>
              <ActivityIndicator size="large" color="#4A8481" />
              <Text style={tw`text-gray-600 mt-4`}>Carregando evidências...</Text>
            </View>
          ) : (
            <EvidenceList
              filteredEvidences={filteredEvidences}
              onDelete={handleDelete}
              activeEvidenceId={activeEvidenceId}
              onLongPress={onLongPress}
              onOutsidePress={onOutsidePress}
              failedImages={failedImages}
              setFailedImages={setFailedImages}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
      <FloatingActionButton />
      {isLoading && evidences.length > 0 && (
        <View style={tw`absolute bottom-20 left-0 right-0 justify-center items-center`}>
          <ActivityIndicator size="small" color="#4A8481" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default EvidenceManagementScreen;